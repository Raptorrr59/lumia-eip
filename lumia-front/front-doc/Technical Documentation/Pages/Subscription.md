EN

# **Subscription Component Documentation**

## **General Description**

The **Subscription** component is a React page that allows users to choose from multiple subscription plans to purchase credits (LumiaCoins). Users can select a currency (EUR or USD), view the available offers, and purchase a plan. After purchase, credits are added locally and a request is sent to the backend to update the user’s balance.

The component also includes a confirmation popup with smooth animations and an explanatory section about the credits.

---

## **Main Imports**

- React, useState: for local state management.
- TranslationsDictionary: dictionary for text translation according to language.
- SubscriptionBox: child component displaying a plan card.
- useLang: custom hook to retrieve the selected language.
- framer-motion (motion, AnimatePresence): for animations.
- axios: to send HTTP requests to update credits on the backend.

---

## **Static Data**

```
const plansData = [
  {
    title: "Starter",
    priceEUR: "5",
    priceUSD: "6",
    credits: "50",
    bonus: "5",
  },
  // ...
  {
    title: "Legend",
    priceEUR: "150",
    priceUSD: "180",
    credits: "3500",
    bonus: "1000",
  },
];
```

- List of subscription plans with:
    - Title
    - Price in EUR and USD
    - Number of credits purchased
    - Bonus credits offered
    - Optional recommended plan indicator

---

## **Internal States (useState)**

- currency (string): selected currency ("EUR" or "USD"), default "EUR".
- selectedPlan (object | null): currently selected plan.
- showPopup (boolean): controls the display of the confirmation popup.

---

## **Main Features**

### **1. Currency Selection**

Buttons to toggle between EUR and USD that update the displayed prices on the plans.

---

### **2. Display Subscription Plans**

- Each plan is rendered via the SubscriptionBox component.
- Progressive appearance animation using framer-motion.
- Zoom and shadow effect on hover.
- Clicking a plan triggers the purchase.

---

### **3. Plan Purchase (handlePlanClick)**

- Updates selectedPlan and shows the popup.
- Locally adds to localStorage the sum of credits + bonus.
- Retrieves user id and accessToken from localStorage.
- Sends a PATCH request to /api/update-lumia-coin to update credits on the server, including authentication token.
- Handles possible errors.

---

### **4. Confirmation Popup**

- Shows the total number of credits added.
- “OK” button closes the popup.
- Uses AnimatePresence for smooth enter/exit animations.

---

### **5. Credits Explanation**

Section explaining what credits allow (uploads, access, purchases).

---

### **6. Payment Logos**

Displays Visa, Mastercard, and PayPal logos with hover animations.

---

## **Helper Function**

```
const getCurrencySymbol = () => (currency === "EUR" ? "€" : "$");
```

Returns the currency symbol to display.

---

## **Main JSX Structure**

```
<div>
  <motion.div> {/* Hero with title, description, currency toggle */} </motion.div>

  <div>
    <div className="grid"> {/* List of plans */} </div>

    <AnimatePresence> {/* Confirmation popup */} </AnimatePresence>

    <motion.div> {/* Credits explanation */} </motion.div>

    <motion.div> {/* Payment logos */} </motion.div>
  </div>
</div>
```

---

## **Important Notes**

- **Translation management** via TranslationsDictionary and current language selectedLang.
- **Smooth animations** implemented with Framer Motion.
- **Local storage and backend** credit balances are synchronized.
- **Responsive design** with an adaptive grid layout based on screen size.

---

## **Usage Example**

The component is typically used as a page within a React app:

```
import Subscription from './pages/Subscription';

function App() {
  return (
    <LangProvider>
      <Subscription />
    </LangProvider>
  );
}
```

------------------------------------------------------

FR

# Documentation du composant **Subscription**

## Description générale

Le composant **Subscription** est une page React qui permet aux utilisateurs de choisir parmi plusieurs plans d'abonnement pour acheter des crédits (LumiaCoins). Les utilisateurs peuvent sélectionner une devise (EUR ou USD), voir les différentes offres disponibles, puis acheter un plan. Après l'achat, les crédits sont ajoutés localement et une requête est envoyée au backend pour mettre à jour le solde utilisateur.

Le composant inclut aussi une popup de confirmation d'achat avec une animation fluide, et un bloc explicatif des crédits.

---

## Importations principales

- `React`, `useState` : pour gérer l’état local.
- `TranslationsDictionary` : dictionnaire pour la traduction des textes selon la langue.
- `SubscriptionBox` : composant enfant qui affiche une carte de plan.
- `useLang` : hook personnalisé pour récupérer la langue sélectionnée.
- `framer-motion` (`motion`, `AnimatePresence`) : pour les animations.
- `axios` : pour effectuer la requête HTTP de mise à jour des crédits sur le backend.

---

## Données statiques

```
const plansData = [
  {
    title: "Starter",
    priceEUR: "5",
    priceUSD: "6",
    credits: "50",
    bonus: "5",
  },
  ...
  {
    title: "Legend",
    priceEUR: "150",
    priceUSD: "180",
    credits: "3500",
    bonus: "1000",
  },
];

```

- Liste des différents plans d’abonnement avec :
    - Titre
    - Prix en EUR et USD
    - Nombre de crédits achetés
    - Bonus de crédits offerts
    - Indication du plan recommandé (optionnel)

---

## États internes (`useState`)

- `currency` (string) : devise sélectionnée (`"EUR"` ou `"USD"`), par défaut `"EUR"`.
- `selectedPlan` (object|null) : plan sélectionné actuellement.
- `showPopup` (boolean) : contrôle l’affichage de la popup de confirmation.

---

## Fonctionnalités principales

### 1. Sélection de la devise

Boutons pour basculer entre EUR et USD, qui modifient les prix affichés dans les plans.

---

### 2. Affichage des plans d’abonnement

- Chaque plan est affiché via le composant `SubscriptionBox`.
- Animation d’apparition progressive avec `framer-motion`.
- Effet de zoom et ombre au survol.
- Clic sur un plan déclenche l’achat.

---

### 3. Achat d’un plan (`handlePlanClick`)

- Met à jour `selectedPlan` et affiche la popup.
- Ajoute localement au `localStorage` la somme des crédits + bonus.
- Récupère l’`id` utilisateur et le `accessToken` depuis `localStorage`.
- Envoie une requête PATCH à `/api/update-lumia-coin` pour mettre à jour les crédits côté serveur, avec token d’authentification.
- Gère les erreurs éventuelles.

---

### 4. Popup de confirmation

- Affiche le nombre total de crédits ajoutés.
- Bouton "OK" ferme la popup.
- La popup utilise `AnimatePresence` pour animation d’apparition/disparition.

---

### 5. Explication des crédits

Bloc explicatif sur ce que permettent les crédits (upload, accès, achat).

---

### 6. Logos de paiement

Affiche les logos Visa, Mastercard, PayPal avec animation au survol.

---

## Fonction auxiliaire

```
const getCurrencySymbol = () => currency === "EUR" ? "€" : "$";

```

Retourne le symbole monétaire à afficher.

---

## Arborescence JSX principale

```jsx
<div>
  <motion.div> {/* Hero avec titre, description, toggle devise */}</motion.div>

  <div>
    <div className="grid"> {/* Liste des plans */}</div>

    <AnimatePresence> {/* Popup de confirmation */}</AnimatePresence>

    <motion.div> {/* Explication des crédits */}</motion.div>

    <motion.div> {/* Logos de paiement */}</motion.div>
  </div>
</div>

```

---

## Points importants

- **Gestion des traductions** via `TranslationsDictionary` et la langue courante `selectedLang`.
- **Animations fluides** avec Framer Motion.
- **Stockage local et backend** synchronisés pour les crédits.
- **Responsive** avec une grille adaptative selon la taille d’écran.

---

## Exemple d’utilisation

Le composant est typiquement utilisé comme page dans une app React :

```jsx
import Subscription from './pages/Subscription';

function App() {
  return (
    <LangProvider>
      <Subscription />
    </LangProvider>
  );
}

```