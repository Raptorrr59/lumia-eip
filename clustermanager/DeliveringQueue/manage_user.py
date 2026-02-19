import argparse
import sys
import subprocess
import json
import os

def manager(games, current_directory):
    user = str(args.second)
    userid = str(args.fourth)
    isTraining = args.fifth
    user_path = os.path.join(current_directory, user)

    if args.first == "new":
        print("New user")

        # Create user directory (if it doesn't exist)
        os.makedirs(user_path, exist_ok=True)

        for game in games:
            game_path = os.path.join(user_path, game)
            os.makedirs(game_path, exist_ok=True)
        
        file = os.path.join(user_path, game, userid)
        file = file + ".txt"
        
        with open(file, "w") as f:
            f.write(isTraining)

        # aipath = f"{current_directory}/{user}/{game}/{userid}_{game}.py" 
        destpath = f"{current_directory}/../AI-Vault/{user}/{game}/"
        # subprocess.run(["ls", current_directory], check=True)
        # subprocess.run(["cp", aipath, destpath], check=False)
        subprocess.run(["cp", file, destpath], check=False)

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
    current_directory = os.path.dirname(os.path.abspath(sys.argv[0]))
    copycat_dir = os.path.join(current_directory, "../AI-Vault/manage_user.py")

    parser = argparse.ArgumentParser()
    parser.add_argument("first")
    parser.add_argument("second")
    parser.add_argument("third")
    parser.add_argument("fourth")
    parser.add_argument("fifth")
    args = parser.parse_args()
    
    subprocess.run(["python3", copycat_dir, args.first, args.second, args.third])

    if ((args.fifth == '{False}') & (args.third == '["IMAGE"]')):
        subprocess.run(["sudo", "./DeliveringQueue/Game-Vault/init.sh"], check=True)

    exit_code = main(sys.argv, current_directory)

    sys.exit(exit_code)