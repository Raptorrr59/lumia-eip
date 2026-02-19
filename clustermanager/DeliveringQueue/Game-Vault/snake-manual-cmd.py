import socket
import json

# Mapping user inputs to movement commands
KEY_MAPPING = {
    "Z": "MOVE_UP",
    "S": "MOVE_DOWN",
    "Q": "MOVE_LEFT",
    "D": "MOVE_RIGHT"
}

def ia_decision(state):
    """Ask the user for input and return the corresponding movement command."""
    while True:
        command = input("Enter move (Z=MOVE_UP, S=MOVE_DOWN, Q=MOVE_LEFT, D=MOVE_RIGHT): ").strip().upper()
        if command in KEY_MAPPING:
            return KEY_MAPPING[command]
        print("Invalid input. Please enter Z, S, Q, or D.")

def run_client():
    print("Connecting to the game...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(("localhost", 5001))
    print("Connected to the game !")

    while True:
        state = client_socket.recv(1024).decode()
        if not state:
            break  # Connection closed

        state_data = json.loads(state)
        print(f"Game state received: {state_data}")

        action = ia_decision(state_data)  # Ask user for input
        print(f"User chose: {action}")

        client_socket.sendall(action.encode())  # Send move command

    print("Closing connection...")
    client_socket.close()

if __name__ == "__main__":
    run_client()
