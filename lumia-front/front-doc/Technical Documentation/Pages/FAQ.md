EN

# **FAQ Component Documentation**

## **Description**

The FAQ component displays a dynamic list of frequently asked questions, featuring:

- Keyword search (whole-word filtering)
- Category-based filtering
- Expand/collapse animations (with rotating icon)
- Multilingual support via a translation dictionary (TranslationsDictionary)
- Contact section with two buttons (email support and live chat)
- Responsive design and dark mode support

---

## **Internal Components**

### **FAQItem**

**Props:**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| question | string | The displayed question |
| answer | string | The corresponding answer |
| isOpen | boolean | Whether the answer is currently visible |
| toggleOpen | function | Function to toggle the question open/closed |

**Functionality:**

- Displays the question as a clickable button with animation.
- The button contains an icon that rotates depending on isOpen.
- On click, it calls toggleOpen to expand/collapse the answer.
- The answer fades in and out with height and opacity transitions.

---

## **Main Component:**

## **FAQ**

### **Internal State (useState)**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| openIndex | number | null | Index of the currently opened question, or null |
| searchTerm | string | Text typed in the search input |
| selectedCategory | string | Currently selected category (default: "all") |

---

### **Key Features**

- **Question Toggle Handling**
    
    toggleQuestion(index) opens or closes a question depending on the current state.
    
- **Whole Word Search**
    
    The function searchByWords(text, searchTerm) checks that **each word** in the search term exists in the text (question or answer), enabling precise filtering.
    
- **Category Filtering**
    
    The FAQ list is filtered by the selected category, or displays all if selectedCategory === 'all'.
    
- **Animations with framer-motion**
    
    Smooth entrance animations for questions, expand transitions for answers, and icon rotations.
    
- **Multilingual Support**
    
    Text content is translated using the current language from useLang() and TranslationsDictionary.
    

---

### **JSX Structure**

1. **Title & Subtitle**
    - Displays a formatted “Frequently Asked Questions” title with a translated subtitle.
2. **Search Bar**
    - Input field with a magnifier icon to filter questions by keyword.
3. **Category Filters**
    - Buttons to select categories (e.g., General, Subscriptions, Games, etc.).
4. **FAQ List**
    - Displays filtered and animated items using the FAQItem component.
5. **No Result Message**
    - A friendly message shown when no question matches the search/category.
6. **Contact Section**
    - A final section encouraging users to reach support, with two stylized buttons:
        - Contact via email or support form
        - Start a live chat

---

## **Example Usage**

```
import FAQ from './components/FAQ';

function App() {
  return (
    <div>
      <FAQ />
    </div>
  );
}
```

---

## **Notes**

- The component depends on the current language context via useLang() and a translation dictionary (TranslationsDictionary).
- Styled with TailwindCSS and supports both light and dark themes.
- Uses framer-motion for all animations.
- Search is based on **whole words**, not substrings.
- Category filter includes a “Show All” ("all") button.

----------------------------------------

FR

# Documentation du composant `FAQ`

## Description

Le composant `FAQ` affiche une foire aux questions dynamique, avec :

- Recherche par mots-clés (filtrage par mots entiers)
- Filtrage par catégories
- Animation d’ouverture/fermeture des questions (avec rotation de l’icône)
- Support multilingue via un dictionnaire de traductions (`TranslationsDictionary`)
- Section contact avec deux boutons (support email et chat en direct)
- Design responsive et mode sombre

---

## Composants internes

### `FAQItem`

**Props :**

| Nom | Type | Description |
| --- | --- | --- |
| `question` | string | La question à afficher |
| `answer` | string | La réponse associée |
| `isOpen` | boolean | Indique si la réponse est visible (ouverte) |
| `toggleOpen` | function | Fonction à appeler pour ouvrir/fermer cette FAQItem |

**Fonctionnement :**

- Affiche la question dans un bouton avec animation d’apparition.
- Le bouton contient une icône qui pivote selon l’état `isOpen`.
- Lors du clic, appelle `toggleOpen` pour ouvrir ou fermer la réponse.
- La réponse est animée avec une transition d’opacité et hauteur.

---

## Fonction principale : `FAQ`

### États utilisés

| Nom | Type | Description |
| --- | --- | --- |
| `openIndex` | number | null | Index de la question ouverte, null si aucune |
| `searchTerm` | string | Texte entré dans la barre de recherche |
| `selectedCategory` | string | Catégorie sélectionnée ("all" par défaut) |

---

### Fonctionnalités clés

- **Gestion de l’ouverture d’une question**
    
    `toggleQuestion(index)` ouvre ou ferme la question selon l’état actuel.
    
- **Recherche par mots entiers**
    
    La fonction `searchByWords(text, searchTerm)` vérifie que chaque mot du terme de recherche est présent dans le texte (question ou réponse), pour un filtrage précis.
    
- **Filtrage par catégorie**
    
    La liste des FAQ est filtrée par la catégorie sélectionnée (`selectedCategory`) ou affiche toutes les catégories si `all`.
    
- **Animations avec framer-motion**
    
    Entrées progressives des questions, transition d’ouverture des réponses, rotation d’icône.
    
- **Support multilingue**
    
    Texte traduit via `TranslationsDictionary` et la langue active obtenue avec `useLang()`.
    

---

### Structure principale

1. **Titre & sous-titre**
    
    Affichage du titre "Foire aux Questions" avec mise en forme et sous-titre traduit.
    
2. **Barre de recherche**
    
    Champ input pour taper des mots-clés, avec icône loupe intégrée.
    
3. **Filtre de catégorie**
    
    Boutons pour sélectionner la catégorie désirée (ex : Général, Abonnements, Jeux...).
    
4. **Liste des FAQ**
    
    Affiche les éléments filtrés et animés avec le composant `FAQItem`.
    
5. **Message lorsqu’aucune FAQ ne correspond**
    
    Message dynamique selon recherche et catégorie.
    
6. **Section contact**
    
    Bloc avec texte incitant à contacter le support, et deux boutons stylisés pour :
    
    - Contacter par email/support
    - Démarrer un chat en direct

---

## Exemple d’utilisation

```jsx
import FAQ from './components/FAQ';

function App() {
  return (
    <div>
      <FAQ />
    </div>
  );
}

```

---

## Remarques

- Le composant dépend d’un contexte/langage via `useLang()` et du dictionnaire `TranslationsDictionary` pour les textes.
- Les styles sont en TailwindCSS avec support du mode sombre.
- Utilise `framer-motion` pour toutes les animations.
- La recherche filtre par mots entiers et non par sous-chaînes.
- Le filtrage par catégorie inclut un bouton "Toutes les questions" (`all`).