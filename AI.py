import socket
import json
import random

def ia_decision(state):
    """ Simple logic for the AI (chooses a random direction) """
    directions = ["MOVE_UP", "MOVE_DOWN", "MOVE_LEFT", "MOVE_RIGHT"]
    return random.choice(directions)

def run_client():
    print("Connecting to Game Manager...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect(("localhost", 5001))  # Connecting to the game manager
    print("Connected to Game Manager!")

    while True:
        state = client_socket.recv(1024).decode()
        if not state:
            break  # End of communication

        state_data = json.loads(state)
        print(f"Game state received: {state_data}")  # Log the received state

        action = ia_decision(state_data)
        print(f"AI chose action: {action}")  # Log the AI decision

        client_socket.sendall(action.encode())

    print("Closing connection...")
    client_socket.close()

if __name__ == "__main__":
    run_client()
