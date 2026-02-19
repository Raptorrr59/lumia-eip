import socket
import json

def ia_decision():
    """Ask the user to select a column (0-6) for their move."""
    while True:
        return input("Enter column (0-6) to drop your piece: ").strip()

def run_client():
    print("Connecting to the Connect Four game...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(("localhost", 5001))
    print("Connected to the Connect Four game !")

    player_symbol = None

    while True:
        state = client_socket.recv(1024).decode()
        if not state:
            break  # Connection closed

        print("\n")
        print(f"Raw message received: {state}")  # Debugging purpose

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
            action = ia_decision()  # Ask user for input, to be replace by your AI's logic
            client_socket.sendall(action.encode())
            # if action == "":
            #     print("Warning: Empty input detected. Sending fallback invalid move (-1).")
            #     client_socket.sendall(b"-1")  # This will be handled as invalid input, not disconnection
            # else:
            #     client_socket.sendall(action.encode())
        else:
            print("Waiting for the other player to finish their turn...")

    print("Closing connection...")
    client_socket.close()

if __name__ == "__main__":
    run_client()