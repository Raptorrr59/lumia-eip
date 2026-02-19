EN

# **📄ForgotPasswordModal**

# **Component Documentation**

## **Description**

ForgotPasswordModal is a React modal window that allows users to enter their email address to receive a link or instructions to reset their password.

---

## **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| onClose | function | Function called to close the modal. |
| onBackToLogin | function | Function called when clicking “Back to Login”. |

---

## **Main Features**

- Displays an input field for the user’s email address.
- Submit button to validate the password reset request.
- “Back to Login” button to return to the login screen.
- Semi-transparent background with a blur effect behind the modal.
- Supports light and dark themes using TailwindCSS and dark: classes.
- Uses dynamic translations through TranslationsDictionary and the useLang hook.
- Shows a custom LumiaIcon at the top of the modal.
- Allows closing the modal by clicking outside it on the semi-transparent background.

---

## **Usage**

```
<ForgotPasswordModal
  onClose={() => setShowForgotPasswordModal(false)}
  onBackToLogin={() => setShowLoginModal(true)}
/>
```

---

## **Important Notes**

- The form does not yet handle the actual submission (no backend/API integration for sending the reset email).
- The email input lacks built-in validation (this can be improved).
- The email placeholder is currently static (“Enter your email”) and should be internationalized if needed.
- For better accessibility, adding user feedback for errors or success would be beneficial.
- Styling relies on TailwindCSS with dark mode support.

--------------------------------

FR

# Documentation du composant `ForgotPasswordModal`

## Description

`ForgotPasswordModal` est une fenêtre modale React qui permet à un utilisateur de saisir son adresse e-mail afin de recevoir un lien ou une instruction pour réinitialiser son mot de passe.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `onClose` | `func` | Fonction appelée pour fermer la modale. |
| `onBackToLogin` | `func` | Fonction appelée lors du clic sur "Retour à la connexion". |

---

## Fonctionnalités principales

- Affiche un champ email pour que l'utilisateur saisisse son adresse.
- Bouton d'envoi pour valider la demande de réinitialisation.
- Bouton "Retour à la connexion" pour revenir à l'écran de connexion.
- Fond semi-transparent avec effet de flou.
- Gestion des thèmes clair/sombre (via classes Tailwind et `dark:`).
- Utilisation des traductions dynamiques via `TranslationsDictionary` et hook `useLang`.
- Icône personnalisée `LumiaIcon` en haut de la modale.
- Fermeture de la modale en cliquant sur le fond semi-transparent.

---

## Usage

```jsx
<ForgotPasswordModal
  onClose={() => setShowForgotPasswordModal(false)}
  onBackToLogin={() => setShowLoginModal(true)}
/>

```

---

## À noter

- Le formulaire actuel ne gère pas l’envoi réel (pas de `onSubmit` géré). Il faudra ajouter la gestion côté backend / API pour envoyer l’email de réinitialisation.
- L’input email n’a pas de validation intégrée (peut être améliorée).
- Le placeholder de l’email est statique ("Enter your email") : à internationaliser si besoin.
- Pour plus d’accessibilité, il serait intéressant d’associer l’état des erreurs et retours à l’utilisateur.
- Les styles utilisent TailwindCSS avec gestion du mode sombre.