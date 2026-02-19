import os
import time

FIFO_PATH = "/tmp/snake_fifo"

if not os.path.exists(FIFO_PATH):
    os.mkfifo(FIFO_PATH)

def main():
    with open(FIFO_PATH, "w") as fifo:
        try:
            while True:
                fifo.write("Snake is moving\n")
                fifo.flush()
                time.sleep(1)
                fifo.write("Snake ate an apple\n")
                fifo.flush()
                time.sleep(1)
        except KeyboardInterrupt:
            fifo.write("Game over\n")
            fifo.flush()

if __name__ == "__main__":
    main()
