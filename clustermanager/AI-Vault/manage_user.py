import argparse
import sys
import subprocess
import json
import os

def manager(games, current_directory):
    user = str(args.second)
    user_path = os.path.join(current_directory, user)

    if args.first == "new":
        print("New user")

        # Try to fix ownership of existing directory if it belongs to root
        if os.path.exists(user_path):
            try:
                # Check if we can write to the directory
                test_file = os.path.join(user_path, ".test_write")
                with open(test_file, 'w') as f:
                    f.write("test")
                os.remove(test_file)
            except PermissionError:
                # Try to fix ownership with sudo
                print(f"Fixing ownership of {user_path}")
                subprocess.run(["sudo", "chown", "-R", f"{os.getuid()}:{os.getgid()}", user_path], check=False)

        # Create user directory (if it doesn't exist)
        os.makedirs(user_path, exist_ok=True)
        # Change permissions to allow write access
        subprocess.run(["chmod", "-R", "755", user_path], check=False)

        for game in games:
            game_path = os.path.join(user_path, game)

            # Try to fix ownership of existing game directory
            if os.path.exists(game_path):
                try:
                    test_file = os.path.join(game_path, ".test_write")
                    with open(test_file, 'w') as f:
                        f.write("test")
                    os.remove(test_file)
                except PermissionError:
                    print(f"Fixing ownership of {game_path}")
                    subprocess.run(["sudo", "chown", "-R", f"{os.getuid()}:{os.getgid()}", game_path], check=False)

            os.makedirs(game_path, exist_ok=True)
            # Change permissions for the game directory
            subprocess.run(["chmod", "-R", "755", game_path], check=False)

            trainingpath = os.path.join(game_path, "train")
            if game == "image":
                os.makedirs(trainingpath, exist_ok=True)
                subprocess.run(["chmod", "-R", "755", trainingpath], check=False)

    elif args.first == "delete":
        print("Remove user")
        print(user_path)

        # Remove user folder if it exists
        if os.path.exists(user_path):
            subprocess.run(["rm", "-r", user_path])
        else:
            print(f"Warning: User directory {user_path} does not exist.")

    else:
        print("Error: Please choose 'new' or 'delete' as the first argument")
        return 84

    return 0

def main(args, current_directory):

    try:
        int(args[2])
    except ValueError:
        print("Error: Second argument must be an ID (int).")
        return 84

    try:
        games = json.loads(args[3])
                
    except json.JSONDecodeError:
        print("Error: Third argument must be a valid JSON-formatted list.")
        return 84
    manager(games, current_directory)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("first")
    parser.add_argument("second")
    parser.add_argument("third")
    args = parser.parse_args()

    current_directory = os.path.dirname(os.path.abspath(sys.argv[0]))

    exit_code = main(sys.argv, current_directory)
    sys.exit(exit_code)