import socket
import json
import random
import time
import threading
import sys
import os

# Grid size (10 by default)
GRID_WIDTH = 10
GRID_HEIGHT = 10

# Directions mapping
DIRECTIONS = {
    "MOVE_UP": (0, -1),
    "MOVE_DOWN": (0, 1),
    "MOVE_LEFT": (-1, 0),
    "MOVE_RIGHT": (1, 0)
}

# Game server configuration
HOST = "0.0.0.0"
PORT = 5001

LOG_FILE = "game_logs.json"

game_states = []
last_command = "NA"
final_status = "error"

# Runtime timeout control
program_timed_out = False
PROGRAM_TIMEOUT_SECONDS = 3600

def log_game_state():
    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "gameType": "snake",
        "userId": "NA",
        "gameId": 1,
        "message": final_status,
        "gameStates": game_states
    }
    with open(LOG_FILE, "w") as log_file:
        json.dump(log_entry, log_file, indent=4)
    print(json.dumps(log_entry, indent=4))

def log_event(item_type, data):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    if item_type == "snake":
        event = {"timestamp": timestamp, "itemType": item_type, "last-cmd": data.pop("last-cmd", "NA"), **data}
    elif item_type == "system" and "Collision detected" in data.get("message", ""):
        event = {"timestamp": timestamp, "itemType": item_type, "logType": data.get("logType", "INFO"), "message": data.get("message"), "last-cmd": last_command}
    else:
        event = {"timestamp": timestamp, "itemType": item_type, **data}
    game_states.append(event)

def print_grid(snake, food, display=False):
    grid = [["." for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
    if food:
        food_x, food_y = food
        grid[food_y][food_x] = "F"
    for x, y in snake[1:]:
        grid[y][x] = "B"
    head_x, head_y = snake[0]
    grid[head_y][head_x] = "H"
    grid_str = "\n".join("".join(row) for row in grid)
    if display:
        print("\nCurrent Game Grid:")
        print(grid_str)
    return grid_str

class SnakeGame:
    def __init__(self):
        log_event("system", {"logType": "INFO", "message": "Game initialized."})
        start_x = min(5, GRID_WIDTH - 1)
        start_y = min(5, GRID_HEIGHT - 1)
        self.snake = [(start_x, start_y)]
        if GRID_WIDTH > 1:
            self.snake.append((start_x - 1, start_y))

        self.direction = "MOVE_RIGHT"
        self.food = self.spawn_food()
        self.is_game_over = False
        self.score = 0

        log_event("score", {"int": self.score})
        if self.food:
            log_event("food", {"position": list(self.food)})
        log_event("snake", {"last-cmd": last_command, "position": [list(part) for part in self.snake]})
        print_grid(self.snake, self.food, display=False)

    def spawn_food(self):
        available_spaces = [(x, y) for x in range(GRID_WIDTH) for y in range(GRID_HEIGHT) if (x, y) not in self.snake]
        return random.choice(available_spaces) if available_spaces else None

    def move(self):
        global last_command, final_status
        if self.is_game_over:
            return

        head_x, head_y = self.snake[0]
        move_x, move_y = DIRECTIONS[self.direction]
        new_head = (head_x + move_x, head_y + move_y)

        if (new_head in self.snake or
            new_head[0] < 0 or new_head[0] >= GRID_WIDTH or
            new_head[1] < 0 or new_head[1] >= GRID_HEIGHT):
            self.is_game_over = True
            final_status = "lose"
            log_event("system", {"logType": "INFO", "message": "Player lost. Collision detected."})
            return

        self.snake.insert(0, new_head)
        if new_head == self.food:
            self.food = self.spawn_food()
            if self.food is None:
                self.is_game_over = True
                final_status = "win"
                log_event("system", {"logType": "INFO", "message": "Player won. No more space left on the grid!"})
                return
            self.score += 10
            log_event("food", {"position": list(self.food)})
            log_event("score", {"int": self.score})
        else:
            self.snake.pop()

        log_event("snake", {"last-cmd": last_command, "position": [list(part) for part in self.snake]})
        print_grid(self.snake, self.food, display=False)

    def update_direction(self, new_direction):
        global last_command
        opposite_directions = {"MOVE_UP": "MOVE_DOWN", "MOVE_DOWN": "MOVE_UP", "MOVE_LEFT": "MOVE_RIGHT", "MOVE_RIGHT": "MOVE_LEFT"}
        if new_direction in DIRECTIONS and new_direction != opposite_directions[self.direction]:
            self.direction = new_direction
            last_command = new_direction

    def get_state(self):
        return json.dumps({
            "grid": print_grid(self.snake, self.food, display=False),
            "snake": self.snake,
            "food": self.food if self.food else "None",
            "direction": self.direction,
            "score": self.score,
            "isGameOver": self.is_game_over
        })

def program_timeout(seconds):
    global final_status, program_timed_out
    time.sleep(seconds)

    if not game.is_game_over:
        program_timed_out = True
        final_status = "error"
        log_event("system", {"logType": "ERROR", "message": f"Player's input is wrong. A crash occured. The program had to wait until its runtime limit has been reached."})
        log_event("system", {"logType": "ERROR", "message": f"Program timeout of {seconds} seconds reached. Game terminated."})
        log_event("system", {"logType": "INFO", "message": "Game over."})
        log_game_state()
        os._exit(0)  # Ensure full exit as final fallback

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
        log_event("system", {"logType": "INFO", "message": "Client connected."})
        client_socket.settimeout(1.0)

        client_socket.sendall(game.get_state().encode())

        while not program_timed_out:
            try:
                response = client_socket.recv(1024).decode()
            except socket.timeout:
                if program_timed_out:
                    break
                continue
            except ConnectionResetError:
                log_event("system", {"logType": "ERROR", "message": "Client disconnected abruptly."})
                break

            if not response:
                log_event("system", {"logType": "ERROR", "message": "Client disconnected."})
                break

            if response in DIRECTIONS:
                game.update_direction(response)

            game.move()
            client_socket.sendall(game.get_state().encode())

            if game.is_game_over:
                break

            time.sleep(0.3)

        log_event("system", {"logType": "INFO", "message": "Game over."})

    except KeyboardInterrupt:
        log_event("system", {"logType": "WARNING", "message": "Ctrl+C detected. Shutting down gracefully..."})

    finally:
        if client_socket:
            client_socket.close()
        server_socket.close()
        log_event("system", {"logType": "INFO", "message": "Sockets closed properly. Server shutdown complete."})
        log_game_state()
        sys.exit(0)  # Exit the Python process

if __name__ == "__main__":
    # print("[DEBUG] Starting game server")
    game = SnakeGame()
    threading.Thread(target=program_timeout, args=(PROGRAM_TIMEOUT_SECONDS,), daemon=True).start()
    run_server()
