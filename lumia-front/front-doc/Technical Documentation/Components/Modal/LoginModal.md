
EN

# **📄LoginModal**

# **React Component Documentation**

## **Description**

The LoginModal component displays a modal window for user login. It handles email and password input, submits the authentication request, displays errors and success messages, and manages a loading spinner. It also integrates access to the “Forgot Password” modal (ForgotPasswordModal).

---

## **Props**

| **Name** | **Type** | **Description** | **Required** |
| --- | --- | --- | --- |
| onClose | function | Function called when the modal is closed (by clicking outside or closing). | Yes |
| onSignUpClick | function | Function called when the user clicks the sign-up button. | Yes |

---

## **Main Features**

- **Credential input**: Email and password fields with simple validation and disabled state during loading.
- **Login via API**: Sends a POST request to /api/login with email and password.
- **Local storage**: Saves tokens, roles, and user info in localStorage.
- **Error handling**: Displays specific error messages (401, 409, others).
- **Messages**: Shows success or error feedback to the user.
- **Loading state**: Displays a spinner and disables interaction during the request.
- **Forgot password modal**: Allows opening the ForgotPasswordModal via a button.
- **Internationalization**: Uses TranslationsDictionary with current language from useLang.
- **Dark/light theme**: Styled using Tailwind CSS for theme support.

---

## **Internal State (useState)**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| email | string | Content of the email input field. |
| password | string | Content of the password input field. |
| error | string | Error message to display. |
| success | string | Success message to display. |
| showForgotPassword | boolean | Whether to show the forgot password modal. |
| isLoading | boolean | Indicates if the request is in progress (disables UI). |

---

## **Usage Example**

```
import LoginModal from './LoginModal';

const MyComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <button onClick={() => setShowLogin(true)}>Login</button>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignUpClick={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        />
      )}

      {/* Other modals such as SignUpModal */}
    </>
  );
};
```

---

## **Detailed Behavior**

### **Login Flow**

- User enters email and password.
- On submit, a POST request is sent to /api/login.
- On success, tokens and user data are stored in localStorage.
- After a 500ms delay, user info is fetched via GET /api/users/{id}.
- A success message is shown, then the page reloads after 1 second.
- On 401 error, displays “Incorrect credentials” message.
- On 409 error (conflict), user data is fetched and login is considered successful.
- Other errors display a generic error message.

### **Forgot Password Modal**

- Clicking the “Forgot password” button opens the ForgotPasswordModal.
- Users can return to the login modal via onBackToLogin.

### **Accessibility & UI**

- Buttons and inputs are disabled during requests.
- Loading spinner visible while waiting.
- Supports light/dark themes via Tailwind CSS.
- Dynamic texts based on the active language.

---

## **Dependencies**

- **React**: state and lifecycle management.
- **axios**: for HTTP API calls.
- **LangProvider**: useLang hook for current language.
- **TranslationsDictionary**: translation strings.
- **ForgotPasswordModal**: component for password reset.
- **LumiaIcon**: icon displayed inside the modal.

---

## **Technical Notes**

- Local storage usage could be optimized (avoid unnecessary JSON.stringify).
- Client-side email validation recommended.
- More detailed error handling could be added (e.g., network errors, timeouts).
- Consider separating API logic into dedicated service files.
- Page reload after login is simple but could be replaced by global state management (e.g., user context).

--------------------------------------------------

FR

# Documentation : `LoginModal` React Component

## Description

Le composant `LoginModal` permet d’afficher une fenêtre modale pour la connexion des utilisateurs. Il gère la saisie de l’email et du mot de passe, l’envoi de la requête d’authentification, l’affichage des erreurs, du succès, et la gestion du spinner de chargement. Il intègre aussi un accès à la modale "mot de passe oublié" (`ForgotPasswordModal`).

---

## Propriétés (`props`)

| Nom | Type | Description | Obligatoire |
| --- | --- | --- | --- |
| `onClose` | `func` | Fonction appelée lors de la fermeture de la modale (clic en dehors ou fermeture). | Oui |
| `onSignUpClick` | `func` | Fonction appelée lorsque l'utilisateur clique sur le bouton pour s’inscrire. | Oui |

---

## Fonctionnalités principales

- **Saisie des identifiants** : email et mot de passe avec contrôle simple et désactivation pendant chargement.
- **Connexion via API** : envoie une requête POST `/api/login` avec email et mot de passe.
- **Stockage local** : enregistre tokens, rôles, informations utilisateur dans `localStorage`.
- **Gestion erreurs** : affiche les erreurs spécifiques (401, 409, autres).
- **Affichage messages** : succès ou erreur visible à l’utilisateur.
- **Loading state** : spinner de chargement et désactivation des interactions pendant requête.
- **Modal mot de passe oublié** : possibilité d’ouvrir `ForgotPasswordModal` via un bouton.
- **Internationalisation** : utilisation de `TranslationsDictionary` avec la langue active via `useLang`.
- **Thème sombre / clair** : styles adaptés grâce à Tailwind CSS.

---

## États internes (`useState`)

| État | Type | Description |
| --- | --- | --- |
| `email` | `string` | Contenu du champ email. |
| `password` | `string` | Contenu du champ mot de passe. |
| `error` | `string` | Message d’erreur à afficher. |
| `success` | `string` | Message de succès à afficher. |
| `showForgotPassword` | `boolean` | Affiche la modale de mot de passe oublié. |
| `isLoading` | `boolean` | Indique que la requête est en cours (désactive UI). |

---

## Usage

```jsx
import LoginModal from './LoginModal';

const MyComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <button onClick={() => setShowLogin(true)}>Se connecter</button>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignUpClick={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        />
      )}

      {/* Autres modales comme SignUpModal */}
    </>
  );
};

```

---

## Comportement détaillé

### Connexion

- L'utilisateur saisit son email et mot de passe.
- À la soumission, la requête POST `/api/login` est envoyée.
- En cas de succès, tokens et données utilisateur sont stockés dans `localStorage`.
- Un délai de 500ms est appliqué avant de récupérer les informations utilisateur via GET `/api/users/{id}`.
- Affiche un message de succès, puis recharge la page après 1s.
- En cas d’erreur 401, message d’erreur "Identifiants incorrects.".
- En cas d’erreur 409, récupère les données utilisateur (conflict) et considère la connexion réussie.
- Pour toute autre erreur, affiche un message générique.

### Modale mot de passe oublié

- Lorsque l’utilisateur clique sur le bouton "Mot de passe oublié", la modale `ForgotPasswordModal` s’affiche à la place.
- Permet à l’utilisateur de revenir à la modale login via `onBackToLogin`.

### Accessibilité et UI

- Boutons et champs sont désactivés pendant la requête.
- Spinner visible pendant le chargement.
- Thèmes clair/sombre gérés via classes Tailwind.
- Textes dynamiques suivant la langue active.

---

## Dépendances

- **React** : gestion d’état et cycle de vie.
- **axios** : pour les appels API HTTP.
- **LangProvider** : hook `useLang` pour récupérer la langue active.
- **TranslationsDictionary** : dictionnaire des traductions.
- **ForgotPasswordModal** : composant pour mot de passe oublié.
- **LumiaIcon** : icône affichée dans la modale.

---

## Notes techniques

- Stockage local à revoir pour optimiser la sérialisation (utiliser JSON.stringify uniquement si nécessaire).
- Ajouter validation email côté client recommandée.
- Gérer plus finement les erreurs (ex : erreurs réseau, timeout).
- Considérer séparation logique API dans un fichier service dédié.
- Le rechargement de la page est une solution simple mais pourrait être remplacé par une gestion d’état globale (ex : contexte utilisateur).