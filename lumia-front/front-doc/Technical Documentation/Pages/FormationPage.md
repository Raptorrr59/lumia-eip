EN

# **FormationPage Component Documentation**

## **Description**

FormationPage is a React component that displays a training path composed of several courses or modules. It handles step-by-step navigation, displays user progress, and allows marking modules or courses as completed via API calls. It also supports translations and displays community reviews.

---

## **Main Features**

- Retrieves training data from location.state; if not available, redirects to the course list.
- Displays paginated (step-by-step) content with a progress bar.
- Allows navigation between modules using “Previous” / “Next” buttons and a persistent sidebar index.
- Sends progress updates to the backend via Axios (/api/complete-module and /api/complete-course).
- Uses useLang for dynamic translation support.
- Displays community reviews using the ReviewsCommunity component.
- Uses Framer Motion for smooth animations.

---

## **Dependencies**

- react-router-dom: for URL parameters (useParams), navigation (useNavigate), and access to route state (useLocation).
- framer-motion: for animated transitions.
- axios: for HTTP requests.
- useLang and TranslationsDictionary: for multilingual support.
- ReviewsCommunity: to display user feedback at the end of the training.

---

## **Local State (useState)**

| **State** | **Type** | **Description** |
| --- | --- | --- |
| formation | object/null | Current formation data |
| activeStep | number | Index of the currently displayed module/course |

---

## **Effects (useEffect)**

- **Formation Initialization:**
    
    Checks if location.state.formation is defined. If so, sets formation and optionally initialStep. If not, redirects to /courses.
    
- **Scroll to Top on Step Change:**
    
    Smooth scrolls to the top of the page when the active module changes.
    

---

## **Core Functions**

### **handleCompleteModule**

- Retrieves the userId and token from localStorage.
- Sends a POST request to /api/complete-module with userId and moduleId to mark the training path as completed.
- On success, navigates back to /courses.
- Logs any error to the console.

---

### **handleNextStep**

- If not on the last module:
    - Sends a POST request to /api/complete-course with userId, courseId, moduleId, and the token to mark the current course as completed.
    - Increments activeStep to proceed to the next module.
- Logs both request and any errors.

---

### **handlePrevStep**

- Decrements activeStep to go back to the previous module (if not already at the first one).

---

## **JSX Structure**

- **Header**
    
    Back button to /courses, training title, and difficulty label.
    
- **Progress Bar**
    
    Shows current progress across the modules.
    
- **Main Content** (flex row layout)
    - **Sidebar (index):** clickable list of all modules to jump between steps.
    - **Current Module View:**
        - Title
        - Badges (language, difficulty, duration)
        - HTML-injected content
        - Navigation controls
- **Navigation Buttons**
    
    Previous (disabled on first module), and Next or Finish (on the last module).
    
- **Community Reviews**
    
    Displayed at the bottom using ReviewsCommunity.
    

---

## **Props Passed to**

## **ReviewsCommunity**

- moduleId: passed as id + 1 (be careful with string/number types).
- courseId: hardcoded as 0.

---

## **Translations**

Uses TranslationsDictionary with the current language (selectedLang) to translate static labels and texts such as:

| **Key** | **Example Translation** |
| --- | --- |
| back_to_courses | “Back to courses” |
| difficulty | “Difficulty” |
| next | “Next” |
| previous | “Previous” |
| end | “Finish” |
| index | “Index” |

---

## **Technical Notes**

- dangerouslySetInnerHTML is used to render HTML content from modules — make sure this content is sanitized and secure.
- API requests use auth tokens stored in localStorage, with appropriate headers for authorization.
- Framer Motion animations enhance transitions and overall UX.

----------------------------------

FR

# `FormationPage` Component Documentation

## Description

`FormationPage` est un composant React qui affiche une formation composée de plusieurs cours/modules. Il gère la navigation entre les étapes (cours/modules), affiche la progression, et permet à l'utilisateur de marquer les modules ou cours comme complétés via des appels API. Il intègre également un système de traduction et affiche les avis communautaires.

---

## Fonctionnalités principales

- Récupère les données de la formation depuis `location.state` ou redirige vers la liste des cours si aucune donnée n’est disponible.
- Affiche un contenu paginé (étape par étape) avec une barre de progression.
- Permet la navigation entre les modules via des boutons "Précédent" / "Suivant" et un index permanent en sidebar.
- Envoie les mises à jour de progression à l’API via Axios (`/api/complete-module` et `/api/complete-course`).
- Gère les traductions dynamiques selon la langue sélectionnée via `useLang`.
- Affiche les avis communautaires via le composant `ReviewsCommunity`.
- Effets d’animation fluide avec Framer Motion.

---

## Dépendances

- `react-router-dom`: pour la gestion des paramètres d’URL (`useParams`), la navigation (`useNavigate`) et l’accès à la localisation (`useLocation`).
- `framer-motion`: pour les animations.
- `axios`: pour les requêtes HTTP.
- `useLang` et `TranslationsDictionary`: gestion multilingue.
- `ReviewsCommunity`: composant pour afficher les avis utilisateurs.

---

## États locaux (useState)

| État | Type | Description |
| --- | --- | --- |
| `formation` | object/null | Données complètes de la formation courante |
| `activeStep` | number | Index du module/cours actuellement affiché |

---

## Effets (useEffect)

- **Chargement de la formation :**
    
    Vérifie si `location.state.formation` est défini. Si oui, initialise `formation` et l’étape active (`initialStep` si défini). Sinon, redirige vers `/courses`.
    
- **Scroll :**
    
    À chaque changement de module (step), scroll en douceur vers le haut de la page.
    

---

## Fonctions principales

### `handleCompleteModule`

- Récupère l’ID utilisateur et le token dans `localStorage`.
- Envoie une requête POST à `/api/complete-module` avec `userId` et `moduleId` pour marquer la formation complète.
- En cas de succès, navigue vers `/courses`.
- Logue les erreurs en cas d’échec.

---

### `handleNextStep`

- Si ce n’est pas le dernier module, envoie une requête POST à `/api/complete-course` avec les IDs utilisateur, cours, module, et le token pour marquer le cours comme complété.
- Incrémente `activeStep` pour passer au module suivant.
- Logue la requête et les erreurs.

---

### `handlePrevStep`

- Décrémente `activeStep` pour revenir au module précédent, si ce n’est pas déjà le premier.

---

## JSX Structure

- **Header**
    
    Bouton retour vers la page `/courses`, titre de la formation, difficulté affichée.
    
- **Barre de progression**
    
    Indique la progression actuelle à travers les modules de la formation.
    
- **Contenu principal** (flex row)
    - **Sidebar (index):** liste cliquable des modules permettant de changer d’étape.
    - **Contenu du cours actif :** titre, badges (langue, difficulté, durée), contenu HTML injecté, navigation entre étapes.
- **Boutons de navigation**
    
    `Précédent` (désactivé au premier module) et `Suivant` ou `Terminer` (au dernier module).
    
- **Avis communautaires**
    
    Affichés en bas avec `ReviewsCommunity`.
    

---

## Props utilisées dans `ReviewsCommunity`

- `moduleId`: passé comme `id + 1` (attention au type string/number selon `id`).
- `courseId`: fixé à `0`.

---

## Translations

Utilisation de `TranslationsDictionary` avec la langue courante `selectedLang` pour les labels et textes statiques (ex: "back_to_courses", "difficulty", "next", "previous", "end", "index").

---

## Notes techniques

- **dangerouslySetInnerHTML** est utilisé pour rendre le contenu HTML des modules. Assure-toi que le contenu est bien sécurisé.
- Les requêtes API utilisent des tokens stockés dans `localStorage`, avec les headers nécessaires pour l’authentification.
- Les animations avec Framer Motion améliorent l’expérience utilisateur sur les transitions.