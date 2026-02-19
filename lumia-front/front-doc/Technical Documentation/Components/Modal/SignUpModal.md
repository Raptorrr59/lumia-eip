EN

# **SignUpModal**

# **React Component Documentation**

## **Description**

The **SignUpModal** component is a modal window allowing users to register on the platform. It manages account creation through a form that includes username, email, password, acceptance of terms of service, and an optional newsletter subscription. The component also displays success or error messages and offers a (non-functional) Google signup button.

---

## **Imports**

- React & useState for local state management.
- Custom icons (GoogleIcon, LumiaIcon).
- Check icon from the lucide-react library for checkboxes.
- axios for HTTP requests.
- useLang hook to handle selected language (i18n).
- TranslationsDictionary for fetching translated strings based on language.

---

## **Props**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| onClose | function | Function called to close the modal (on outside click). |
| onLoginClick | function | Function called when user clicks “Login” (to open login modal). |

---

## **Local State (useState)**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| email | string | User’s entered email |
| password | string | Entered password |
| userName | string | Entered username |
| error | string/null | Error message to display |
| success | string/null | Success message to display |
| isLoading | boolean | Indicates if a request is in progress (shows loader, disables form) |
| acceptTerms | boolean | Whether the user accepts terms (required checkbox) |
| acceptNewsletter | boolean | Whether the user opts into the newsletter (optional checkbox) |

---

## **Main Features**

### **Form Submission (handleSubmit)**

- Prevents default form submit behavior.
- Activates loader (isLoading).
- Sends a POST request to /api/newUser with data: email, password, userName, and subscribed (newsletter).
- On success:
    - Displays success message.
    - Stores newsletter preference in localStorage.
    - Clears error messages.
- On error:
    - If status 409, shows specific message (account already exists).
    - Otherwise, shows a generic error message.
- Deactivates loader after request completes.

### **User Interface**

- Dark overlay behind modal that closes modal on click.
- Displays LumiaIcon logo and a title with language-based translation.
- Google signup button (non-functional placeholder).
- Divider with text “or” between Google button and form.
- Form fields: Username, Email, Password.
- Required checkbox to accept terms of service (with links to /terms and /privacy).
- Optional checkbox to subscribe to newsletter.
- Shows error or success messages below the form.
- Submit button disabled until terms are accepted and not loading.
- Spinner shown during form submission.

---

## **Translations**

All displayed text strings use the TranslationsDictionary based on the current language selected via the useLang() hook.

---

## **Usage Example**

```
<SignUpModal
  onClose={() => setShowSignUp(false)}
  onLoginClick={() => {
    setShowSignUp(false);
    setShowLogin(true);
  }}
/>
```

---

## **Technical Notes**

- The input type for username is text (correct if the current code uses userName).
- Google button needs further implementation for actual OAuth.
- Styles are handled via Tailwind CSS.
- The isLoading state disables user interaction to prevent duplicate submissions.

-----------------------------------------------------

FR

# Documentation — Composant `SignUpModal`

## Description

Le composant **SignUpModal** est une fenêtre modale qui permet à un utilisateur de s'inscrire sur la plateforme. Il gère la création du compte via un formulaire comprenant un nom d’utilisateur, une adresse email, un mot de passe, ainsi que l’acceptation des conditions d’utilisation et une option pour s’abonner à une newsletter. Le composant affiche également des messages de succès ou d’erreur, et propose un bouton pour s’inscrire avec Google (non fonctionnel ici).

---

## Importations

- React & `useState` pour la gestion des états locaux.
- Icônes personnalisées (`GoogleIcon`, `LumiaIcon`).
- Icône `Check` provenant de la librairie `lucide-react` pour les cases à cocher.
- `axios` pour les requêtes HTTP.
- `useLang` pour gérer la langue sélectionnée (i18n).
- `TranslationsDictionary` pour récupérer les traductions selon la langue.

---

## Props

| Nom | Type | Description |
| --- | --- | --- |
| `onClose` | function | Fonction appelée lors de la fermeture de la modale (clic en dehors) |
| `onLoginClick` | function | Fonction appelée quand l’utilisateur clique sur "Se connecter" (lien vers modal connexion) |

---

## États locaux (`useState`)

| Nom | Type | Description |
| --- | --- | --- |
| `email` | string | Email saisi par l'utilisateur |
| `password` | string | Mot de passe saisi |
| `userName` | string | Nom d’utilisateur saisi |
| `error` | string/null | Message d’erreur à afficher |
| `success` | string/null | Message de succès à afficher |
| `isLoading` | boolean | Indique si une requête est en cours (affiche un loader, désactive le formulaire) |
| `acceptTerms` | boolean | Indique si l’utilisateur accepte les conditions d’utilisation (checkbox obligatoire) |
| `acceptNewsletter` | boolean | Indique si l’utilisateur souhaite s’abonner à la newsletter (checkbox facultative) |

---

## Fonctionnalités principales

### Soumission du formulaire (`handleSubmit`)

- Empêche le comportement par défaut du formulaire.
- Active le loader (`isLoading`).
- Envoie une requête POST à `/api/newUser` avec les données : `email`, `password`, `userName`, `subscribed` (newsletter).
- En cas de succès :
    - Affiche un message de succès.
    - Stocke la préférence newsletter dans `localStorage`.
    - Réinitialise les erreurs.
- En cas d’erreur :
    - Si code 409, affiche un message spécifique (compte déjà existant).
    - Sinon, affiche un message d’erreur générique.
- Désactive le loader à la fin.

### Interface utilisateur

- Affiche un overlay sombre derrière la modale qui ferme la modale si on clique dessus.
- Affiche le logo `LumiaIcon` et un titre avec traduction selon la langue.
- Propose un bouton d’inscription avec Google (sans fonctionnalité).
- Sépare les options par un trait horizontal avec un texte "ou".
- Formulaire avec champs : Nom d’utilisateur, Email, Mot de passe.
- Checkbox obligatoire d’acceptation des conditions (avec lien vers `/terms` et `/privacy`).
- Checkbox optionnelle d’abonnement à la newsletter.
- Affiche les messages d’erreur ou de succès sous le formulaire.
- Bouton de soumission désactivé tant que les conditions ne sont pas acceptées ou pendant le chargement.
- Affiche un spinner pendant la soumission.

---

## Traductions

Toutes les chaînes de caractères affichées utilisent un dictionnaire de traductions `TranslationsDictionary` basé sur la langue active `selectedLang` via le hook `useLang()`.

---

## Exemple d’utilisation

```jsx
<SignUpModal
    onClose={() => setShowSignUp(false)}
    onLoginClick={() => {
        setShowSignUp(false);
        setShowLogin(true);
    }}
/>

```

---

## Notes techniques

- Le type d’entrée pour le nom d’utilisateur est `text` (corriger si nécessaire car dans le code actuel c’est `userName`).
- La gestion du bouton Google nécessite une implémentation supplémentaire.
- Les styles sont gérés avec Tailwind CSS.
- L’état `isLoading` désactive les interactions pour éviter les doubles soumissions.