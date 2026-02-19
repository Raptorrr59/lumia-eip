import socket
import json
import time
import threading
import select

# Game server configuration
HOST = "0.0.0.0"
PORT = 5001

LOG_FILE = "game_logs.json"

# Grid size (7 columns × 6 rows)
COLUMNS = 7
ROWS = 6

# Players
PLAYER_1 = "X"
PLAYER_2 = "O"

# Game variables
game_states = []
final_status = None
current_turn = None  # To be assigned once both players are connected
grid = [["." for _ in range(COLUMNS)] for _ in range(ROWS)]

# Connected clients
clients = {}
player_order = []

# Tracks consecutive invalid inputs
wrong_input_count = 0

# Time limit in seconds to wait for input before error
timeout = 300

# Variable to calculate final score
total_moves = 0
'''
Scoring system based on:

Win: More points for faster wins (fewer moves).

Loss: More points for lasting longer (more moves).

Draw: Considered as loss with longest duration equal better score.

Error: score is 0.
'''

def log_score():
    """Logs the score based on game outcome and move count."""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    score = 0

    if final_status == "win":
        # More points for faster wins
        score = max(0, 100 - total_moves * 2)
    elif final_status == "lose":
        # More points for longer defense
        score = total_moves * 2
    elif final_status == "error":
        score = 0  # No points for error quits

    score_event = {
        "timestamp": timestamp,
        "itemType": "score",
        "int": score
    }
    game_states.append(score_event)

def log_game_state():
    """Write all logged game states to a JSON file at once."""
    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "gameType": "connect4",
        "userId": "NA",
        "gameId": 1,
        "message": final_status,
        "gameStates": game_states
    }
    with open(LOG_FILE, "w") as log_file:
        json.dump(log_entry, log_file, indent=4)
    print(json.dumps(log_entry, indent=4))

def log_event(item_type, data):
    """Log an event within gameStates in a structured format."""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

    if item_type == "move":
        event = {
            "timestamp": timestamp,
            "itemType": item_type,
            "player-type": "non-user" if data["player"] == PLAYER_1 else "user",
            "player": data["player"],
            "column": data["column"],
            "row": data["row"]
        }
    elif item_type == "system":
        event = {
            "timestamp": timestamp,
            "itemType": item_type,
            "logType": data.get("logType", "INFO"),
            "message": data["message"]
        }
    else:
        event = {"timestamp": timestamp, "itemType": item_type, **data}

    game_states.append(event)

def print_grid(display=True):
    """Prints the game grid to the console if display is True and returns it as a formatted string."""
    grid_str = "\n".join("".join(row) for row in grid)
    if display:
        print("\nCurrent Game Grid:")
        print(grid_str)
    return grid_str

def drop_piece(column, player):
    """Attempts to drop a piece in the given column."""
    for row in reversed(range(ROWS)):
        if grid[row][column] == ".":
            grid[row][column] = player
            return row
    return -1  # Column full

def check_winner(player):
    """Checks if the given player has won the game."""
    for row in range(ROWS):
        for col in range(COLUMNS - 3):
            if all(grid[row][col + i] == player for i in range(4)):
                return True
    for row in range(ROWS - 3):
        for col in range(COLUMNS):
            if all(grid[row + i][col] == player for i in range(4)):
                return True
    for row in range(ROWS - 3):
        for col in range(COLUMNS - 3):
            if all(grid[row + i][col + i] == player for i in range(4)):
                return True
    for row in range(3, ROWS):
        for col in range(COLUMNS - 3):
            if all(grid[row - i][col + i] == player for i in range(4)):
                return True
    return False

def is_draw():
    """Checks if the grid is completely filled (draw)."""
    return all(grid[0][col] != "." for col in range(COLUMNS))

def get_state(player):
    """Returns the current game state as a JSON string for a specific player."""
    return json.dumps({
        "grid": print_grid(display=False),
        "currentTurn": current_turn,
        "playerSymbol": player,
        "isGameOver": final_status in ["win", "lose"]
    })

def validate_input(column, track_errors=True):
    """Validates the client's input to ensure it's a valid move.
    If track_errors is False, it will only validate without logging or tracking wrong attempts."""
    global wrong_input_count, final_status  # Use global variables

    try:
        column = int(column)  # Ensure it's an integer
        if 0 <= column < COLUMNS:  # Check if it's within the allowed range
            if grid[0][column] == ".":  # Check if there's room in the column
                if track_errors:
                    wrong_input_count = 0  # Reset counter if input is valid
                return True
            else:
                if track_errors:
                    log_event("system", {"message": f"Column {column} is full.", "logType": "ERROR"})
        else:
            if track_errors:
                log_event("system", {"message": f"Invalid column selection: {column}. Choose between 0 and {COLUMNS-1}.", "logType": "ERROR"})
    except ValueError:
        if track_errors:
            log_event("system", {"message": "Invalid input. Please enter a number.", "logType": "ERROR"})

    if not track_errors:
        return False

    # Increment wrong input count
    wrong_input_count += 1
    print(f"[DEBUG] Wrong Input Count: {wrong_input_count}/3")  # Debugging log

    log_event("system", {"message": f"Wrong input count: {wrong_input_count}/3", "logType": "ERROR"})

    # If 3 wrong inputs in a row, end the game
    if wrong_input_count >= 3:
        log_event("system", {"message": "Player entered 3 wrong inputs. Game ending in error.", "logType": "ERROR"})
        log_score()
        log_event("system", {"message": f"Game over.", "logType": "INFO"})
        final_status = "error"  # Set game to error state

    return False  # Invalid move

def handle_disconnection(player):
    """Handles a player disconnecting mid-game by notifying the remaining player without deleting the disconnected one."""
    global final_status

    final_status = "error"

    # Log the disconnection
    log_event("system", {"message": f"Player {player} disconnected. Game ended in error.", "logType": "ERROR"})
    log_score()
    log_event("system", {"message": f"Game over.", "logType": "INFO"})

    # Find the remaining player
    remaining_player = None
    for p in clients.keys():
        if p != player:  # Find the other player who is still connected
            remaining_player = p
            break

    # Notify the remaining player (if they exist and their socket is valid)
    if remaining_player and remaining_player in clients:
        try:
            clients[remaining_player].sendall(json.dumps({
                "grid": print_grid(display=False),
                "currentTurn": None,
                "playerSymbol": remaining_player,
                "isGameOver": True,
                "message": "Opponent disconnected. Game ended."
            }).encode())
        except OSError:
            log_event("system", {"message": f"Failed to notify player {remaining_player}.", "logType": "ERROR"})

def handle_client(client, player):
    global current_turn, final_status, timeout, total_moves

    client.setblocking(0)  # Make socket non-blocking

    try:
        while True:
            if final_status in ["win", "lose", "error"]:
                break
            if current_turn != player:
                time.sleep(0.1)
                continue  # Wait for the other player's turn

            try:
                # Wait for input until timeout's value has been reached
                ready = select.select([client], [], [], timeout)
                if ready[0]:
                    response = client.recv(1024).decode().strip()
                    if not response:
                        raise ConnectionResetError
                else:
                    # Timeout occurred
                    minutes = timeout // 60
                    seconds = timeout % 60
                    formatted_timeout = f"{minutes} minute(s) and {seconds} second(s)" if minutes else f"{seconds} second(s)"
                    log_event("system", {"message": f"Player {player} timed out after {formatted_timeout}.", "logType": "ERROR"})

                    final_status = "error"
                    log_score()
                    log_event("system", {"message": f"Game over.", "logType": "INFO"})
                    return

            except (ConnectionResetError, BrokenPipeError):
                log_event("system", {"message": f"Player {player} disconnected.", "logType": "ERROR"})
                handle_disconnection(player)
                return

            if validate_input(response):  # Validate the move
                column = int(response)
                row = drop_piece(column, player)
                total_moves += 1

                log_event("move", {"player": player, "column": column, "row": row})
                print_grid(display=True)

                if check_winner(player):
                    final_status = "win" if player == PLAYER_2 else "lose"
                    log_event("system", {"message": f"Player {'won' if final_status == 'win' else 'lost'}.", "logType": "INFO"})
                    log_score()
                    log_event("system", {"message": "Game over.", "logType": "INFO"})
                elif is_draw():
                    final_status = "lose"
                    log_event("system", {"message": "Game is a draw. Player lost.", "logType": "INFO"})
                    log_score()
                    log_event("system", {"message": "Game over.", "logType": "INFO"})
                else:
                    current_turn = PLAYER_1 if current_turn == PLAYER_2 else PLAYER_2

            else:
                if not validate_input(response, track_errors=False):
                    client.sendall(json.dumps({
                        "grid": print_grid(display=False),
                        "currentTurn": current_turn,
                        "playerSymbol": player,
                        "isGameOver": final_status in ["win", "lose"],
                        "errorMessage": "Invalid move. Try again."
                    }).encode())
                    continue

            for p, c in clients.items():
                c.sendall(get_state(p).encode())

    except ConnectionResetError:
        log_event("system", {"message": "Client disconnected unexpectedly.", "logType": "ERROR"})
    finally:
        client.close()

def program_timeout(seconds):
    """Forcefully terminates the program after a timeout if the game is not over."""
    global final_status

    time.sleep(seconds)
    if final_status not in ["win", "lose", "error"]:
        log_event("system", {"message": f"Player's input is wrong. A crash occured. The program had to wait until its runtime limit has been reached.", "logType": "ERROR"})
        log_event("system", {"message": f"Program timeout of {seconds} seconds reached. Terminating game.", "logType": "ERROR"})
        final_status = "error"
        log_score()
        log_event("system", {"message": "Game over.", "logType": "INFO"})
        log_game_state()

        # Close all clients
        for client in clients.values():
            try:
                client.sendall(json.dumps({
                    "grid": print_grid(display=False),
                    "currentTurn": None,
                    "playerSymbol": None,
                    "isGameOver": True,
                    "message": "Program timeout reached. Game ended."
                }).encode())
                client.close()
            except:
                pass

        # Close the server forcibly (os._exit as a last resort)
        import os
        os._exit(0)  # Ensures full termination

def run_server():
    global final_status, current_turn
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(2)
        log_event("system", {"message": "Waiting for two players...", "logType": "INFO"})
        print("Waiting for two players to connect...")

        while len(clients) < 2:
            client, _ = server_socket.accept()
            player_symbol = PLAYER_1 if len(clients) == 0 else PLAYER_2
            clients[player_symbol] = client
            if (len(clients) == 1):
                log_event("system", {"message": f"Game's AI (Symbole: {player_symbol}) connected.", "logType": "INFO"})
            else:
                log_event("system", {"message": f"Player's AI (Symbole: {player_symbol}) connected.", "logType": "INFO"})

        current_turn = PLAYER_1  # Set the starting player

        for player, client in clients.items():
            client.sendall(get_state(player).encode())

        for player, client in clients.items():
            threading.Thread(target=handle_client, args=(client, player)).start()

        while final_status not in ["win", "lose", "error"]:
            time.sleep(0.5)

        log_game_state()

    finally:
        print("Game over. Closing server...")
        for client in clients.values():
            client.close()
        server_socket.close()

if __name__ == "__main__":
    runtime_limit = 300 # Time limit at wich the program will stop running.
    threading.Thread(target=program_timeout, args=(runtime_limit,), daemon=True).start()

    run_server()

