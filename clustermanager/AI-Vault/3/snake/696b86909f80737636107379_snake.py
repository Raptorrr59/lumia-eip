import socket
import json
import random
from collections import deque
from typing import Dict, List, Tuple, Optional, Set

# ---------- Types ----------
Point = Tuple[int, int]

# Direction mapping (must match server)
DIRECTIONS = {
    "MOVE_UP": (0, -1),
    "MOVE_DOWN": (0, 1),
    "MOVE_LEFT": (-1, 0),
    "MOVE_RIGHT": (1, 0),
}
OPPOSITE = {
    "MOVE_UP": "MOVE_DOWN",
    "MOVE_DOWN": "MOVE_UP",
    "MOVE_LEFT": "MOVE_RIGHT",
    "MOVE_RIGHT": "MOVE_LEFT",
}
DIR_BY_DELTA = {v: k for k, v in DIRECTIONS.items()}

# ---------- Parse game state from server (schema: SnakeGame.py) ----------
def parse_state(raw: Dict) -> Tuple[int, int, List[Point], Optional[Point], str, int, bool]:
    """
    Returns: (width, height, snake, food_or_None, direction, score, is_game_over)
    The server sends:
      grid: str of H/B/F/. chars with newlines
      snake: [[x,y], ...] (head first)
      food: [x,y] or "None" (string)
      direction: e.g., "MOVE_RIGHT"
      score: int
      isGameOver: bool
    """
    grid_str = raw.get("grid", "")
    lines = [ln for ln in grid_str.split("\n") if ln]  # ignore any blank
    height = len(lines) if lines else 10
    width = len(lines[0]) if lines else 10

    snake_raw = raw.get("snake", [])
    snake: List[Point] = []
    for p in snake_raw:
        if isinstance(p, (list, tuple)) and len(p) == 2:
            snake.append((int(p[0]), int(p[1])))

    # Food can be [x,y] or "None"
    food_val = raw.get("food", "None")
    food: Optional[Point] = None
    if isinstance(food_val, (list, tuple)) and len(food_val) == 2:
        food = (int(food_val[0]), int(food_val[1]))

    direction = raw.get("direction", "MOVE_RIGHT")
    score = int(raw.get("score", 0))
    is_over = bool(raw.get("isGameOver", False))
    return width, height, snake, food, direction, score, is_over

# ---------- Safety / geometry ----------
def in_bounds(p: Point, w: int, h: int) -> bool:
    return 0 <= p[0] < w and 0 <= p[1] < h

def neighbors4(p: Point) -> List[Point]:
    x, y = p
    return [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]

def safe_moves(head: Point, snake: List[Point], w: int, h: int, cur_dir: str) -> List[str]:
    """
    Safe = inside bounds, NOT in snake body, and not reversing current direction.
    Note: Server collision check uses `new_head in self.snake` BEFORE popping tail,
    so we must treat the entire snake (including tail) as blocked.
    """
    body_blocked: Set[Point] = set(snake)
    moves = []
    for name, (dx, dy) in DIRECTIONS.items():
        if name == OPPOSITE.get(cur_dir):
            continue  # avoid invalid reverse
        nxt = (head[0] + dx, head[1] + dy)
        if in_bounds(nxt, w, h) and nxt not in body_blocked:
            moves.append(name)
    return moves

# ---------- BFS pathfinding ----------
def bfs_first_step_to_target(start: Point, target: Point, w: int, h: int, blocked: Set[Point]) -> Optional[Point]:
    """
    BFS to a single target. Returns the first step (neighbor of start) along a shortest path,
    or None if unreachable.
    """
    if start == target:
        return start
    q = deque([start])
    came_from: Dict[Point, Optional[Point]] = {start: None}

    while q:
        cur = q.popleft()
        if cur == target:
            # Reconstruct path -> get first step
            path = []
            c = cur
            while c is not None:
                path.append(c)
                c = came_from[c]
            path.reverse()
            if len(path) >= 2:
                return path[1]
            return None

        for nb in neighbors4(cur):
            if not in_bounds(nb, w, h): 
                continue
            if nb in blocked: 
                continue
            if nb not in came_from:
                came_from[nb] = cur
                q.append(nb)
    return None

# ---------- Heuristics when BFS fails ----------
def manhattan(a: Point, b: Point) -> int:
    return abs(a[0]-b[0]) + abs(a[1]-b[1])

def area_reachable(start: Point, w: int, h: int, blocked: Set[Point], limit: int = 100) -> int:
    """
    Flood-fill count from start (approx), capped by 'limit' for speed.
    """
    if not in_bounds(start, w, h) or start in blocked:
        return 0
    seen = {start}
    q = deque([start])
    count = 0
    while q and count < limit:
        cur = q.popleft()
        count += 1
        for nb in neighbors4(cur):
            if in_bounds(nb, w, h) and nb not in blocked and nb not in seen:
                seen.add(nb)
                q.append(nb)
    return count

def choose_space_savvy(head: Point, snake: List[Point], w: int, h: int, candidates: List[str]) -> str:
    """
    Prefer the move with the largest immediate free area.
    """
    blocked = set(snake)
    scored = []
    for m in candidates:
        dx, dy = DIRECTIONS[m]
        nxt = (head[0] + dx, head[1] + dy)
        score = area_reachable(nxt, w, h, blocked, limit=200)
        # Small nudge to stay away from walls when tied
        wall_buffer = min(nxt[0], w-1-nxt[0], nxt[1], h-1-nxt[1])
        scored.append((score, wall_buffer, m))
    scored.sort(key=lambda t: (t[0], t[1]), reverse=True)
    return scored[0][2] if scored else random.choice(list(DIRECTIONS.keys()))

# ---------- Main decision ----------
def ai_decision(state: Dict) -> str:
    w, h, snake, food, cur_dir, _, _ = parse_state(state)
    if not snake:
        return cur_dir  # shouldn't happen, but keep current

    head = snake[0]
    candidates = safe_moves(head, snake, w, h, cur_dir)

    if not candidates:
        # No legal move that isn't a reverse => try to keep moving straight if at least in bounds
        straight = (head[0] + DIRECTIONS[cur_dir][0], head[1] + DIRECTIONS[cur_dir][1])
        if in_bounds(straight, w, h) and straight not in set(snake):
            return cur_dir
        return random.choice(list(DIRECTIONS.keys()))

    # If we have food, try BFS shortest-path to it
    if food is not None:
        blocked = set(snake)  # everything in the body is blocked (matches server rule)
        first_step = bfs_first_step_to_target(head, food, w, h, blocked)
        if first_step:
            dx = first_step[0] - head[0]
            dy = first_step[1] - head[1]
            move = DIR_BY_DELTA.get((dx, dy))
            if move and move in candidates:
                return move

        # No BFS path (boxed in) -> pick safe move that gets closer to food
        candidates_sorted = sorted(
            candidates,
            key=lambda m: manhattan((head[0] + DIRECTIONS[m][0], head[1] + DIRECTIONS[m][1]), food)
        )
        if candidates_sorted:
            # Between equally close options, prefer the one with more space
            best = candidates_sorted[:2]  # inspect top 2 to break ties by space
            if len(best) > 1:
                # choose by space
                return choose_space_savvy(head, snake, w, h, best)
            return best[0]

    # No food (should be rare) or unreachable: maximize survival space
    return choose_space_savvy(head, snake, w, h, candidates)

# ---------- Socket client loop ----------
def run_client():
    print("Connecting to Game Manager...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect(("localhost", 5001))
        print("Connected to Game Manager!")
    except OSError as e:
        print(f"ERROR: Could not connect to Game Manager: {e}")
        client_socket.close()
        return

    recv_buffer = ""

    try:
        while True:
            chunk = client_socket.recv(4096)
            if not chunk:
                print("Server closed the connection.")
                break

            recv_buffer += chunk.decode(errors="ignore")

            # Extract complete JSON objects from the buffer
            while True:
                json_str, recv_buffer = extract_next_json(recv_buffer)
                if json_str is None:
                    break

                try:
                    state = json.loads(json_str)
                except json.JSONDecodeError as e:
                    print(f"WARNING: JSON decode error; skipping message: {e}")
                    continue

                try:
                    move = ai_decision(state)
                except Exception as e:
                    print(f"ERROR in ai_decision: {e}")
                    move = "MOVE_RIGHT"  # safe-ish default

                if move not in DIRECTIONS:
                    move = "MOVE_RIGHT"

                try:
                    client_socket.sendall(move.encode())
                except OSError as e:
                    print(f"ERROR sending move: {e}")
                    break

    except OSError as e:
        print(f"Socket error: {e}")
    finally:
        print("Closing connection...")
        client_socket.close()

def extract_next_json(buffer: str) -> Tuple[Optional[str], str]:
    """
    Handle both newline-delimited JSON and single-object streams via brace counting.
    """
    # Fast path: newline-delimited
    nl = buffer.find("\n")
    if nl != -1:
        msg = buffer[:nl].strip()
        rest = buffer[nl+1:]
        if msg:
            return msg, rest
        else:
            return None, rest

    # Brace-balance for single JSON object
    depth = 0
    start = None
    for i, ch in enumerate(buffer):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            if depth > 0:
                depth -= 1
                if depth == 0 and start is not None:
                    msg = buffer[start:i+1]
                    rest = buffer[i+1:]
                    return msg, rest
    return None, buffer

if __name__ == "__main__":
    run_client()
