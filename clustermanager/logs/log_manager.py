import os
import json
import time
import requests

API_URL = "http://localhost:8010/api/game_data"

def send_to_api(file_path, user_id, game):
    """Envoie le fichier JSON en multipart/form-data."""
    try:
        # Charger le contenu du fichier JSON
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Vérifier si userId est "NA" et le remplacer
        if data.get("userId") == "NA":
            data["userId"] = user_id

        # Écrire le fichier mis à jour temporairement
        temp_file_path = file_path + ".tmp"
        with open(temp_file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

        # Envoyer le fichier mis à jour
        with open(temp_file_path, "rb") as file:
            files = {"file": (os.path.basename(file_path), file, "application/json")}
            data = {"userId": user_id, "game": game}

            response = requests.post(API_URL, files=files, data=data)
            print(f"API Response: {response.status_code}, {response.text}")

        # Suppression du fichier temporaire après envoi
        os.remove(temp_file_path)

        return response.status_code == 200

    except requests.exceptions.RequestException as e:
        print(f"Échec de la requête API: {e}")
        return False

def wait_for_non_empty_file(file_path, timeout=10):
    """Attend que le fichier ne soit plus vide avant de le lire."""
    elapsed_time = 0
    while os.path.exists(file_path) and os.path.getsize(file_path) == 0:
        if elapsed_time >= timeout:
            print(f"waiting {file_path}, still empty")
            return False  # Timeout atteint
        time.sleep(1)
        elapsed_time += 1
    return True  # Le fichier est prêt à être lu

def find_and_send_json(root_dir):
    """Recherche les fichiers JSON, les modifie si besoin et les envoie à l'API Python."""
    try:
        while True:
            for foldername, _, filenames in os.walk(root_dir):
                for filename in filenames:
                    if filename.endswith(".json"):
                        file_path = os.path.join(foldername, filename)

                        if not wait_for_non_empty_file(file_path):
                            continue

                        try:
                            user_id = os.path.basename(os.path.normpath(foldername))
                            game = filename.replace(".json", "")  # Deviner le jeu depuis le nom du fichier

                            if send_to_api(file_path, user_id, game):
                               os.remove(file_path)  # Suppression après succès
                               print(f"✅ Fichier supprimé : {file_path}")

                        except Exception as e:
                            print(f"❌ Erreur lors du traitement de {file_path} : {e}")
                            os.remove(file_path) #marc met le truc en commentaire si tu veux debug le log

            time.sleep(5)  # Pause avant de scanner à nouveau

    except KeyboardInterrupt:
        print("\nScript terminé, Log manager arrêté.")

# Déterminer le répertoire du script
root_directory = os.path.dirname(os.path.abspath(__file__))
find_and_send_json(root_directory)
