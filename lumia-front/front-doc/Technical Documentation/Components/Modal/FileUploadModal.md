EN

# **📄FileUploadModal Component**

## **🔍 Description**

FileUploadModal is a React component that displays a modal window allowing a logged-in and verified user to upload a file for a specific game. The modal supports drag & drop, classic file selection, displays the selected file name, and provides visual feedback during the upload.

---

## **📥 Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| onClose | function | Function called to close the modal. |
| game | object | Game object with at least an id property used to identify the game type. |

---

## **🎯 Key Features**

- Supports **drag & drop** to select a file.
- Supports classic file selection via an <input type="file">.
- Displays the selected file name with a visual indicator (icon and color).
- Prevents page scrolling in the background while the modal is open.
- Simple validation: upload is disabled without a selected file.
- Uploads the file along with file, game (game name derived from GameEnum), and isTraining=false via POST to /api/upload.
- Shows an animated loader during the upload process.
- Handles upload errors with alert messages.
- Checks that the user is logged in (localStorage.id) and email verified (localStorage.emailVerified) before allowing upload.
- Uses translations for messages and labels via TranslationsDictionary and useLang.
- Closes the modal when clicking outside or on the “X” button.

---

## **🔁 Usage**

```
<FileUploadModal
  onClose={() => setShowModal(false)}
  game={{ id: 1 }}  // Should correspond to keys of GameEnum (e.g., 0, 1, 2)
/>
```

---

## **🛠 Dependencies**

- axios for HTTP POST upload.
- framer-motion for modal animations.
- TranslationsDictionary + useLang for dynamic translations.
- GameEnum to map game ID to game name used in upload request.

---

## **⚙️ Technical Notes**

- The submit button is disabled if no file is selected or if upload is in progress.
- Authentication token is retrieved from localStorage.getItem("accessToken").
- The user’s “lumiaCoin” balance is decremented by 5 units on each successful upload (stored in localStorage).
- Uses dragOver, dragLeave, and drop events to manage drag & drop visual state.
- Styles adapt to dark mode using Tailwind CSS dark: classes.
- Modal max height is limited with internal scrolling if content overflows.

--------------------------------------------

FR

# Documentation du composant `FileUploadModal`

## Description

`FileUploadModal` est un composant React affichant une fenêtre modale permettant à un utilisateur connecté et vérifié de télécharger un fichier pour un jeu spécifique. La modale supporte le drag & drop, la sélection de fichier classique, l’affichage du nom du fichier sélectionné, et un retour visuel lors de l’upload.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `onClose` | `func` | Fonction appelée pour fermer la modale. |
| `game` | `object` | Objet jeu avec au minimum la propriété `id` utilisée pour le type de jeu. |

---

## Fonctionnalités principales

- **Gestion du drag & drop** pour sélectionner un fichier.
- **Sélection classique** via input type `file`.
- Affiche le nom du fichier sélectionné et un indicateur visuel (icône et couleur).
- Empêche le scroll de la page en arrière-plan tant que la modale est ouverte.
- Validation simple : impossible d’envoyer sans fichier.
- Envoi du fichier avec les données `file`, `game` (nom du jeu d’après `GameEnum`), et `isTraining=false` via POST `/api/upload`.
- Affichage d’un loader animé pendant l’upload.
- Gestion des erreurs d’upload avec alertes.
- Vérification que l’utilisateur est connecté (`localStorage.id`) et email vérifié (`localStorage.emailVerified`) avant d’autoriser l’upload.
- Messages et labels traduits selon la langue via `TranslationsDictionary` et `useLang`.
- Fermeture de la modale en cliquant sur l’arrière-plan ou le bouton "X".

---

## Usage

```jsx
<FileUploadModal
  onClose={() => setShowModal(false)}
  game={{ id: 1 }}  // Doit correspondre aux clés de GameEnum (ex: 0, 1, 2)
/>

```

---

## Dépendances

- `axios` : pour l’envoi HTTP POST.
- `framer-motion` : pour les animations de la modale.
- `TranslationsDictionary` + `useLang` : gestion des traductions dynamiques.
- `GameEnum` : mapping id → nom du jeu utilisé dans la requête d’upload.

---

## Notes techniques

- Le bouton de soumission est désactivé si aucun fichier n’est sélectionné ou si l’upload est en cours.
- Le token d’authentification est récupéré via `localStorage.getItem("accessToken")`.
- Le solde "lumiaCoin" est décrémenté de 5 unités à chaque upload réussi (stocké en localStorage).
- Les événements `dragOver`, `dragLeave`, et `drop` sont utilisés pour gérer l’état visuel du drag & drop.
- Les styles s’adaptent au mode sombre (`dark:` classes Tailwind).
- La taille max de la modale est limitée en hauteur avec scroll interne si nécessaire.