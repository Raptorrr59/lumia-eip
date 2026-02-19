EN

# **ReviewsCommunity**

# **Documentation — Component**

## **Description**

ReviewsCommunity is a React component that displays the community reviews section for a given module and course.

It allows logged-in users to view reviews, reply to comments, delete reviews (if admin), and open a modal to submit a new review.

The component manages fetching reviews via an API, hierarchical display of comments and replies, as well as handling loading and error states.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| moduleId | string | ID of the module for which reviews are displayed | Yes | "123" |
| courseId | string | ID of the course for which reviews are displayed | Yes | "456" |

---

## **Features**

- **Fetching reviews:**
    
    Loads reviews and their replies related to the module and course via authenticated GET request to /api/comments.
    
- **Displaying reviews:**
    
    Shows main reviews and nested replies with indentation.
    
- **Loading and error handling:**
    
    Displays loading indicator and error message if fetch fails.
    
- **Replying to reviews:**
    
    Allows users (especially admins) to reply to a review via a textarea and POST to /api/comments/{commentId}/reply.
    
- **Deleting reviews or replies:**
    
    Admins can delete reviews or replies via DELETE requests.
    
- **Adding new reviews:**
    
    Button to open a modal (ReviewModal) to create a new review.
    
- **Permissions management:**
    
    Shows delete/reply controls only if the logged-in user is an admin.
    
- **Multilingual support:**
    
    Uses a translations dictionary to display texts according to the selected language.
    

---

## **Detailed Behavior**

- Checks if user is logged in by verifying presence of accessToken in local storage.
- If not logged in, shows a message inviting to log in to see reviews.
- On fetching reviews, sorts comments into main reviews and replies, associating them properly.
- Each review displays:
    - User name (or “Anonymous”) with a colored initial badge.
    - Star rating (for main reviews).
    - Review content.
    - Delete (✕) and Reply buttons (if admin).
- When replying, a textarea appears with Cancel and Submit buttons.
- Replies are rendered with indentation and distinct styles.
- “Leave Rating” button opens ReviewModal (visible only if logged in).
- Locally updates reviews list after adding replies or new reviews.

---

## **Internal State Management**

- isReviewOpen (boolean): controls opening of the add-review modal.
- reviews (array): list of main reviews each including their replies.
- loading (boolean): indicates reviews are loading.
- error (string|null): error message if fetching fails.
- replyingTo (number|null): ID of the comment currently being replied to.
- replyContent (string): content being typed in the reply textarea.

---

## **Usage Example**

```
<ReviewsCommunity moduleId="123" courseId="456" />
```

---

## **Dependencies**

- React (hooks: useState, useEffect)
- axios (for HTTP requests)
- useLang (custom hook for current language)
- TranslationsDictionary (object containing translations)
- Child component ReviewModal (modal for adding a review)

---

## **Notes**

- The component expects the API to return a list of comments with fields like:
    - id, userName, content, score, parentCommentId, isAdminResponse, etc.
- User roles are read from localStorage to display admin controls.
- Dates are not shown by default but can be added if supported by the backend.

-------------------------------------

FR

# Documentation — Composant `ReviewsCommunity`

## Description

`ReviewsCommunity` est un composant React qui affiche la section des avis communautaires pour un module et un cours donnés.

Il permet aux utilisateurs connectés de consulter les avis, répondre aux commentaires, supprimer des avis (si admin), et d’ouvrir un modal pour laisser un nouvel avis.

Le composant gère la récupération des avis via une API, l’affichage hiérarchique des commentaires et réponses, et la gestion des erreurs et du chargement.

---

## Props

| Nom | Type | Description | Obligatoire | Exemple |
| --- | --- | --- | --- | --- |
| `moduleId` | `string` | Identifiant du module dont on veut afficher les avis | Oui | `"123"` |
| `courseId` | `string` | Identifiant du cours dont on veut afficher les avis | Oui | `"456"` |

---

## Fonctionnalités

- **Récupération des avis :**
    
    Charge les avis et leurs réponses liés au module et au cours via une requête GET à `/api/comments` avec authentification.
    
- **Affichage des avis :**
    
    Affiche les avis principaux et leurs réponses en indentation.
    
- **Gestion du chargement et des erreurs :**
    
    Indique l’état de chargement, affiche un message d’erreur en cas de problème.
    
- **Réponses aux avis :**
    
    Permet à un utilisateur (notamment un admin) de répondre à un avis via une zone de texte, envoi la réponse via POST à `/api/comments/{commentId}/reply`.
    
- **Suppression d’un avis ou réponse :**
    
    Permet aux admins de supprimer un avis ou une réponse via une requête DELETE.
    
- **Ajout d’un nouvel avis :**
    
    Bouton pour ouvrir un modal (`ReviewModal`) permettant de créer un nouvel avis.
    
- **Gestion des permissions :**
    
    Affiche des contrôles spécifiques (suppression, réponse) uniquement si l’utilisateur connecté est un admin.
    
- **Support multilingue :**
    
    Utilise un dictionnaire de traductions pour afficher les textes selon la langue sélectionnée.
    

---

## Comportement détaillé

- Le composant vérifie si l’utilisateur est connecté en regardant si un `accessToken` est stocké localement.
- Si l’utilisateur n’est pas connecté, il affiche un message invitant à se connecter pour voir les avis.
- Lors de la récupération des avis, il trie les commentaires en principaux et réponses, et les associe correctement.
- Chaque avis affiche :
    - Le nom de l’utilisateur (ou "Anonymous") avec une initiale dans un cercle coloré.
    - Les étoiles (score) pour les avis principaux.
    - Le contenu de l’avis.
    - Boutons de suppression (✕) et réponse (si admin).
- Lorsqu’un utilisateur commence une réponse, un textarea apparaît avec boutons pour annuler ou envoyer la réponse.
- Les réponses sont rendues avec indentation et styles légèrement différents.
- Le bouton "Leave Rating" ouvre le modal `ReviewModal` (visible seulement si connecté).
- Gère la mise à jour locale des avis après l’ajout d’une réponse ou d’un nouvel avis.

---

## Structure et gestion des états internes

- `isReviewOpen` (`boolean`) : pour contrôler l’ouverture du modal d’ajout d’avis.
- `reviews` (`array`) : liste des avis principaux avec leurs réponses.
- `loading` (`boolean`) : indique que les avis sont en cours de chargement.
- `error` (`string|null`) : message d’erreur à afficher si la récupération échoue.
- `replyingTo` (`number|null`) : identifiant du commentaire auquel on répond actuellement.
- `replyContent` (`string`) : contenu en cours d’écriture dans la zone de réponse.

---

## Exemple d’utilisation

```jsx
<ReviewsCommunity moduleId="123" courseId="456" />

```

---

## Dépendances

- React (hooks : `useState`, `useEffect`)
- axios (pour les requêtes HTTP)
- `useLang` (custom hook pour la langue courante)
- `TranslationsDictionary` (objet des traductions)
- Composant enfant `ReviewModal` (modal pour ajouter un avis)

---

## Notes

- Ce composant attend que l’API renvoie un tableau de commentaires avec champs :
    - `id`, `userName`, `content`, `score`, `parentCommentId`, `isAdminResponse`, etc.
- Les rôles d’utilisateur sont lus depuis `localStorage` pour afficher les options admin.
- Les dates ne sont pas affichées ici mais peuvent être ajoutées selon le backend.