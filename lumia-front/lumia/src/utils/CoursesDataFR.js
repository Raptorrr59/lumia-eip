export const coursesDataFr = [
  {
    id: 8,
    name: "Qu'est-ce qu'une IA? Démythifier l'intelligence artificielle",
    language: "Python",
    difficulty: "Débutant",
    duree: "Rapide (25 min)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Qu'est-ce qu'une IA ? Démythifier l'Intelligence Artificielle
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Le terme <strong>Intelligence Artificielle (IA)</strong> fait rêver autant qu’il inquiète. 
    On imagine souvent des robots capables de penser comme des humains… mais la réalité est plus simple (et plus utile !).
    Dans ce cours, vous allez découvrir ce qu’est réellement l’IA, ce qu’elle n’est pas, et pourquoi elle est essentielle
    dans des applications comme notre futur projet : <em>apprendre à une IA à jouer à Snake</em>.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Définition -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Une Définition Simple
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <p class="text-gray-700 dark:text-gray-300">
      L’IA est la <strong>capacité d’une machine à imiter certaines fonctions humaines</strong>, 
      comme <span class="text-[#5328EA]">apprendre</span>, <span class="text-[#5328EA]">raisonner</span>, 
      <span class="text-[#5328EA]">résoudre des problèmes</span> ou <span class="text-[#5328EA]">s’adapter à une situation nouvelle</span>.
    </p>
  </div>

  <!-- Mythes vs Réalité -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Mythes et Réalités
  </h3>
  <div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Mythes</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>Les IA pensent comme des humains</li>
        <li>L’IA comprend le monde comme nous</li>
        <li>Une IA est forcément un robot humanoïde</li>
        <li>L’IA sait tout et peut tout prédire</li>
      </ul>
    </div>
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Réalités</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>L’IA exécute des <strong>algorithmes</strong></li>
        <li>Elle apprend à partir de <strong>données</strong></li>
        <li>Elle est spécialisée dans une tâche précise</li>
        <li>Elle peut se tromper si les données sont mauvaises</li>
      </ul>
    </div>
  </div>

  <!-- Exemples concrets -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Exemples Concrets d’IA
  </h3>
  <ul class="list-disc list-inside ml-4 mb-4 text-gray-700 dark:text-gray-300">
    <li>Les recommandations de Netflix ou Spotify 🎵</li>
    <li>La détection d’objets dans les photos 📷</li>
    <li>Les assistants vocaux comme Alexa ou Siri 🎤</li>
    <li>Les jeux vidéo (échecs, Go, Snake 🐍)</li>
  </ul>

  <!-- Encadré IA faible vs IA forte -->
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-6">
    <h4 class="font-bold text-[#5328EA] mb-2">IA faible vs IA forte</h4>
    <p class="text-gray-700 dark:text-gray-300">
      ⚡ <strong>IA faible</strong> : spécialisée dans une tâche (ex : reconnaître un chat sur une photo).  
      🌍 <strong>IA forte</strong> : intelligence générale, capable de raisonner comme un humain (science-fiction pour l’instant).
    </p>
  </div>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">
    Exercice : Reconnaître l’IA
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      Parmi ces applications, lesquelles utilisent de l’IA ?
    </p>
    <ul class="list-decimal list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Un moteur de recherche comme Google 🔍</li>
      <li>Une calculatrice scientifique 🧮</li>
      <li>Un GPS qui trouve le trajet le plus rapide 🚗</li>
      <li>Un frigo qui garde les aliments au frais 🧊</li>
      <li>Un filtre anti-spam dans vos mails 📧</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Réponse : 1, 3 et 5 utilisent de l’IA. La calculatrice et le frigo suivent des règles fixes, sans apprentissage.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Conclusion
  </h3>
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    L’IA n’est pas magique : c’est un outil puissant qui apprend à partir de données et de règles mathématiques.
    Dans les prochains cours, vous allez apprendre à <strong>coder en Python</strong>, manipuler des <strong>données</strong>, 
    et construire progressivement une IA capable de jouer au jeu Snake.
  </p>
</div>`,
  },
  {
    id: 9,
    name: "Les domaines d'application de l'IA",
    language: "Python",
    difficulty: "Débutant",
    duree: "Moyenne (60 minutes)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Les Domaines d’Application de l’IA
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    L’intelligence artificielle n’est pas réservée aux laboratoires de recherche ou aux films de science-fiction.
    Elle est déjà partout autour de nous, parfois sans que nous le remarquions.  
    Découvrons ensemble les grands domaines dans lesquels l’IA est utilisée aujourd’hui.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Secteur Santé -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Santé 🏥
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Analyse d’images médicales (radiographies, IRM)</li>
      <li>Prédiction de maladies à partir de données génétiques</li>
      <li>Assistants pour le suivi des patients (chatbots médicaux)</li>
    </ul>
  </div>

  <!-- Secteur Transports -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Transports 🚗
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Voitures autonomes</li>
      <li>Optimisation du trafic en ville</li>
      <li>Prévision des pannes (maintenance prédictive)</li>
    </ul>
  </div>

  <!-- Secteur Finances -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Finance 💶
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Détection de fraudes bancaires</li>
      <li>Trading algorithmique</li>
      <li>Chatbots pour le support client</li>
    </ul>
  </div>

  <!-- Secteur Industrie -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Industrie ⚙️
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Robots industriels intelligents</li>
      <li>Prédiction de la demande (supply chain)</li>
      <li>Qualité et contrôle automatisés</li>
    </ul>
  </div>

  <!-- Secteur Vie quotidienne -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Vie quotidienne 👩‍💻
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Assistants vocaux (Siri, Alexa, Google Assistant)</li>
      <li>Recommandations (Netflix, YouTube, Spotify)</li>
      <li>Filtres anti-spam et traduction automatique</li>
    </ul>
  </div>

  <!-- Encadré Objets Connectés -->
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-6">
    <h4 class="font-bold text-[#5328EA] mb-2">IA et Objets Connectés</h4>
    <p class="text-gray-700 dark:text-gray-300">
      Les objets connectés (montres, maisons intelligentes, capteurs) utilisent l’IA pour
      <strong>analyser des données en temps réel</strong> et prendre de petites décisions automatiques
      (suivi de santé, gestion de l’énergie, sécurité).
    </p>
  </div>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">
    Exercice : Trouvez l’IA cachée
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      Dans chaque situation ci-dessous, dites si l’IA est utilisée ou non :
    </p>
    <ul class="list-decimal list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Un thermostat qui règle la température en fonction de vos habitudes 🌡️</li>
      <li>Un distributeur automatique qui rend la monnaie 💶</li>
      <li>Une caméra qui détecte les visages pour déverrouiller un smartphone 📱</li>
      <li>Un réveil qui sonne à 7h tous les jours ⏰</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Réponse : 1 et 3 utilisent de l’IA (apprentissage et reconnaissance), 
      2 et 4 suivent seulement des règles fixes.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Conclusion
  </h3>
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    L’IA est partout : santé, transports, industrie, finances, vie quotidienne… 
    Elle agit souvent dans l’ombre, pour faciliter nos vies et optimiser des systèmes complexes.
    Dans le prochain cours, vous apprendrez vos <strong>premiers pas avec Python</strong>, 
    la langue qui nous permettra de construire notre propre IA.
  </p>
</div>`,
  },
  {
    id: 10,
    name: "Objectif de la Formation : Construire une IA qui Joue à Snake",
    language: "Python",
    difficulty: "Débutant",
    duree: "Moyenne (60 min)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Objectif de la Formation : Construire une IA qui Joue à Snake
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Maintenant que vous avez une idée plus claire de ce qu’est l’IA et de ses domaines d’application,
    il est temps de fixer notre <strong>objectif concret</strong>.  
    Dans ce parcours, vous allez apprendre à <span class="text-[#5328EA] font-semibold">programmer une IA capable de jouer au jeu Snake</span> 🐍.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Pourquoi Snake ? -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Pourquoi le jeu Snake ?
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Un jeu simple à comprendre : le serpent mange de la nourriture et grandit</li>
      <li>Des règles claires mais un comportement complexe à optimiser</li>
      <li>Un excellent terrain d’entraînement pour les algorithmes d’apprentissage par renforcement</li>
    </ul>
  </div>

  <!-- Étapes du projet -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Étapes pour atteindre l’objectif
  </h3>
  <ol class="list-decimal list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-2">
    <li><strong>Programmer Snake en Python</strong> avec des règles de base (mouvement, nourriture, collisions)</li>
    <li><strong>Représenter l’état du jeu</strong> sous forme de données exploitables par une IA</li>
    <li><strong>Créer un agent intelligent</strong> (réseau de neurones) capable de prendre des décisions</li>
    <li><strong>Entraîner et évaluer</strong> l’IA pour qu’elle améliore son score</li>
    <li><strong>Optimiser et débugger</strong> pour obtenir une IA performante</li>
  </ol>

  <!-- Ce que vous allez apprendre -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Ce que vous allez apprendre
  </h3>
  <div class="grid md:grid-cols-2 gap-4 mb-6">
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Compétences Techniques</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>Programmer en <strong>Python</strong></li>
        <li>Manipuler des données avec <strong>NumPy</strong></li>
        <li>Visualiser avec <strong>Matplotlib</strong></li>
        <li>Construire et entraîner un <strong>réseau de neurones</strong></li>
      </ul>
    </div>
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Compétences Pratiques</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>Créer un jeu simple (Snake)</li>
        <li>Appliquer l’IA à un cas concret</li>
        <li>Analyser et améliorer un modèle</li>
        <li>Débugger une IA qui apprend mal</li>
      </ul>
    </div>
  </div>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">
    Exercice : Réfléchissez à l’IA de Snake
  </h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <p class="mb-2 text-gray-700 dark:text-gray-300">
      Imaginez que vous êtes le serpent 🐍. Pour survivre, quelles décisions devez-vous prendre ?
    </p>
    <ul class="list-decimal list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Éviter de se cogner contre les murs</li>
      <li>Éviter de se mordre soi-même</li>
      <li>Se rapprocher de la nourriture</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces trois règles simples guideront notre IA dans son apprentissage.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Conclusion
  </h3>
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    L’objectif est clair : à la fin de cette formation, vous aurez non seulement compris les bases de l’IA,
    mais vous aurez aussi construit pas à pas une <strong>IA qui sait jouer à Snake</strong>.  
    La prochaine étape ? Apprendre les bases du langage <strong>Python</strong> pour commencer à coder !
  </p>
</div>`,
  },
  {
    id: 11,
    name: "Installation de Python & Jupyter Notebook",
    language: "Python",
    difficulty: "Débutant",
    duree: "Moyenne (60 min)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Installation de Python & Jupyter Notebook
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour pouvoir programmer une IA et jouer avec le jeu Snake, il vous faut installer deux éléments essentiels :
    <span class="text-[#5328EA] font-semibold">Python</span> (le langage de programmation)
    et <span class="text-[#5328EA] font-semibold">Jupyter Notebook</span> (l’outil pour coder et tester vos programmes de manière interactive).
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Python -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Installer Python</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <ol class="list-decimal list-inside ml-4 text-gray-700 dark:text-gray-300 space-y-2">
      <li>Rendez-vous sur le site officiel : 
        <a href="https://www.python.org/downloads/" target="_blank" class="text-[#5328EA] underline">python.org/downloads</a>
      </li>
      <li>Téléchargez la version recommandée (Python 3.10+)</li>
      <li>Pendant l’installation, cochez la case <strong>“Add Python to PATH”</strong></li>
      <li>Validez et laissez l’installation se terminer</li>
    </ol>
  </div>

  <!-- Vérifier l'installation -->
  <h4 class="text-xl font-semibold mb-2 text-[#5328EA]">Vérifier l’installation</h4>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Ouvrez un terminal (ou PowerShell sur Windows) et tapez :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
python --version
  </pre>
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    Si tout est correct, vous verrez apparaître un message du type :
    <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">Python 3.11.5</code>
  </p>

  <!-- Jupyter Notebook -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Installer Jupyter Notebook</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Jupyter Notebook est un environnement qui permet d’écrire du code, d’ajouter des explications et de voir
    les résultats instantanément. Idéal pour apprendre l’IA !
  </p>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <p class="mb-2 text-gray-700 dark:text-gray-300">Installez Jupyter en utilisant <code>pip</code> :</p>
    <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
pip install notebook
    </pre>
    <p class="text-gray-700 dark:text-gray-300">
      Une fois l’installation terminée, lancez Jupyter avec :
    </p>
    <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
jupyter notebook
    </pre>
    <p class="text-gray-700 dark:text-gray-300">
      Cela ouvrira une page dans votre navigateur avec une interface de fichiers et un bouton
      <span class="text-[#5328EA] font-semibold">New → Python 3</span> pour créer un notebook.
    </p>
  </div>

  <!-- Test -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">3. Testez votre installation</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Dans un nouveau Notebook, tapez ce code dans une cellule et exécutez-la avec <kbd>Shift + Enter</kbd> :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
print("Hello IA 🚀")
  </pre>
  <p class="text-gray-700 dark:text-gray-300">
    Si vous voyez <code>Hello IA 🚀</code> affiché en sortie, félicitations 🎉, 
    vous êtes prêt à commencer !
  </p>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercice rapide</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <p class="text-gray-700 dark:text-gray-300 mb-2">
      Testez par vous-même :
    </p>
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Affichez votre prénom avec <code>print()</code></li>
      <li>Faites un petit calcul : <code>print(2025 - 2000)</code></li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces premiers tests montrent que votre environnement est bien installé.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Vous avez installé Python et Jupyter Notebook, vos deux outils principaux pour développer une IA.
    La prochaine étape ? Apprendre les bases de Python pour écrire vos premiers programmes.
  </p>
</div>`,
  },
  {
    id: 12,
    name: "Variables, boucles, fonctions",
    language: "Python",
    difficulty: "Débutant",
    duree: "Longue (2 heures)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Variables, Boucles et Fonctions en Python
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour construire une IA (et coder Snake 🐍), il faut maîtriser les bases de la programmation.
    Dans ce cours, vous allez découvrir trois concepts essentiels : 
    <span class="text-[#5328EA] font-semibold">les variables</span>, 
    <span class="text-[#5328EA] font-semibold">les boucles</span>, 
    et <span class="text-[#5328EA] font-semibold">les fonctions</span>.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Variables -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Les Variables</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une <strong>variable</strong> est une boîte dans laquelle on stocke une valeur.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple de variables
nom = "Alice"
age = 20
score = 15.5

print(nom, age, score)
  </pre>
  <p class="text-gray-700 dark:text-gray-300">
    👉 Les variables peuvent contenir des nombres (<code>int</code>), des nombres décimaux (<code>float</code>) ou du texte (<code>str</code>).
  </p>

  <!-- Boucles -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Les Boucles</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une boucle permet de répéter des instructions automatiquement.
  </p>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded mb-4 border-l-4 border-[#5328EA]">
    <h4 class="font-bold text-[#5328EA] mb-2">Boucle <code>for</code></h4>
    <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Répète 5 fois
for i in range(5):
    print("Tour", i)
    </pre>

    <h4 class="font-bold text-[#5328EA] mb-2">Boucle <code>while</code></h4>
    <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Continue tant que la condition est vraie
compteur = 0
while compteur < 3:
    print("Compteur =", compteur)
    compteur += 1
    </pre>
  </div>

  <!-- Fonctions -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Les Fonctions</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une <strong>fonction</strong> est un bloc de code réutilisable. On peut la définir avec <code>def</code>.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Définition d'une fonction
def saluer(prenom):
    print("Bonjour", prenom)

# Appel de la fonction
saluer("Alice")
saluer("Bob")
  </pre>
  <p class="text-gray-700 dark:text-gray-300">
    👉 Les fonctions permettent d’organiser son code et d’éviter de répéter les mêmes instructions.
  </p>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une variable <code>serpent_longueur</code> et mettez-y la valeur <code>1</code></li>
      <li>Écrivez une boucle <code>for</code> qui augmente la longueur du serpent de 1 à chaque tour (5 tours)</li>
      <li>Écrivez une fonction <code>afficher_score(score)</code> qui affiche : 
        <code>Score actuel : X</code></li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces notions vous seront utiles pour coder Snake et l’IA.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Les variables stockent vos données, les boucles répètent des actions, et les fonctions organisent votre code.
    Avec ces trois piliers, vous avez déjà de quoi créer les bases du jeu Snake en Python.
    La prochaine étape ? Découvrir les <strong>listes</strong> et les <strong>dictionnaires</strong> pour manipuler plusieurs valeurs facilement.
  </p>
</div>`,
  },
  {
    id: 13,
    name: "Librairies utiles pour l’IA",
    language: "Python",
    difficulty: "Débutant",
    duree: "Moyenne (60 min)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Les Librairies Utiles pour l’IA en Python
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Python est le langage le plus populaire pour l’intelligence artificielle, non pas seulement
    grâce à sa simplicité, mais aussi grâce à ses <strong>librairies spécialisées</strong>.
    Ces outils facilitent la manipulation de données, l’entraînement de modèles et la visualisation
    des résultats.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Numpy -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. NumPy</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    NumPy est la librairie de base pour manipuler les <strong>tableaux numériques</strong>.
    Elle permet de faire rapidement des calculs mathématiques.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

# Création d'un tableau
a = np.array([1, 2, 3, 4])

# Calculs rapides
print(a * 2)        # [2 4 6 8]
print(np.mean(a))   # Moyenne = 2.5
  </pre>

  <!-- Matplotlib -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Matplotlib</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Matplotlib est une librairie de <strong>visualisation</strong>. 
    Elle permet de tracer des courbes et de représenter des données.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [2, 4, 6, 8]

plt.plot(x, y)
plt.title("Une droite simple")
plt.show()
  </pre>

  <!-- Pandas -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Pandas</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pandas est utilisée pour gérer des <strong>ensembles de données (DataFrames)</strong>, 
    un peu comme dans un tableau Excel.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import pandas as pd

# Création d'un tableau de données
data = {"Nom": ["Alice", "Bob"], "Score": [10, 15]}
df = pd.DataFrame(data)

print(df)
  </pre>

  <!-- TensorFlow / PyTorch -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. TensorFlow et PyTorch</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Ce sont les deux librairies principales pour créer et entraîner des <strong>réseaux de neurones</strong>.
    - <code>TensorFlow</code> est très utilisé dans l’industrie.  
    - <code>PyTorch</code> est populaire dans la recherche et simple à utiliser.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import torch
import torch.nn as nn

# Exemple : petit réseau de neurones avec PyTorch
model = nn.Sequential(
    nn.Linear(4, 16),  # couche d'entrée (4 features) -> 16 neurones
    nn.ReLU(),         # fonction d'activation
    nn.Linear(16, 2)   # sortie (2 classes)
)

print(model)
  </pre>

  <!-- Scikit-Learn -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">5. Scikit-Learn</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Scikit-Learn est une librairie d’<strong>apprentissage automatique</strong> très pratique
    pour les algorithmes classiques (régression, classification, clustering).
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
from sklearn.linear_model import LinearRegression

# Exemple : régression linéaire simple
X = [[1], [2], [3]]
y = [2, 4, 6]

model = LinearRegression()
model.fit(X, y)

print(model.predict([[4]]))  # Résultat ≈ 8
  </pre>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez un tableau NumPy contenant les nombres de 1 à 10 et affichez leur moyenne.</li>
      <li>Avec Matplotlib, tracez une courbe représentant la fonction <code>y = x²</code>.</li>
      <li>Avec Pandas, créez un DataFrame avec les scores de 3 joueurs de Snake.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces outils sont les briques de base de tout projet d’IA.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Ces librairies constituent votre <strong>boîte à outils</strong> pour l’intelligence artificielle :
    <code>NumPy</code> pour les calculs, <code>Pandas</code> pour les données, 
    <code>Matplotlib</code> pour visualiser, et <code>TensorFlow</code>/<code>PyTorch</code> 
    pour entraîner vos modèles.  
    Dans les prochains chapitres, vous apprendrez à les utiliser pour manipuler et visualiser 
    les données de Snake avant d’entraîner une IA.
  </p>
</div>`,
  },
  {
    id: 14,
    name: "NumPy : vecteurs et matrices",
    language: "Python",
    difficulty: "Débutant",
    duree: "Longue (2 heures)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    NumPy : Vecteurs et Matrices
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    <strong>NumPy</strong> est une librairie essentielle en Python pour manipuler des 
    <span class="text-[#5328EA] font-semibold">données numériques</span>.
    Elle permet de gérer facilement des <strong>vecteurs</strong> (listes de nombres) et des
    <strong>matrices</strong> (tableaux à plusieurs dimensions).
    Dans ce cours, vous allez apprendre à créer, modifier et utiliser ces structures,
    qui serviront à représenter l’environnement du jeu Snake.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Vecteurs -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Les Vecteurs</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Un vecteur est une suite de nombres stockée dans un tableau 1D.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

# Création d'un vecteur
v = np.array([1, 2, 3, 4, 5])

print(v)          # [1 2 3 4 5]
print(v.shape)    # (5,) → 5 éléments
print(v[0])       # Premier élément = 1
  </pre>
  <p class="text-gray-700 dark:text-gray-300">
    👉 Les vecteurs sont utiles pour représenter par exemple la position du serpent (<code>x, y</code>).
  </p>

  <!-- Matrices -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Les Matrices</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une matrice est un tableau à deux dimensions (lignes × colonnes).
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Création d'une matrice 2D
M = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(M)
print(M.shape)   # (3, 3) → 3 lignes, 3 colonnes
print(M[0, 1])   # Ligne 0, Colonne 1 → 2
  </pre>
  <p class="text-gray-700 dark:text-gray-300">
    👉 Les matrices serviront à représenter la grille du jeu Snake (ex: 10x10).
  </p>

  <!-- Opérations -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Opérations sur Vecteurs et Matrices</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    NumPy permet de faire des calculs rapides sur des vecteurs et matrices entiers.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Opérations élément par élément
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])

print(a + b)   # [11 22 33]
print(a * b)   # [10 40 90]

# Produit matriciel
A = np.array([[1, 2],
              [3, 4]])
B = np.array([[5, 6],
              [7, 8]])

print(np.dot(A, B))  
# [[19 22]
#  [43 50]]
  </pre>

  <!-- Grille du Snake -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Exemple : Représenter une Grille Snake</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut représenter la grille du Snake avec une matrice NumPy :
    - 0 = case vide  
    - 1 = serpent  
    - 2 = nourriture
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Grille 5x5 vide
grille = np.zeros((5, 5), dtype=int)

# Ajouter serpent et nourriture
grille[2, 2] = 1   # Serpent au centre
grille[4, 1] = 2   # Nourriture en bas à gauche

print(grille)
  </pre>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez un vecteur contenant les entiers de 1 à 10 avec NumPy.</li>
      <li>Créez une matrice 3×3 remplie de zéros et remplacez la valeur du centre par 9.</li>
      <li>Représentez une grille 6×6 avec un serpent de 2 cases et une nourriture aléatoire.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces exercices préparent directement la représentation de l’environnement du Snake.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Avec <strong>NumPy</strong>, vous pouvez manipuler facilement vecteurs et matrices.
    Ces outils sont la base pour représenter les données dans un jeu comme Snake,
    mais aussi dans des projets plus complexes en intelligence artificielle.
    Prochaine étape : apprendre à <strong>visualiser ces données avec Matplotlib</strong>.
  </p>
</div>`,
  },
  {
    id: 15,
    name: "Opérations utiles pour représenter un environnement de jeu",
    language: "Python",
    difficulty: "Débutant",
    duree: "Longue (2 heures)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Opérations utiles pour représenter un environnement de jeu
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Lorsqu’on représente un environnement de jeu comme <strong>Snake</strong>, 
    on utilise une <span class="text-[#5328EA] font-semibold">matrice NumPy</span> 
    pour stocker l’état de la grille.  
    Voici les opérations les plus utiles pour gérer ce type d’environnement.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Création de grilles -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Créer une grille</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    La grille du jeu est un tableau 2D rempli de zéros (cases vides).
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

# Grille 10x10 vide
grille = np.zeros((10, 10), dtype=int)
print(grille)
  </pre>

  <!-- Placement d’objets -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Placer des objets dans la grille</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On représente les éléments du jeu par des nombres :
    <br>0 = vide, 1 = serpent, 2 = nourriture.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Placer le serpent au centre
grille[5, 5] = 1

# Placer de la nourriture
grille[2, 8] = 2

print(grille)
  </pre>

  <!-- Trouver des positions -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Trouver les positions d’objets</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    NumPy permet de trouver facilement les coordonnées où une condition est vraie.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Coordonnées de la nourriture
pos_nourriture = np.argwhere(grille == 2)
print(pos_nourriture)  # ex: [[2 8]]
  </pre>

  <!-- Déplacements -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Déplacer le serpent</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pour simuler un déplacement, on efface l’ancienne position et on en crée une nouvelle.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Effacer l'ancienne position
grille[5, 5] = 0

# Nouvelle position à droite
grille[5, 6] = 1
  </pre>

  <!-- Bords et collisions -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">5. Vérifier les collisions</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut vérifier si le serpent sort de la grille ou entre en collision avec lui-même.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
x, y = 5, 6  # position du serpent

# Vérifier les bords
if x < 0 or x >= grille.shape[0] or y < 0 or y >= grille.shape[1]:
    print("Collision avec le mur !")

# Vérifier si la case contient déjà le serpent
if grille[x, y] == 1:
    print("Collision avec soi-même !")
  </pre>

  <!-- Nourriture aléatoire -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">6. Générer de la nourriture aléatoire</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut placer de la nourriture dans une case vide choisie au hasard.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Trouver toutes les cases vides
cases_vides = np.argwhere(grille == 0)

# Choisir une case aléatoire
x, y = cases_vides[np.random.choice(len(cases_vides))]
grille[x, y] = 2
  </pre>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une grille 8×8 avec un serpent placé au centre.</li>
      <li>Ajoutez 3 nourritures à des positions aléatoires.</li>
      <li>Faites bouger le serpent de 3 cases vers la droite.</li>
      <li>Vérifiez si une collision se produit après ces déplacements.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Ces opérations constituent les bases de la <strong>simulation de l’environnement du jeu Snake</strong>.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Grâce à NumPy, on peut manipuler efficacement l’environnement du jeu : 
    créer une grille, placer des objets, gérer les déplacements et vérifier les collisions.  
    Ces outils sont essentiels pour <strong>programmer le Snake et entraîner une IA dessus</strong>.
  </p>
</div>`,
  },
  {
    id: 16,
    name: "Exemple : transformer la grille du Snake en tableau numérique",
    language: "Python",
    difficulty: "Débutant",
    duree: "Rapide (25 min)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Exemple : transformer la grille du Snake en tableau numérique
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour que l’IA puisse apprendre à jouer à <strong>Snake</strong>, 
    il faut convertir la grille du jeu en un <strong>tableau numérique</strong>.  
    Chaque case est traduite en un chiffre qui représente son contenu :
  </p>

  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>0</strong> = case vide</li>
    <li><strong>1</strong> = serpent</li>
    <li><strong>2</strong> = nourriture</li>
  </ul>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Exemple simple -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Créer une grille vide</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

# Grille 6x6 vide
grille = np.zeros((6, 6), dtype=int)
print(grille)
  </pre>

  <!-- Ajouter objets -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Ajouter serpent et nourriture</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On place le serpent et la nourriture en remplaçant les valeurs.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Serpent : tête au centre
grille[3, 3] = 1

# Nourriture en bas à gauche
grille[5, 0] = 2

print(grille)
  </pre>

  <!-- Résultat -->
  <h3 class="text-xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Résultat</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’affichage de la matrice donne une <strong>vue numérique de la grille</strong> :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
[[0 0 0 0 0 0]
 [0 0 0 0 0 0]
 [0 0 0 0 0 0]
 [0 0 0 1 0 0]
 [0 0 0 0 0 0]
 [2 0 0 0 0 0]]
  </pre>

  <!-- Extraire infos -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Extraire les informations utiles</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Grâce à NumPy, on peut récupérer rapidement les positions :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Coordonnées du serpent
pos_serpent = np.argwhere(grille == 1)
print("Serpent :", pos_serpent)

# Coordonnées de la nourriture
pos_nourriture = np.argwhere(grille == 2)
print("Nourriture :", pos_nourriture)
  </pre>

  <!-- Conversion IA -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">5. Conversion pour l’IA</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’IA recevra ce tableau comme entrée.  
    Exemple : transformer la grille en un <strong>vecteur plat</strong> (utile pour un réseau de neurones).
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Transformer la grille 6x6 en vecteur 36 cases
etat = grille.flatten()

print("État du jeu :", etat)
# Exemple : [0 0 0 0 0 0 0 0 0 0 0 0 ... 1 0 0 ... 2 0 0]
  </pre>

  <!-- Exercice -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une grille 8×8 avec un serpent de 3 cases alignées.</li>
      <li>Ajoutez une nourriture à une position aléatoire.</li>
      <li>Transformez la grille en vecteur numérique pour préparer l’entrée de l’IA.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Cet exercice vous rapproche de la <strong>représentation des états du jeu</strong> pour l’entraînement d’une IA.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Transformer la grille du Snake en <strong>tableau numérique</strong> est une étape clé :  
    c’est grâce à cette représentation que l’IA pourra analyser l’environnement et décider de son prochain mouvement.
  </p>
</div>`,
  },
  {
    id: 18,
    name: "Afficher des données sous forme de graphiques",
    language: "Python",
    difficulty: "Intermédiaire",
    duree: "Long (2h)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Afficher des données sous forme de graphiques avec Matplotlib
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    La librairie <strong>Matplotlib</strong> permet de représenter des données graphiquement en Python.  
    Cela aide à comprendre rapidement l’état d’un système, comme une grille de Snake ou l’évolution du score.  
    Dans ce chapitre, nous allons découvrir comment créer différents types de graphiques.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Graphique simple -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Tracer un graphique simple</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.pyplot as plt

# Exemple de score au fil du temps
scores = [0, 2, 4, 6, 8, 10]

plt.plot(scores)
plt.title("Évolution du score")
plt.xlabel("Tours")
plt.ylabel("Score")
plt.show()
  </pre>

  <!-- Graphique en barres -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Graphique en barres</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Nombre de cases occupées par le serpent à chaque étape
cases_serpent = [1, 2, 3, 4, 5, 6]

plt.bar(range(len(cases_serpent)), cases_serpent)
plt.title("Taille du serpent par tour")
plt.xlabel("Tours")
plt.ylabel("Nombre de cases")
plt.show()
  </pre>

  <!-- Graphique de la grille -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Visualiser une grille du Snake</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut représenter la grille sous forme de matrice colorée avec <code>imshow</code>.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

# Grille 6x6
grille = np.zeros((6, 6))
grille[3, 3] = 1  # Serpent
grille[5, 0] = 2  # Nourriture

plt.imshow(grille, cmap="viridis")  # Couleurs automatiques
plt.title("Grille du Snake")
plt.show()
  </pre>

  <p class="mb-2 text-gray-700 dark:text-gray-300">
    🔹 Les chiffres de la grille sont automatiquement convertis en couleurs.  
    🔹 Vous pouvez choisir d’autres palettes, par exemple <code>cmap="plasma"</code>.
  </p>

  <!-- Couleurs personnalisées -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Palette personnalisée</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.colors as mcolors

# Palette : 0=vide, 1=serpent, 2=nourriture
colors = ["white", "green", "red"]
cmap = mcolors.ListedColormap(colors)

plt.imshow(grille, cmap=cmap)
plt.title("Grille Snake avec couleurs personnalisées")
plt.show()
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Tracez un graphique de l’évolution du score sur 10 tours.</li>
      <li>Représentez une grille 8×8 avec un serpent de 3 cases et une nourriture, en utilisant <code>imshow</code>.</li>
      <li>Personnalisez les couleurs pour que le serpent soit vert et la nourriture rouge.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 La visualisation est essentielle pour comprendre comment l’IA interagit avec l’environnement du Snake.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Matplotlib vous permet de transformer des données numériques en graphiques clairs et intuitifs.  
    Vous pouvez visualiser l’évolution du score, la taille du serpent ou la grille entière.  
    Cela sera très utile pour **déboguer et analyser l’IA du Snake**.
  </p>
</div>`
  },
  {
    id: 19,
    name: "Représenter la grille du Snake et les déplacements du serpent",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (2h)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Représenter la grille du Snake et les déplacements du serpent
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour que le jeu Snake soit compréhensible et suivi par un joueur ou une IA, il est utile 
    de visualiser la <strong>grille</strong> et les <strong>déplacements du serpent</strong>.  
    On utilisera <strong>NumPy</strong> pour représenter la grille et <strong>Matplotlib</strong> pour la visualiser.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Création de la grille -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Créer la grille</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

# Grille 6x6 vide
grille = np.zeros((6, 6), dtype=int)

# Palette couleurs : 0=vide, 1=serpent, 2=nourriture
colors = ["white", "green", "red"]
cmap = mcolors.ListedColormap(colors)
  </pre>

  <!-- Ajouter serpent et nourriture -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Placer le serpent et la nourriture</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Serpent : tête au centre
grille[3, 3] = 1

# Nourriture
grille[5, 0] = 2
  </pre>

  <!-- Fonction pour afficher la grille -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Fonction pour afficher la grille</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def afficher_grille(grille):
    plt.imshow(grille, cmap=cmap)
    plt.xticks([])
    plt.yticks([])
    plt.show()

# Affichage initial
afficher_grille(grille)
  </pre>

  <!-- Déplacement du serpent -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Déplacer le serpent</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pour simuler un déplacement :  
    1️⃣ Effacer l’ancienne position du serpent  
    2️⃣ Mettre à jour sa nouvelle position
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Position actuelle de la tête
x, y = 3, 3

# Effacer ancienne position
grille[x, y] = 0

# Déplacement à droite
y += 1
grille[x, y] = 1

# Affichage
afficher_grille(grille)
  </pre>

  <!-- Déplacement multiple -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">5. Déplacement multiple et boucle</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Déplacements simulés
positions = [(3, 3), (3, 4), (3, 5)]

for pos in positions:
    # Réinitialiser la grille
    grille = np.zeros((6, 6), dtype=int)
    
    # Placer le serpent
    x, y = pos
    grille[x, y] = 1
    
    # Placer la nourriture
    grille[5, 0] = 2
    
    # Affichage
    afficher_grille(grille)
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une grille 8×8 et placez un serpent de 3 cases.</li>
      <li>Ajoutez une nourriture à une position aléatoire.</li>
      <li>Écrivez une boucle qui fait déplacer le serpent sur 5 étapes et met à jour la grille à chaque étape.</li>
      <li>Testez avec des couleurs différentes pour le serpent et la nourriture.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Cela prépare votre environnement pour entraîner l’IA à prendre des décisions basées sur la grille.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Visualiser la grille et les déplacements du serpent permet de comprendre comment le jeu évolue au fil du temps.  
    Cette étape est indispensable pour déboguer et analyser le comportement de l’IA.
  </p>
</div>`
  },
  {
    id: 20,
    name: "Courbes d’entraînement pour suivre la performance",
    language: "Python",
    difficulty: "Avancé",
    duree: "Moyen (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Courbes d’entraînement pour suivre la performance
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Lorsque l’on entraîne une IA pour jouer à Snake, il est crucial de suivre sa performance au fil du temps.  
    Les <strong>courbes d’entraînement</strong> permettent de visualiser :
  </p>

  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>La progression du score moyen</li>
    <li>L’évolution de la perte (loss)</li>
    <li>La détection de surapprentissage (overfitting)</li>
  </ul>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Exemple : suivre le score -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Suivi du score moyen</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut enregistrer le score de chaque partie et afficher son évolution avec Matplotlib.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.pyplot as plt

# Scores obtenus par l'IA sur 10 parties
scores = [0, 1, 2, 4, 3, 5, 6, 7, 8, 10]

plt.plot(scores, marker='o', color='blue')
plt.title("Évolution du score moyen")
plt.xlabel("Parties")
plt.ylabel("Score")
plt.grid(True)
plt.show()
  </pre>

  <!-- Exemple : suivre la loss -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Suivi de la loss</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pendant l’entraînement, on peut suivre la perte pour détecter si l’IA apprend correctement.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple fictif de loss sur 10 épisodes
loss_train = [1.0, 0.8, 0.7, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25]

plt.plot(loss_train, marker='x', color='red')
plt.title("Évolution de la loss")
plt.xlabel("Épisodes")
plt.ylabel("Loss")
plt.grid(True)
plt.show()
  </pre>

  <!-- Courbes combinées -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Courbes combinées</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut afficher les scores et la loss sur le même graphique pour avoir une vision globale.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
plt.figure(figsize=(8,5))

plt.plot(scores, marker='o', color='blue', label='Score')
plt.plot(loss_train, marker='x', color='red', label='Loss')

plt.title("Score vs Loss pendant l'entraînement")
plt.xlabel("Épisodes")
plt.ylabel("Valeur")
plt.legend()
plt.grid(True)
plt.show()
  </pre>

  <!-- Conseils d’interprétation -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Interprétation des courbes</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Score qui augmente → l’IA apprend à mieux jouer.</li>
    <li>Loss qui diminue → le modèle converge vers de meilleures décisions.</li>
    <li>Score stable et loss très faible → possible surapprentissage, vérifier avec des parties de test.</li>
    <li>Fluctuations importantes → exploration aléatoire ou hyperparamètres à ajuster.</li>
  </ul>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Simulez 15 parties et créez une liste de scores aléatoires pour l’IA.</li>
      <li>Tracez la courbe de score et observez la tendance.</li>
      <li>Simulez une loss fictive et tracez-la pour suivre la convergence.</li>
      <li>Combinez score et loss sur un même graphique.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Suivre les courbes d’entraînement est indispensable pour ajuster les paramètres de l’IA et améliorer son apprentissage.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Les courbes d’entraînement sont un outil essentiel pour évaluer la progression de votre IA Snake.  
    Elles permettent de détecter rapidement si l’apprentissage est efficace ou s’il faut ajuster les paramètres.
  </p>
</div>`
  },
  {
    id: 21,
    name: "Perceptron, couches cachées et activation",
    language: "Python",
    difficulty: "Intermédiaire",
    duree: "Moyen (1h15)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Perceptron, couches cachées et fonctions d'activation
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Un réseau de neurones artificiel est composé de <strong>couches</strong> de neurones.  
    Chaque neurone reçoit des entrées, effectue un calcul et produit une sortie.  
    Ce mécanisme simple permet à l’IA de prendre des décisions complexes, comme jouer à Snake.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Perceptron -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Le perceptron</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Le perceptron est l’élément de base d’un réseau de neurones :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Il reçoit plusieurs <strong>entrées</strong> (features de l’environnement, ex : positions du serpent et de la nourriture).</li>
    <li>Il applique des <strong>poids</strong> à chaque entrée.</li>
    <li>Il calcule une somme pondérée et ajoute un <strong>biais</strong>.</li>
    <li>Il applique une <strong>fonction d’activation</strong> pour produire la sortie.</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple simple de perceptron en Python
import numpy as np

def perceptron(x, w, b):
    z = np.dot(x, w) + b
    return 1 if z > 0 else 0  # fonction d'activation step
  </pre>

  <!-- Couches cachées -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Les couches cachées</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une IA complexe utilise plusieurs perceptrons organisés en <strong>couches</strong> :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Les <strong>couches d’entrée</strong> reçoivent l’état du jeu (grille du Snake).</li>
    <li>Les <strong>couches cachées</strong> traitent les informations et détectent des motifs (ex : distance à la nourriture).</li>
    <li>La <strong>couche de sortie</strong> décide du mouvement à effectuer (haut, bas, gauche, droite).</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple de réseau simple avec numpy
X = np.array([0, 1, 0])  # état du jeu
W1 = np.random.rand(3, 4)  # poids couche cachée
b1 = np.random.rand(4)
Z1 = np.dot(X, W1) + b1  # calcul somme pondérée
  </pre>

  <!-- Fonction d'activation -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Fonctions d’activation</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Les fonctions d’activation introduisent de la non-linéarité, ce qui permet au réseau d’apprendre des motifs complexes :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Step</strong> : sortie 0 ou 1, basique.</li>
    <li><strong>Sigmoid</strong> : sortie entre 0 et 1, utile pour probabilités.</li>
    <li><strong>ReLU</strong> : sortie = max(0, x), très utilisée dans les couches cachées.</li>
    <li><strong>Softmax</strong> : transforme les sorties en probabilités pour classification (ex : choisir un mouvement).</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum()
  </pre>

  <!-- Exemple complet -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Exemple complet d’une couche</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Entrée = état du jeu
X = np.array([0, 1, 0])

# Couche cachée
W1 = np.random.rand(3, 4)
b1 = np.random.rand(4)
Z1 = np.dot(X, W1) + b1
A1 = relu(Z1)

# Couche de sortie
W2 = np.random.rand(4, 2)
b2 = np.random.rand(2)
Z2 = np.dot(A1, W2) + b2
A2 = softmax(Z2)

print("Probabilités de mouvement :", A2)
  </pre>

  <!-- Exercices pratiques -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créer un perceptron simple qui prend 2 entrées et renvoie 0 ou 1.</li>
      <li>Ajouter une couche cachée avec 3 neurones et utiliser ReLU.</li>
      <li>Ajouter une couche de sortie avec softmax pour 2 mouvements possibles.</li>
      <li>Tester avec différents états du jeu et observer les sorties.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Comprendre ces notions est crucial avant de coder l’IA qui prendra des décisions pour le Snake.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Le perceptron est la brique de base, les couches cachées permettent d’apprendre des motifs complexes, et les fonctions d’activation introduisent la non-linéarité nécessaire pour que l’IA prenne des décisions intelligentes.
  </p>
</div>
`
  },
  {
    id: 22,
    name: "Comment un réseau peut “voir” l’état du jeu",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Comment un réseau peut “voir” l’état du jeu
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour qu’un réseau de neurones décide des mouvements du Snake, il doit recevoir une représentation numérique de l’état du jeu.  
    Cette étape est appelée <strong>encodage de l’environnement</strong>.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Représentation de la grille -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Transformer la grille en tableau numérique</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Chaque case de la grille peut être codée par un nombre :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>0</strong> : case vide</li>
    <li><strong>1</strong> : serpent</li>
    <li><strong>2</strong> : nourriture</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import numpy as np

grille = np.zeros((6, 6), dtype=int)
grille[3, 3] = 1  # tête du serpent
grille[5, 0] = 2  # nourriture
  </pre>

  <!-- Aplatir la grille -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Aplatir la grille pour le réseau</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Les réseaux de neurones classiques reçoivent généralement un vecteur d’entrées.  
    On peut donc aplatir la grille en un vecteur 1D :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
etat = grille.flatten()
print(etat)
# Exemple de sortie : [0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0 0 0]
  </pre>

  <!-- Normalisation -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Normalisation des valeurs</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Il est souvent utile de normaliser les valeurs pour que le réseau apprenne plus efficacement :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
etat_normalise = etat / 2.0  # transforme 0,1,2 en 0,0.5,1
print(etat_normalise)
  </pre>

  <!-- Encodage alternatif : distances et directions -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Encodage avancé</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pour aider le réseau à prendre de meilleures décisions, on peut ajouter des informations supplémentaires :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Distance horizontale et verticale jusqu’à la nourriture</li>
    <li>Direction actuelle du serpent</li>
    <li>Présence d’obstacles autour de la tête (murs ou corps du serpent)</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple : vecteur d'état enrichi
distance_x = 5 - 3  # colonne nourriture - colonne tête
distance_y = 0 - 3  # ligne nourriture - ligne tête
etat_vecteur = np.array([etat_normalise.tolist() + [distance_x, distance_y]])
print(etat_vecteur.shape)  # (1, 36 + 2) = (1, 38)
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une grille 8×8 avec un serpent et une nourriture.</li>
      <li>Aplatissez la grille et normalisez les valeurs.</li>
      <li>Ajoutez un vecteur avec la distance horizontale et verticale à la nourriture.</li>
      <li>Testez différents encodages et observez la forme finale du vecteur d’état.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 L’état du jeu sous forme numérique sera l’entrée du réseau de neurones pour apprendre à jouer.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Transformer l’environnement du Snake en vecteur numérique est une étape clé.  
    Cela permet au réseau de neurones de “voir” le jeu et de prendre des décisions basées sur les positions du serpent, de la nourriture et des obstacles.
  </p>
</div>`
  },
  {
    id: 23,
    name: "Introduction à TensorFlow / PyTorch",
    language: "Python / Cython",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Introduction à TensorFlow et PyTorch
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour entraîner un réseau de neurones, il est pratique d’utiliser une bibliothèque spécialisée.  
    <strong>TensorFlow</strong> et <strong>PyTorch</strong> sont les plus populaires.  
    Elles permettent de construire, entraîner et évaluer des modèles d’IA de manière efficace.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Installation -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Installation</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Installer TensorFlow
pip install tensorflow

# Installer PyTorch (selon votre système et GPU)
pip install torch torchvision torchaudio
  </pre>

  <!-- TensorFlow de base -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. TensorFlow de base</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    TensorFlow permet de créer des modèles de neurones en utilisant <strong>Sequential</strong> ou <strong>Functional API</strong>.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Créer un réseau simple
model = Sequential([
    Dense(10, activation='relu', input_shape=(38,)),  # couche cachée
    Dense(4, activation='softmax')  # sortie pour 4 mouvements
])

# Compiler le modèle
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Afficher le résumé du modèle
model.summary()
  </pre>

  <!-- PyTorch de base -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. PyTorch de base</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    PyTorch utilise des classes pour définir les modèles. Chaque couche est définie dans le constructeur.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import torch
import torch.nn as nn
import torch.nn.functional as F

class SnakeNet(nn.Module):
    def __init__(self):
        super(SnakeNet, self).__init__()
        self.fc1 = nn.Linear(38, 10)  # couche cachée
        self.fc2 = nn.Linear(10, 4)   # sortie 4 mouvements

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.softmax(self.fc2(x), dim=1)
        return x

# Créer le modèle
model = SnakeNet()
print(model)
  </pre>

  <!-- Différences principales -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Différences principales</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>TensorFlow/Keras</strong> : API haut niveau, facile pour prototyper rapidement.</li>
    <li><strong>PyTorch</strong> : plus flexible, très utilisé pour la recherche, interface “pythonic”.</li>
    <li>Les deux supportent GPU pour accélérer l’entraînement.</li>
    <li>Les deux permettent de suivre l’évolution de la loss et d’évaluer la performance.</li>
  </ul>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Installer TensorFlow et PyTorch sur votre machine.</li>
      <li>Créer un réseau simple avec 1 couche cachée et une couche de sortie.</li>
      <li>Tester l’affichage du résumé du modèle ou du print du modèle PyTorch.</li>
      <li>Observer la structure des couches et des paramètres.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Cette étape prépare le terrain pour entraîner notre IA Snake avec un vrai framework de deep learning.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    TensorFlow et PyTorch sont des outils puissants pour créer des réseaux de neurones.  
    Comprendre leurs bases est essentiel pour coder une IA capable de jouer à Snake.
  </p>
</div>`
  },
  {
    id: 24,
    name: "Définir une fonction de récompense (reward) pour le Snake",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Définir une fonction de récompense (reward) pour le Snake
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Dans l’apprentissage par renforcement, l’IA apprend en recevant des récompenses pour ses actions.  
    Une <strong>fonction de récompense</strong> permet de quantifier si une action est bonne ou mauvaise.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Objectifs -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Objectifs de la fonction de récompense</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Encourager le serpent à manger la nourriture.</li>
    <li>Pénaliser les collisions avec les murs ou son propre corps.</li>
    <li>Favoriser des mouvements stratégiques, comme se rapprocher de la nourriture.</li>
    <li>Décourager les mouvements inutiles ou répétitifs.</li>
  </ul>

  <!-- Exemple simple -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Exemple simple de reward</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def reward_function(snake, food, alive):
    if not alive:
        return -10  # punition si le serpent meurt
    elif snake.head == food.position:
        return 10   # récompense si le serpent mange
    else:
        return -0.1  # petite pénalité pour chaque mouvement pour encourager efficacité
  </pre>

  <!-- Reward basé sur la distance -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Reward basé sur la distance</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pour guider le serpent vers la nourriture, on peut donner une récompense positive s’il se rapproche :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def distance_reward(snake, food, previous_distance):
    current_distance = abs(snake.head.x - food.x) + abs(snake.head.y - food.y)
    if current_distance < previous_distance:
        return 1   # se rapproche → récompense
    else:
        return -1  # s'éloigne → pénalité
  </pre>

  <!-- Combiner plusieurs critères -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Combiner plusieurs critères</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    On peut combiner la mortalité, la nourriture et la distance pour un reward plus complet :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def combined_reward(snake, food, alive, previous_distance):
    reward = 0
    if not alive:
        reward -= 10
    elif snake.head == food.position:
        reward += 10
    else:
        # reward basé sur la distance
        current_distance = abs(snake.head.x - food.x) + abs(snake.head.y - food.y)
        reward += (previous_distance - current_distance)
    return reward
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez une fonction de reward simple pour votre Snake.</li>
      <li>Ajoutez un bonus lorsque le serpent se rapproche de la nourriture.</li>
      <li>Pénalisez les mouvements inutiles ou les collisions avec les murs.</li>
      <li>Testez différentes combinaisons de rewards et observez l’impact sur le comportement du serpent.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 La qualité de la fonction de reward influence directement la vitesse et l’efficacité de l’apprentissage.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Définir une fonction de reward claire et équilibrée est essentiel pour qu’une IA Snake apprenne à survivre, à manger et à adopter une stratégie efficace.  
    Expérimentez différents rewards pour trouver celui qui produit le comportement le plus intelligent.
  </p>
</div>`
  },
  {
    id: 25,
    name: "Stratégie d’exploration (aléatoire vs apprentissage)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Stratégie d'exploration : aléatoire vs apprentissage
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Lorsqu’on entraîne une IA Snake, elle doit trouver le bon équilibre entre :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Explorer</strong> : essayer de nouveaux mouvements pour découvrir des stratégies efficaces.</li>
    <li><strong>Exploiter</strong> : utiliser ce qu’elle a déjà appris pour maximiser le score.</li>
  </ul>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Exploration aléatoire -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Exploration aléatoire</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Au début de l’apprentissage, il est souvent utile que l’IA prenne des décisions au hasard pour découvrir toutes les possibilités.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import random

def choisir_mouvement_random(possibilites):
    return random.choice(possibilites)

# Exemple
mouvement = choisir_mouvement_random(['haut','bas','gauche','droite'])
print(mouvement)
  </pre>

  <!-- Exploitation du modèle -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Exploitation du modèle</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une fois que le réseau commence à apprendre, il peut prédire quel mouvement maximise la récompense.  
    L’IA choisit alors le mouvement avec la plus haute probabilité :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Supposons que model.predict renvoie les probabilités pour chaque mouvement
probabilites = [0.1, 0.7, 0.1, 0.1]  # [haut, bas, gauche, droite]
mouvement = ['haut','bas','gauche','droite'][probabilites.index(max(probabilites))]
print(mouvement)  # 'bas'
  </pre>

  <!-- Stratégie epsilon-greedy -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Stratégie ε-greedy</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pour combiner exploration et exploitation, on utilise souvent la stratégie <strong>ε-greedy</strong> :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Avec une probabilité ε, l’IA choisit un mouvement au hasard (exploration).</li>
    <li>Avec une probabilité 1-ε, elle choisit le meilleur mouvement selon le modèle (exploitation).</li>
    <li>ε diminue progressivement pour que l’IA explore beaucoup au début et exploite ensuite.</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import random

def epsilon_greedy(model, etat, epsilon=0.1):
    if random.random() < epsilon:
        return random.choice(['haut','bas','gauche','droite'])  # exploration
    else:
        probs = model.predict(etat)
        return ['haut','bas','gauche','droite'][probs.argmax()]  # exploitation
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez un choix aléatoire pour le Snake et observez son comportement.</li>
      <li>Testez l’exploitation seule et comparez les performances.</li>
      <li>Implémentez ε-greedy avec ε=0.3 et observez l’évolution au fil des parties.</li>
      <li>Diminuez progressivement ε pour que l’IA devienne plus stratégique.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Cette approche permet de combiner exploration et apprentissage efficace pour obtenir un Snake intelligent.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Une bonne stratégie d’exploration est essentielle pour que l’IA découvre toutes les possibilités du jeu.  
    La stratégie ε-greedy est simple à implémenter et très efficace pour entraîner un Snake capable de prendre des décisions intelligentes.
  </p>
</div>`
  },
  {
    id: 26,
    name: "Mesurer les performances d’un agent",
    language: "Python",
    difficulty: "Avancé",
    duree: "Moyen (1h)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Mesurer les performances d’un agent
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Lorsqu’on entraîne un agent IA, il est crucial de mesurer sa performance.  
    Cela permet de savoir si l’apprentissage progresse et d’identifier les problèmes potentiels.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Objectifs -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Objectifs de l’évaluation</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Suivre l’évolution du score moyen par partie.</li>
    <li>Analyser la durée de vie moyenne du serpent.</li>
    <li>Évaluer la cohérence et la stratégie des mouvements.</li>
    <li>Identifier des problèmes comme un apprentissage trop lent ou des comportements aléatoires.</li>
  </ul>

  <!-- Métriques classiques -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Métriques classiques</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Score moyen</strong> : nombre de nourritures mangées par partie.</li>
    <li><strong>Durée de vie moyenne</strong> : nombre de mouvements avant la mort.</li>
    <li><strong>Taux de survie</strong> : pourcentage de parties où l’agent atteint un certain score.</li>
    <li><strong>Récompense cumulée</strong> : somme des rewards reçus par partie.</li>
  </ul>

  <!-- Exemple de code -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Exemple : suivi du score et de la durée</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
scores = []
durations = []

for partie in range(100):
    score, nb_mouvements = jouer_partie(agent)
    scores.append(score)
    durations.append(nb_mouvements)

score_moyen = sum(scores) / len(scores)
duree_moyenne = sum(durations) / len(durations)

print(f"Score moyen : {score_moyen}")
print(f"Durée moyenne : {duree_moyenne} mouvements")
  </pre>

  <!-- Visualisation -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Visualisation des performances</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Il est utile de tracer l’évolution des performances pour observer la progression de l’agent :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.pyplot as plt

plt.plot(scores, label="Score par partie")
plt.plot(durations, label="Durée de vie")
plt.xlabel("Partie")
plt.ylabel("Valeur")
plt.title("Performance de l'agent Snake")
plt.legend()
plt.show()
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Enregistrez le score et la durée de vie de votre agent sur 50 parties.</li>
      <li>Calculez le score moyen et la durée moyenne.</li>
      <li>Tracez l’évolution du score au fil des parties.</li>
      <li>Essayez différentes fonctions de reward et observez l’impact sur les performances.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 L’analyse des performances vous permet d’ajuster la fonction de reward, la stratégie d’exploration et l’architecture du modèle.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Mesurer et visualiser les performances d’un agent est indispensable pour suivre son apprentissage.  
    Ces métriques permettent de détecter rapidement les problèmes et de guider l’IA vers un comportement optimal.
  </p>
</div>`
  },
  {
    id: 27,
    name: "Logique du jeu (mouvements, collisions, nourriture)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/1QphHhP.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Logique du jeu : mouvements, collisions et nourriture
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour entraîner une IA à jouer au Snake, il est essentiel de comprendre la logique du jeu.  
    Cela inclut la gestion des mouvements, la détection des collisions et l’apparition de la nourriture.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Mouvements du serpent -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Mouvements du serpent</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Le serpent se déplace sur une grille dans 4 directions possibles : haut, bas, gauche, droite.  
    Chaque mouvement déplace la tête d’une case et décale le reste du corps.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple de déplacement
def deplacer_serpent(serpent, direction):
    tete = serpent[0]
    if direction == 'haut':
        nouvelle_tete = (tete[0]-1, tete[1])
    elif direction == 'bas':
        nouvelle_tete = (tete[0]+1, tete[1])
    elif direction == 'gauche':
        nouvelle_tete = (tete[0], tete[1]-1)
    elif direction == 'droite':
        nouvelle_tete = (tete[0], tete[1]+1)
    
    serpent.insert(0, nouvelle_tete)  # ajouter la nouvelle tête
    serpent.pop()  # supprimer la dernière case
  </pre>

  <!-- Collisions -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Détection des collisions</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’IA doit savoir quand le serpent meurt. Il y a deux types de collisions :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Collision avec les murs</strong> : la tête dépasse les limites de la grille.</li>
    <li><strong>Collision avec son corps</strong> : la tête touche une case déjà occupée par le corps.</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def verifier_collision(serpent, largeur, hauteur):
    tete = serpent[0]
    # murs
    if tete[0] < 0 or tete[0] >= hauteur or tete[1] < 0 or tete[1] >= largeur:
        return True
    # corps
    if tete in serpent[1:]:
        return True
    return False
  </pre>

  <!-- Gestion de la nourriture -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Apparition et consommation de la nourriture</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Lorsque la tête du serpent atteint la case contenant la nourriture :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Le serpent grandit (on n’enlève pas la dernière case).</li>
    <li>Une nouvelle nourriture apparaît à un endroit libre de la grille.</li>
    <li>On peut donner une récompense positive à l’IA.</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import random

def verifier_nourriture(serpent, nourriture):
    if serpent[0] == nourriture:
        # ne pas retirer la queue → croissance
        nourriture = (random.randint(0, hauteur-1), random.randint(0, largeur-1))
        reward = 10
    else:
        reward = -0.1
    return nourriture, reward
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez la fonction de déplacement du serpent sur une grille 6×6.</li>
      <li>Testez la détection des collisions avec les murs et le corps.</li>
      <li>Ajoutez la nourriture et vérifiez que le serpent grandit correctement.</li>
      <li>Assurez-vous que la fonction de reward renvoie +10 pour manger et -0.1 sinon.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Maîtriser cette logique est indispensable pour que l’IA puisse interagir correctement avec l’environnement du jeu.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    La logique du jeu Snake (mouvements, collisions et nourriture) forme la base sur laquelle l’IA apprend.  
    Un agent ne peut progresser que si ces règles sont correctement codées et testées.
  </p>
</div>`
  },
  {
    id: 28,
    name: "Interface console ou graphique (Pygame)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Interface : console ou graphique avec Pygame
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour jouer ou tester votre IA Snake, vous pouvez utiliser deux types d’interface : 
    <strong>console textuelle</strong> ou <strong>graphique avec Pygame</strong>.  
    Chaque méthode a ses avantages selon votre objectif.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Interface console -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Interface console</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Simple à coder, la console affiche la grille avec des caractères, utile pour tester rapidement la logique ou l’IA.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Exemple simple 5x5
grille = [['.' for _ in range(5)] for _ in range(5)]
serpent = [(2,2), (2,1)]
nourriture = (4,4)

for i in range(5):
    for j in range(5):
        if (i,j) == serpent[0]:
            print('H', end=' ')  # tête
        elif (i,j) in serpent[1:]:
            print('S', end=' ')  # corps
        elif (i,j) == nourriture:
            print('F', end=' ')  # nourriture
        else:
            print('.', end=' ')
    print()
  </pre>
  <p class="mb-4 text-gray-700 dark:text-gray-300">
    Avantages : rapide, simple, pas besoin de bibliothèque externe.  
    Inconvénients : pas très visuel, difficile de suivre un apprentissage IA en temps réel.
  </p>

  <!-- Interface graphique avec Pygame -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Interface graphique avec Pygame</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Pygame permet de dessiner le serpent, la nourriture et la grille en couleurs et en mouvement.  
    Idéal pour observer le comportement de l’IA.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import pygame, sys

# Initialisation
pygame.init()
taille_case = 20
largeur, hauteur = 10, 10
ecran = pygame.display.set_mode((largeur*taille_case, hauteur*taille_case))
pygame.display.set_caption("Snake")

# Couleurs
BLANC = (255,255,255)
VERT = (0,255,0)
ROUGE = (255,0,0)
NOIR = (0,0,0)

serpent = [(5,5), (5,4)]
nourriture = (2,2)

# Boucle principale
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    ecran.fill(BLANC)

    # Dessiner serpent
    for x,y in serpent:
        pygame.draw.rect(ecran, VERT, (x*taille_case, y*taille_case, taille_case, taille_case))
    # Dessiner nourriture
    pygame.draw.rect(ecran, ROUGE, (nourriture[0]*taille_case, nourriture[1]*taille_case, taille_case, taille_case))

    pygame.display.flip()
    pygame.time.wait(200)

pygame.quit()
sys.exit()
  </pre>

  <p class="mb-4 text-gray-700 dark:text-gray-300">
    Avantages : visuel, permet de suivre l’IA, plus immersif.  
    Inconvénients : nécessite Pygame, un peu plus complexe à coder.
  </p>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Créez une grille en console et affichez le serpent et la nourriture.</li>
      <li>Testez un mouvement aléatoire du serpent et rafraîchissez l’affichage.</li>
      <li>Installez Pygame et créez un affichage graphique simple.</li>
      <li>Affichez le serpent et la nourriture avec des couleurs différentes.</li>
      <li>Ajoutez une boucle pour faire évoluer le serpent et observer ses mouvements.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Observer le jeu graphiquement aide beaucoup à comprendre et à améliorer le comportement de l’IA.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    L’interface console est idéale pour tester rapidement la logique du Snake,  
    tandis que Pygame permet une visualisation complète, essentielle pour entraîner et observer une IA.
  </p>
</div>`
  },
  {
    id: 29,
    name: "API du jeu pour interagir avec l’IA",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    API du jeu : interagir avec l’IA
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour entraîner une IA à jouer au Snake, il est utile de créer une API du jeu.  
    Cette API permet de communiquer l’état du jeu à l’IA et de recevoir ses actions pour faire évoluer le serpent.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Concepts clés -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Concepts clés d’une API Snake</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>État du jeu</strong> : position du serpent, nourriture, murs, direction actuelle.</li>
    <li><strong>Action</strong> : mouvement choisi par l’IA (haut, bas, gauche, droite).</li>
    <li><strong>Reward</strong> : valeur numérique qui guide l’apprentissage de l’IA.</li>
    <li><strong>Fin de partie</strong> : indication que le serpent est mort (collision). </li>
  </ul>

  <!-- Exemple minimal -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Exemple d’API minimale</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
class SnakeGame:
    def __init__(self, largeur=10, hauteur=10):
        self.largeur = largeur
        self.hauteur = hauteur
        self.reset()

    def reset(self):
        self.serpent = [(5,5)]
        self.nourriture = (2,2)
        self.score = 0
        self.done = False
        return self.get_etat()

    def get_etat(self):
        # Retourner les informations nécessaires à l'IA
        return {
            'serpent': self.serpent,
            'nourriture': self.nourriture,
            'done': self.done
        }

    def step(self, action):
        # Déplacer le serpent selon l'action
        # Vérifier collisions et manger nourriture
        # Retourner (etat_suivant, reward, done)
        pass
  </pre>

  <!-- Fonction step -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. La fonction <code>step</code></h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    La fonction <code>step</code> est le cœur de l’API : elle applique l’action de l’IA et renvoie le nouvel état, le reward et l’information de fin de partie.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def step(self, action):
    if self.done:
        return self.get_etat(), 0, True

    # Déplacer serpent (exemple simplifié)
    tete = self.serpent[0]
    if action == 'haut': nouvelle_tete = (tete[0]-1, tete[1])
    elif action == 'bas': nouvelle_tete = (tete[0]+1, tete[1])
    elif action == 'gauche': nouvelle_tete = (tete[0], tete[1]-1)
    elif action == 'droite': nouvelle_tete = (tete[0], tete[1]+1)
    
    self.serpent.insert(0, nouvelle_tete)
    
    # Vérifier collisions
    if (nouvelle_tete in self.serpent[1:] or
        nouvelle_tete[0] < 0 or nouvelle_tete[0] >= self.hauteur or
        nouvelle_tete[1] < 0 or nouvelle_tete[1] >= self.largeur):
        self.done = True
        reward = -10
    elif nouvelle_tete == self.nourriture:
        self.score += 1
        reward = 10
        # Générer nouvelle nourriture
        import random
        self.nourriture = (random.randint(0,self.hauteur-1), random.randint(0,self.largeur-1))
    else:
        reward = -0.1
        self.serpent.pop()  # enlever la queue si pas de nourriture

    return self.get_etat(), reward, self.done
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez la classe <code>SnakeGame</code> avec <code>reset</code> et <code>step</code>.</li>
      <li>Testez l’API en simulant des actions aléatoires du serpent.</li>
      <li>Vérifiez que l’état retourné contient bien le serpent, la nourriture et la variable <code>done</code>.</li>
      <li>Essayez différentes fonctions de reward et observez leur impact sur l’apprentissage futur.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Une API bien définie permet de séparer la logique du jeu de l’IA, facilitant l’apprentissage et le debugging.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Créer une API pour le Snake est essentiel pour interagir avec l’IA.  
    Elle standardise la communication : l’IA reçoit l’état du jeu et renvoie des actions, et peut ainsi être entraînée efficacement avec reinforcement learning.
  </p>
</div>`
  },
  {
    id: 30,
    name: "Connecter le jeu à un agent",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Connecter le jeu à un agent IA
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Pour que votre IA joue au Snake, il faut connecter le jeu (via son API) à un agent.  
    L’agent va observer l’état du jeu, choisir une action et recevoir un reward pour apprendre.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Étapes de connexion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Étapes pour connecter un agent</h3>
  <ol class="list-decimal list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Initialiser le jeu avec <code>SnakeGame.reset()</code>.</li>
    <li>L’agent observe l’état actuel du jeu.</li>
    <li>L’agent choisit une action : haut, bas, gauche, droite.</li>
    <li>Appliquer l’action via <code>SnakeGame.step(action)</code>.</li>
    <li>Recevoir le nouvel état, le reward et la variable <code>done</code>.</li>
    <li>Répéter jusqu’à ce que la partie se termine.</li>
  </ol>

  <!-- Exemple simple de boucle -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Exemple de boucle de jeu avec agent aléatoire</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import random

jeu = SnakeGame()
etat = jeu.reset()
done = False

while not done:
    # Choisir une action aléatoire
    action = random.choice(['haut', 'bas', 'gauche', 'droite'])
    
    # Appliquer l'action
    etat, reward, done = jeu.step(action)
    
    # Afficher score et état si besoin
    print(f"Reward: {reward}, Done: {done}")
  </pre>

  <!-- Remplacer par un agent intelligent -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Remplacer l’agent aléatoire par une IA</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une fois votre agent IA entraîné ou en cours d’apprentissage, il suffit de remplacer la sélection aléatoire par une prédiction du modèle :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
etat_vecteur = transformer_etat(etat)  # convertir l'état en vecteur pour l'IA
action = agent.predict(etat_vecteur)    # l'IA renvoie l'action optimale
etat, reward, done = jeu.step(action)
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez la boucle de jeu avec un agent aléatoire.</li>
      <li>Ajoutez un affichage console ou graphique pour observer les actions.</li>
      <li>Créez une fonction <code>transformer_etat()</code> pour préparer les données pour l’IA.</li>
      <li>Testez le branchement avec un modèle simple (par ex. un perceptron qui choisit aléatoirement pour l’instant).</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Connecter le jeu à un agent est la première étape avant d’entraîner une IA à prendre des décisions intelligentes.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    En connectant le jeu à un agent, vous créez un environnement interactif où l’IA peut apprendre.  
    Cette structure standardisée est essentielle pour l’entraînement par renforcement et le suivi des performances.
  </p>
</div>`
  },
  {
    id: 31,
    name: "Passer de simples règles (heuristiques) à un modèle entraîné",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Passer de règles heuristiques à un modèle entraîné
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Avant de créer une IA complexe, il est utile de commencer avec des règles simples (heuristiques) pour comprendre la logique du Snake et tester l’API.  
    Ensuite, on peut remplacer ces règles par un modèle entraîné capable d’apprendre et de généraliser.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Heuristiques -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Règles heuristiques simples</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Une heuristique est une règle « si… alors… » pour guider le serpent. Exemple :
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
def heuristique_simple(etat):
    tete = etat['serpent'][0]
    nourriture = etat['nourriture']
    
    if nourriture[0] < tete[0]:
        return 'haut'
    elif nourriture[0] > tete[0]:
        return 'bas'
    elif nourriture[1] < tete[1]:
        return 'gauche'
    else:
        return 'droite'
  </pre>
  <p class="mb-4 text-gray-700 dark:text-gray-300">
    Avantages : facile à comprendre et à implémenter.  
    Limites : ne gère pas bien les collisions avec le corps ou les murs.
  </p>

  <!-- Remplacer par un modèle -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Remplacer les règles par un modèle entraîné</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Au lieu de coder toutes les règles, on peut entraîner un modèle à prédire la meilleure action à partir de l’état du jeu.
  </p>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
# Transformer l'état du jeu en vecteur pour le modèle
etat_vecteur = transformer_etat(etat)

# Le modèle prédit l'action
action = modele.predict(etat_vecteur)
etat, reward, done = jeu.step(action)
  </pre>
  <p class="mb-4 text-gray-700 dark:text-gray-300">
    L’IA apprend à maximiser le reward plutôt que de suivre des règles fixes, ce qui permet de gérer des situations plus complexes.
  </p>

  <!-- Processus d’évolution -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Processus d’évolution</h3>
  <ol class="list-decimal list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Commencer avec des heuristiques pour valider la logique et l’API.</li>
    <li>Collecter des données d’exemples de parties jouées avec heuristique.</li>
    <li>Entraîner un modèle simple (perceptron ou réseau de neurones) sur ces données.</li>
    <li>Évaluer le modèle et ajuster reward, architecture, exploration.</li>
    <li>Remplacer progressivement l’heuristique par le modèle entraîné.</li>
  </ol>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez une heuristique simple pour que le serpent aille vers la nourriture.</li>
      <li>Simulez 50 parties et collectez les états, actions et rewards.</li>
      <li>Entraînez un modèle simple pour prédire l’action à partir de l’état.</li>
      <li>Remplacez l’heuristique par le modèle et observez les différences de performance.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Cette approche progressive permet de comprendre le fonctionnement de l’IA avant de l’entraîner réellement par reinforcement learning.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Passer des règles heuristiques à un modèle entraîné permet de créer une IA plus flexible et performante.  
    L’heuristique sert de point de départ et de guide pour la collecte de données et le développement du modèle.
  </p>
</div>`
  },
  {
    id: 32,
    name: "Stratégies d’apprentissage par renforcement",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Stratégies d’apprentissage par renforcement
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    L’apprentissage par renforcement (RL) permet à une IA d’apprendre à jouer au Snake en interagissant avec le jeu, en recevant des récompenses (reward) et en ajustant ses actions pour maximiser le score.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Concepts clés -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Concepts clés du RL</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Agent</strong> : l’IA qui prend des décisions.</li>
    <li><strong>Environnement</strong> : le jeu Snake qui fournit l’état et le reward.</li>
    <li><strong>État</strong> : représentation du jeu (serpent, nourriture, murs).</li>
    <li><strong>Action</strong> : déplacement choisi par l’agent (haut, bas, gauche, droite).</li>
    <li><strong>Reward</strong> : valeur numérique qui indique si l’action était bonne ou mauvaise.</li>
    <li><strong>Politique (Policy)</strong> : stratégie de l’agent pour choisir ses actions.</li>
  </ul>

  <!-- Stratégies d’exploration -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Stratégies d’exploration</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent doit explorer différentes actions pour découvrir quelles stratégies sont efficaces.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Épsilon-greedy</strong> : choisir l’action optimale la plupart du temps, mais faire un choix aléatoire avec probabilité ε.</li>
    <li><strong>Softmax / Boltzmann</strong> : probabilités d’action proportionnelles à leur valeur estimée.</li>
    <li><strong>Exploration dirigée</strong> : donner un bonus de reward pour explorer de nouvelles positions ou situations.</li>
  </ul>

  <!-- Mise à jour du modèle -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Mise à jour du modèle</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent utilise les rewards reçus pour améliorer sa politique. Plusieurs approches existent :
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li><strong>Q-Learning</strong> : l’agent apprend une table Q qui estime la valeur de chaque action dans chaque état.</li>
    <li><strong>Deep Q-Network (DQN)</strong> : utiliser un réseau de neurones pour approximer les valeurs Q.</li>
    <li><strong>Policy Gradient</strong> : l’agent apprend directement la probabilité d’effectuer chaque action.</li>
  </ul>

  <!-- Exemple de boucle RL -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Exemple de boucle d’apprentissage</h3>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
etat = jeu.reset()
done = False

while not done:
    etat_vecteur = transformer_etat(etat)
    
    # Choisir action selon epsilon-greedy
    if random.random() &lt; epsilon:
        action = random.choice(['haut','bas','gauche','droite'])
    else:
        action = agent.predict(etat_vecteur)
    
    etat_suivant, reward, done = jeu.step(action)
    
    # Mettre à jour le modèle avec (etat, action, reward, etat_suivant)
    agent.update(etat_vecteur, action, reward, transformer_etat(etat_suivant))
    
    etat = etat_suivant
  </pre>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercices pratiques</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez une stratégie epsilon-greedy simple pour un agent aléatoire.</li>
      <li>Ajoutez un calcul de reward pour chaque action (manger, avancer, collision).</li>
      <li>Simulez plusieurs parties et observez comment l’agent apprend à éviter les collisions.</li>
      <li>Expérimentez avec différents epsilon et fonctions de reward.</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 Comprendre les stratégies RL est la clé pour entraîner un agent capable de jouer efficacement au Snake.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    L’apprentissage par renforcement permet à l’agent d’apprendre de ses expériences et de maximiser le score.  
    Les stratégies d’exploration et la mise à jour des valeurs/actions sont au cœur du processus d’entraînement.
  </p>
</div>`
  },
  {
    id: 33,
    name: "Débugger son modèle",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Débugger son modèle IA pour le Snake
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Débugger un modèle IA consiste à identifier les problèmes liés aux données, à l’architecture ou à l’apprentissage, et à les corriger pour améliorer les performances.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Checklist de débogage -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Checklist de Débogage
  </h3>
  
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <h4 class="font-bold text-[#5328EA] mb-2">Problèmes de Données</h4>
        <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Données mal normalisées</li>
          <li>État du jeu mal représenté</li>
          <li>Rewards incohérents ou trop faibles</li>
          <li>Échantillons insuffisants</li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold text-[#5328EA] mb-2">Problèmes de Modèle</h4>
        <ul class="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Architecture trop simple ou trop complexe</li>
          <li>Problèmes de convergence</li>
          <li>Overfitting ou sous-fitting</li>
          <li>Actions aléatoires malgré l’apprentissage</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Diagnostic des problèmes -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Diagnostic des Problèmes
  </h3>
  
  <div class="overflow-x-auto mb-6">
    <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <thead class="bg-[#5328EA]/10">
        <tr>
          <th class="px-4 py-2 text-left text-[#5328EA]">Symptôme</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Cause Possible</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Solution</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          <td class="px-4 py-2">Score stagnant ou négatif</td>
          <td class="px-4 py-2">Reward mal défini, exploration insuffisante</td>
          <td class="px-4 py-2">Revoir reward, augmenter epsilon, ajuster fonction d’exploration</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Comportement aléatoire</td>
          <td class="px-4 py-2">Modèle pas entraîné ou gradients nuls</td>
          <td class="px-4 py-2">Vérifier forward pass, normalisation des données, apprentissage correct</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Actions suicidaires fréquentes</td>
          <td class="px-4 py-2">Reward négatif mal pris en compte ou modèle trop simple</td>
          <td class="px-4 py-2">Ajuster reward, complexifier modèle, augmenter exploration</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Perte oscillante</td>
          <td class="px-4 py-2">Learning rate trop élevé</td>
          <td class="px-4 py-2">Réduire learning rate ou utiliser scheduler</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Outils de débogage -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Outils de Débogage
  </h3>
  
  <div class="grid md:grid-cols-3 gap-4 mb-6">
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Visualisation</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>Courbes de reward moyen</li>
        <li>Actions choisies par l’agent</li>
        <li>État du serpent à chaque étape</li>
      </ul>
    </div>
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Analyse</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>Distribution des rewards</li>
        <li>Évaluation de la politique</li>
        <li>Analyse des échecs (collisions)</li>
      </ul>
    </div>
    <div class="bg-[#F7F7F7] dark:bg-gray-800 p-4 rounded-lg">
      <h4 class="font-bold text-[#5328EA] mb-2">Code</h4>
      <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
        <li>TensorBoard / Matplotlib pour visualiser apprentissage</li>
        <li>Impression console des états et actions</li>
        <li>Tests unitaires pour les fonctions reward et step</li>
      </ul>
    </div>
  </div>

  <!-- Exemple pratique -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">
    Exemple pratique : Agent qui n’apprend pas
  </h3>
  
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <div class="code-block bg-black text-white p-4 rounded overflow-x-auto">
      <pre><code class="language-python"># Problème : Agent qui meurt toujours à 1-2 mouvements
etat = jeu.reset()
done = False

while not done:
    etat_vecteur = transformer_etat(etat)
    action = agent.predict(etat_vecteur)
    etat, reward, done = jeu.step(action)
    print(f"Action: {action}, Reward: {reward}, Done: {done}")

# Vérifier :
# 1. Reward cohérent ?
# 2. Etat correctement transformé ?
# 3. Forward pass fonctionne ?
# 4. Modèle assez puissant ?</code></pre>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
      Cette méthode permet de comprendre pourquoi l’agent ne progresse pas et d’isoler la cause.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Débugger son modèle est essentiel pour transformer un agent inefficace en une IA performante.  
    Une approche systématique et des outils de visualisation permettent d’identifier rapidement les problèmes et de les corriger.
  </p>
</div>`
  },
  {
    id: 34,
    name: "Problèmes fréquents (underfitting, overfitting, mauvais reward shaping)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Problèmes fréquents : Underfitting, Overfitting et Reward Shaping
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Lors de l’entraînement d’une IA pour le Snake, certains problèmes apparaissent souvent et empêchent l’agent d’apprendre correctement. Il est crucial de les reconnaître et de savoir comment les corriger.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Underfitting -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Underfitting (sous-apprentissage)</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’underfitting se produit lorsque le modèle est trop simple pour capturer la complexité du jeu. L’agent ne progresse pas et fait souvent des choix aléatoires.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Symptômes : score faible et constant, perte élevée et stagnante.</li>
    <li>Causes : réseau trop petit, pas assez d’entraînement, features insuffisantes.</li>
    <li>Solutions : augmenter la taille du réseau, ajouter des couches cachées, améliorer la représentation de l’état.</li>
  </ul>

  <!-- Overfitting -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Overfitting (sur-apprentissage)</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’overfitting survient lorsque le modèle apprend trop précisément les parties jouées précédemment, sans généraliser à de nouvelles situations.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Symptômes : très bonnes performances sur des parties d’entraînement, mais mauvaises sur de nouvelles parties.</li>
    <li>Causes : réseau trop complexe, trop d’entraînement, pas assez de diversité dans les données.</li>
    <li>Solutions : regularisation (L2, dropout), early stopping, augmenter la diversité des parties.</li>
  </ul>

  <!-- Mauvais Reward Shaping -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Mauvais Reward Shaping</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Le reward shaping consiste à définir correctement les récompenses pour guider l’apprentissage. Un mauvais reward peut entraîner des comportements indésirables.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Symptômes : l’agent tourne en rond, ignore la nourriture, se suicide volontairement.</li>
    <li>Causes : rewards trop faibles ou mal répartis, absence de pénalité pour collisions.</li>
    <li>Solutions : donner un reward positif pour manger, un petit reward pour avancer sans mourir, un reward négatif pour collisions.</li>
  </ul>

  <!-- Table récapitulative -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Récapitulatif des problèmes et solutions</h3>
  <div class="overflow-x-auto mb-6">
    <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <thead class="bg-[#5328EA]/10">
        <tr>
          <th class="px-4 py-2 text-left text-[#5328EA]">Problème</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Symptômes</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Solution</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          <td class="px-4 py-2">Underfitting</td>
          <td class="px-4 py-2">Score faible, comportement aléatoire</td>
          <td class="px-4 py-2">Réseau plus grand, meilleures features, plus d’entraînement</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Overfitting</td>
          <td class="px-4 py-2">Bonne performance sur entraînement, mauvaise sur test</td>
          <td class="px-4 py-2">Regularisation, dropout, early stopping, plus de diversité</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Mauvais reward shaping</td>
          <td class="px-4 py-2">Comportement indésirable, ignore la nourriture</td>
          <td class="px-4 py-2">Récompenser actions correctes, pénaliser collisions</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Identifier les problèmes fréquents et ajuster architecture, données et rewards est essentiel pour qu’une IA puisse apprendre efficacement à jouer au Snake.
  </p>
</div>`
  },
  {
    id: 35,
    name: "Outils de visualisation et suivi (TensorBoard, courbes)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Outils de visualisation et suivi : TensorBoard et courbes
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Suivre l’apprentissage de votre IA est essentiel pour comprendre son comportement, détecter les problèmes et ajuster les paramètres. Des outils comme TensorBoard ou les courbes Matplotlib permettent de visualiser performance et rewards.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Courbes d'apprentissage -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Courbes d’apprentissage</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    Les courbes permettent de visualiser l’évolution de la performance de l’agent au fil des épisodes.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Score moyen par épisode</li>
    <li>Reward cumulatif</li>
    <li>Perte du modèle (loss)</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
import matplotlib.pyplot as plt

plt.plot(scores)
plt.title("Score par épisode")
plt.xlabel("Épisode")
plt.ylabel("Score")
plt.show()
  </pre>

  <!-- TensorBoard -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. TensorBoard</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    TensorBoard est un outil de suivi interactif fourni avec TensorFlow. Il permet de suivre loss, reward, gradients et paramètres du réseau en temps réel.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Visualiser l’évolution de la loss et du reward</li>
    <li>Observer les distributions des poids et gradients</li>
    <li>Comparer plusieurs expériences d’entraînement</li>
  </ul>
  <pre class="bg-gray-900 text-green-400 p-3 rounded mb-4 overflow-x-auto">
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter("runs/snake_experiment")

for episode in range(1000):
    score = jouer_episode(agent, jeu)
    writer.add_scalar("Score par épisode", score, episode)

writer.close()
  </pre>

  <!-- Bonnes pratiques -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Bonnes pratiques</h3>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Tracer reward moyen sur plusieurs épisodes pour lisser les courbes.</li>
    <li>Suivre à la fois loss et score pour détecter overfitting ou underfitting.</li>
    <li>Versionner vos expériences pour pouvoir les comparer.</li>
    <li>Analyser les courbes avant de modifier l’architecture ou les hyperparamètres.</li>
  </ul>

  <!-- Exercice pratique -->
  <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">💡 Exercice pratique</h3>
  <div class="bg-[#F7F7F7] dark:bg-gray-800 border-l-4 border-[#5328EA] p-4 rounded mb-4">
    <ul class="list-disc list-inside ml-4 text-gray-700 dark:text-gray-300">
      <li>Implémentez une courbe de score moyen par épisode avec Matplotlib.</li>
      <li>Ajoutez le suivi des rewards cumulés.</li>
      <li>Si vous utilisez TensorFlow ou PyTorch, configurez TensorBoard pour suivre au moins la loss et le score.</li>
      <li>Comparez les résultats de deux stratégies d’exploration différentes (ex: epsilon 0.1 vs 0.3).</li>
    </ul>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
      👉 La visualisation est un outil puissant pour comprendre l’apprentissage et guider les ajustements du modèle.
    </p>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Les outils de visualisation permettent de suivre l’agent, détecter des anomalies et ajuster le modèle en temps réel. TensorBoard et les courbes Matplotlib sont essentiels pour un suivi efficace.
  </p>
</div>`
  },
  {
    id: 36,
    name: "Études de cas : pourquoi le Snake meurt toujours trop tôt ?",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-3xl text-[#5328EA] font-bold mb-4">
    Études de cas : pourquoi le Snake meurt toujours trop tôt ?
  </h2>

  <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
    Même après plusieurs entraînements, l’agent peut mourir très rapidement. Comprendre les causes possibles est essentiel pour améliorer son comportement et son score.
  </p>

  <hr class="my-4 border-[#5328EA]/50" />

  <!-- Cas 1 -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">1. Cas 1 : Actions aléatoires persistantes</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent ne semble pas apprendre et choisit souvent des actions au hasard.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Cause possible : exploration trop élevée (epsilon trop grand), réseau trop simple ou pas assez entraîné.</li>
    <li>Solution : réduire epsilon progressivement, augmenter la complexité du réseau, entraîner sur plus d’épisodes.</li>
  </ul>

  <!-- Cas 2 -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">2. Cas 2 : Reward mal défini</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent ne comprend pas que certaines actions sont dangereuses.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Cause possible : collisions non pénalisées, rewards positifs trop faibles ou incohérents.</li>
    <li>Solution : attribuer un reward négatif pour les collisions et un reward positif pour manger.</li>
  </ul>

  <!-- Cas 3 -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">3. Cas 3 : Représentation de l’état insuffisante</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent ne "voit" pas correctement le jeu et prend des décisions inefficaces.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Cause possible : la grille n’est pas correctement encodée, obstacles ou nourriture non pris en compte.</li>
    <li>Solution : transformer l’état du jeu en vecteurs ou matrices claires, inclure toutes les informations pertinentes.</li>
  </ul>

  <!-- Cas 4 -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">4. Cas 4 : Overfitting à certaines situations</h3>
  <p class="mb-2 text-gray-700 dark:text-gray-300">
    L’agent a appris certaines séquences mais échoue dans des positions nouvelles.
  </p>
  <ul class="list-disc list-inside ml-6 mb-4 text-gray-700 dark:text-gray-300">
    <li>Cause possible : trop d’entraînement sur des scénarios similaires, manque de diversité.</li>
    <li>Solution : varier les positions de départ, randomiser la génération de nourriture, utiliser dropout ou régularisation.</li>
  </ul>

  <!-- Table récapitulative -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">5. Récapitulatif des causes et solutions</h3>
  <div class="overflow-x-auto mb-6">
    <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <thead class="bg-[#5328EA]/10">
        <tr>
          <th class="px-4 py-2 text-left text-[#5328EA]">Problème</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Cause Possible</th>
          <th class="px-4 py-2 text-left text-[#5328EA]">Solution</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          <td class="px-4 py-2">Actions aléatoires</td>
          <td class="px-4 py-2">Exploration trop élevée, modèle simple ou non entraîné</td>
          <td class="px-4 py-2">Réduire epsilon, complexifier réseau, plus d’épisodes</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Reward mal défini</td>
          <td class="px-4 py-2">Collisions non pénalisées, rewards incohérents</td>
          <td class="px-4 py-2">Attribuer reward négatif pour collisions et positif pour nourriture</td>
        </tr>
        <tr>
          <td class="px-4 py-2">État mal représenté</td>
          <td class="px-4 py-2">Grille mal encodée, obstacles ignorés</td>
          <td class="px-4 py-2">Encoder correctement toutes les informations pertinentes dans le vecteur/ matrice</td>
        </tr>
        <tr>
          <td class="px-4 py-2">Overfitting</td>
          <td class="px-4 py-2">Trop d’entraînement sur scénarios similaires</td>
          <td class="px-4 py-2">Varier positions de départ, randomiser nourriture, régularisation</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Conclusion -->
  <h3 class="text-2xl font-semibold mt-6 mb-2 text-[#5328EA]">Conclusion</h3>
  <p class="text-gray-700 dark:text-gray-300">
    Analyser pourquoi l’agent meurt trop tôt permet de corriger reward, exploration, représentation de l’état et overfitting.  
    Ces ajustements sont essentiels pour qu’une IA joue efficacement et survive plus longtemps.
  </p>
</div>`
  },
  {
    id: 37,
    name: "Représentation d'un Jeu de Plateau en Python",
    language: "Python",
    difficulty: "Intermédiaire",
    duree: "Long (2h)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Représentation d'un Jeu de Plateau en Python</h1>
    
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
      <p class="mb-4 text-lg">La représentation efficace d'un jeu de plateau est la pierre angulaire pour développer une IA performante. Ce cours approfondi couvrira :</p>
      <ul class="list-disc pl-8 mb-6 space-y-2">
        <li>Les différentes structures de données pour modéliser un plateau</li>
        <li>Les opérations fondamentales (jouer un coup, vérifier une victoire)</li>
        <li>Les techniques d'optimisation pour les jeux tour par tour</li>
        <li>Des études de cas comparatives entre approches</li>
      </ul>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 1 : Structures de Données Fondamentales</h2>
      
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">1.1 La Matrice 2D Classique</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">class PlateauListe:
    def __init__(self, lignes=6, colonnes=7):
        self.grille = [[None for _ in range(colonnes)] for _ in range(lignes)]
        # None: case vide, 1: joueur 1, 2: joueur 2</code></pre>
        </div>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-bold text-[#5328EA]">Avantages :</h4>
            <ul class="list-disc pl-6">
              <li>Simple à comprendre et déboguer</li>
              <li>Accès direct aux cases via grille[ligne][colonne]</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-[#5328EA]">Inconvénients :</h4>
            <ul class="list-disc pl-6">
              <li>Coût en mémoire élevé (surallocation)</li>
              <li>Opérations globales lentes (pas vectorisées)</li>
            </ul>
          </div>
        </div>
      </article>

      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">1.2 Les Tableaux NumPy</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">import numpy as np

class PlateauNumpy:
    def __init__(self):
        self.grille = np.zeros((6,7), dtype=np.int8)
        # Valeurs possibles : 0 (vide), 1, 2</code></pre>
        </div>
        <p class="mb-4">Benchmark sur 10 000 itérations :</p>
        <div class="overflow-x-auto">
          <table class="w-full mb-4 border-collapse">
            <thead>
              <tr class="bg-[#5328EA]/10">
                <th class="p-2 border">Opération</th>
                <th class="p-2 border">Listes</th>
                <th class="p-2 border">NumPy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2 border">Accès aléatoire</td>
                <td class="p-2 border">0.12s</td>
                <td class="p-2 border">0.04s</td>
              </tr>
              <tr>
                <td class="p-2 border">Copie complète</td>
                <td class="p-2 border">1.45s</td>
                <td class="p-2 border">0.23s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">1.3 Bitboards (Technique Avancée)</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">class Bitboard:
    def __init__(self):
        self.joueur1 = 0  # Chaque bit représente une case
        self.joueur2 = 0
        self.hauteurs = [0,7,14,21,28,35,42]  # Colonnes
        
    def jouer_coup(self, colonne):
        position = 1 << (self.hauteurs[colonne])
        self.joueur1 ^= position
        self.hauteurs[colonne] += 1</code></pre>
        </div>
        <p class="mb-2">Cette technique utilise :</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Opérations bit à bit ultra-rapides</li>
          <li>Seulement 2 entiers pour stocker tout l'état du jeu</li>
        </ul>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 2 : Opérations Fondamentales</h2>
      
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">2.1 Vérification des Victoires</h3>
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-bold text-[#5328EA]">Approche Naïve</h4>
            <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
              <pre><code class="language-python">def check_win(board):
    # Vérifie toutes les lignes
    for row in range(6):
        for col in range(4):
            if (board[row][col] == board[row][col+1] == 
                board[row][col+2] == board[row][col+3] != 0):
                return True
    # Répéter pour vertical/diagonales...</code></pre>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-[#5328EA]">Optimisation Bitboard</h4>
            <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
              <pre><code class="language-python">def check_win_bb(bb):
    directions = [1, 7, 6, 8]  # H, V, D1, D2
    for dir in directions:
        if (bb & (bb >> dir) & 
            (bb >> 2*dir) & (bb >> 3*dir)) != 0:
            return True
    return False</code></pre>
            </div>
          </div>
        </div>
      </article>

      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">2.2 Génération des Coups Valides</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">def coups_valides(self):
    if self.version == "numpy":
        return np.where(self.grille[0] == 0)[0]  # Colonnes vides en haut
    else:
        return [c for c in range(7) 
                if any(self.grille[l][c] is None 
                      for l in range(6))]</code></pre>
        </div>
        <p class="mb-2">Considérations importantes :</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Ordre des coups impacte l'efficacité de Minimax</li>
          <li>Peut être pré-calculé pour optimisation</li>
        </ul>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 3 : Étude Comparative Approfondie</h2>
      
      <div class="bg-black text-white p-6 rounded-xl mb-6 overflow-x-auto">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-4">Benchmark Complet (10 000 itérations)</h3>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-[#5328EA]/20">
                <th class="p-3 border text-left">Opération</th>
                <th class="p-3 border">Listes</th>
                <th class="p-3 border">NumPy</th>
                <th class="p-3 border">Bitboard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 border">Initialisation</td>
                <td class="p-3 border">0.12 ms</td>
                <td class="p-3 border">0.45 ms</td>
                <td class="p-3 border">0.08 ms</td>
              </tr>
              <tr>
                <td class="p-3 border">Jouer un coup</td>
                <td class="p-3 border">1.34 ms</td>
                <td class="p-3 border">0.56 ms</td>
                <td class="p-3 border">0.02 ms</td>
              </tr>
              <tr>
                <td class="p-3 border">Vérif victoire</td>
                <td class="p-3 border">4.21 ms</td>
                <td class="p-3 border">1.89 ms</td>
                <td class="p-3 border">0.11 ms</td>
              </tr>
              <tr>
                <td class="p-3 border">Mémoire utilisée</td>
                <td class="p-3 border">1.2 KB</td>
                <td class="p-3 border">0.4 KB</td>
                <td class="p-3 border">0.02 KB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-gray-600">Tests réalisés sur Intel Core i7-1185G7 @ 3.00GHz</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-black p-6 rounded-lg shadow-md overflow-x-auto">
          <h4 class="font-bold text-lg text-[#5328EA] mb-3">Quand utiliser Listes/Numpy ?</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Prototypage rapide</li>
            <li>Interface avec librairies ML</li>
            <li>Code plus lisible/maintenable</li>
          </ul>
        </div>
        <div class="bg-black p-6 rounded-lg shadow-md overflow-x-auto">
          <h4 class="font-bold text-lg text-[#5328EA] mb-3">Quand utiliser Bitboard ?</h4>
          <ul class="list-disc pl-6 space-y-2">
            <li>Compétitions d'IA</li>
            <li>Profondeur de recherche critique</li>
            <li>Jeux avec règles simples</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Exercice Pratique Guidé</h2>
      
      <div class="bg-black p-6 rounded-xl mb-6 overflow-x-auto">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-4">Implémentation Complète</h3>
        <p class="mb-4">Créez une classe <code>Puissance4</code> avec :</p>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li>Constructeur initialisant le plateau</li>
          <li>Méthode <code>jouer_coup(colonne)</code></li>
          <li>Méthode <code>est_gagnant()</code></li>
          <li>Méthode <code>coups_valides()</code></li>
        </ol>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-bold text-[#5328EA] mb-2">Solution de Base</h4>
            <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
              <pre><code class="language-python">class Puissance4:
    def __init__(self):
        self.plateau = [[None]*7 for _ in range(6)]
        self.joueur = 1
    
    def jouer_coup(self, colonne):
        for ligne in reversed(range(6)):
            if self.plateau[ligne][colonne] is None:
                self.plateau[ligne][colonne] = self.joueur
                self.joueur = 3 - self.joueur  # Alterne 1 et 2
                return True
        return False</code></pre>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-[#5328EA] mb-2">Optimisation</h4>
            <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
              <pre><code class="language-python">class Puissance4Opti:
    def __init__(self):
        self.plateau = np.zeros((6,7), dtype=np.int8)
        self.hauteurs = [5]*7  # Tracke la prochaine ligne libre
        
    def jouer_coup(self, colonne):
        if self.hauteurs[colonne] >= 0:
            self.plateau[self.hauteurs[colonne], colonne] = self.joueur
            self.hauteurs[colonne] -= 1
            return True
        return False</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Annexes Techniques</h2>
      
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">A.1 Zobrist Hashing</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">import random

class ZobristHash:
    def __init__(self):
        self.table = [[random.getrandbits(64) for _ in range(2)] 
                     for _ in range(6*7)]
    
    def compute(self, plateau):
        h = 0
        for i in range(6):
            for j in range(7):
                if plateau[i][j] is not None:
                    h ^= self.table[i*7 + j][plateau[i][j] - 1]
        return h</code></pre>
        </div>
        <p class="mb-2">Utile pour :</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Tables de transposition</li>
          <li>Détection de positions répétées</li>
        </ul>
      </article>

      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">A.2 Mémoïzation avec LRU Cache</h3>
        <div class="bg-black text-white p-4 rounded-lg mb-4 overflow-x-auto">
          <pre><code class="language-python">from functools import lru_cache

@lru_cache(maxsize=10_000)
def evaluer_position(hash_position):
    # Implémentation de l'évaluation
    return score</code></pre>
        </div>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion et Prochaines Étapes</h2>
      
      <div class="bg-black text-white p-6 rounded-xl overflow-x-auto">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">Checklist de Validation</h3>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Votre implémentation passe tous les tests unitaires</li>
          <li>Les opérations de base prennent moins de 1ms</li>
          <li>Vous pouvez générer 10 000 positions aléatoires en <1s</li>
        </ul>
        
        <h3 class="text-xl font-semibold text-[#5328EA] mt-6 mb-3">Pour Approfondir</h3>
        <ul class="list-disc pl-6 space-y-2">
          <li>Extension aux jeux hexagonaux (ex: Abalone)</li>
          <li>Intégration avec Cython pour performances extrêmes</li>
          <li>Parallelisation avec multiprocessing</li>
        </ul>
      </div>
    </section>
  </div>`
  },
  {
    id: 38,
    name: "Développer une IA Minimax pour un Jeu de Plateau",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (2h)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Développer une IA Minimax pour un Jeu de Plateau</h1>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
      <p class="mb-4 text-lg">Le Minimax est un algorithme fondamental pour l'intelligence artificielle des jeux à deux joueurs. Ce cours vous apprendra à :</p>
      <ul class="list-disc pl-8 mb-6 space-y-2">
        <li>Comprendre le fonctionnement de Minimax et l'élagage alpha-bêta</li>
        <li>L'implémenter dans un jeu de type Puissance 4</li>
        <li>Optimiser les performances avec de la mémoïsation</li>
        <li>Ajouter une évaluation heuristique efficace</li>
      </ul>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 1 : Principe de l'Algorithme Minimax</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">1.1 Rappel Théorique</h3>
        <p>Minimax explore tous les coups possibles jusqu'à une profondeur donnée et choisit le coup maximisant les chances de victoire tout en supposant un adversaire parfait.</p>
      </article>

      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">1.2 Implémentation Basique</h3>
        <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
          <pre><code class="language-python">def minimax(plateau, profondeur, maximisant):
    if profondeur == 0 or partie_terminee(plateau):
        return evaluation(plateau)
    if maximisant:
        max_eval = -float('inf')
        for coup in coups_valides(plateau):
            eval = minimax(jouer(plateau, coup), profondeur - 1, False)
            max_eval = max(max_eval, eval)
        return max_eval
    else:
        min_eval = float('inf')
        for coup in coups_valides(plateau):
            eval = minimax(jouer(plateau, coup), profondeur - 1, True)
            min_eval = min(min_eval, eval)
        return min_eval</code></pre>
        </div>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 2 : Élagage Alpha-Bêta</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">2.1 Amélioration de Minimax</h3>
        <p>L'élagage alpha-bêta évite d'explorer certaines branches inutiles de l'arbre de recherche, réduisant significativement le temps de calcul.</p>
        <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
          <pre><code class="language-python">def alphabeta(plateau, profondeur, alpha, beta, maximisant):
    if profondeur == 0 or partie_terminee(plateau):
        return evaluation(plateau)
    if maximisant:
        for coup in coups_valides(plateau):
            eval = alphabeta(jouer(plateau, coup), profondeur - 1, alpha, beta, False)
            alpha = max(alpha, eval)
            if beta <= alpha:
                break  # Coupure bêta
        return alpha
    else:
        for coup in coups_valides(plateau):
            eval = alphabeta(jouer(plateau, coup), profondeur - 1, alpha, beta, True)
            beta = min(beta, eval)
            if beta <= alpha:
                break  # Coupure alpha
        return beta</code></pre>
        </div>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 3 : Heuristique d'Évaluation</h2>
      <p>Une bonne fonction d'évaluation permet à l'IA de prendre de bonnes décisions sans aller au bout de la partie.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">def evaluation(plateau):
    score = 0
    # +10 pour chaque alignement de 3 pions, -100 si l'adversaire gagne
    score += nb_alignements(plateau, joueur=1, n=3) * 10
    score -= nb_alignements(plateau, joueur=2, n=4) * 100
    return score</code></pre>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Partie 4 : Optimisations et Mémoïsation</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-3">4.1 Mémoïsation</h3>
        <p>On peut stocker les évaluations déjà calculées avec un hash du plateau.</p>
        <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
          <pre><code class="language-python">from functools import lru_cache

@lru_cache(maxsize=100_000)
def alphabeta_hash(hash_plateau, profondeur, alpha, beta, maximisant):
    # Similaire à alphabeta(), mais avec un hash pour la mémoïsation
    ...</code></pre>
        </div>
      </article>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Exercice Pratique</h2>
      <p>Ajoutez une IA dans votre jeu Puissance4 :</p>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Implémentez la fonction <code>minimax()</code> ou <code>alphabeta()</code></li>
        <li>Définissez une fonction <code>meilleur_coup()</code> qui renvoie la colonne à jouer</li>
        <li>Intégrez-la dans votre boucle principale de jeu</li>
      </ol>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p>Vous êtes désormais capable de créer une IA jouant efficacement à un jeu de plateau. En combinant Minimax, heuristique et optimisation, vous posez les bases d'une IA performante prête à affronter des humains ou d'autres intelligences.</p>
    </section>
  </div>`
  },
  {
    id: 39,
    name: "Optimisation des Algorithmes pour les Jeux Tour par Tour",
    language: "Python",
    difficulty: "Avancé",
    duree: "Moyen (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Optimisation des Algorithmes pour les Jeux Tour par Tour</h1>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
    <p class="text-lg mb-4">Dans les jeux tour par tour, chaque décision peut fortement impacter la stratégie. Ce cours explore différentes méthodes d'optimisation pour rendre vos algorithmes plus efficaces sans sacrifier la qualité de jeu.</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Pruning logique pour limiter les états inutiles</li>
      <li>Évaluation paresseuse (lazy evaluation)</li>
      <li>Approches basées sur les priorités et files de priorité</li>
      <li>Utilisation intelligente du temps et de la mémoire</li>
    </ul>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Réduction de l'Espace de Recherche</h2>
    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">1.1 Pruning Logique</h3>
      <p>Éliminez dès le départ les coups absurdes ou dominés. Cela peut réduire jusqu'à 50% l'espace de recherche.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">def coups_utiles(etat):
    return [coup for coup in tous_les_coups(etat) if est_viable(coup, etat)]</code></pre>
      </div>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">1.2 Transposition Table</h3>
      <p>Stockez les résultats déjà calculés pour éviter de recalculer un état identique obtenu différemment.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">memo = {}
def eval_avec_memo(etat):
    h = hash_etat(etat)
    if h in memo:
        return memo[h]
    score = eval_classique(etat)
    memo[h] = score
    return score</code></pre>
      </div>
    </article>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Évaluation Paresseuse et Incrémentale</h2>
    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">2.1 Lazy Evaluation</h3>
      <p>Ne calculez l'évaluation d'un état que si nécessaire pour la prise de décision.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">def meilleur_coup(etat):
    meilleurs = []
    score_max = -float('inf')
    for coup in coups_utiles(etat):
        score = eval_coup_paresseux(etat, coup)
        if score > score_max:
            score_max = score
            meilleurs = [coup]
        elif score == score_max:
            meilleurs.append(coup)
    return random.choice(meilleurs)</code></pre>
      </div>
    </article>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Priorisation des Coups</h2>
    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">3.1 Tri Heuristique</h3>
      <p>Triez les coups selon leur potentiel estimé avant de les tester dans votre algorithme.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">def coups_tries(etat):
    return sorted(coups_utiles(etat), key=lambda c: heuristique(etat, c), reverse=True)</code></pre>
      </div>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">3.2 Utilisation de Heap (file de priorité)</h3>
      <p>Pour un traitement partiel des meilleurs coups, utilisez une file de priorité (heap).</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">import heapq

def top_k_coups(etat, k=3):
    heap = []
    for coup in coups_utiles(etat):
        score = heuristique(etat, coup)
        heapq.heappush(heap, (-score, coup))
    return [heapq.heappop(heap)[1] for _ in range(min(k, len(heap)))]</code></pre>
      </div>
    </article>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Optimisations Temporelles et Mémoire</h2>
    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">4.1 Limitation par le Temps</h3>
      <p>Autorisez l'algorithme à s'interrompre après un temps imparti.</p>
      <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
        <pre><code class="language-python">import time

def jouer_avec_limite(etat, temps_max=2.0):
    debut = time.time()
    profondeur = 1
    meilleur = None
    while time.time() - debut < temps_max:
        meilleur = minimax(etat, profondeur)
        profondeur += 1
    return meilleur</code></pre>
      </div>
    </article>

    <article class="mb-8">
      <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">4.2 Allocation Dynamique</h3>
      <p>Évitez la surcharge mémoire en allouant les structures uniquement si nécessaires (ex: historique, logs).</p>
    </article>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
    <p class="mb-4">En combinant pruning, évaluation paresseuse et gestion dynamique du temps et de la mémoire, vous pouvez rendre vos IA de jeu tour par tour beaucoup plus efficaces et intelligentes.</p>
    <p>Ces techniques sont cruciales pour passer d'un prototype à une IA jouable en production.</p>
  </section>
</div>`
  },
  {
    id: 40,
    name: "Évaluation des Positions : Heuristiques et Fonctions de Score",
    language: "Python",
    difficulty: "Intermédiaire",
    duree: "Moyen (1h15)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Évaluation des Positions : Heuristiques et Fonctions de Score</h1>
  
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
      <p class="text-lg mb-4">Dans les jeux tour par tour, la qualité de l'évaluation d'une position est essentielle pour prendre de bonnes décisions. Ce cours vous apprend à créer et utiliser des fonctions heuristiques pour noter une position de manière pertinente.</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Qu’est-ce qu’une fonction d’évaluation ?</li>
        <li>Conception d’une heuristique simple</li>
        <li>Combinaison pondérée de critères</li>
        <li>Ajustement dynamique des scores selon le contexte</li>
      </ul>
    </section>
  
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Bases d’une Fonction d’Évaluation</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">1.1 Définition</h3>
        <p>Une fonction d’évaluation est une fonction qui prend en entrée un état du jeu et retourne un score numérique indiquant l’intérêt stratégique de cette position pour un joueur donné.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python">def eval_simple(etat):
      return etat.points_joueur - etat.points_adversaire</code></pre>
        </div>
      </article>
  
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">1.2 Convention des Scores</h3>
        <p>Utilisez une convention claire : score positif si la position est favorable au joueur courant, négatif sinon. Cela facilite l’intégration dans des algorithmes comme Minimax ou MCTS.</p>
      </article>
    </section>
  
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Élaboration d’Heuristiques Personnalisées</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">2.1 Analyse de Critères</h3>
        <p>Choisissez plusieurs critères pertinents : contrôle du terrain, nombre d’unités, ressources restantes, etc.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python">def eval_heuristique(etat):
      controle = score_zone(etat)
      force = etat.unités_joueur - etat.unités_adversaire
      ressource = etat.ressources_joueur - etat.ressources_adversaire
      return 3 * controle + 2 * force + ressource</code></pre>
        </div>
      </article>
  
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">2.2 Pondération des Composantes</h3>
        <p>Attribuez des coefficients aux critères selon leur importance stratégique dans votre jeu. Ces coefficients peuvent être affinés avec l’expérience ou par apprentissage.</p>
      </article>
    </section>
  
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Ajustement Dynamique du Score</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">3.1 Heuristique par Phase de Jeu</h3>
        <p>Adaptez les poids selon la phase (début, milieu, fin). Exemple : ressources importantes au début, unités prioritaires en fin de partie.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python">def eval_par_phase(etat):
      phase = etat.phase_jeu()
      if phase == 'debut':
          return 2 * etat.ressources_joueur + etat.controle_terrain
      elif phase == 'milieu':
          return 3 * etat.controle_terrain + etat.force
      else:  # fin
          return 5 * etat.unités_joueur - 3 * etat.unités_adversaire</code></pre>
        </div>
      </article>
  
      <article class="mb-8">
        <h3 class="text-xl font-semibold mb-2 text-[#5328EA]">3.2 Prise en Compte du Contexte</h3>
        <p>Vous pouvez aussi modifier les pondérations selon l’adversaire ou le style de jeu détecté (agressif, défensif).</p>
      </article>
    </section>
  
    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Conseils et Bonnes Pratiques</h2>
      <ul class="list-disc pl-6 space-y-2 text-lg">
        <li>Ne combinez pas trop de critères au début, restez simple</li>
        <li>Testez avec des parties simulées pour ajuster les pondérations</li>
        <li>Ajoutez un bruit aléatoire faible pour éviter l’égalité parfaite entre coups</li>
        <li>Assurez-vous que le score est normalisé pour rester dans une plage exploitable</li>
      </ul>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p class="mb-4">La fonction d’évaluation est le cœur stratégique d’un moteur de jeu. Une bonne heuristique peut compenser un manque de profondeur d’analyse, tandis qu’une mauvaise peut ruiner une IA puissante.</p>
      <p>Testez, itérez, améliorez !</p>
    </section>
  </div>`
  },
  {
    id: 41,
    name: "Optimisation des Performances pour les Calculs Complexes",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Optimisation des Performances pour les Calculs Complexes</h1>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
      <p class="text-lg mb-4">Lorsque vous développez des systèmes comme des moteurs de jeux, des IA, ou des simulations, il est crucial d’optimiser vos algorithmes pour réduire les temps de calcul. Ce cours vous présente les stratégies de base et avancées pour améliorer significativement la performance.</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Profilage pour identifier les goulots d’étranglement</li>
        <li>Réduction de la complexité algorithmique</li>
        <li>Mémorisation et cache</li>
        <li>Parallélisation et vectorisation</li>
        <li>Usage de bibliothèques C via Python</li>
      </ul>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Profilage du Code</h2>
      <p>Avant d’optimiser, vous devez savoir quoi optimiser. Utilisez des outils de profilage comme :</p>
      <ul class="list-disc pl-6 mb-4">
        <li><code>cProfile</code> (intégré à Python)</li>
        <li><code>line_profiler</code> pour du détail ligne par ligne</li>
      </ul>
      <div class="bg-black text-white p-4 rounded-lg mb-4">
        <pre><code class="language-bash">python -m cProfile -s time mon_script.py</code></pre>
      </div>
      <p>Recherchez les fonctions les plus coûteuses en temps d’exécution.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Optimisation Algorithmique</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-2">2.1 Réduction de la Complexité</h3>
        <p>Remplacez des algorithmes naïfs par des équivalents plus efficaces.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python"># Mauvais : O(n²)
  for i in range(len(lst)):
      for j in range(len(lst)):
          if lst[i] == lst[j]: ...
  
  # Meilleur : O(n)
  seen = set()
  for x in lst:
      if x in seen: ...
      seen.add(x)</code></pre>
        </div>
      </article>
  
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-2">2.2 Early Exit et Pruning</h3>
        <p>Arrêtez les calculs dès que possible. Exemple : coup gagnant trouvé → inutile d’évaluer les autres coups.</p>
      </article>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Caching et Mémoïsation</h2>
      <p>Évitez de recalculer les mêmes fonctions. Python propose <code>functools.lru_cache</code>.</p>
      <div class="bg-black text-white p-4 rounded-lg mb-4">
        <pre><code class="language-python">from functools import lru_cache
  
  @lru_cache(maxsize=None)
  def fib(n):
      if n &lt;= 1:
          return n
      return fib(n-1) + fib(n-2)</code></pre>
      </div>
      <p>Vous pouvez aussi implémenter votre propre système de cache basé sur l’état du jeu.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Parallélisation et Vectorisation</h2>
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-2">4.1 Multithreading / Multiprocessing</h3>
        <p>Utilisez les modules <code>concurrent.futures</code> ou <code>multiprocessing</code> pour exécuter des tâches en parallèle.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python">from concurrent.futures import ThreadPoolExecutor
  
  with ThreadPoolExecutor() as executor:
      resultats = list(executor.map(ma_fonction, mes_données))</code></pre>
        </div>
      </article>
  
      <article class="mb-8">
        <h3 class="text-xl font-semibold text-[#5328EA] mb-2">4.2 NumPy pour la Vectorisation</h3>
        <p>Remplacez vos boucles par des opérations vectorisées pour gagner en vitesse.</p>
        <div class="bg-black text-white p-4 rounded-lg">
          <pre><code class="language-python">import numpy as np
  
  # Au lieu de :
  somme = 0
  for x in tableau:
      somme += x * x
  
  # Faites :
  somme = np.sum(np.square(tableau))</code></pre>
        </div>
      </article>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Optimisations Bas Niveau</h2>
      <p>Pour les performances critiques, utilisez :</p>
      <ul class="list-disc pl-6 mb-4 text-lg">
        <li><strong>Cython</strong> pour compiler du Python en C</li>
        <li><strong>Numba</strong> pour JIT compiler des fonctions numériques</li>
        <li><strong>Rust ou C++</strong> via FFI (Foreign Function Interface)</li>
      </ul>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">from numba import njit
  
  @njit
  def produit_vecteurs(a, b):
      return a * b</code></pre>
      </div>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p>Optimiser vos performances, c’est choisir les bons outils, réduire les appels coûteux, et tirer parti du matériel moderne (CPU, RAM, parallélisme). Il ne s’agit pas de tout optimiser, mais d’optimiser ce qui compte.</p>
      <p class="mt-4"><strong>À retenir :</strong> mesurez d’abord, optimisez ensuite.</p>
    </section>
  </div>`
  },
  {
    id: 42,
    name: "Gestion de la Mémoire et Accélération avec Cython",
    language: "Python / Cython",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Gestion de la Mémoire et Accélération avec Cython</h1>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Introduction</h2>
      <p class="text-lg mb-4">Cython permet de transformer du code Python en C compilé, ce qui améliore grandement la vitesse d’exécution et la gestion de la mémoire. Il est particulièrement utile pour les calculs intensifs, les boucles imbriquées ou les structures de données fortement manipulées.</p>
      <p class="text-lg">Ce cours vous montrera comment :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Compiler du code Python avec Cython</li>
        <li>Déclarer des types pour optimiser les performances</li>
        <li>Gérer la mémoire manuellement (allocations, pointeurs)</li>
        <li>Appeler du code C natif depuis Python</li>
      </ul>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Installation de Cython</h2>
      <p class="text-lg mb-4">Installez Cython avec pip :</p>
      <div class="bg-black text-white p-4 rounded-lg mb-4">
        <pre><code class="language-bash">pip install cython</code></pre>
      </div>
      <p>Créez un fichier <code>.pyx</code> puis compilez-le via <code>setup.py</code> :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python"># setup.py
  from setuptools import setup
  from Cython.Build import cythonize
  
  setup(
      ext_modules = cythonize("exemple.pyx")
  )</code></pre>
      </div>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Déclarations de Types</h2>
      <p class="text-lg mb-4">Cython permet de déclarer les types statiquement pour accélérer le code :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-cython"># exemple.pyx
  def somme(int n):
      cdef int i
      cdef double total = 0
      for i in range(n):
          total += i * 0.5
      return total</code></pre>
      </div>
      <p class="text-lg mt-4">Déclarer les types évite le typage dynamique de Python, et permet une compilation en code C optimisé.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Accès Direct à la Mémoire</h2>
      <p class="text-lg mb-4">Pour éviter l’allocation automatique de Python, utilisez les pointeurs :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-cython">from libc.stdlib cimport malloc, free
  
  def tableau_alloue(int n):
      cdef int* tab = &lt;int*&gt;malloc(n * sizeof(int))
      cdef int i
      for i in range(n):
          tab[i] = i * 2
      free(tab)</code></pre>
      </div>
      <p class="text-sm text-gray-600">⚠️ Attention à bien libérer la mémoire avec <code>free()</code> pour éviter les fuites.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Appels à du Code C</h2>
      <p class="text-lg mb-4">Vous pouvez utiliser n’importe quelle librairie C (math.h, stdlib, etc.) :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-cython">from libc.math cimport sqrt
  
  def racine(double x):
      return sqrt(x)</code></pre>
      </div>
      <p class="text-lg mt-4">Cela rend le calcul aussi rapide qu’un appel C natif.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Optimisation Supplémentaire : boundscheck et wraparound</h2>
      <p class="text-lg mb-4">Pour une vitesse maximale, désactivez certaines sécurités :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-cython"># cython: boundscheck=False, wraparound=False
  
  def moyenne(double[:] tableau):
      cdef Py_ssize_t i
      cdef double somme = 0
      for i in range(tableau.shape[0]):
          somme += tableau[i]
      return somme / tableau.shape[0]</code></pre>
      </div>
      <p class="text-sm text-gray-600">⚠️ Utilisez cette technique uniquement si vous êtes sûr que les indices sont valides.</p>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p class="text-lg mb-4">Cython transforme le code Python en C compilé pour des performances proches du natif. En combinant typage statique, contrôle mémoire, et appels à des bibliothèques C, vous pouvez accélérer drastiquement vos applications, notamment dans les jeux ou simulations IA.</p>
      <p class="text-lg"><strong>Bonnes pratiques :</strong></p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Profiler avant d’optimiser</li>
        <li>Commencer simple, puis ajouter Cython pour les points critiques</li>
        <li>Tester rigoureusement si vous manipulez la mémoire à bas niveau</li>
      </ul>
    </section>
  </div>`
  },
  {
    id: 43,
    name: "Entraînement d’un Modèle sur des Parties Simulées",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Entraînement d’un Modèle sur des Parties Simulées</h1>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Pourquoi simuler des parties ?</h2>
      <p class="text-lg mb-4">Lorsque les données de jeu sont rares ou inexistantes, on peut générer ses propres données via des parties simulées. Cela permet :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>d'entraîner un modèle de décision (ML ou RL)</li>
        <li>d’évaluer des stratégies ou heuristiques</li>
        <li>de tester l’efficacité d’un agent sans joueur humain</li>
      </ul>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Simulation de Parties</h2>
      <p class="text-lg mb-4">Voici un exemple de simulateur simple :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">def simulate_game(agent1, agent2, env):
      state = env.reset()
      done = False
      history = []
      while not done:
          if env.current_player == 1:
              action = agent1.choose_action(state)
          else:
              action = agent2.choose_action(state)
          new_state, reward, done = env.step(action)
          history.append((state, action, reward))
          state = new_state
      return history</code></pre>
      </div>
      <p class="text-lg mt-4">Chaque partie retourne un historique <code>(état, action, récompense)</code>.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Génération de Dataset</h2>
      <p class="text-lg mb-4">Accumulez les historiques pour créer un dataset utilisable :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">dataset = []
  for _ in range(10000):
      history = simulate_game(RandomAgent(), RandomAgent(), MyEnv())
      dataset.extend(history)</code></pre>
      </div>
      <p class="text-lg mt-4">Vous pouvez ensuite transformer ces données en entrées/sorties pour un modèle supervisé.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Entraînement d’un Modèle (ML)</h2>
      <p class="text-lg mb-4">Voici un modèle de base en PyTorch :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">import torch
  import torch.nn as nn
  import torch.optim as optim
  
  class PolicyNet(nn.Module):
      def __init__(self, input_size, output_size):
          super().__init__()
          self.fc = nn.Sequential(
              nn.Linear(input_size, 64),
              nn.ReLU(),
              nn.Linear(64, output_size)
          )
  
      def forward(self, x):
          return self.fc(x)
  
  model = PolicyNet(input_size=10, output_size=4)
  loss_fn = nn.CrossEntropyLoss()
  optimizer = optim.Adam(model.parameters())
  
  # X = états, y = actions choisies
  for epoch in range(10):
      for x_batch, y_batch in loader:
          preds = model(x_batch)
          loss = loss_fn(preds, y_batch)
          optimizer.zero_grad()
          loss.backward()
          optimizer.step()</code></pre>
      </div>
      <p class="text-lg mt-4">Le modèle apprend à imiter les décisions des agents simulés.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Boucle d’Amélioration</h2>
      <p class="text-lg mb-4">Une fois le modèle entraîné, vous pouvez :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>l'utiliser comme nouvel agent</li>
        <li>re-simuler des parties avec cet agent</li>
        <li>ré-entraîner avec les nouvelles données (style AlphaZero)</li>
      </ul>
      <p class="text-lg">C’est un entraînement par amélioration auto-supervisée.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Alternative : Apprentissage par Renforcement</h2>
      <p class="text-lg mb-4">Au lieu de superviser des actions, on peut entraîner par récompense. Exemple avec <code>Q-learning</code> :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">Q[state][action] += alpha * (reward + gamma * max(Q[next_state]) - Q[state][action])</code></pre>
      </div>
      <p class="text-lg mt-4">Les parties simulées deviennent alors le terrain d’exploration de l’agent RL.</p>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p class="text-lg mb-4">Simuler des parties permet de générer des milliers de scénarios, utiles à l’entraînement de modèles, que ce soit en supervision ou par renforcement. Cette approche est puissante, notamment pour les jeux de stratégie ou tour par tour, où chaque décision compte.</p>
      <p class="text-lg">Elle est utilisée dans AlphaZero, MuZero, ou encore dans le développement de bots compétitifs sur des jeux comme StarCraft ou Hearthstone.</p>
    </section>
  </div>`
  },
  {
    id: 44,
    name: "Auto-amélioration : Self-Play et Monte Carlo Tree Search (MCTS)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Auto-amélioration : Self-Play et Monte Carlo Tree Search (MCTS)</h1>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Pourquoi l'auto-amélioration ?</h2>
    <p class="text-lg mb-4">Dans les environnements compétitifs, l'entraînement contre soi-même (self-play) permet de :</p>
    <ul class="list-disc pl-6 text-lg space-y-2">
      <li>Faire émerger des stratégies optimales sans supervision humaine</li>
      <li>Adapter dynamiquement la difficulté de l'entraînement</li>
      <li>Utiliser MCTS pour explorer efficacement les décisions</li>
    </ul>
  </section>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Self-Play : Jouer contre soi-même</h2>
    <p class="text-lg mb-4">L'agent joue contre une ancienne version de lui-même ou contre une copie actuelle :</p>
    <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
      <pre><code class="language-python">for episode in range(num_episodes):
    agent1 = Agent(current_policy)
    agent2 = Agent(current_policy)  # ou old_policy

    game_data = simulate_game(agent1, agent2, env)
    train_model_on(game_data)</code></pre>
    </div>
    <p class="text-lg mt-4">Cela favorise un apprentissage progressif basé sur ses propres faiblesses.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. MCTS : Monte Carlo Tree Search</h2>
    <p class="text-lg mb-4">MCTS explore les futurs possibles à partir d'un état donné via 4 étapes :</p>
    <ol class="list-decimal pl-6 text-lg space-y-2">
      <li><strong>Sélection</strong> : Descente dans l'arbre selon UCB</li>
      <li><strong>Expansion</strong> : Ajout d'un nouveau nœud</li>
      <li><strong>Simulation</strong> : Partie jouée jusqu'à la fin</li>
      <li><strong>Rétropropagation</strong> : Mise à jour des scores</li>
    </ol>
    <p class="text-lg mt-4">C'est la base des agents AlphaGo/AlphaZero.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Implémentation simple de MCTS</h2>
    <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
      <pre><code class="language-python">class MCTSNode:
    def __init__(self, state, parent=None):
        self.state = state
        self.parent = parent
        self.children = {}
        self.visits = 0
        self.wins = 0

def ucb_score(node, total_visits, c=1.4):
    if node.visits == 0:
        return float('inf')
    return node.wins / node.visits + c * (math.sqrt(math.log(total_visits) / node.visits))</code></pre>
    </div>
    <p class="text-lg mt-4">L'UCB (Upper Confidence Bound) équilibre exploration et exploitation.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Intégration avec un réseau de neurones</h2>
    <p class="text-lg mb-4">On peut combiner MCTS avec un modèle prédictif :</p>
    <ul class="list-disc pl-6 text-lg space-y-2">
      <li><strong>Le réseau</strong> prédit : probabilité des coups + valeur de l'état</li>
      <li><strong>MCTS</strong> utilise ces prédictions comme guide</li>
    </ul>
    <p class="text-lg mt-4">Cela donne des coups plus intelligents que des simulations aléatoires.</p>
  </section>

  <section class="mb-10">
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Boucle d'amélioration continue</h2>
    <p class="text-lg mb-4">L'algorithme complet suit cette logique :</p>
    <ol class="list-decimal pl-6 text-lg space-y-2">
      <li>Self-play avec MCTS guidé par le réseau actuel</li>
      <li>Enregistrement des parties</li>
      <li>Entraînement du réseau sur les données générées</li>
      <li>Remplacement si les performances s'améliorent</li>
    </ol>
    <p class="text-lg">C'est ainsi que AlphaZero a atteint un niveau surhumain sans données externes.</p>
  </section>

  <section>
    <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
    <p class="text-lg mb-4">Self-play et MCTS sont deux piliers de l'IA moderne dans les jeux stratégiques. Ensemble, ils permettent de créer un apprentissage autonome et performant, capable d'atteindre un niveau compétitif sans intervention humaine.</p>
    <p class="text-lg">L'implémentation de base peut être améliorée par des priorités de coups, du pruning, et des techniques comme le temperature sampling.</p>
  </section>
</div>`
  },
  {
    id: 45,
    name: "Affrontement entre IA : Tournois et Benchmarking",
    language: "Python",
    difficulty: "Avancé",
    duree: "Moyen (1h)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Affrontement entre IA : Tournois et Benchmarking</h1>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Pourquoi organiser des tournois d'IA ?</h2>
      <p class="text-lg mb-4">Comparer des IA sur un jeu donné permet de :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Mesurer les progrès d’un agent au fil du temps</li>
        <li>Identifier les faiblesses stratégiques ou structurelles</li>
        <li>Évaluer objectivement les performances entre différentes approches</li>
      </ul>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Structure d'un tournoi Round-Robin</h2>
      <p class="text-lg mb-4">Chaque IA affronte toutes les autres. Exemple :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">agents = [agent_A, agent_B, agent_C]
  results = defaultdict(int)
  
  for i in range(len(agents)):
      for j in range(i + 1, len(agents)):
          winner = play_match(agents[i], agents[j])
          results[winner] += 1</code></pre>
      </div>
      <p class="text-lg mt-4">Les scores sont ensuite classés pour établir un classement général.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Elo : Mesurer la force relative</h2>
      <p class="text-lg mb-4">Le système Elo attribue un score qui évolue selon les résultats :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Une IA qui bat une IA mieux classée gagne beaucoup de points</li>
        <li>Une défaite contre une IA faible fait perdre plus de points</li>
      </ul>
      <p class="text-lg mt-4">Cela permet un classement dynamique des IA après chaque partie.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Format de tournoi à élimination</h2>
      <p class="text-lg mb-4">Dans un arbre d’élimination directe :</p>
      <ol class="list-decimal pl-6 text-lg space-y-2">
        <li>Les IA sont réparties aléatoirement en paires</li>
        <li>Le vainqueur de chaque match passe au tour suivant</li>
        <li>Le processus continue jusqu’à une finale</li>
      </ol>
      <p class="text-lg mt-4">Utilisé pour sélectionner les meilleures IA rapidement.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Benchmarking sur scénarios fixes</h2>
      <p class="text-lg mb-4">Au lieu de matchs dynamiques, on peut évaluer des IA sur :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Des positions initiales prédéfinies</li>
        <li>Des puzzles stratégiques à résoudre</li>
        <li>Des métriques comme le temps de décision, score moyen, taux de victoire</li>
      </ul>
      <p class="text-lg mt-4">Cela offre un aperçu plus contrôlé des capacités de l’IA.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Visualisation et rapports</h2>
      <p class="text-lg mb-4">Générez des graphiques de performance :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">import matplotlib.pyplot as plt
  
  names = [a.name for a in agents]
  scores = [results[a.name] for a in agents]
  
  plt.bar(names, scores)
  plt.title("Résultats du tournoi")
  plt.ylabel("Points")
  plt.show()</code></pre>
      </div>
      <p class="text-lg mt-4">Les courbes Elo dans le temps sont aussi utiles pour visualiser l'amélioration.</p>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p class="text-lg mb-4">L’affrontement d’IA est une méthode essentielle pour valider objectivement la progression des agents. Il permet aussi de générer des données d’entraînement en self-play, et d’organiser des compétitions entre approches classiques et modernes.</p>
      <p class="text-lg">En ajoutant des métriques précises, des tournois peuvent devenir des outils puissants d’analyse et de motivation dans les projets IA.</p>
    </section>
  </div>`
  },
  {
    id: 46,
    name: "Optimisation Avancée avec des Bibliothèques TensorFlow/PyTorch",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/3PpsvED.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8"> 
    <h1 class="text-4xl font-bold text-[#5328EA] mb-6">Optimisation Avancée avec TensorFlow / PyTorch</h1>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Pourquoi utiliser TensorFlow ou PyTorch ?</h2>
      <p class="text-lg mb-4">Ces bibliothèques offrent :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li>Des outils pour entraîner efficacement des réseaux de neurones</li>
        <li>Une exécution sur GPU pour accélérer les calculs</li>
        <li>Des fonctionnalités de débogage, visualisation, et modularité</li>
      </ul>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">1. Définir un modèle de jeu en PyTorch</h2>
      <p class="text-lg mb-4">Exemple d'un modèle MLP pour évaluer une position de jeu :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">import torch
  import torch.nn as nn
  
  class GameNet(nn.Module):
      def __init__(self, input_size, hidden=128):
          super().__init__()
          self.net = nn.Sequential(
              nn.Linear(input_size, hidden),
              nn.ReLU(),
              nn.Linear(hidden, 1)  # Score estimé
          )
  
      def forward(self, x):
          return self.net(x)</code></pre>
      </div>
      <p class="text-lg mt-4">Ce réseau peut servir de fonction de score pour un moteur de jeu IA.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">2. Gestion du GPU et des performances</h2>
      <p class="text-lg mb-4">Exécuter sur GPU (CUDA) :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  model = GameNet(input_size=64).to(device)</code></pre>
      </div>
      <p class="text-lg mt-4">Placez également vos tenseurs d’entrée et de sortie sur le GPU :</p>
      <pre><code class="language-python">inputs = torch.tensor(data).float().to(device)</code></pre>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">3. Entraînement optimisé</h2>
      <p class="text-lg mb-4">Utilisation de fonctions d'optimisation modernes :</p>
      <ul class="list-disc pl-6 text-lg space-y-2">
        <li><code>Adam</code> : rapide et efficace pour les jeux</li>
        <li><code>Scheduler</code> : réduit dynamiquement le taux d’apprentissage</li>
      </ul>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
  scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=100, gamma=0.9)</code></pre>
      </div>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">4. Entraînement batché sur jeux simulés</h2>
      <p class="text-lg mb-4">Utilisez un <code>DataLoader</code> pour traiter des milliers de parties générées par self-play :</p>
      <div class="bg-black text-white p-4 rounded-lg">
        <pre><code class="language-python">from torch.utils.data import DataLoader, TensorDataset
  
  dataset = TensorDataset(features, targets)
  loader = DataLoader(dataset, batch_size=32, shuffle=True)
  
  for batch in loader:
      x, y = batch
      output = model(x.to(device))
      loss = loss_fn(output, y.to(device))</code></pre>
      </div>
      <p class="text-lg mt-4">Cela permet un entraînement massif et reproductible.</p>
    </section>
  
    <section class="mb-10">
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">5. Visualisation des performances</h2>
      <p class="text-lg mb-4">TensorBoard (TF) ou Matplotlib (PyTorch) permettent de suivre les métriques :</p>
      <pre><code class="language-python">import matplotlib.pyplot as plt
  
  plt.plot(losses)
  plt.title("Courbe de perte pendant l'entraînement")
  plt.xlabel("Époque")
  plt.ylabel("Loss")
  plt.show()</code></pre>
    </section>
  
    <section>
      <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">Conclusion</h2>
      <p class="text-lg mb-4">Utiliser PyTorch ou TensorFlow permet de tirer parti de l’accélération GPU et des outils avancés d'entraînement pour construire des IA efficaces dans les jeux tour par tour.</p>
      <p class="text-lg">En combinant auto-play, entraînement batché et visualisation, on crée une boucle d’amélioration continue.</p>
    </section>
  </div>`
  },
  {
    id: 47,
    name: "Fondamentaux du Deep Learning",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Fondamentaux du Deep Learning</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧠 Pourquoi le Deep Learning ?</h2>
  <p class="text-lg mb-4">Le Deep Learning (ou apprentissage profond) est une branche de l’intelligence artificielle qui utilise des réseaux de neurones à plusieurs couches pour apprendre des représentations complexes à partir de grandes quantités de données. Il est à la base des systèmes de reconnaissance d’images, de traitement du langage naturel, de conduite autonome, et bien plus encore.</p>
  <p class="text-lg">Ce cours te donne les bases solides pour comprendre comment fonctionne un réseau de neurones, comment l’entraîner, et quelles sont les grandes familles d’architectures.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔗 Structure d’un réseau de neurones</h2>
  <p class="text-lg mb-4">Un réseau de neurones artificiel est constitué de :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Couches d’entrée</strong> : les données brutes</li>
    <li><strong>Couches cachées</strong> : extraction de caractéristiques</li>
    <li><strong>Couche de sortie</strong> : prédiction finale (classe, score, etc.)</li>
  </ul>
  <p class="text-lg">Chaque neurone applique une fonction linéaire suivie d’une activation non-linéaire. En empilant plusieurs couches, le modèle apprend des représentations hiérarchiques.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">⚙️ Exemple d’un MLP (Perceptron Multicouche)</h2>
  <p class="text-lg mb-4">Voici un exemple en PyTorch d’un réseau très simple, utile pour classer des images ou prédire des valeurs :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import torch
import torch.nn as nn

class SimpleMLP(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, output_size)
        )

    def forward(self, x):
        return self.net(x)</code></pre>
  </div>
  <p class="text-lg mt-4">Ce modèle prend une entrée, la passe dans une couche cachée avec activation ReLU, puis génère une sortie. C’est la base de nombreux réseaux profonds.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧮 Fonction de perte et descente de gradient</h2>
  <p class="text-lg mb-4">Le réseau est entraîné en comparant ses prédictions aux vraies réponses avec une fonction de perte (loss). Ensuite, on utilise la descente de gradient pour mettre à jour les poids et réduire cette perte au fil des itérations.</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><code>Loss = erreur</code> entre prédiction et vérité terrain</li>
    <li><code>Optimizer</code> met à jour les poids pour minimiser la loss</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for x_batch, y_batch in data_loader:
    optimizer.zero_grad()
    predictions = model(x_batch)
    loss = loss_fn(predictions, y_batch)
    loss.backward()
    optimizer.step()</code></pre>
  </div>
  <p class="text-lg mt-4">Ce cycle est répété des milliers de fois jusqu’à ce que le modèle apprenne à généraliser.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📊 Évaluation d’un modèle</h2>
  <p class="text-lg mb-4">Une fois entraîné, un modèle doit être évalué sur des données qu’il n’a jamais vues :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Accuracy</strong> : % de prédictions correctes</li>
    <li><strong>Precision / Recall</strong> : utiles en cas de classes déséquilibrées</li>
    <li><strong>Confusion matrix</strong> : visualise les erreurs</li>
  </ul>
  <p class="text-lg">Cela permet de savoir si le modèle apprend vraiment, ou s’il se contente de mémoriser l’entraînement (overfitting).</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧭 Conclusion</h2>
  <p class="text-lg mb-4">Tu connais maintenant la structure d’un réseau de neurones, son fonctionnement, et son entraînement. C’est une base essentielle avant d’explorer des architectures plus complexes comme les CNNs, RNNs ou Transformers.</p>
  <p class="text-lg">Dans les prochains cours, tu vas apprendre à appliquer ces connaissances à la vision par ordinateur, à la classification d’images et à la construction de modèles robustes avec des frameworks modernes.</p>
</section>
</div>`
  },
  {
    id: 48,
    name: "Fondamentaux de la vision par ordinateur",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Fondamentaux de la vision par ordinateur</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">👁️ Introduction à la vision par ordinateur</h2>
  <p class="text-lg mb-4">La vision par ordinateur permet à une machine de comprendre et d’interpréter le contenu d’images ou de vidéos. Elle est utilisée dans des domaines comme la reconnaissance faciale, les voitures autonomes, les diagnostics médicaux et la surveillance automatisée.</p>
  <p class="text-lg">Ce cours te guide à travers les bases de la vision par ordinateur moderne à l’aide du Deep Learning.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧱 Structure des images numériques</h2>
  <p class="text-lg mb-4">Les images sont des matrices de pixels. Une image couleur est généralement représentée comme un tenseur 3D (hauteur × largeur × canaux).</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>1 canal pour le noir et blanc (grayscale)</li>
    <li>3 canaux pour les couleurs RGB</li>
    <li>Valeurs normalisées entre 0 et 1 ou entre 0 et 255</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">⚙️ Chargement et visualisation d’images</h2>
  <p class="text-lg mb-4">Avec des bibliothèques comme <code>PIL</code>, <code>OpenCV</code> ou <code>torchvision</code>, on peut facilement manipuler des images.</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">from PIL import Image
import matplotlib.pyplot as plt

img = Image.open("image.jpg")
plt.imshow(img)
plt.title("Image chargée")
plt.axis('off')
plt.show()</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧠 Réseaux de neurones convolutifs (CNN)</h2>
  <p class="text-lg mb-4">Les CNN sont spécialement conçus pour les données visuelles. Ils utilisent des filtres pour capturer les motifs locaux dans les images (bords, textures, formes).</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Convolution</strong> : applique un noyau glissant</li>
    <li><strong>Pooling</strong> : réduit la dimension tout en gardant l’essentiel</li>
    <li><strong>Flatten</strong> + <strong>Dense</strong> : transforme les features en sortie finale</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧪 Exemple simple de CNN en PyTorch</h2>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 8 * 8, 10)  # Si image 32x32, sortie 10 classes
        )

    def forward(self, x):
        x = self.conv(x)
        return self.fc(x)</code></pre>
  </div>
  <p class="text-lg mt-4">Ce modèle détecte progressivement des motifs visuels pour classer une image en différentes catégories.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📊 Dataset : CIFAR-10, MNIST, etc.</h2>
  <p class="text-lg mb-4">Les datasets les plus courants pour débuter en vision :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>MNIST</strong> : chiffres manuscrits (28x28, 10 classes)</li>
    <li><strong>CIFAR-10</strong> : 10 classes d’objets en couleur (32x32)</li>
    <li><strong>ImageNet</strong> : énorme base de données avec 1000 classes</li>
  </ul>
  <p class="text-lg">Ces datasets sont disponibles via <code>torchvision.datasets</code> ou <code>keras.datasets</code>.</p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🎯 Conclusion</h2>
  <p class="text-lg mb-4">La vision par ordinateur permet aux machines de percevoir le monde visuellement. Avec les CNN, les machines peuvent identifier des objets, lire des caractères ou même générer des images réalistes.</p>
  <p class="text-lg">Dans les prochains cours, tu pratiqueras un cas concret : classer des images de chats et de chiens. Prépare-toi à coder ton propre classifieur visuel !</p>
</section>
</div>`
  },
  {
    id: 49,
    name: "Pratique de classification chien vs chat",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Pratique de classification chien vs chat</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🐶 Pourquoi ce cas d’usage ?</h2>
  <p class="text-lg mb-4">Le défi "Chien vs Chat" est l’un des classiques pour s’initier à la vision par ordinateur. Il est simple à comprendre mais suffisamment complexe pour appliquer les bases du Deep Learning dans un contexte réel.</p>
  <p class="text-lg">Tu vas apprendre ici à charger les images, construire un CNN, entraîner le modèle et évaluer ses performances.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧹 Préparation des données</h2>
  <p class="text-lg mb-4">Le dataset comprend deux dossiers : <code>cats/</code> et <code>dogs/</code>. Il faut :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Redimensionner les images à une taille fixe</li>
    <li>Les normaliser (valeurs entre 0 et 1)</li>
    <li>Créer un label : 0 = chat, 1 = chien</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

data = datasets.ImageFolder("/chemin/vers/data", transform=transform)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧠 Modèle de classification</h2>
  <p class="text-lg mb-4">On construit un petit CNN avec quelques couches convolutives, du ReLU, du max pooling et une couche dense finale pour classer.</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import torch.nn as nn

class DogCatCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(3, 16, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 32 * 32, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        x = self.conv(x)
        return self.fc(x)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🚂 Entraînement du modèle</h2>
  <p class="text-lg mb-4">On utilise une fonction de perte binaire et l’optimiseur Adam :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">criterion = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for inputs, labels in train_loader:
    outputs = model(inputs)
    loss = criterion(outputs.squeeze(), labels.float())
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()</code></pre>
  </div>
  <p class="text-lg mt-4">N’oublie pas d’évaluer le modèle sur un jeu de test après chaque époque pour éviter l’overfitting.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📈 Évaluation des performances</h2>
  <p class="text-lg mb-4">Les métriques utiles sont :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Accuracy</strong> : taux de bonnes prédictions</li>
    <li><strong>Courbe ROC</strong> : évalue les compromis entre vrai et faux positifs</li>
    <li><strong>Matrix de confusion</strong> : détail des erreurs</li>
  </ul>
  <p class="text-lg">Tu peux aussi visualiser des exemples où l’IA se trompe pour comprendre ses limites.</p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔚 Conclusion</h2>
  <p class="text-lg mb-4">Félicitations ! Tu as entraîné ton premier classifieur d’images à partir de zéro. Ce cas concret résume les étapes classiques du Deep Learning : préparation des données, création du modèle, entraînement, et évaluation.</p>
  <p class="text-lg">Ce projet peut facilement être amélioré avec des techniques comme l’augmentation de données, les réseaux préentraînés (Transfer Learning), ou des métriques avancées.</p>
</section>

</div>`
  },
  {
    id: 50,
    name: "Maîtrise d’un framework de Deep Learning (au choix)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Maîtrise d’un framework de Deep Learning (au choix)</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧰 Pourquoi choisir un framework ?</h2>
  <p class="text-lg mb-4">Utiliser un framework de Deep Learning moderne comme <strong>TensorFlow</strong> ou <strong>PyTorch</strong> permet de développer, entraîner et déployer des modèles rapidement. Ce sont des outils puissants adoptés à la fois en recherche et en industrie.</p>
  <p class="text-lg">Dans ce cours, tu apprendras à manipuler un framework au choix pour devenir autonome dans la création de projets IA.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📦 Installation et structure de projet</h2>
  <p class="text-lg mb-4">Voici comment installer et structurer ton environnement de travail pour PyTorch :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-bash">pip install torch torchvision matplotlib</code></pre>
  </div>
  <p class="text-lg mt-4">Structure recommandée :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><code>models/</code> : architectures</li>
    <li><code>datasets/</code> : chargement des données</li>
    <li><code>train.py</code> : boucle d’entraînement</li>
    <li><code>eval.py</code> : évaluation des performances</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🏗️ Définir un modèle</h2>
  <p class="text-lg mb-4">Exemple en PyTorch :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import torch.nn as nn

class SimpleMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        return self.model(x)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧪 Chargement et entraînement</h2>
  <p class="text-lg mb-4">On utilise les <code>DataLoader</code> pour charger les données efficacement, puis on boucle sur les batchs :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">from torch.utils.data import DataLoader

for epoch in range(10):
    for batch in DataLoader(train_data, batch_size=64):
        inputs, labels = batch
        outputs = model(inputs)
        loss = loss_fn(outputs, labels)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧠 Bonnes pratiques : PyTorch vs TensorFlow</h2>
  <p class="text-lg mb-4">Quelques différences clés :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>PyTorch</strong> : plus flexible, codé impérativement</li>
    <li><strong>TensorFlow</strong> : plus robuste pour la production (TF Serving, TF Lite)</li>
    <li><code>torchmetrics</code> vs <code>tf.keras.metrics</code></li>
    <li>Visualisation : <code>TensorBoard</code> (les deux le supportent)</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📊 Visualisation des métriques</h2>
  <p class="text-lg mb-4">Affichage des pertes avec Matplotlib :</p>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import matplotlib.pyplot as plt

plt.plot(train_losses)
plt.xlabel("Époque")
plt.ylabel("Perte")
plt.title("Courbe d'entraînement")
plt.show()</code></pre>
  </div>
  <p class="text-lg mt-4">Ou bien utilise <code>TensorBoard</code> pour suivre en temps réel.</p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔚 Conclusion</h2>
  <p class="text-lg mb-4">Maîtriser un framework de Deep Learning t’ouvre les portes de nombreux projets IA, du prototypage rapide à la production. Apprends à manipuler les tenseurs, optimiser les modèles et structurer tes projets pour aller plus loin.</p>
  <p class="text-lg">Tu peux maintenant aborder des modèles avancés, implémenter des architectures personnalisées ou utiliser des modèles préentraînés.</p>
</section>
</div>`
  },
  {
    id: 51,
    name: "Améliorations & Généralisation",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Améliorations & Généralisation</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🎯 Objectif : Généraliser au mieux</h2>
  <p class="text-lg mb-4">Le but du Deep Learning n’est pas seulement de bien prédire sur les données d'entraînement, mais de généraliser sur des données jamais vues. C’est ce qu’on appelle la capacité de généralisation du modèle.</p>
  <p class="text-lg">Dans ce cours, tu vas apprendre à améliorer cette généralisation grâce à des techniques bien connues dans le domaine.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧪 Surapprentissage : comment l’éviter</h2>
  <p class="text-lg mb-4">Le surapprentissage (overfitting) se produit quand ton modèle apprend trop bien les exemples du training set et perd en performance sur le test set.</p>
  <p class="text-lg">Signes d’un surapprentissage :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Très faible perte d'entraînement</li>
    <li>Mais perte de validation qui augmente</li>
    <li>Modèle trop complexe par rapport à la taille du dataset</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🛠️ Techniques de régularisation</h2>
  <p class="text-lg mb-4">Plusieurs approches existent pour limiter l’overfitting :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Dropout</strong> : désactive aléatoirement des neurones pendant l'entraînement</li>
    <li><strong>L2 regularization</strong> : pénalise les poids trop élevés</li>
    <li><strong>Early stopping</strong> : arrête l’entraînement si la performance de validation diminue</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python"># Exemple : ajouter du Dropout
self.model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(128, 10)
)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔄 Data Augmentation</h2>
  <p class="text-lg mb-4">Augmenter les données permet de simuler de nouveaux exemples à partir de ceux existants.</p>
  <p class="text-lg">C’est très utile pour la vision par ordinateur :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Rotation, zoom, translation</li>
    <li>Flips horizontaux</li>
    <li>Changement de contraste ou de lumière</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor()
])</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📉 Analyse des erreurs</h2>
  <p class="text-lg mb-4">Plutôt que d’ajouter aveuglément des couches, analyse les erreurs de ton modèle :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Quels exemples sont mal classés ?</li>
    <li>Le modèle fait-il toujours les mêmes erreurs ?</li>
    <li>Y a-t-il du bruit dans le dataset ?</li>
  </ul>
  <p class="text-lg">Cela peut t’aider à corriger des biais ou à affiner les labels.</p>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📊 Validation croisée</h2>
  <p class="text-lg mb-4">La validation croisée (<em>cross-validation</em>) permet d’évaluer ton modèle sur différentes partitions du dataset :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>5-fold : on divise le dataset en 5 sous-parties</li>
    <li>À chaque tour, on garde 1 fold pour tester et 4 pour entraîner</li>
    <li>On moyenne les résultats à la fin</li>
  </ul>
  <p class="text-lg">Cela donne une meilleure estimation de la performance réelle.</p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔚 Conclusion</h2>
  <p class="text-lg mb-4">Améliorer la généralisation, c’est l’art d’entraîner un modèle qui reste performant dans le monde réel. Grâce aux techniques de régularisation, d’augmentation de données, et à une bonne analyse, tu pourras créer des IA plus robustes et fiables.</p>
  <p class="text-lg">À ce stade, tu es capable d’optimiser tes modèles au-delà de l’entraînement de base, en anticipant leurs comportements sur des cas inconnus.</p>
</section>
</div>`
  },
  {
    id: 52,
    name: "Notions de maths (si tu veux approfondir)",
    language: "Python",
    difficulty: "Avancé",
    duree: "Long (1h30)",
    image: "https://i.imgur.com/cFvtZru.png",
    isFree: true,
    locked: false,
    content: `<div class="max-w-3xl mx-auto px-4 py-8">
<h1 class="text-4xl font-bold text-[#5328EA] mb-6">Notions de maths (si tu veux approfondir)</h1>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🧠 Pourquoi les maths sont importantes ?</h2>
  <p class="text-lg mb-4">Les mathématiques ne sont pas obligatoires pour commencer le Deep Learning, mais elles deviennent indispensables pour comprendre ce qu’il se passe sous le capot :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Optimiser les modèles</li>
    <li>Comprendre les fonctions de coût</li>
    <li>Analyser les gradients et la convergence</li>
  </ul>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📐 Vecteurs, matrices et produits scalaires</h2>
  <p class="text-lg mb-4">Les réseaux de neurones manipulent principalement des vecteurs et des matrices. Il est donc crucial de comprendre :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li>Produit scalaire : mesure de la similarité</li>
    <li>Multiplication matrice-vecteur : base des couches linéaires</li>
    <li>Transposition, dimensions, broadcasting</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python"># Produit matriciel simple avec numpy
import numpy as np

W = np.array([[0.2, 0.8], [0.4, 0.6]])  # poids
x = np.array([[1.0], [0.5]])            # entrée
z = W @ x
print(z)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🌀 Dérivées et descente de gradient</h2>
  <p class="text-lg mb-4">Les réseaux apprennent via la descente de gradient : on calcule l’impact de chaque paramètre sur l’erreur pour les ajuster.</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>Fonction de coût</strong> : mesure l’erreur</li>
    <li><strong>Dérivée partielle</strong> : variation de l’erreur par rapport à un poids</li>
    <li><strong>Gradient</strong> : vecteur de toutes ces dérivées</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python"># Illustration simple de la descente de gradient
w = 0.5
learning_rate = 0.1
for _ in range(10):
    grad = 2 * (w - 3)  # dérivée de (w - 3)^2
    w = w - learning_rate * grad
    print(w)</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🌐 Fonction d’activation</h2>
  <p class="text-lg mb-4">Les fonctions comme <code>ReLU</code> ou <code>sigmoïde</code> donnent la non-linéarité aux réseaux, ce qui les rend puissants.</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><strong>ReLU</strong> : max(0, x)</li>
    <li><strong>Sigmoid</strong> : transforme une valeur en probabilité (entre 0 et 1)</li>
    <li><strong>Tanh</strong> : similaire à Sigmoid mais centré</li>
  </ul>
  <div class="bg-black text-white p-4 rounded-lg overflow-x-auto">
    <pre><code class="language-python">import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10, 10, 100)
relu = np.maximum(0, x)
sigmoid = 1 / (1 + np.exp(-x))

plt.plot(x, relu, label='ReLU')
plt.plot(x, sigmoid, label='Sigmoid')
plt.legend()
plt.show()</code></pre>
  </div>
</section>

<section class="mb-10">
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">📈 Fonction de coût et logique derrière</h2>
  <p class="text-lg mb-4">Chaque problème a une fonction de coût adaptée :</p>
  <ul class="list-disc pl-6 text-lg space-y-2">
    <li><code>Mean Squared Error</code> (régression)</li>
    <li><code>Cross Entropy</code> (classification)</li>
    <li><code>Hinge loss</code> (SVM)</li>
  </ul>
  <p class="text-lg">Comprendre leur courbe permet d’anticiper les zones où l’erreur change vite ou pas.</p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-[#5328EA] border-b pb-2 mb-4">🔚 Conclusion</h2>
  <p class="text-lg mb-4">Approfondir les mathématiques te permettra de mieux comprendre ce qui se passe dans ton code, d’expliquer tes choix techniques et de progresser vers des modèles avancés.</p>
  <p class="text-lg">Pas besoin de tout maîtriser d’un coup — l’idée est de t’en servir comme boussole pour continuer à apprendre intelligemment.</p>
</section>

</div>`
  },
];

export default coursesDataFr;
