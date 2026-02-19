EN

# **📄GameEnum Documentation**

## **🔍 Description**

GameEnum is an exported object serving as an enumeration to reference different game types by their numeric ID.

---

## **🧱 Structure**

GameEnum is an object where each key is a number (0, 1, 2) representing a game, and the value is an object containing information about that game.

```
export const GameEnum = {
  0: { name: "snake" },
  1: { name: "connect4" },
  2: { name: "image" },
};
```

---

## **🔧 Usage**

- Allows accessing game types by their numeric ID.
- Example to get the name of a game:

```
console.log(GameEnum[0].name); // "snake"
console.log(GameEnum[1].name); // "connect4"
```

---

## **🎮 Referenced Games**

| **ID** | **Name** |
| --- | --- |
| 0 | snake |
| 1 | connect4 |
| 2 | image |

-----------------------------------------------------------

FR

# Documentation de `GameEnum`

## Description

`GameEnum` est un objet exporté qui sert d'énumération pour référencer différents types de jeux par leur identifiant numérique.

---

## Structure

`GameEnum` est un objet dont chaque clé est un nombre (`0`, `1`, `2`) correspondant à un jeu, avec comme valeur un objet contenant les informations du jeu.

```
export const GameEnum = {
  0: { name: "snake" },
  1: { name: "connect4" },
  2: { name: "image" },
};

```

---

## Usage

- Permet d’accéder aux types de jeux par leur identifiant numérique.
- Exemple pour récupérer le nom d’un jeu :

```
console.log(GameEnum[0].name); // "snake"
console.log(GameEnum[1].name); // "connect4"

```

---

## Jeux référencés

| ID | Nom |
| --- | --- |
| 0 | snake |
| 1 | connect4 |
| 2 | image |