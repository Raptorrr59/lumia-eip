import socket
import json
import sys

HOST = '127.0.0.1'   # adjust if needed
PORT = 5001

def ia_decision(image_path: str) -> str:
    """
    Decide whether the given image is a cat (0) or dog (1).
    In this version, we ask the user. Later, this could be an AI.
    """
    print(f"\n Image à classifier : {image_path}")
    while True:
        user_input = input("Est-ce un chat (0) ou un chien (1) ? (q pour quitter) > ").strip()
        if user_input.lower() == 'q':
            print("Fin du test manuel.")
            sys.exit(0)
        if user_input in ('0', '1'):
            return user_input
        print("Entrée invalide. Tape 0 ou 1.")

def extract_one_json(buffer: str):
    """
    Try to extract exactly ONE JSON object from the buffer.
    Returns (obj_or_None, remaining_buffer).
    """
    decoder = json.JSONDecoder()
    i = 0
    n = len(buffer)

    # Skip leading whitespace
    while i < n and buffer[i].isspace():
        i += 1
    if i >= n:
        return None, ""

    try:
        obj, end = decoder.raw_decode(buffer[i:])
        return obj, buffer[i + end:]
    except json.JSONDecodeError:
        # Need more data
        return None, buffer

def main():
    buffer = ""

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((HOST, PORT))
            s.settimeout(2.0)
            print("Connecté au serveur de jeu.\n")

            while True:
                # Keep reading until we have ONE full JSON object
                obj = None
                while obj is None:
                    try:
                        # First, try to parse from what we already have
                        obj, buffer = extract_one_json(buffer)
                        if obj is not None:
                            break

                        # Otherwise read more bytes
                        chunk = s.recv(4096)
                        if not chunk:
                            print("Déconnecté du serveur.")
                            return
                        buffer += chunk.decode("utf-8", errors="replace")
                    except socket.timeout:
                        # no data right now; loop and try again
                        continue

                image_path = obj.get("imagePath")
                if not image_path:
                    continue

                prediction = ia_decision(image_path)

                try:
                    s.sendall((prediction + "\n").encode("utf-8"))
                except (BrokenPipeError, ConnectionResetError):
                    print("Le serveur a terminé la partie. (connexion fermée)")
                    return
                except OSError as e:
                    print(f"Erreur réseau: {e}")
                    return

    except (ConnectionRefusedError, TimeoutError) as e:
        print(f"Impossible de se connecter au serveur ({HOST}:{PORT}) : {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
