EN

# **Home Page Documentation**

## **General Description**

The **Home** page is the main entry point of the application. It features several key sections:

- A hero banner with a catchy message and buttons linking to the games and courses
- Global platform statistics
- An introduction to courses and games with interactive cards
- An explanatory video section
- A carousel showcasing the available games
- A preview of the user leaderboard
- A section with community reviews and ratings

The page uses various hooks to manage state, fetch data, and check authentication.

---

## **Main Features**

### **1. Authentication Token Verification (**

### **useEffect**

### **hook)**

- On initial load (componentDidMount), the page checks for the validity of the JWT token stored in localStorage.
- If the token is invalid or missing, it is removed, and the page reloads to force logout.

### **2. Leaderboard Data Fetching**

- The page fetches leaderboard data from the API /api/allrankingcategories via an HTTP request.
- This data is stored in the leaderboardData state and displayed in the ranking section.

### **3. Review Management**

- The page controls the open/close state of a review modal (ReviewModal).
- Reviews are displayed using the ReviewComponent from a static initial list.

---

## **State (useState)**

| **State Name** | **Type** | **Description** |
| --- | --- | --- |
| isReviewOpen | boolean | Controls the visibility of the review modal |
| reviews | Array | List of user reviews (can evolve) |
| leaderboardData | Array | Leaderboard data fetched from the API |

---

## **Main Hooks**

- useLang() : Custom hook that returns the selected language for internationalization.
- useEffect (auth verification): Checks and validates the authentication token on page mount.
- useEffect (leaderboard fetching): Retrieves leaderboard data at component mount.

---

## **Page Structure**

### **Key Sections**

- **Hero Section**
    - Main title with animation
    - Catchy intro text
    - Buttons to “Games” and “Courses”
    - Animated scroll indicator
- **Statistics**
    - Displays icons and key figures (e.g., number of students, success rate)
- **Courses/Games Preview**
    - Interactive cards linking to courses and games pages
    - Embedded video (YouTube) with a description
- **Games Carousel**
    - Showcases available games in a scrolling carousel
- **Leaderboard**
    - Ranking preview with action buttons (subscribe, view full leaderboard)
- **Community Reviews**
    - List of user reviews with a modal to submit new reviews

---

## **Main Dependencies**

- framer-motion: smooth animations for transitions and interactions
- axios: HTTP requests
- react-router-dom: page navigation
- lucide-react: SVG icons used on the page
- TranslationsDictionary and useLang: internationalization support

---

## **Important Functions (Snippet)**

```
const verifyToken = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get('/api/verify', {
        headers: { 'Authorization': token }
      });
      if (!response.data.valid) {
        localStorage.clear();
        window.location.reload();
      }
    } catch {
      localStorage.clear();
      window.location.reload();
    }
  }
};

const fetchLeaderboard = async () => {
  try {
    const response = await axios.get('/api/allrankingcategories', {
      headers: { 'Authorization': localStorage.getItem('accessToken') }
    });
    if (Array.isArray(response.data)) {
      setLeaderboardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
};
```

---

## **Usage Tips**

- This page is designed to be used as the landing page in a React router.
- Make sure the APIs /api/verify and /api/allrankingcategories are secure and functioning correctly.
- The translation system must be properly initialized using the LangProvider.
- Ensure that child components (RankingRow, CarousselPresentation, ReviewComponent, ReviewModal) are correctly wired to their respective data sources.

-------------------------------------

FR

# Documentation de la page `Accueil`

## Description générale

La page **`Accueil`** est la page principale d'entrée de l'application. Elle présente plusieurs sections clés :

- Un hero avec un message d'accroche et des boutons vers les jeux et les cours
- Des statistiques globales sur la plateforme
- Une introduction aux cours et jeux avec des cartes interactives
- Une section vidéo explicative
- Un carrousel présentant les jeux disponibles
- Un aperçu du classement des utilisateurs
- Une section avec des avis et notes de la communauté

La page fait appel à plusieurs hooks pour gérer l'état, récupérer les données et vérifier l'authentification.

---

## Fonctionnalités principales

### 1. Vérification du token d'authentification (hook `useEffect`)

- À la première montée en charge (`componentDidMount`), la page vérifie la validité du token JWT stocké dans `localStorage`.
- Si le token est invalide ou absent, il est supprimé, et la page est rechargée pour forcer la déconnexion.

### 2. Chargement des données du classement

- La page récupère via une requête HTTP les données des différents classements depuis l'API `/api/allrankingcategories`.
- Ces données sont stockées dans l'état `leaderboardData` et affichées dans la section classement.

### 3. Gestion des avis

- La page gère l'ouverture/fermeture d'un modal d'avis (`ReviewModal`).
- Les avis sont affichés via le composant `ReviewComponent` à partir d'une liste statique initiale.

---

## États (`useState`)

| Nom d'état | Type | Description |
| --- | --- | --- |
| `isReviewOpen` | `boolean` | Contrôle l'ouverture du modal d'avis |
| `reviews` | `Array` | Liste des avis utilisateurs (peut évoluer) |
| `leaderboardData` | `Array` | Données de classement récupérées depuis l'API |

---

## Hooks principaux

- `useLang()` : Hook custom qui retourne la langue sélectionnée pour l'internationalisation.
- `useEffect` (vérification token) : Vérifie et valide le token d'authentification.
- `useEffect` (récupération classement) : Récupère les données du classement en début de rendu.

---

## Structure de la page

### Sections importantes

- **Hero Section**
    - Titre principal avec animation
    - Texte d'accroche
    - Boutons vers "Jeux" et "Cours"
    - Indicateur de scroll animé
- **Statistiques**
    - Affiche des icônes avec des chiffres clés (ex: nombre d’étudiants, taux de réussite)
- **Présentation Cours/Jeux**
    - Cartes interactives menant aux pages de cours et jeux
    - Vidéo intégrée (YouTube) avec description
- **Carrousel Jeux**
    - Affiche un carrousel des jeux disponibles
- **Classement**
    - Aperçu du classement avec boutons d'action (s'abonner, voir le classement complet)
- **Avis de la communauté**
    - Liste des avis utilisateurs avec possibilité d'ajouter un avis via modal

---

## Dépendances principales

- `framer-motion` : animations fluides pour les transitions et interactions
- `axios` : pour les requêtes HTTP
- `react-router-dom` : navigation entre pages
- `lucide-react` : icônes SVG utilisées dans la page
- `TranslationsDictionary` et `useLang` : gestion de l’internationalisation

---

## Extrait des fonctions importantes

```
const verifyToken = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get('/api/verify', {
        headers: { 'Authorization': token }
      });
      if (!response.data.valid) {
        localStorage.clear();
        window.location.reload();
      }
    } catch {
      localStorage.clear();
      window.location.reload();
    }
  }
};

const fetchLeaderboard = async () => {
  try {
    const response = await axios.get('/api/allrankingcategories', {
      headers: { 'Authorization': localStorage.getItem('accessToken') }
    });
    if (Array.isArray(response.data)) {
      setLeaderboardData(response.data);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
};

```

---

## Conseils d'utilisation

- La page est conçue pour être la page d'accueil, intégrer dans un routeur React.
- Assure-toi que les API `/api/verify` et `/api/allrankingcategories` sont fonctionnelles et sécurisées.
- Le système de traduction doit être correctement initialisé via `LangProvider`.
- Les composants enfants (`RankingRow`, `CarousselPresentation`, `ReviewComponent`, `ReviewModal`) doivent être bien connectés à leurs données.