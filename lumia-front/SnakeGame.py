import random

GRID_WIDTH = 10
GRID_HEIGHT = 10

DIRECTIONS = {
    "UP": (0, 1),
    "DOWN": (0, -1),
    "LEFT": (-1, 0),
    "RIGHT": (1, 0),
}

class SnakeGame:
    def __init__(self):
        self.snake = [(5, 5)]
        self.direction = "RIGHT"
        self.food = self.spawn_food()
        self.is_game_over = False

    def spawn_food(self):
        """Génère une nouvelle position pour la nourriture."""
        while True:
            food_pos = (random.randint(0, GRID_WIDTH - 1), random.randint(0, GRID_HEIGHT - 1))
            if food_pos not in self.snake:
                return food_pos

    def move(self):
        """Déplace le serpent dans la direction actuelle."""
        if self.is_game_over:
            return

        head_x, head_y = self.snake[0]
        move_x, move_y = DIRECTIONS[self.direction]
        new_head = (head_x + move_x, head_y + move_y)

        if (
            new_head in self.snake
            or new_head[0] < 0 or new_head[0] >= GRID_WIDTH
            or new_head[1] < 0 or new_head[1] >= GRID_HEIGHT
        ):
            self.is_game_over = True
            return

        self.snake.insert(0, new_head)

        if new_head == self.food:
            self.food = self.spawn_food()
        else:
            self.snake.pop()

    def update_direction(self, new_direction):
        """Met à jour la direction du serpent, si valide."""
        opposite_directions = {"UP": "DOWN", "DOWN": "UP", "LEFT": "RIGHT", "RIGHT": "LEFT"}
        if new_direction in DIRECTIONS and new_direction != opposite_directions[self.direction]:
            self.direction = new_direction

    def get_state(self):
        """Retourne les informations nécessaires pour l'IA."""
        head_x, head_y = self.snake[0]

        dist_up = head_y
        dist_down = GRID_HEIGHT - head_y - 1
        dist_left = head_x
        dist_right = GRID_WIDTH - head_x - 1

        return {
            "snake_head": (head_x, head_y),
            "food": self.food,
            "distances": {
                "UP": dist_up,
                "DOWN": dist_down,
                "LEFT": dist_left,
                "RIGHT": dist_right,
            },
        }

    def print_state(self):
        """Affiche l'état actuel dans le terminal."""
        grid = [[" " for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
        for x, y in self.snake:
            grid[y][x] = "S"
        food_x, food_y = self.food
        grid[food_y][food_x] = "F"
        print("\n".join("".join(row) for row in grid))
        print(f"Direction: {self.direction}")
        print(f"Food: {self.food}")
        print(f"Snake: {self.snake}")
        print("-" * 40)

if __name__ == "__main__":
    game = SnakeGame()

    while not game.is_game_over:
        game.print_state()

        state = game.get_state()
        print(f"State for AI: {state}")

        # Reçoit une commande (remplacer par une IA dans un vrai cas)
        command = input("Enter command (UP, DOWN, LEFT, RIGHT): ").strip().upper()
        game.update_direction(command)

        game.move()

    print("Game Over!")
