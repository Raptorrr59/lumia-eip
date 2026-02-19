EN

# **SubscriptionBox Component**

React component displaying a subscription box with details, price, credits, and an optional “Recommended” badge. Animated with Framer Motion.

---

## **Description**

- Shows a card containing:
    - Subscription title.
    - Price and currency.
    - Number of included credits.
    - Optional bonus credits.
    - Optional “Recommended” badge.
- Uses framer-motion for hover animations: zoom and shadow effects.
- Supports text translation via language context (useLang + TranslationsDictionary).
- Allows triggering an action on click via the onClick prop.

---

## **Props**

| **Name** | **Type** | **Description** | **Required** | **Default Value** |
| --- | --- | --- | --- | --- |
| title | string | Subscription plan title | Yes | — |
| price | number | Subscription price | Yes | — |
| currency | string | Currency symbol or code (e.g., €, $, USD) | Yes | — |
| credits | number | Number of credits included in the plan | Yes | — |
| recommended | bool | Shows a “Recommended” badge if true | No | false |
| bonus | number | Number of bonus credits displayed below main credits | No | undefined |
| onClick | function | Function called when clicking the box | No | undefined |

---

## **Usage Example**

```
import SubscriptionBox from './SubscriptionBox';

function Pricing() {
  const handleClick = () => alert("Subscription selected!");

  return (
    <SubscriptionBox
      title="Pro Plan"
      price={29}
      currency="€"
      credits={100}
      bonus={10}
      recommended={true}
      onClick={handleClick}
    />
  );
}
```

---

## **Features**

- **Hover animations**: scale up and drop shadow to highlight the box.
- **“Recommended” badge**: displayed centered at the top if recommended prop is true.
- **Translation support**: uses selected language from useLang context.
- **Conditional bonus display**: only shown if bonus prop is provided.
- **Styling and layout**: purple border, rounded corners, vertical alignment using flexbox.

--------------------------------------------

FR

# SubscriptionBox Component

Composant React affichant une boîte d’abonnement avec détails, prix, crédits et badge optionnel "Recommandé". Animé avec Framer Motion.

---

## Description

- Affiche un encart avec :
    - Titre de l’abonnement.
    - Prix et devise.
    - Nombre de crédits inclus.
    - Bonus de crédits optionnel.
    - Badge "Recommandé" optionnel.
- Utilise `framer-motion` pour des animations au survol (hover) : zoom et ombre portée.
- Supporte la traduction du texte grâce au contexte de langue (`useLang` + `TranslationsDictionary`).
- Permet de déclencher une action au clic via la prop `onClick`.

---

## Props

| Nom | Type | Description | Obligatoire | Valeur par défaut |
| --- | --- | --- | --- | --- |
| `title` | `string` | Titre du forfait / abonnement | Oui | — |
| `price` | `number` | Prix du forfait | Oui | — |
| `currency` | `string` | Symbole ou code de la devise (ex: €, $, USD) | Oui | — |
| `credits` | `number` | Nombre de crédits inclus dans l’offre | Oui | — |
| `recommended` | `bool` | Affiche un badge "Recommandé" si `true` | Non | `false` |
| `bonus` | `number` | Nombre de crédits bonus affichés sous le principal | Non | `undefined` |
| `onClick` | `function` | Fonction appelée au clic sur la boîte | Non | `undefined` |

---

## Exemple d’utilisation

```jsx
import SubscriptionBox from './SubscriptionBox';

function Pricing() {
  const handleClick = () => alert("Abonnement sélectionné !");

  return (
    <SubscriptionBox
      title="Forfait Pro"
      price={29}
      currency="€"
      credits={100}
      bonus={10}
      recommended={true}
      onClick={handleClick}
    />
  );
}

```

---

## Fonctionnalités

- **Animations au survol** : grossissement (`scale`), ombre portée pour attirer l’attention.
- **Badge "Recommandé"** : affiché en haut au centre de la boîte si prop `recommended` vraie.
- **Gestion des traductions** : utilise la langue sélectionnée dans le contexte `useLang`.
- **Affichage conditionnel du bonus** : uniquement si la prop `bonus` est définie.
- **Style et mise en page** : bordure violette, coins arrondis, alignement vertical avec flexbox.