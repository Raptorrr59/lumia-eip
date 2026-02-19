EN

# **CourseDetails**

# **Documentation — Component**

## **Description**

The CourseDetails component displays detailed information about a specific course selected via a URL parameter (courseId). It shows course info, styled HTML content, an embedded Python interpreter, a button to mark the course as completed, and a community reviews section.

---

## **Main Features**

- Fetches course data based on courseId from the URL.
- Displays course details: name, language, difficulty, image, and HTML content.
- Loads and renders an embedded Python interpreter (PythonRunner) in a dedicated container.
- Checks via API if the logged-in user has completed the course.
- Button to mark the course as completed (triggers a POST API call).
- Displays a community reviews section related to the course.
- Button text supports translations based on the selected language.

---

## **Required Imports**

- useParams from react-router-dom to get the course ID.
- Local coursesData containing the list of courses.
- StyledCourseContent for rendering styled HTML course content.
- Custom hook useLang for language management.
- ReviewsCommunity component for displaying reviews.
- createRoot from react-dom/client to mount the Python interpreter.
- axios for API requests.
- TranslationsDictionary for multilingual text.

---

## **Internal Hooks & Logic**

### **Get course by ID from URL**

```
const { courseId } = useParams();
const course = coursesData.find(c => c.id === parseInt(courseId));
```

### **Check if user completed the course (API GET)**

```
useEffect(() => {
  const checkCourseCompletion = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');

    if (userId && accessToken) {
      try {
        const response = await axios.get('/api/check-course', {
          params: { userId, courseId },
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setIsCompleted(response.data.completed);
      } catch (error) {
        console.error('Error checking course completion:', error);
      }
    }
  };

  checkCourseCompletion();
}, [courseId]);
```

### **Mark course as completed (API POST)**

```
const handleCompleteCourse = async () => {
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('accessToken');

  if (userId && accessToken) {
    try {
      await axios.post('/api/complete-course', { userId, courseId }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setIsCompleted(true);
      console.log('Course completed successfully');
    } catch (error) {
      console.error('Error completing course:', error);
    }
  }
};
```

### **Render Python interpreter inside container**

```
useEffect(() => {
  const container = document.getElementById('python-interpreter-root');
  if (container) {
    const root = createRoot(container);
    root.render(<PythonRunner />);
  }
}, []);
```

---

## **JSX Render Overview**

- Displays title, language, difficulty, image, and styled HTML content of the course.
- Button to mark as completed; disabled if already completed, with translated text.
- ReviewsCommunity section linked to the course.

---

## **Props & External Data**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| courseId | URL param | Selected course ID from the route |
| coursesData | Array | List of available courses (imported) |
| selectedLang | String | Current active language (via useLang()) |
| TranslationsDictionary | Object | Translations dictionary by language |

---

## **Internal State**

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| isCompleted | Boolean | Indicates whether the user has completed this course |

---

## **Error Handling and Edge Cases**

- Displays “Course not found!” if the courseId does not match any course.
- API request errors are logged to the console.

---

## **Styling**

- Uses TailwindCSS classes, including dark mode support.
- Button style changes dynamically depending on isCompleted state.

---

## **Usage Example**

The component is intended to be used in a route defined with a courseId parameter:

```
<Route path="/courses/:courseId" element={<CourseDetails />} />
```

---

## **Notes**

- userId and accessToken are retrieved from localStorage for authenticated requests.
- Assumes APIs /api/check-course and /api/complete-course exist and return expected data.
- The “Complete Course” button automatically adapts its label and disabled state based on completion status and language.

---------------------------------------------------------

FR

# Documentation — Composant `CourseDetails`

## Description

Le composant `CourseDetails` affiche les détails d’un cours spécifique sélectionné via un paramètre d’URL (`courseId`). Il présente les informations du cours, son contenu HTML stylisé, un interpréteur Python embarqué, un bouton pour marquer le cours comme terminé, et une section d’avis communautaires.

---

## Fonctionnalités principales

- Récupération du cours via son `courseId` passé en paramètre d’URL.
- Affichage des détails : nom, langue, difficulté, image, contenu.
- Chargement et rendu d’un interpréteur Python (`PythonRunner`) dans un container dédié.
- Vérification via une API si le cours est déjà terminé par l’utilisateur connecté.
- Bouton pour marquer le cours comme terminé (appel POST API).
- Affichage d’une section d’avis communautaires liée au cours.
- Traductions du texte du bouton via un dictionnaire selon la langue sélectionnée.

---

## Importations nécessaires

- `useParams` de `react-router-dom` pour récupérer l’ID du cours.
- Données locales `coursesData` (liste de cours).
- `StyledCourseContent` pour afficher du contenu HTML stylisé.
- Hook `useLang` pour la gestion de la langue.
- Composant `ReviewsCommunity` pour les avis.
- `createRoot` de `react-dom/client` pour intégrer l’interpréteur Python.
- `axios` pour les requêtes API.
- `TranslationsDictionary` pour gérer les traductions.

---

## Hooks et logique interne

### Récupération et filtrage du cours

```
const { courseId } = useParams();
const course = coursesData.find(c => c.id === parseInt(courseId));

```

### Vérification si l’utilisateur a complété le cours (API GET)

```
useEffect(() => {
  const checkCourseCompletion = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');

    if (userId && accessToken) {
      try {
        const response = await axios.get('/api/check-course', {
          params: { userId, courseId },
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setIsCompleted(response.data.completed);
      } catch (error) {
        console.error('Error checking course completion:', error);
      }
    }
  };

  checkCourseCompletion();
}, [courseId]);

```

### Bouton pour marquer le cours comme complété (API POST)

```
const handleCompleteCourse = async () => {
  const userId = localStorage.getItem('id');
  const accessToken = localStorage.getItem('accessToken');

  if (userId && accessToken) {
    try {
      await axios.post('/api/complete-course', { userId, courseId }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setIsCompleted(true);
      console.log('Course completed successfully');
    } catch (error) {
      console.error('Error completing course:', error);
    }
  }
};

```

### Intégration du composant PythonRunner

```
useEffect(() => {
  const container = document.getElementById('python-interpreter-root');
  if (container) {
    const root = createRoot(container);
    root.render(<PythonRunner />);
  }
}, []);

```

---

## Rendu JSX

- Affiche le titre, langue, difficulté, image et contenu HTML du cours.
- Bouton pour compléter le cours, désactivé si déjà complété, avec texte traduit.
- Section `ReviewsCommunity` liée au cours.

---

## Props et données externes

| Nom | Type | Description |
| --- | --- | --- |
| `courseId` | URL param | ID du cours sélectionné dans la route |
| `coursesData` | Array | Liste des cours disponibles (importée) |
| `selectedLang` | String | Langue active du site (via `useLang()`) |
| `TranslationsDictionary` | Object | Dictionnaire des traductions par langue |

---

## États internes

| Nom | Type | Description |
| --- | --- | --- |
| `isCompleted` | Boolean | Indique si l’utilisateur a complété ce cours |

---

## Messages d’erreur et gestion des cas particuliers

- Si le `courseId` ne correspond à aucun cours, affiche « Cours introuvable ! ».
- Erreurs de requête API affichées dans la console.

---

## Styles

- Utilisation de classes TailwindCSS pour la mise en forme, notamment le fond sombre en mode `dark`.
- Bouton avec styles dynamiques selon l’état `isCompleted`.

---

## Exemple d’utilisation

Le composant est prévu pour être utilisé dans une route définie avec un paramètre `courseId` :

```jsx
<Route path="/courses/:courseId" element={<CourseDetails />} />

```

---

## Notes

- Les tokens `userId` et `accessToken` sont récupérés depuis le `localStorage` pour l’authentification des requêtes.
- Le composant suppose que les APIs `/api/check-course` et `/api/complete-course` existent et retournent les données au format attendu.
- Le bouton « Complete Course » s’adapte automatiquement au statut et à la langue.