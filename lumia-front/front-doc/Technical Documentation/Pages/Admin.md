EN

# **Admin Page Documentation**

## **Description**

The **Admin** page provides a complete administration interface that allows:

- Loading and displaying the list of users.
- Dynamically searching for a user by username.
- Opening a modal to compose and send a newsletter to all users.

---

## **Main Features**

### **Loading Users**

- On page load, an API request is sent to /api/allUsers with authentication via token to retrieve all users.
- The user list is stored locally for display and filtering.

### **Dynamic Search**

- The page provides a search field to filter users based on their username (userName), updating live with each keystroke.

### **Sending a Newsletter**

- The page includes a button that opens a modal with a form.
- The admin can enter the subject and content of the newsletter.
- Sending is done via a POST request to /api/send-news-letter with the subject and content.
- The page displays status messages to inform the admin of success or failure during the process.

---

## **Internal State (useState)**

| **State Name** | **Type** | **Purpose** |
| --- | --- | --- |
| searchTerm | string | Value of the user search input field. |
| users | array | Complete list of retrieved users. |
| filteredUsers | array | List of users currently displayed, filtered by search input. |
| isNewsletterModalOpen | boolean | Controls the visibility of the newsletter modal. |
| newsletterSubject | string | Subject of the newsletter to send. |
| newsletterContent | string | Content of the newsletter to send. |
| newsletterStatus | string | Status message to display success, error, or progress. |

---

## **Child Components Used**

- **SearchBar**
    
    Custom search input field for typing text to filter the user list.
    
- **RedirectionUser**
    
    Component that displays an individual user in the list with an action (e.g., redirect to profile management).
    

---

## **Data Flow**

1. The page loads all users on mount.
2. The admin uses the search bar to locally filter the user list.
3. The admin can open the newsletter modal, fill in the form, and send the newsletter.
4. On success, the modal automatically closes after 2 seconds. On failure, an error message is displayed.

---

## **Security**

- All API requests include an authentication token retrieved from localStorage (accessToken key).
- API calls are protected on the backend to prevent unauthorized access.

---

## **Styling**

- Uses Tailwind CSS with dark mode support (dark:).
- Modal uses a semi-transparent, blurred overlay.
- Buttons include hover and disabled states for better UX.

----------------------------------------

FR

# Documentation de la page **Admin**

## Description

La page **Admin** offre une interface d'administration complète permettant de :

- Charger et afficher la liste des utilisateurs.
- Rechercher dynamiquement un utilisateur par pseudo.
- Ouvrir une modal pour composer et envoyer une newsletter à tous les utilisateurs.

---

## Fonctionnalités principales

### Chargement des utilisateurs

- Lors du chargement de la page, une requête API est effectuée vers `/api/allUsers` avec authentification via token pour récupérer tous les utilisateurs.
- Les utilisateurs sont stockés en local pour affichage et filtrage.

### Recherche dynamique

- La page propose un champ de recherche pour filtrer les utilisateurs en fonction du pseudo (`userName`), mise à jour à chaque frappe.

### Envoi de newsletter

- La page propose un bouton ouvrant une modal avec un formulaire.
- L’administrateur peut saisir le sujet et le contenu de la newsletter.
- L’envoi est effectué par requête POST vers `/api/send-news-letter` avec le sujet et contenu.
- La page affiche des messages d’état pour informer l’administrateur du succès ou d’une erreur lors de l’envoi.

---

## États internes (useState)

| État | Type | Usage |
| --- | --- | --- |
| `searchTerm` | string | Valeur du champ de recherche utilisateur. |
| `users` | array | Liste complète des utilisateurs récupérés. |
| `filteredUsers` | array | Liste des utilisateurs affichés, filtrés par la recherche. |
| `isNewsletterModalOpen` | boolean | Contrôle l’affichage de la modal d’envoi de newsletter. |
| `newsletterSubject` | string | Sujet de la newsletter à envoyer. |
| `newsletterContent` | string | Contenu de la newsletter à envoyer. |
| `newsletterStatus` | string | Message de statut pour afficher succès, erreur ou progression. |

---

## Composants enfants utilisés

- **SearchBar**
    
    Champ de recherche personnalisé permettant d’entrer un texte pour filtrer la liste des utilisateurs.
    
- **RedirectionUser**
    
    Composant affichant un utilisateur dans la liste avec une action (ex: redirection vers gestion du profil).
    

---

## Flux de données

1. La page charge tous les utilisateurs à l’ouverture.
2. L’utilisateur admin utilise le champ de recherche pour filtrer la liste localement.
3. L’utilisateur admin peut ouvrir la modal newsletter, saisir les infos, puis envoyer la newsletter.
4. En cas de succès, la modal se ferme automatiquement après 2 secondes. En cas d’erreur, un message s’affiche.

---

## Sécurité

- Toutes les requêtes API passent un token d’authentification récupéré dans `localStorage` (clé `accessToken`).
- Les appels API sont protégés côté backend pour éviter un accès non autorisé.

---

## Styling

- Tailwind CSS avec gestion du mode sombre (`dark:`).
- Utilisation d’un overlay semi-transparent et flou pour la modal.
- Boutons avec états hover et disabled.