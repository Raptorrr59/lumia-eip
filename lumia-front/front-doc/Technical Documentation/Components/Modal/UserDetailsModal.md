EN

# **UserDetailsModal**

# **React Component Documentation**

## **Description**

UserDetailsModal is a modal window that displays user details along with their comments related to various modules and courses. The component fetches comments from an API when the modal opens and displays a loader, error message, or the list of comments depending on the state.

---

## **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| isOpen | boolean | Controls the modal visibility (open or closed) |
| onClose | function | Callback function called to close the modal |
| user | object | User object containing info to display; must include at least: userName (string), email (string), emailVerified (bool) |

---

## **Internal State (useState)**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| userComments | array | List of comments fetched for the user |
| loading | boolean | Indicates if comments are currently loading |
| error | string/null | Error message to show if loading fails |

---

## **Effects (useEffect)**

- On modal open (isOpen === true) and if user.userName is defined, triggers a GET request to /api/user-comments with query parameter username.
- Adds an Authorization header with the token stored in localStorage under accessToken.
- On success, stores the comments into userComments state.
- On failure, sets an error message.

---

## **Behavior & UI**

- If modal is closed (isOpen === false), component returns null (renders nothing).
- Semi-transparent dark background overlay covering the entire screen.
- Appear/disappear animations via framer-motion (fade + slight zoom).
- Main layout divided into two sections:
    - **Profile Sidebar (1/3 width):**
        - Initial letter of username in a styled circle.
        - Full username and email.
        - Email verification status (Verified / Not verified).
    - **Main Content (2/3 width):**
        - Close button at top right.
        - Title: “User Comments”.
        - Displays:
            - “Loading…” message when fetching data.
            - Error message if request failed.
            - “No comments found” if comment list is empty.
            - Otherwise, lists comments showing:
                - Module & course related.
                - Comment content.
                - Score (with a star icon).
                - Creation date formatted locally.

---

## **Usage Example**

```
<UserDetailsModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  user={{ userName: "JohnDoe", email: "john@example.com", emailVerified: true }}
/>
```

---

## **Technical Notes & Possible Improvements**

- Each comment key uses comment.id.timestamp — verify this is unique, else use a more reliable unique ID.
- Access token management from localStorage could be externalized for improved security (e.g., via Auth context).
- Add more detailed error handling (refresh token, network errors).
- Implement pagination or lazy loading if comment list is large.
- Provide fallbacks if user or its properties are undefined.

--------------------------------------------------------

FR

# Documentation — Composant `UserDetailsModal`

## Description

`UserDetailsModal` est une fenêtre modale qui affiche les détails d’un utilisateur ainsi que ses commentaires liés à différents modules et cours. Le composant récupère les commentaires via une requête API quand la modale s’ouvre, et affiche un loader, un message d’erreur, ou la liste des commentaires selon l’état.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `isOpen` | boolean | Contrôle la visibilité de la modale (ouverte ou fermée) |
| `onClose` | function | Fonction callback appelée pour fermer la modale |
| `user` | object | Objet utilisateur contenant les informations à afficher, doit inclure au minimum : `userName` (string), `email` (string), `emailVerified` (bool) |

---

## États internes (`useState`)

| Nom | Type | Description |
| --- | --- | --- |
| `userComments` | array | Liste des commentaires récupérés pour l’utilisateur |
| `loading` | boolean | Indique si les commentaires sont en cours de chargement |
| `error` | string/null | Message d’erreur à afficher en cas de problème de chargement |

---

## Effets (`useEffect`)

- Sur ouverture de la modale (`isOpen === true`) et si `user.userName` est défini, déclenche une requête GET à l’API `/api/user-comments` avec le paramètre `username`.
- Ajoute un header `Authorization` avec le token stocké dans `localStorage` sous la clé `accessToken`.
- En cas de succès, stocke les commentaires dans l’état `userComments`.
- En cas d’erreur, affiche un message d’erreur.

---

## Comportement & UI

- Si la modale n’est pas ouverte (`isOpen === false`), le composant ne rend rien (`return null`).
- Fond sombre semi-transparent qui couvre tout l’écran.
- Animation d’apparition/disparition avec `framer-motion` (fade + zoom léger).
- Structure principale divisée en deux parties :
    - **Sidebar Profil (1/3 largeur)** :
        - Initiale du nom d’utilisateur dans un cercle stylisé.
        - Nom complet, email.
        - Statut de vérification de l’email (Vérifié / Non vérifié).
    - **Contenu principal (2/3 largeur)** :
        - Bouton de fermeture en haut à droite.
        - Titre "Commentaires de l'utilisateur".
        - Affiche :
            - Un message "Chargement..." si la récupération est en cours.
            - Un message d’erreur si la requête a échoué.
            - Un message "Aucun commentaire trouvé" si la liste est vide.
            - Sinon, liste des commentaires avec détails :
                - Module & cours concernés.
                - Contenu du commentaire.
                - Score (avec une étoile).
                - Date de création formatée localement.

---

## Exemple d’utilisation

```jsx
<UserDetailsModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  user={{ userName: "JohnDoe", email: "john@example.com", emailVerified: true }}
/>

```

---

## Points techniques / Améliorations possibles

- La clé de chaque commentaire est `comment.id.timestamp`, vérifier que cet identifiant est unique. Sinon, utiliser un autre identifiant unique.
- La gestion du token d’accès dans `localStorage` pourrait être externalisée pour plus de sécurité (ex : via contexte Auth).
- Ajouter gestion d’erreur plus détaillée (ex : refresh token, erreurs réseau).
- Ajouter pagination ou chargement progressif si trop de commentaires.
- Ajouter un fallback si `user` ou ses propriétés sont indéfinies.