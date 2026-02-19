EN

# **SearchBar Component**

Simple React component that displays a styled search bar with a controlled text input.

---

## **Description**

- Displays a text input (input[type="text"]) with custom styles.
- Supports a customizable placeholder.
- Controlled via props searchTerm (value) and onChange (change handler).
- Responsive-friendly with relative width sizing.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default Value** |
| --- | --- | --- | --- | --- |
| searchTerm | string | Current text in the search field | Yes | — |
| onChange | function | Callback triggered on each text change | Yes | — |
| placeholder | string | Helper text shown when the input is empty | No | '' |

---

## **Usage**

```
import SearchBar from './components/SearchBar';

function App() {
  const [term, setTerm] = React.useState('');

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <SearchBar
      searchTerm={term}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}
```

---

## **Behavior**

- The text field displays the controlled value searchTerm.
- When the user types, the onChange function is called with the native onChange event.
- Placeholder shows helper text when input is empty.
- Styles applied for good visual integration and user experience.

---

## **CSS Styles (Tailwind classes)**

- Width: w-3/5 with responsive padding (sm:px-0, px-auto).
- Input:
    - Horizontal padding (pl-4 pr-10), vertical padding (py-2).
    - Rounded borders (rounded-md).
    - Purple border (border-[#5328EA]).
    - Gotham font, weight 500.
    - Purple text and placeholder color.
    - Custom focus outline with purple ring.

---

## **Notes**

- Container width is set to 60% of its parent.
- This component does not handle search logic; it must be connected to external state and handlers.
- Easily integrable into forms or search interfaces.

--------------------------------

FR

# SearchBar Component

Composant React simple pour afficher une barre de recherche stylisée avec un champ de texte contrôlé.

---

## Description

- Affiche un champ texte (`input[type="text"]`) avec styles personnalisés.
- Supporte un placeholder personnalisable.
- Contrôlé via les props `searchTerm` (valeur) et `onChange` (gestion des modifications).
- Adapté pour une utilisation responsive avec une largeur relative.

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| `searchTerm` | `string` | Texte actuel dans le champ de recherche | Oui | — |
| `onChange` | `function` | Callback appelé à chaque modification du texte | Oui | — |
| `placeholder` | `string` | Texte d’aide affiché quand le champ est vide | Non | `''` |

---

## Utilisation

```jsx
import SearchBar from './components/SearchBar';

function App() {
  const [term, setTerm] = React.useState('');

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <SearchBar
      searchTerm={term}
      onChange={handleChange}
      placeholder="Rechercher..."
    />
  );
}

```

---

## Fonctionnement

- Le champ de texte affiche la valeur contrôlée `searchTerm`.
- Lorsqu’un utilisateur saisit du texte, la fonction `onChange` est déclenchée avec l’événement `onChange` natif.
- Le placeholder affiche un texte indicatif tant que le champ est vide.
- Styles appliqués pour une bonne intégration visuelle et expérience utilisateur.

---

## Style CSS (Tailwind classes)

- Largeur : `w-3/5` avec padding responsive (`sm:px-0`, `px-auto`).
- Input :
    - Padding horizontal (`pl-4 pr-10`), vertical (`py-2`).
    - Bord arrondi (`rounded-md`).
    - Bordure violette (`border-[#5328EA]`).
    - Police Gotham, poids 500.
    - Couleur du texte et placeholder violette.
    - Focus avec contour personnalisé (anneau violet).

---

## Notes

- La largeur du conteneur est en fraction (60%) de son parent.
- Ce composant ne gère pas la logique de recherche, il doit être connecté à un état et une fonction de gestion externe.
- Peut être intégré facilement dans des formulaires ou interfaces de recherche.