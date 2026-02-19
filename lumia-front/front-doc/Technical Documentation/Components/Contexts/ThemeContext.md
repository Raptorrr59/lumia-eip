EN

# **ThemeProvider & useTheme**

React provider component and custom hook to manage dark mode (dark theme) in an application.

---

## **Description**

- **ThemeProvider**: Provides a React context for dark mode.
- Manages the isDarkMode state (boolean) indicating whether dark mode is active.
- Persists the theme preference in localStorage to keep the choice across sessions.
- Adds or removes the CSS class dark on the root (<html>) element based on the theme state, enabling styling with Tailwind CSS or others.
- **useTheme**: Hook to easily access the ThemeContext.
- Prevents usage outside the provider by throwing an error if used incorrectly.

---

## **Components and Hooks**

### **ThemeProvider**

- **Props:**
    - children (React.ReactNode) — child elements wrapped with the context.
- **Features:**
    - Initializes the isDarkMode state from the value stored in localStorage ('darkMode').
    - On isDarkMode change, adds or removes the dark class on <html>.
    - Automatically saves the state to localStorage on every change.
    - Provides isDarkMode and the function toggleDarkMode via context.

---

### **useTheme**

- Custom hook to access the theme state and toggle function.
- Returns an object:

```
{
  isDarkMode: boolean,
  toggleDarkMode: () => void
}
```

- 
- Must be used only inside a component wrapped by ThemeProvider; otherwise, it throws an error.

---

## **Usage Example**

```
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <DarkModeToggle />
      {/* other components */}
    </ThemeProvider>
  );
}
```

---

## **Key Points**

- The theme is automatically applied via the dark class on the <html> element, compatible with Tailwind CSS or other class-based CSS solutions.
- The user preference is saved in the browser to preserve the choice across sessions.
- The useTheme hook allows easy interaction with the theme throughout the application.

----------------------------------------

FR

# ThemeProvider & useTheme

Composant provider React et hook personnalisée pour gérer le thème sombre (dark mode) dans une application.

---

## Description

- **ThemeProvider** : Fournit un contexte React pour le mode sombre.
- Gère l’état `isDarkMode` (booléen) qui indique si le thème sombre est actif.
- Persiste la préférence de thème dans `localStorage` pour conserver le choix entre les sessions.
- Applique ou retire la classe CSS `dark` sur la racine (`<html>`) selon l’état du thème, permettant ainsi de styliser via Tailwind CSS ou autre.
- **useTheme** : Hook pour accéder facilement au contexte `ThemeContext`.
- Empêche l’usage hors du provider en lançant une erreur si utilisé incorrectement.

---

## Composants et hooks

### ThemeProvider

- **Props :**
    - `children` (`React.ReactNode`) — éléments enfants à envelopper avec le contexte.
- **Fonctionnalités :**
    - Initialise l’état `isDarkMode` à partir de la valeur stockée en localStorage (`'darkMode'`).
    - Sur changement de `isDarkMode`, ajoute ou retire la classe `dark` sur `<html>`.
    - Sauvegarde automatiquement l’état dans `localStorage` à chaque modification.
    - Fournit `isDarkMode` et la fonction `toggleDarkMode` via le contexte.

---

### useTheme

- Hook personnalisé pour accéder à l’état et à la fonction de changement du thème.
- Retourne un objet :
    
    ```
    {
      isDarkMode: boolean,
      toggleDarkMode: () => void
    }
    
    ```
    
- Doit être utilisé uniquement dans un composant enfant de `ThemeProvider`, sinon génère une erreur.

---

## Exemple d’utilisation

```jsx
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Désactiver le mode sombre' : 'Activer le mode sombre'}
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <DarkModeToggle />
      {/* autres composants */}
    </ThemeProvider>
  );
}

```

---

## Points importants

- Le thème est automatiquement appliqué via la classe `dark` sur l’élément `<html>`, compatible avec Tailwind CSS ou autres solutions CSS basées sur classes.
- La préférence utilisateur est sauvegardée dans le navigateur pour garder le choix entre sessions.
- Le hook `useTheme` permet d’interagir facilement avec le thème dans toute l’application.