EN

# **PythonRunner Component**

React component allowing dynamic execution of Python code directly in the browser using Pyodide.

---

## **Description**

- Loads Pyodide (a Python interpreter compiled to WebAssembly) when the component mounts.
- Allows the user to write and edit Python code in a text area.
- Executes the entered Python code on demand, capturing standard output (print) and errors.
- Displays the output or error message in a dedicated area below the editor.
- Supports light/dark mode through CSS classes.

---

## **Main Features**

| **Feature** | **Description** |
| --- | --- |
| Pyodide loading | Uses window.loadPyodide() to asynchronously load Pyodide on initial load. |
| Code editor | Multiline text area (textarea) for writing Python code, styled with monospace font. |
| Code execution | Button to run Python code via Pyodide, capturing output and errors. |
| Output display | <pre> element to show script output (stdout) or error messages. |
| Error handling | Catches and displays Python or JavaScript errors during code execution. |

---

## **Usage**

```
import PythonRunner from './components/PythonRunner';

function App() {
  return (
    <div>
      <PythonRunner />
    </div>
  );
}
```

---

## **Internal State (useState)**

| **State** | **Description** | **Type** | **Initial Value** |
| --- | --- | --- | --- |
| pyodide | Loaded Pyodide instance used to run Python code | object | null |
| code | Python code input by the user | string | 'a = 5\nb = 10\nprint("Sum is:", a + b)' |
| output | Result or error message from code execution | string | '' |

---

## **Component Behavior**

1. **Mount**: Loads Pyodide via window.loadPyodide() and stores the instance in pyodide.
2. **Input**: User types Python code in the textarea, updating code.
3. **Execution**: Clicking the “Run” button triggers runPython which:
    - Redirects sys.stdout and sys.stderr to a StringIO buffer to capture output.
    - Executes the Python code.
    - Retrieves and displays the captured output.
    - Displays error messages if execution fails.

---

## **Main JSX Structure**

- <textarea> for code input.
- <button> to execute the code.
- <pre> to display output or errors.

---

## **Notes**

- Pyodide must be preloaded on window.loadPyodide (typically included via an external script in index.html).
- The component does not handle autosave or history.
- Python errors are caught and shown, aiding debugging.

---------------------------------------

FR

# PythonRunner Component

Composant React permettant d’exécuter dynamiquement du code Python dans le navigateur via Pyodide.

---

## Description

- Charge Pyodide (un interpréteur Python compilé en WebAssembly) au montage du composant.
- Permet à l’utilisateur d’écrire et modifier du code Python dans une zone de texte.
- Exécute le code Python saisi à la demande, capture la sortie standard (print) et les erreurs.
- Affiche le résultat ou l’erreur dans une zone dédiée sous l’éditeur.
- Supporte le mode clair/sombre via classes CSS.

---

## Fonctionnalités principales

| Fonctionnalité | Description |
| --- | --- |
| Chargement Pyodide | Utilisation de `window.loadPyodide()` pour charger Pyodide asynchrone à la première charge. |
| Éditeur de code | Zone de texte multiligne (`textarea`) pour écrire du code Python, avec style monospace. |
| Exécution de code | Bouton pour exécuter le code Python via Pyodide, capture la sortie et les erreurs. |
| Affichage résultat | Zone `<pre>` pour afficher la sortie du script Python (stdout), ou un message d’erreur. |
| Gestion des erreurs | Capture et affiche les erreurs Python ou JavaScript lors de l’exécution du code. |

---

## Utilisation

```jsx
import PythonRunner from './components/PythonRunner';

function App() {
  return (
    <div>
      <PythonRunner />
    </div>
  );
}

```

---

## État interne (`useState`)

| État | Description | Type | Valeur initiale |
| --- | --- | --- | --- |
| `pyodide` | Instance Pyodide chargée pour exécuter Python | objet | `null` |
| `code` | Code Python saisi par l’utilisateur | string | `'a = 5\nb = 10\nprint("La somme est :", a + b)'` |
| `output` | Résultat ou erreur de l’exécution du code | string | `''` |

---

## Comportement du composant

1. **Montage** : charge Pyodide via `window.loadPyodide()` et stocke l’instance dans `pyodide`.
2. **Saisie** : l’utilisateur tape du code Python dans le textarea, mis à jour dans `code`.
3. **Exécution** : clic sur bouton `Exécuter` lance `runPython` qui :
    - Initialise `sys.stdout` et `sys.stderr` sur un buffer StringIO pour capturer la sortie.
    - Exécute le code Python saisi.
    - Récupère la sortie capturée et l’affiche.
    - En cas d’erreur, affiche le message d’erreur.

---

## Structure JSX principale

- `<textarea>` pour la saisie du code.
- `<button>` pour exécuter le code.
- `<pre>` pour afficher la sortie ou les erreurs.

---

## Remarques

- Pyodide doit être chargé au préalable sur `window.loadPyodide` (inclus via script externe dans index.html par exemple).
- Le composant ne gère pas l’autosave ou l’historique.
- Les erreurs Python sont capturées et affichées, ce qui facilite le débogage.