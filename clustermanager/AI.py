import os
from time import sleep

FIFO_PATH = "/tmp/snake_fifo"


def main():
    sleep(3)
    
    if not os.path.exists(FIFO_PATH):
        raise FileNotFoundError(f"Named pipe {FIFO_PATH} not found. Ensure snake.py is running.")

    with open(FIFO_PATH, "r") as fifo:
        try:
            while True:
                line = fifo.readline().strip()
                if line:
                    print(f"AI get {line}")
        except KeyboardInterrupt:
            print("AI stopped by the user.")

if __name__ == "__main__":
    main()
