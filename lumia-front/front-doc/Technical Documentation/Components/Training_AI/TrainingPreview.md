EN

# **TrainingPreview**

# **Documentation — Component**

## **Description**

TrainingPreview is a React component that displays a visual and textual preview of an AI training session, including an image, the training name, the associated game, the current status, and the training duration formatted into days, hours, and minutes according to the selected language.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Example** |
| --- | --- | --- | --- | --- |
| picture | string | URL of the image to display | Yes | "https://example.com/image.png" |
| name | string | Name of the AI or training | Yes | "AlphaBot" |
| game | string | Name of the game associated with the AI | Yes | "Chess" |
| time | string | Training duration in seconds (as a string) | Yes | "3600" (1 hour) |
| statut | string | Current status of the AI in the lab | Yes | "In progress" |

---

## **Features**

- Displays a preview image inside a styled frame.
- Shows the AI name, the associated game, and a descriptive text including the current status.
- Converts the duration in seconds (provided via the time prop) into a readable string in days, hours, and minutes, translated based on the active language.
- Uses a translations dictionary (TranslationsDictionary) and a custom hook useLang for multilingual support.

---

## **Utility function**

### **convertSecondsToDHM(seconds, selectedLang)**

- Converts a number of seconds into a formatted string with days, hours, and minutes.
- Examples:
    - 90 seconds → “1 minute” (depending on translations)
    - 3600 seconds → “1 hour and 0 minutes”
    - 90000 seconds → “1 day 1 hour and 0 minutes”
- Uses selectedLang to retrieve translated terms.

---

## **Render structure example**

```
<div className='flex flex-row'>
  <div className='bg-black relative border-[2px] rounded-[10px] overflow-hidden border-[#5328EA]'>
    <img src={picture} alt="Training Preview" className="w-full h-32 object-cover" />
  </div>
  <div className='flex flex-col pl-10'>
    <p className='font-bold font-Gotham text-[18px] text-[#5328EA]'>{name}</p>
    <p className='font-bold font-Gotham text-[14px] text-black dark:text-white pt-1 pb-1'>{game}</p>
    <p className='font-normal font-Gotham text-[12px] text-black dark:text-white'>
      {/* Combined text with variables and translations */}
    </p>
  </div>
</div>
```

---

## **Usage example**

```
<TrainingPreview
  picture="https://example.com/ai.png"
  name="AlphaBot"
  game="Chess"
  time="90000"
  statut="In progress"
/>
```

---

## **Dependencies**

- React
- PropTypes for props validation
- useLang (custom hook for current language)
- TranslationsDictionary for translations

---

## **Notes**

- The time prop is a string representing seconds; using a number might be more natural but depends on the data source.
- The component supports dark and light modes via Tailwind CSS classes.
- Translated terms are dynamically retrieved from TranslationsDictionary using the selected language.
- The image has a fixed height (32) and adapts in width accordingly.

-------------------------------------------------

FR

# Documentation — Composant `TrainingPreview`

## Description

`TrainingPreview` est un composant React qui affiche un aperçu visuel et textuel d’un entraînement d’IA, incluant une image, le nom de l’entraînement, le jeu concerné, le statut actuel, ainsi que la durée d’entraînement formatée en jours, heures et minutes selon la langue sélectionnée.

---

## Props

| Nom | Type | Description | Obligatoire | Exemple |
| --- | --- | --- | --- | --- |
| `picture` | `string` | URL de l’image à afficher | Oui | `"https://exemple.com/image.png"` |
| `name` | `string` | Nom de l’IA ou de l’entraînement | Oui | `"AlphaBot"` |
| `game` | `string` | Nom du jeu auquel l’IA est associée | Oui | `"Chess"` |
| `time` | `string` | Durée d’entraînement en secondes (en string) | Oui | `"3600"` (1 heure) |
| `statut` | `string` | Statut actuel de l’IA dans les laboratoires | Oui | `"En cours"` |

---

## Fonctionnalités

- Affiche une image de prévisualisation avec un cadre stylisé.
- Affiche le nom de l’IA, le jeu associé, et un texte descriptif qui inclut le statut actuel.
- Convertit la durée en secondes (passée via la prop `time`) en une chaîne lisible en jours, heures et minutes, traduite selon la langue active.
- Utilise un dictionnaire de traductions (`TranslationsDictionary`) et un hook `useLang` pour le support multilingue.

---

## Fonction utilitaire

### `convertSecondsToDHM(seconds, selectedLang)`

- Convertit un nombre de secondes en une chaîne formatée en jours, heures, minutes.
- Exemples :
    - 90 secondes → "1 minutes" (en fonction des traductions)
    - 3 600 secondes → "1 hours and 0 minutes"
    - 90000 secondes → "1 days 1 hours and 0 minutes"
- Utilise `selectedLang` pour récupérer les termes traduits.

---

## Structure du rendu

```jsx
<div className='flex flex-row'>
  <div className='bg-black relative border-[2px] rounded-[10px] overflow-hidden border-[#5328EA]'>
    <img src={picture} alt="Training Preview" className="w-full h-32 object-cover" />
  </div>
  <div className='flex flex-col pl-10'>
    <p className='font-bold font-Gotham text-[18px] text-[#5328EA]'>{name}</p>
    <p className='font-bold font-Gotham text-[14px] text-black dark:text-white pt-1 pb-1'>{game}</p>
    <p className='font-normal font-Gotham text-[12px] text-black dark:text-white'>
      {/* Texte combiné avec variables et traductions */}
    </p>
  </div>
</div>

```

---

## Exemple d’utilisation

```jsx
<TrainingPreview
  picture="https://example.com/ai.png"
  name="AlphaBot"
  game="Chess"
  time="90000"
  statut="En cours"
/>

```

---

## Dépendances

- React
- `PropTypes` pour validation des props
- `useLang` (hook custom pour langue courante)
- `TranslationsDictionary` pour les traductions

---

## Remarques

- La prop `time` est une string représentant des secondes, il serait plus naturel d’utiliser un nombre, mais cela dépend des données reçues.
- Le composant gère les modes sombre et clair via des classes Tailwind CSS.
- Les termes traduits sont récupérés dynamiquement dans `TranslationsDictionary` via la langue sélectionnée.
- L’image a une taille fixe en hauteur (32) et s’adapte en largeur.