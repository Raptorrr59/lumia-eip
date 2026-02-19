EN

# **📄ProfileModify**

# **React Component Documentation**

## **Description**

The ProfileModify component displays a modal window allowing the user to:

- View their profile information (username, email, geographical area).
- See their **LumiaCoins** balance (updated in real time).
- Subscribe or unsubscribe from the newsletter.
- Change their password by entering a new password and confirming it.

The component uses framer-motion for smooth open/close animations.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** |
| --- | --- | --- | --- |
| isOpen | boolean | Controls modal visibility (shown if true). | Yes |
| onClose | function | Function called to close the modal. | Yes |

---

## **Main Features**

- **User profile display**: username, avatar initial, email, geographic zone.
- **LumiaCoins balance**: real-time updates via storage event listener and periodic polling.
- **Newsletter management**: toggle button to subscribe/unsubscribe with PATCH /api/set-news-letter.
- **Password modification**: form with client-side validation (matching & min length), POST /api/update-password.
- **Dynamic error and success messages**.
- **Open/close animations** with framer-motion.
- **Internationalization** using TranslationsDictionary and current language from useLang.
- **Light/dark theme support** with Tailwind CSS.

---

## **Internal State (useState)**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| password | string | New password input by the user. |
| confirmPassword | string | Confirmation of the new password. |
| passwordError | string | Password-related error message. |
| successMessage | string | Message displayed on successful update. |
| lumiaCoins | string | LumiaCoins balance retrieved from localStorage. |
| newsletter | boolean | Newsletter subscription status. |
| isNewsletterLoading | boolean | Indicates if newsletter toggle request is in progress. |

---

## **Hooks & Effects**

- useEffect listens to the storage event to update LumiaCoins balance if changed in another tab.
- A 500ms interval also polls localStorage to update LumiaCoins if it differs.

---

## **Detailed Features**

### **Password Modification**

- Client-side validation before sending:
    - Password and confirmation must match.
    - Password must be at least 8 characters long.
- Sends POST request to /api/update-password with the new password.
- On success, shows success message, resets fields, closes modal after 1.5s, and redirects to homepage.
- On error, displays specific error message.

### **Newsletter Management**

- Toggle button that can be disabled while loading.
- Sends PATCH request to /api/set-news-letter with userId and new subscribed status.
- Updates local state and syncs with localStorage.
- Errors logged to console.

### **User Interface**

- Circular avatar showing the first letter of the username in uppercase.
- Displays fixed profile information (username, email).
- Secure and validated password input fields.
- Buttons and inputs styled for light and dark mode.
- Centered modal with semi-transparent backdrop.

---

## **Usage Example**

```
import React, { useState } from 'react';
import ProfileModify from './ProfileModify';

const App = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsProfileOpen(true)}>Modify Profile</button>
      <ProfileModify
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};
```

---

## **External Dependencies**

- **React** (useState, useEffect)
- **axios** for HTTP API calls
- **framer-motion** for modal animations
- **useLang** for language context
- **TranslationsDictionary** for multilingual texts
- **Tailwind CSS** for styling and theming

---

## **Suggestions & Possible Improvements**

- Add server-side validation and detailed error feedback.
- Add network error handling with user feedback.
- Store and retrieve newsletter subscription status as boolean rather than string.
- Optimize LumiaCoins updates using global context or websockets.
- Add visual loader on the password modification button while submitting.
- Allow editing other user info (email, username, geographic area).

---------------------------------------------

FR

# Documentation : `ProfileModify` React Component

## Description

Le composant `ProfileModify` affiche une fenêtre modale permettant à l’utilisateur de :

- Visualiser ses informations de profil (nom d’utilisateur, email, zone géographique).
- Voir son solde de **LumiaCoins** (avec mise à jour en temps réel).
- S’abonner ou se désabonner à la newsletter.
- Modifier son mot de passe en saisissant un nouveau mot de passe et sa confirmation.

Le composant utilise une animation d’apparition/disparition grâce à `framer-motion`.

---

## Propriétés (`props`)

| Nom | Type | Description | Obligatoire |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | Contrôle l’affichage de la modale (visible si `true`). | Oui |
| `onClose` | `function` | Fonction appelée pour fermer la modale. | Oui |

---

## Fonctionnalités principales

- **Affichage profil utilisateur** : nom, initiale en avatar, email, zone géographique.
- **Affichage LumiaCoins** : solde actualisé en temps réel via écoute d’événements `storage` et intervalle.
- **Gestion newsletter** : bouton toggle pour s’abonner/désabonner à la newsletter avec requête PATCH `/api/set-news-letter`.
- **Modification mot de passe** : formulaire avec validation locale (correspondance et longueur du mot de passe), requête POST `/api/update-password`.
- **Messages d’erreur et succès** affichés dynamiquement.
- **Animations d’ouverture/fermeture** avec `framer-motion`.
- **Internationalisation** via `TranslationsDictionary` et langue active `useLang`.
- **Thème clair/sombre** pris en charge avec Tailwind CSS.

---

## États internes (`useState`)

| État | Type | Description |
| --- | --- | --- |
| `password` | `string` | Nouveau mot de passe saisi par l’utilisateur. |
| `confirmPassword` | `string` | Confirmation du nouveau mot de passe. |
| `passwordError` | `string` | Message d’erreur lié au mot de passe. |
| `successMessage` | `string` | Message affiché lors d’une mise à jour réussie. |
| `lumiaCoins` | `string` | Solde LumiaCoins récupéré depuis `localStorage`. |
| `newsletter` | `boolean` | Statut d’abonnement à la newsletter. |
| `isNewsletterLoading` | `boolean` | Indique si la requête d’abonnement est en cours. |

---

## Hooks & Effets

- **`useEffect`** :
    - Écoute l’événement `storage` pour mettre à jour en temps réel le solde LumiaCoins si modifié dans un autre onglet.
    - Intervalle de 500ms pour vérifier également le solde dans `localStorage` et le mettre à jour si différent.

---

## Fonctionnalités détaillées

### Modification mot de passe

- Validation locale avant envoi :
    - Les deux mots de passe doivent correspondre.
    - Le mot de passe doit contenir au minimum 8 caractères.
- Envoi POST vers `/api/update-password` avec le nouveau mot de passe.
- En cas de succès, affiche un message, réinitialise les champs, ferme la modale après 1,5s et redirige vers la page d’accueil.
- En cas d’erreur, affiche un message d’erreur spécifique.

### Gestion newsletter

- Bouton toggle activable/désactivable selon état de chargement.
- Envoi PATCH vers `/api/set-news-letter` avec `userId` et nouveau statut `subscribed`.
- Met à jour l’état local `newsletter` et synchronise dans `localStorage`.
- Gestion des erreurs côté console.

### Interface utilisateur

- Affiche un avatar circulaire avec la première lettre du nom en majuscule.
- Affiche des sections avec informations fixes (nom, email) non modifiables.
- Champs de mot de passe sécurisés et validés.
- Boutons et champs adaptés au thème clair/sombre.
- Modale centrée avec fond semi-transparent.

---

## Exemple d’utilisation

```jsx
import React, { useState } from 'react';
import ProfileModify from './ProfileModify';

const App = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsProfileOpen(true)}>Modifier Profil</button>
      <ProfileModify
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

```

---

## Dépendances externes

- **React** (hooks `useState`, `useEffect`)
- **axios** pour appels API HTTP
- **framer-motion** pour animation modale
- **useLang** (contexte langue)
- **TranslationsDictionary** (dictionnaire textes multilingues)
- **Tailwind CSS** pour styles et thèmes

---

## Suggestions & améliorations possibles

- Ajouter validation côté serveur et retour d’erreurs détaillées.
- Ajouter gestion des erreurs réseau avec feedback utilisateur.
- Stocker et récupérer `newsletter` sous forme booléenne plutôt que chaîne (`"true"`/`"false"`).
- Optimiser la mise à jour des LumiaCoins via un contexte global ou websocket.
- Ajouter un loader visuel sur le bouton de modification de mot de passe pendant la requête.
- Permettre modification des autres informations utilisateur (email, nom, zone géographique).