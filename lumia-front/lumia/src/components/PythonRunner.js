import React, { useEffect, useState } from 'react';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';

const PythonRunner = () => {
  const selectedLang = useLang();
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState('a = 5\nb = 10\nprint("La somme est :", a + b)');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodide = await window.loadPyodide();
      setPyodide(pyodide);
    };
    loadPyodide();
  }, []);

  const runPython = async () => {
    if (pyodide) {
      try {
        // Rediriger la sortie standard vers une StringIO
        await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
`);
        await pyodide.runPythonAsync(code);
        const result = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        setOutput(result || '(Exécuté sans retour)');
      } catch (err) {
        setOutput(`Erreur : ${err}`);
      }
    }
  };

  return (
    <div className="my-8  mx-auto px-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg overflow-hidden">
        <div className="p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-100"
          />
          <button
            onClick={runPython}
            className="mt-4 inline-block px-5 py-2.5 text-sm font-medium text-white bg-[#5328EA] rounded-lg hover:bg-[#4520c4] transition-colors"
          >
            {TranslationsDictionary[selectedLang]?.["execute"]}
          </button>
          <pre className="mt-4 text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PythonRunner;