import socket
import json
import random
import copy
import os

ROWS = 6
COLUMNS = 7
WIN_LENGTH = 4

def parse_grid(grid_str):
    """Parses the grid string into a 2D list (row-major)."""
    return [list(row) for row in grid_str.strip().split("\n")]

def is_valid_move(grid, col):
    """Checks if a move is valid in the given column."""
    return grid[0][col] == '.'

def get_next_open_row(grid, col):
    """Returns the next available row in the column, or -1 if full."""
    for row in reversed(range(ROWS)):
        if grid[row][col] == '.':
            return row
    return -1

def drop_piece(grid, row, col, piece):
    """Drops the piece in the grid at the specified location."""
    grid[row][col] = piece

def winning_move(grid, piece):
    """Check all win conditions for a piece."""
    # Horizontal
    for r in range(ROWS):
        for c in range(COLUMNS - 3):
            if all(grid[r][c + i] == piece for i in range(WIN_LENGTH)):
                return True
    # Vertical
    for c in range(COLUMNS):
        for r in range(ROWS - 3):
            if all(grid[r + i][c] == piece for i in range(WIN_LENGTH)):
                return True
    # Positive Diagonal
    for r in range(ROWS - 3):
        for c in range(COLUMNS - 3):
            if all(grid[r + i][c + i] == piece for i in range(WIN_LENGTH)):
                return True
    # Negative Diagonal
    for r in range(3, ROWS):
        for c in range(COLUMNS - 3):
            if all(grid[r - i][c + i] == piece for i in range(WIN_LENGTH)):
                return True
    return False

def get_valid_columns(grid):
    """Returns a list of valid columns."""
    return [col for col in range(COLUMNS) if is_valid_move(grid, col)]

def score_position(grid, piece):
    """Scores the grid for the given piece."""
    score = 0
    center_col = [grid[r][COLUMNS // 2] for r in range(ROWS)]
    score += center_col.count(piece) * 3  # Favor center column

    return score

def minimax(grid, depth, maximizingPlayer, player_piece, opponent_piece):
    """Minimax algorithm with basic depth control."""
    valid_locations = get_valid_columns(grid)
    is_terminal = winning_move(grid, player_piece) or winning_move(grid, opponent_piece) or len(valid_locations) == 0

    if depth == 0 or is_terminal:
        if winning_move(grid, player_piece):
            return (None, 100000)
        elif winning_move(grid, opponent_piece):
            return (None, -100000)
        else:
            return (None, score_position(grid, player_piece))

    if maximizingPlayer:
        value = -float('inf')
        best_col = random.choice(valid_locations)
        for col in valid_locations:
            temp_grid = copy.deepcopy(grid)
            row = get_next_open_row(temp_grid, col)
            drop_piece(temp_grid, row, col, player_piece)
            _, new_score = minimax(temp_grid, depth - 1, False, player_piece, opponent_piece)
            if new_score > value:
                value = new_score
                best_col = col
        return best_col, value
    else:
        value = float('inf')
        best_col = random.choice(valid_locations)
        for col in valid_locations:
            temp_grid = copy.deepcopy(grid)
            row = get_next_open_row(temp_grid, col)
            drop_piece(temp_grid, row, col, opponent_piece)
            _, new_score = minimax(temp_grid, depth - 1, True, player_piece, opponent_piece)
            if new_score < value:
                value = new_score
                best_col = col
        return best_col, value

def choose_ai_move(grid, player_piece):
    """Choose a column using basic AI logic."""
    opponent_piece = 'O' if player_piece == 'X' else 'X'

    # 1. Check for winning move
    for col in get_valid_columns(grid):
        temp_grid = copy.deepcopy(grid)
        row = get_next_open_row(temp_grid, col)
        drop_piece(temp_grid, row, col, player_piece)
        if winning_move(temp_grid, player_piece):
            return str(col)

    # 2. Block opponent's winning move
    for col in get_valid_columns(grid):
        temp_grid = copy.deepcopy(grid)
        row = get_next_open_row(temp_grid, col)
        drop_piece(temp_grid, row, col, opponent_piece)
        if winning_move(temp_grid, opponent_piece):
            return str(col)

    # 3. Use minimax to decide
    col, _ = minimax(grid, depth=3, maximizingPlayer=True, player_piece=player_piece, opponent_piece=opponent_piece)
    return str(col) if col is not None else str(random.choice(get_valid_columns(grid)))

def run_client():
    print("Connecting to the Connect Four Server...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(("localhost", 5001))
    print("Connected to the Connect Four Server!")

    player_symbol = None

    while True:
        state = client_socket.recv(1024).decode()
        if not state:
            break  # Connection closed

        print("\nRaw message received:", state)

        try:
            state_data = json.loads(state)
        except json.JSONDecodeError:
            print("Error: Received invalid JSON data from server.")
            continue

        player_symbol = state_data.get("playerSymbol", player_symbol)
        print(f"You are playing as: {player_symbol}")
        print(f"Game state received:\n{state_data['grid']}")
        print(f"Current Turn: {state_data['currentTurn']}")

        if state_data["isGameOver"]:
            print("Game Over!")
            break

        if state_data["currentTurn"] == player_symbol:
            grid = parse_grid(state_data["grid"])
            action = choose_ai_move(grid, player_symbol)
            print(f"AI selects column: {action}")
            client_socket.sendall(action.encode())
        else:
            print("Waiting for the other player to finish their turn...")

    print("Closing connection...")
    client_socket.close()

if __name__ == "__main__":
    run_client()
