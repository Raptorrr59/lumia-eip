EN

# **NotFoundPage Component Documentation**

## **Description**

NotFoundPage is a React component designed to display a custom multilingual 404 error page. It leverages **framer-motion** for animations, **react-router-dom** for navigation, and uses a language context hook (useLang) together with a translations dictionary (TranslationsDictionary) for multilingual support.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default** |
| --- | --- | --- | --- | --- |
| title | string | **(Optional)** Custom title for the page (not used currently) | No | — |
| content | string | **(Optional)** Custom content for the page (not used currently) | No | — |

---

## **Features**

- Displays a 404 error message with a large animated number.
- Multilingual support using useLang and TranslationsDictionary.
- Smooth animations for all elements via **framer-motion**.
- Simple illustration including a Search icon and an exclamation badge.
- Action buttons:
    - Navigate back to homepage (via Link from react-router-dom).
    - Go back to previous page (using window.history.back()).
- Animated floating decorative elements in the background for visual effect.
- Dark mode support with appropriate colors.

---

## **Usage Example**

```
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  return <NotFoundPage />;
}
```

### **Translation Support**

The component automatically obtains the current language via the useLang hook. Make sure your app includes a LangProvider or similar context to provide the active language.

---

## **External Dependencies**

- **React** — component structure
- **framer-motion** — animations
- **react-router-dom** — navigation and Link
- **lucide-react** — icons (Home, ArrowLeft, Search)
- **useLang** — custom hook to get selected language
- **TranslationsDictionary** — translations object keyed by language codes

---

## **Visual Structure**

- Centered main container with white or dark background.
- Large “404” title with violet gradient.
- Content block containing title, subtitle, and description text.
- Illustration featuring a violet circle with a search icon and exclamation badge.
- Buttons for returning home or going back.
- Animated floating decorative elements behind content.

---

## **Customization**

- Text can be customized by extending or overriding the TranslationsDictionary.
- Colors, sizes, and animations can be adjusted via Tailwind CSS classes or framer-motion props.
- Props title and content exist but are not currently used in the rendering; they could be implemented to show custom messages if needed.

---------------------------------

FR

# `NotFoundPage` Component Documentation

## Description

`NotFoundPage` est un composant React conçu pour afficher une page d'erreur 404 personnalisée et multilingue. Il utilise `framer-motion` pour les animations, `react-router-dom` pour la navigation, et s’appuie sur un système de traduction via un contexte de langue (`useLang`) et un dictionnaire de traductions (`TranslationsDictionary`).

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| `title` | string | **(Optionnel)** Titre personnalisé pour la page (non utilisé dans la version actuelle) | Non | — |
| `content` | string | **(Optionnel)** Contenu personnalisé pour la page (non utilisé dans la version actuelle) | Non | — |

---

## Fonctionnalités

- **Affichage d'un message d'erreur 404** avec un grand chiffre animé.
- **Support multilingue** via `useLang` et `TranslationsDictionary`.
- **Animations fluides** des différents éléments grâce à `framer-motion`.
- **Illustration simple** avec une icône `Search` et un point d’exclamation.
- **Boutons d’action** :
    - Retour à la page d'accueil (via `Link` de `react-router-dom`).
    - Retour à la page précédente (via `window.history.back()`).
- **Eléments décoratifs flottants** animés en arrière-plan pour l’effet visuel.
- **Support du mode sombre** avec des couleurs adaptées.

---

## Utilisation

```jsx
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  return (
    <NotFoundPage />
  );
}

```

### Exemple avec traduction

Le composant récupère automatiquement la langue active via le hook `useLang`. Assure-toi que `LangProvider` est configuré dans ton app pour fournir la langue actuelle.

---

## Dépendances externes

- **React** : gestion du composant.
- **framer-motion** : animations.
- **react-router-dom** : navigation.
- **lucide-react** : icônes (`Home`, `ArrowLeft`, `Search`).
- **useLang** : hook custom pour obtenir la langue sélectionnée.
- **TranslationsDictionary** : objet de traduction avec clés et valeurs en différentes langues.

---

## Structure visuelle

- **Container principal** centré avec fond blanc ou sombre.
- **Titre 404** en très grand format, avec un dégradé violet.
- **Bloc contenu** avec titre, sous-titre et description.
- **Illustration** : cercle violet avec icône de recherche et badge d’exclamation.
- **Boutons** pour retourner à l'accueil ou à la page précédente.
- **Eléments flottants décoratifs** animés en arrière-plan.

---

## Personnalisation

- Tu peux modifier le texte en étendant ou en remplaçant `TranslationsDictionary`.
- Les couleurs, tailles et animations peuvent être ajustées via les classes Tailwind ou les props de `framer-motion`.
- Actuellement, les props `title` et `content` ne sont pas utilisées dans le rendu, mais peuvent être intégrées pour afficher un message personnalisé si nécessaire.