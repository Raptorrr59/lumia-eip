import socket
import json
import os
import random
import sys
import time
from typing import List, Tuple

HOST = "0.0.0.0"
PORT = 5001
PROGRAM_TIMEOUT_SECONDS = 7200  # 2 hours max of runtime
LOG_FILE = "game_logs.json"

CAT_DIR = "gameselect/cats"
DOG_DIR = "gameselect/dogs"

# Hard cap: exactly 20 images per game (or fewer if not available)
NUM_IMAGES = 20

def valid_image(filename: str) -> bool:
    return filename.lower().endswith((".png", ".jpg", ".jpeg"))

def load_images() -> List[Tuple[str, int, str]]:
    """Return list of (path, expected_bool, expected_str) from both folders."""
    images: List[Tuple[str, int, str]] = []
    if os.path.isdir(CAT_DIR):
        for f in os.listdir(CAT_DIR):
            if valid_image(f):
                images.append((os.path.join(CAT_DIR, f), 0, "cat"))
    if os.path.isdir(DOG_DIR):
        for f in os.listdir(DOG_DIR):
            if valid_image(f):
                images.append((os.path.join(DOG_DIR, f), 1, "dog"))
    random.shuffle(images)
    return images

def choose_rounds(images: List[Tuple[str, int, str]]) -> List[Tuple[str, int, str]]:
    """Pick exactly NUM_IMAGES (or less if not enough)."""
    if len(images) <= NUM_IMAGES:
        return images
    # random.sample avoids bias from prior shuffle and guarantees exact size
    return random.sample(images, NUM_IMAGES)

def log_state(final_status: str, states: List[dict]) -> None:
    payload = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "gameType": "image",
        "userId": "NA",
        "gameId": 1,
        "message": final_status,
        "gameStates": states,
    }
    try:
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=4, ensure_ascii=False)
    except Exception:
        pass
    print(json.dumps(payload, indent=4, ensure_ascii=False))

def send_json_line(sock: socket.socket, obj: dict) -> None:
    data = (json.dumps(obj, ensure_ascii=False) + "\n").encode("utf-8")
    sock.sendall(data)

def recv_line(rfile) -> str:
    line = rfile.readline()
    if not line:
        return ""
    return line.rstrip("\r\n")

def run() -> int:
    states: List[dict] = []
    all_images = load_images()
    rounds = choose_rounds(all_images)  # exactly 20 (or fewer)

    if not rounds:
        states.append({"ts": time.time(), "type": "system", "message": "No images found."})
        log_state("error", states)
        print("No images to play. Put files in gameselect/cats and gameselect/dogs.")
        return 1

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.settimeout(60.0) # 1 minute to connect before giving up (timed out)

    try:
        server.bind((HOST, PORT))
        server.listen(1)
        print(f"Game Manager waiting for a client... (rounds: {len(rounds)})")
        states.append({"ts": time.time(), "type": "system", "message": f"Server listening. rounds={len(rounds)}"})

        client, addr = server.accept()
        print(f"Client connected from {addr}")
        states.append({"ts": time.time(), "type": "system", "message": "Client connected.", "addr": str(addr)})

        client.settimeout(30.0)
        rfile = client.makefile("r", encoding="utf-8", newline="\n")

        score = 0
        start_ts = time.time()

        for path, expected_bool, expected_str in rounds:
            try:
                send_json_line(client, {"imagePath": path})
            except (BrokenPipeError, ConnectionResetError, OSError) as e:
                print(f"Client disconnected while sending: {e}")
                states.append({"ts": time.time(), "type": "error", "message": f"send failed: {e}"})
                log_state("error", states)
                return 1

            try:
                answer_line = recv_line(rfile)
            except Exception as e:
                print(f"Error reading client answer: {e}")
                states.append({"ts": time.time(), "type": "error", "message": f"recv failed: {e}"})
                log_state("error", states)
                return 1

            if answer_line == "":
                print("Client closed connection.")
                states.append({"ts": time.time(), "type": "system", "message": "Client closed connection."})
                log_state("error", states)
                return 1

            try:
                ai_bool = int(answer_line.strip())
                if ai_bool not in (0, 1):
                    raise ValueError("not 0/1")
            except Exception:
                states.append({"ts": time.time(), "type": "response", "valid": False, "received": answer_line})
                continue

            correct = int(ai_bool == expected_bool)
            score += correct
            states.append({
                "ts": time.time(),
                "type": "response",
                "valid": True,
                "image": path,
                "expected": expected_str,
                "answer": ai_bool,
                "correct": bool(correct),
                "score": score
            })

            if time.time() - start_ts > PROGRAM_TIMEOUT_SECONDS:
                states.append({"ts": time.time(), "type": "error", "message": "Program timeout reached."})
                log_state("error", states)
                return 1

        final = "win" if score >= 15 else "lose"
        states.append({"ts": time.time(), "type": "system", "message": "Game over.", "score": score})
        log_state(final, states)
        print("Game over.")
        return 0

    except KeyboardInterrupt:
        print("Interrupted (Ctrl+C).")
        states.append({"ts": time.time(), "type": "warning", "message": "Interrupted by user."})
        log_state("error", states)
        return 130
    except Exception as e:
        print(f"Server error: {e}")
        states.append({"ts": time.time(), "type": "error", "message": f"server exception: {e}"})
        log_state("error", states)
        return 1
    finally:
        try:
            server.close()
        except Exception:
            pass

if __name__ == "__main__":
    sys.exit(run())
