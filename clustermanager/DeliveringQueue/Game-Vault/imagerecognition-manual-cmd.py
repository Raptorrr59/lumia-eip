import socket
import json

HOST = '127.0.0.1'  # ou l'adresse IP de ton container
PORT = 5001

def main():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        print("✅ Connecté au serveur de jeu.\n")

        while True:
            data = s.recv(1024).decode()
            if not data:
                print("❌ Déconnecté du serveur.")
                break

            try:
                game_data = json.loads(data)
                image_path = game_data.get("imagePath", "")
            except json.JSONDecodeError:
                print("/!\ Données invalides reçues.")
                continue

            print(f"\n Image à classifier : {image_path}")
            user_input = input("Est-ce un chat (0) ou un chien (1) ? (q pour quitter) > ")

            if user_input.lower() == 'q':
                print("Fin du test manuel.")
                break

            if user_input not in ['0', '1']:
                print("❌ Entrée invalide. Tape 0 ou 1.")
                continue

            s.sendall(user_input.encode())

if __name__ == "__main__":
    main()
