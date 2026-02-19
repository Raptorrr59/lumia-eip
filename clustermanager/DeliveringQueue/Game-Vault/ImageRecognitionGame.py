import socket
import random
import json
import base64
import time
import threading
import sys
import os

# Game server configuration
HOST = "0.0.0.0"
PORT = 5001

LOG_FILE = "game_logs.json"

game_states = []
final_status = "error"
program_timed_out = False
PROGRAM_TIMEOUT_SECONDS = 3600

def log_game_state():
    filtered_states = [entry for entry in game_states if entry.get("itemType") != "image"]

    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "gameType": "image",
        "userId": "NA",
        "gameId": 1,
        "message": final_status,
        "gameStates": filtered_states
    }
    with open(LOG_FILE, "w") as log_file:
        json.dump(log_entry, log_file, indent=4)
    print(json.dumps(log_entry, indent=4))


def log_event(item_type, data):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    event = {"timestamp": timestamp, "itemType": item_type, **data}
    game_states.append(event)

class ImageRecognitionGame:
    def __init__(self):
        self.images = []  # [(filepath, label_bool, label_str)]
        self.load_images()
        self.is_game_over = False
        self.score = 0
        self.current_image = None
        self.remaining_images = self.images.copy()
        self.client_socket = None

        if not self.remaining_images:
            log_event("system", {"logType": "INFO", "message": "0 images loaded for evaluation."})
            self.is_game_over = True
        else:
            log_event("system", {"logType": "INFO", "message": f"{(len(self.remaining_images) - 1)} images loaded for evaluation."})
            self.next_image()

    def load_images(self):
        cat_dir = "gameselect/cats"
        dog_dir = "gameselect/dogs"

        def valid_image(file):
            return file.lower().endswith((".png", ".jpg", ".jpeg"))

        cat_images = [f for f in os.listdir(cat_dir) if valid_image(f)]
        dog_images = [f for f in os.listdir(dog_dir) if valid_image(f)]

        for f in cat_images:
            self.images.append((os.path.join(cat_dir, f), 0, "cat"))
        for f in dog_images:
            self.images.append((os.path.join(dog_dir, f), 1, "dog")) 

        random.shuffle(self.images)

    def next_image(self):
        if not self.remaining_images:
            self.is_game_over = True
            log_event("system", {"logType": "INFO", "message": "No more images to evaluate. Game over."})
            return

        self.current_image = self.remaining_images.pop()
        filepath, expected_bool, expected_str = self.current_image

        with open(filepath, "rb") as img_file:
            b64_data = base64.b64encode(img_file.read()).decode()

        log_event("image", {
            "expected": expected_str,
            "expected_bool": expected_bool,
        })

        self.send_to_client({
            "image": b64_data,
            "format": filepath.split(".")[-1],
        })

    def receive_response(self, response):
        _, expected_bool, expected_str = self.current_image
        ai_bool = int(response.strip())

        correct = int(ai_bool == expected_bool)
        self.score += correct

        log_event("response", {
            "AIrespons": ai_bool,
            "expected": expected_str,
            "correct": bool(correct),
            "score": self.score,
        })

        self.next_image()

    def send_to_client(self, payload):
        if self.client_socket:
            try:
                self.client_socket.sendall(json.dumps(payload).encode())
            except Exception as e:
                log_event("system", {"logType": "ERROR", "message": f"Failed to send image: {e}"})
                self.is_game_over = True

    def get_state(self, image_info):
        return json.dumps({
            "imagePath": image_info["path"]
        })

    def get_next_image(self):
        if not self.remaining_images:
            return None
        return {
            "path": self.current_image[0],
            "expected_bool": self.current_image[1],
            "expected_str": self.current_image[2]
        }

    def evaluate_response(self, image_info, response):
        try:
            ai_bool = int(response.strip())
        except ValueError:
            log_event("system", {"logType": "ERROR", "message": f"Invalid response: {response}"})
            return

        correct = int(ai_bool == image_info["expected_bool"])
        self.score += correct

        log_event("response", {
            "AIrespons": ai_bool,
            "expected": image_info["expected_str"],
            "correct": bool(correct),
            "score": self.score,
        })

        self.next_image()

def program_timeout(seconds):
    global final_status, program_timed_out
    time.sleep(seconds)

    if not game.is_game_over:
        program_timed_out = True
        final_status = "error"
        log_event("system", {"logType": "ERROR", "message": f"Program timeout of {seconds} seconds reached. Game terminated."})
        log_event("system", {"logType": "INFO", "message": "Game over."})
        log_game_state()
        os._exit(0)

def run_server():
    global final_status
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    client_socket = None

    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(1)
        log_event("system", {"logType": "INFO", "message": "Game Manager waiting for a client..."})

        client_socket, addr = server_socket.accept()
        game.client_socket = client_socket  # 👈 Fix: assign client to game
        log_event("system", {"logType": "INFO", "message": "Client connected."})
        client_socket.settimeout(1.0)

        while not game.is_game_over and not program_timed_out:
            image_info = game.get_next_image()
            if not image_info:
                break

            client_socket.sendall((game.get_state(image_info) + "\n").encode())

            try:
                response = client_socket.recv(1024).decode().strip()
            except socket.timeout:
                continue
            except ConnectionResetError:
                log_event("system", {"logType": "ERROR", "message": "Client disconnected abruptly."})
                break

            if not response:
                log_event("system", {"logType": "ERROR", "message": "Client disconnected."})
                break

            game.evaluate_response(image_info, response)

            time.sleep(0.3)

        if (game.score < 15):
            final_status = "lose"
        else:
            final_status = "win"
            
        log_event("system", {"logType": "INFO", "message": "Game over."})

    except KeyboardInterrupt:
        log_event("system", {"logType": "WARNING", "message": "Ctrl+C detected. Shutting down gracefully..."})
    except Exception as e:
        log_event("system", {"logType": "ERROR", "message": f"Server error: {e}"})

    finally:
        if client_socket:
            client_socket.close()
        server_socket.close()
        log_event("system", {"logType": "INFO", "message": "Sockets closed properly. Server shutdown complete."})
        log_game_state()
        sys.exit(0)

if __name__ == "__main__":
    game = ImageRecognitionGame()
    threading.Thread(target=program_timeout, args=(PROGRAM_TIMEOUT_SECONDS,), daemon=True).start()
    run_server()
