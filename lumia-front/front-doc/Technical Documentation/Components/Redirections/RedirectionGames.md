EN

# **RedirectionGame**

# **React Component Documentation**

## **Description**

RedirectionGame is a React component that displays an interactive card representing a game.

- Shows an image, the game’s name, its type, and the associated language.
- If the game is locked, displays an overlay with a lock icon and disables navigation.
- On click (if not locked), navigates to the game page passing its data via navigation state.

---

## **Props**

| **Name** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| name | string | Yes | — | Game name / title |
| type | string | Yes | — | Game type or category (e.g., “Puzzle”, “Strategy”) |
| language | string | Yes | — | Main language of the game (e.g., “FR”, “EN”) |
| image | string | Yes | — | URL of the game’s representative image |
| locked | boolean | Yes | — | Indicates if the game is locked (blocks navigation if true) |
| id | string or number | Yes | — | Unique game identifier used for navigation |
| tuto | any | No | — | Optional additional data (e.g., tutorial) |

---

## **Features**

- **Conditional navigation:**
    
    Clicking the card navigates to /game/{id} with the game props passed in the navigation state, only if the game is not locked.
    
- **Locked overlay:**
    
    If locked is true, a semi-transparent overlay with a lock icon (LockIcon) is shown, and navigation is disabled.
    
- **Appearance:**
    - Card background adapts to light/dark mode.
    - Hover shadow and smooth shadow transition if not locked.
    - Displays the game name in bold, and type plus language as colored badges.
- **Event handling:**
    
    Click events are stopped from propagating to avoid conflicts.
    

---

## **Usage example**

```
<RedirectionGame
  id="42"
  name="Puzzle Master"
  type="Puzzle"
  language="FR"
  image="https://example.com/puzzle-master.jpg"
  locked={false}
  tuto={{ steps: [...] }}
/>
```

---

## **External dependencies**

- react-router-dom for navigation (useNavigate)
- lucide-react for the lock icon (LockIcon)

-----------------------------------------

FR

# Documentation — Composant `RedirectionGame`

## Description

`RedirectionGame` est un composant React affichant une carte interactive représentant un jeu.

- Affiche une image, le nom du jeu, son type, et la langue associée.
- Si le jeu est verrouillé, affiche un overlay avec une icône cadenas et bloque la navigation.
- Lors d’un clic (si non verrouillé), navigue vers la page du jeu en transmettant ses données via l’état de navigation.

---

## Props

| Nom | Type | Obligatoire | Valeur par défaut | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | Oui | - | Nom / titre du jeu. |
| `type` | `string` | Oui | - | Type ou catégorie du jeu (ex : "Puzzle", "Stratégie"). |
| `language` | `string` | Oui | - | Langue principale du jeu (ex : "FR", "EN"). |
| `image` | `string` | Oui | - | URL de l’image représentative du jeu. |
| `locked` | `bool` | Oui | - | Indique si le jeu est verrouillé (bloque la navigation si vrai). |
| `id` | `string` | `number` | Oui | - | Identifiant unique du jeu, utilisé pour la navigation. |
| `tuto` | `any` | Non | - | Données supplémentaires optionnelles (ex : tutoriel). |

---

## Fonctionnalités

- **Navigation conditionnelle :**
    
    En cliquant sur la carte, si le jeu n’est pas verrouillé, redirige vers la page `/game/{id}` en passant un objet état contenant toutes les props du jeu.
    
- **Overlay verrouillé :**
    
    Si `locked` est vrai, un overlay semi-transparent avec une icône cadenas (`LockIcon`) est affiché, et la navigation est désactivée.
    
- **Apparence :**
    - Carte avec fond clair/sombre selon le thème (support dark mode).
    - Effet d’ombre et transition d’ombre au survol si non verrouillé.
    - Affiche le nom en gras, le type et la langue du jeu sous forme d’un badge coloré.
- **Gestion de l’événement :**
    
    L’événement click est stoppé pour éviter toute propagation conflictuelle.
    

---

## Exemple d’utilisation

```jsx
<RedirectionGame
  id="42"
  name="Puzzle Master"
  type="Puzzle"
  language="FR"
  image="https://exemple.com/puzzle-master.jpg"
  locked={false}
  tuto={{ steps: [...] }}
/>

```

---

## Dépendances externes

- `react-router-dom` pour la navigation (`useNavigate`).
- `lucide-react` pour l’icône cadenas (`LockIcon`).