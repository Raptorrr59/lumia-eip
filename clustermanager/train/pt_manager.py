import time
import requests
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configuration
BASE_DIR = Path("train/")
API_URL = "http://localhost:8010/api/training_finished"

class ModelUpdateHandler(FileSystemEventHandler):
    def on_modified(self, event):
        self._check_event(event)

    def on_created(self, event):
        self._check_event(event)

    def _check_event(self, event):
        if not event.is_directory and event.src_path.endswith("model.pt"):
            path = Path(event.src_path)
            try:
                dockerId = path.parent.parent.parent.name
                user_id = path.parent.name
                gameName = path.parent.parent.name
                print(f"📦 model.pt updated → user: {user_id}, game: {gameName}, dockerId: {dockerId}")

                response = requests.put(
                    API_URL,
                    data={"dockerId": dockerId, "userId": user_id, "gameName": gameName.upper(), "status": True}
                )
                if response.ok:
                    print("✅ Notification sent successfully.")
                else:
                    print(f"⚠️ Failed to notify: {response.status_code} - {response.text}")
            except Exception as e:
                print(f"❌ Error processing model.pt event: {e}")

def main():
    path_to_watch = BASE_DIR
    print(f"Watching directory: {path_to_watch}")
    event_handler = ModelUpdateHandler()
    observer = Observer()
    observer.schedule(event_handler, str(path_to_watch), recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    main()
