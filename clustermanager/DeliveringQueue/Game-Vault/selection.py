import random
import os
import shutil

selectedpetarray = []

def chosepet(petselection):
    while True:
        selectedpet = random.randint(0, 499) #12499 avant
        is_taken = any(p[0] == petselection and p[1] == selectedpet for p in selectedpetarray)
        if not is_taken:
            selectedpetarray.append([petselection, selectedpet])
            break

def run_selection():
    for _ in range(21):
        petselection = random.randint(0, 1)
        chosepet(petselection)
        print("Debug:", petselection)
    
    print(selectedpetarray)
    print("finish to select the game")

    os.makedirs("gameselect", exist_ok=True)
    os.makedirs("gameselect/cats", exist_ok=True)
    os.makedirs("gameselect/dogs", exist_ok=True)

    for pet in selectedpetarray:
        pet_type = "cats" if pet[0] == 0 else "dogs"
        src = f"dataset-imagerecognition/{pet_type}/{pet[1]}.jpg"
        dst = f"gameselect/{pet_type}/{pet[1]}.jpg"
        if os.path.exists(src):
            shutil.copy(src, dst)

if __name__ == "__main__":
    run_selection()
