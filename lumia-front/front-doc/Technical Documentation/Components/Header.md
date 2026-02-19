EN

# **Header Component**

React component managing the website header display, including main navigation, logo, theme control (dark mode), user/login management, language selector, and a mobile menu.

---

## **Description**

- Displays a centered logo.
- Provides main navigation links to pages: Games, Courses, Events.
- Button to toggle dark mode on/off.
- Manages login state: shows login button if not connected, otherwise displays user profile and “LumiaCoins” count.
- Language selector with options FR and EN.
- Responsive mobile menu (visible on small screens).
- Login and sign-up modals.
- Real-time synchronization of “LumiaCoins” from localStorage with change listeners.
- Uses context for theme (useTheme) and language (useLang).

---

## **Main Features**

| **Feature** | **Description** |
| --- | --- |
| Dark mode | Toggle button between light and dark modes, with animated Sun/Moon icons. |
| User management | Shows “Login” button if not logged in, otherwise shows user profile and LumiaCoins count. |
| Login/Sign-up modals | Open and close modals for login and sign-up, with navigation between them. |
| Language selector | Allows switching display language (FR/EN) and reloads the page to apply the selection. |
| Mobile menu | Responsive menu appearing on screens < 768px, with animation and navigation links. |
| LumiaCoins sync | Updates the displayed LumiaCoins count in real-time, even if changed in another browser tab. |

---

## **Usage**

```
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      {/* other components */}
    </>
  );
}
```

---

## **Dependencies**

- React hooks: useState, useEffect
- Icons from lucide-react: Sun, Moon, ChevronDown, Menu, X
- Modal components: LoginModal, SignUpModal
- Contexts: useTheme (theme management), useLang (language management)
- Translation dictionary: TranslationsDictionary
- react-router-dom for navigation links (Link)
- Custom icon: LumiaIcon

---

## **Props**

This component does not receive props. It uses contexts and localStorage.

---

## **Internal State Behavior**

| **State** | **Description** |
| --- | --- |
| isLoginOpen | Boolean, controls visibility of the login modal |
| isSignUpOpen | Boolean, controls visibility of the sign-up modal |
| isLangOpen | Boolean, controls visibility of the language dropdown menu |
| isMobileMenuOpen | Boolean, controls visibility of the mobile menu on small screens |
| lumiaCoins | Number of LumiaCoins retrieved from localStorage and updated in real-time |

---

## **JSX Rendering Summary**

- <header> containing:
    - Mobile menu toggle button (visible only on mobile).
    - Main navigation (visible only on desktop).
    - Centered logo.
    - Controls on the right: dark mode toggle, login/profile display, language selector.
    - Mobile menu (shown on small screens when opened).
- Conditional modals: LoginModal and SignUpModal.

---

## **Suggestions for Improvement**

- Handle errors when reading from localStorage.
- Add a fallback or loader during user data retrieval.
- Enable language selection without full page reload (via context).
- Externalize “LumiaCoins” management into a global context or store.

---------------------------------------------

FR

# Header Component

Composant React qui gère l’affichage de l’en-tête du site web, incluant la navigation principale, le logo, le contrôle du thème (dark mode), la gestion des connexions/utilisateurs, le sélecteur de langue, et un menu mobile.

---

## Description

- Affiche le logo centré.
- Propose une navigation principale avec liens vers les pages : Jeux, Cours, Événements.
- Bouton pour activer/désactiver le mode sombre.
- Gestion de l’état de connexion : bouton de connexion ou affichage du profil et des "LumiaCoins".
- Sélecteur de langue avec options FR et EN.
- Menu mobile responsive (visible sur petits écrans).
- Modales pour la connexion et l’inscription.
- Synchronisation en temps réel des "LumiaCoins" depuis le `localStorage` avec écoute des changements.
- Utilisation de contexte pour le thème (`useTheme`) et la langue (`useLang`).

---

## Fonctionnalités principales

| Fonctionnalité | Description |
| --- | --- |
| Mode sombre | Bouton bascule entre mode clair et mode sombre, avec animation d’icônes Sun/Moon. |
| Gestion utilisateur | Affiche bouton "Connexion" si non connecté, sinon affiche profil utilisateur et nombre de LumiaCoins. |
| Modales connexion/inscription | Ouverture et fermeture des modales de connexion et d’inscription, avec navigation entre elles. |
| Sélecteur de langue | Permet de changer la langue affichée (FR/EN) et recharge la page pour appliquer la sélection. |
| Menu mobile | Menu responsive apparaissant sur écrans < 768px, avec animation et liens de navigation. |
| Synchronisation LumiaCoins | Met à jour en temps réel la quantité de LumiaCoins affichée, même si modifiée dans un autre onglet. |

---

## Utilisation

```jsx
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      {/* autres composants */}
    </>
  );
}

```

---

## Dépendances

- React hooks : `useState`, `useEffect`
- Icônes de `lucide-react` : Sun, Moon, ChevronDown, Menu, X
- Composants modaux : `LoginModal`, `SignUpModal`
- Contexte : `useTheme` (gestion thème), `useLang` (gestion langue)
- Dictionnaire de traduction : `TranslationsDictionary`
- `react-router-dom` pour les liens de navigation (`Link`)
- Icône personnalisée : `LumiaIcon`

---

## Props

Le composant ne reçoit pas de props, il utilise les contextes et le localStorage.

---

## Comportement des états internes

| État | Description |
| --- | --- |
| `isLoginOpen` | Booléen, affiche la modale de connexion |
| `isSignUpOpen` | Booléen, affiche la modale d’inscription |
| `isLangOpen` | Booléen, affiche le menu déroulant du sélecteur de langue |
| `isMobileMenuOpen` | Booléen, affiche le menu mobile sur petits écrans |
| `lumiaCoins` | Nombre de LumiaCoins récupéré depuis `localStorage` et mis à jour en temps réel |

---

## Résumé du rendu JSX

- `<header>` contenant :
    - Bouton toggle menu mobile (visible uniquement en mobile).
    - Navigation principale (visible uniquement sur desktop).
    - Logo centré.
    - Contrôles à droite : dark mode, connexion/profil, langue.
    - Menu mobile (affiché sur petit écran quand ouvert).
- Modales conditionnelles : LoginModal, SignUpModal.

---

## Suggestions d’amélioration

- Gérer les erreurs lors de la lecture de `localStorage`.
- Ajouter un fallback ou un loader pendant la récupération des données utilisateur.
- Permettre la sélection de langue sans rechargement complet (via contexte).
- Externaliser la gestion des "LumiaCoins" dans un contexte ou un store global.