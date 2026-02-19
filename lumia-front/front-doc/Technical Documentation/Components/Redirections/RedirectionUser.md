EN

# **RedirectionUser**

# **React Component Documentation**

## **Description**

RedirectionUser is a React component that displays a user preview as a clickable card.

- Shows the initial of the username, the username (pseudo), email, and email verification status.
- On click, opens a modal (UserDetailsModal) displaying detailed user information.

---

## **Props**

| **Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| user | object | Yes | User object containing user info |

### **Structure of the**

### **user**

### **object**

| **Property** | **Type** | **Description** |
| --- | --- | --- |
| id | string or number | Unique user identifier |
| userName | string | Username / pseudonym |
| email | string | Email address |
| emailVerified | boolean | Email verification status |

---

## **Features**

- **User card display:**
    
    Displays a card showing:
    
    - A colored badge containing the uppercase first letter of the username.
    - The username in a violet-blue color.
    - The email in gray.
    - A badge indicating whether the email is verified or not, with different colors.
- **Detailed modal:**
    
    Clicking the card opens the UserDetailsModal, which shows more detailed user information.
    
- **Styles and interactions:**
    - The card has a purple border (#5328EA) and a subtle shadow on hover.
    - Cursor changes to pointer to indicate interactivity.
    - Smooth shadow transition on hover.

---

## **Usage example**

```
const user = {
  id: 1,
  userName: 'JeanDupont',
  email: 'jean.dupont@example.com',
  emailVerified: true,
};

<RedirectionUser user={user} />
```

---

## **External dependencies**

- UserDetailsModal: modal component showing full user details (should be imported and defined elsewhere in the app).
- React (Hooks: useState).

----------------------------------

FR

# Documentation — Composant `RedirectionUser`

## Description

`RedirectionUser` est un composant React qui affiche un aperçu d’un utilisateur sous forme de carte cliquable.

- Affiche l’initiale du nom d’utilisateur, le pseudo, l’email et l’état de vérification de l’email.
- Au clic, ouvre une modale (`UserDetailsModal`) affichant les détails complets de l’utilisateur.

---

## Props

| Nom | Type | Obligatoire | Description |
| --- | --- | --- | --- |
| `user` | objet | Oui | Objet utilisateur contenant ses informations |

### Structure de l’objet `user`

| Propriété | Type | Description |
| --- | --- | --- |
| `id` | string | number | Identifiant unique de l’utilisateur |
| `userName` | string | Nom / pseudo de l’utilisateur |
| `email` | string | Adresse email |
| `emailVerified` | bool | Statut de vérification de l’email |

---

## Fonctionnalités

- **Affichage de la carte utilisateur :**
    
    Affiche une carte avec :
    
    - Une pastille colorée contenant la première lettre du nom d’utilisateur en majuscule.
    - Le pseudo en bleu violet.
    - L’email en gris.
    - Un badge indiquant si l’email est vérifié ou non avec une couleur différente.
- **Modale détaillée :**
    
    En cliquant sur la carte, la modale `UserDetailsModal` s’ouvre, permettant d’afficher plus d’informations sur l’utilisateur.
    
- **Styles et interactions :**
    - La carte a une bordure violette (#5328EA) et un léger effet d’ombre au survol.
    - Curseur pointer pour indiquer l’interactivité.
    - Transition d’ombre fluide lors du survol.

---

## Exemple d’utilisation

```jsx
const user = {
  id: 1,
  userName: 'JeanDupont',
  email: 'jean.dupont@example.com',
  emailVerified: true,
};

<RedirectionUser user={user} />

```

---

## Dépendances externes

- `UserDetailsModal` : composant modal affichant les détails complets de l’utilisateur (doit être importé et défini ailleurs dans l’application).
- `React` (Hooks : `useState`).