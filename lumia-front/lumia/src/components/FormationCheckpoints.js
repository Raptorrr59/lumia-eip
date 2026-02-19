export const formationCheckpointsFr = {
  0: [
    {
      id: "checkpoint_0_1",
      title: "Checkpoint : Fondamentaux de l'IA",
      passingScore: 50,
      maxQuestions: 5,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Que signifie IA ?",
          options: [
            "Intelligence Artificielle",
            "Information Automatique",
            "Interface Avancée",
            "Instruction Algorithmique"
          ],
          correctAnswer: 0,
          explanation: "IA signifie Intelligence Artificielle, qui désigne des systèmes imitant l'intelligence humaine."
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Quel est le langage de programmation le plus utilisé en IA ?",
          options: [
            "Java",
            "Python",
            "C++",
            "JavaScript"
          ],
          correctAnswer: 1,
          explanation: "Python est le langage le plus populaire en IA grâce à ses bibliothèques spécialisées comme TensorFlow, PyTorch, scikit-learn."
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Quelle est la différence principale entre l'IA faible et l'IA forte ?",
          options: [
            "L'IA faible est moins puissante",
            "L'IA faible est spécialisée, l'IA forte est généraliste",
            "L'IA forte consomme moins de ressources",
            "Il n'y a pas de différence"
          ],
          correctAnswer: 1,
          explanation: "L'IA faible (ANI) est spécialisée dans des tâches précises, tandis que l'IA forte (AGI) aurait des capacités cognitives générales comme l'humain."
        },
        {
          id: 4,
          type: "true-false",
          question: "Une IA faible peut évoluer pour devenir une IA forte d'elle-même.",
          correctAnswer: false,
          explanation: "Faux. Une IA faible est conçue pour une tâche spécifique et ne peut pas développer de conscience générale."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "Qui est considéré comme le père de l'informatique et de l'IA théorique ?",
          options: [
            "Bill Gates",
            "Alan Turing",
            "Steve Jobs",
            "Elon Musk"
          ],
          correctAnswer: 1,
          explanation: "Alan Turing a posé les bases théoriques de l'informatique et a proposé le fameux 'Test de Turing'."
        },
        {
          id: 6,
          type: "multiple-choice",
          question: "Quel test permet de déterminer si une machine peut imiter une conversation humaine ?",
          options: [
            "Le test de QI",
            "Le test de Turing",
            "Le test de Rorschach",
            "Le test de Voight-Kampff"
          ],
          correctAnswer: 1,
          explanation: "Le test de Turing évalue la capacité d'une machine à manifester un comportement intelligent indiscernable de celui d'un humain."
        },
        {
          id: 7,
          type: "true-false",
          question: "Le Deep Learning est une sous-branche du Machine Learning.",
          correctAnswer: true,
          explanation: "Vrai. L'IA englobe le Machine Learning, qui englobe lui-même le Deep Learning."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "Quelle année est souvent citée comme la naissance officielle de l'IA (conférence de Dartmouth) ?",
          options: [
            "1945",
            "1956",
            "1980",
            "2000"
          ],
          correctAnswer: 1,
          explanation: "La conférence de Dartmouth en 1956 est considérée comme l'acte de naissance du domaine de l'IA."
        },
        {
          id: 9,
          type: "multiple-choice",
          question: "Lequel de ces domaines N'EST PAS une application courante de l'IA ?",
          options: [
            "La vision par ordinateur",
            "Le traitement du langage naturel",
            "La télépathie",
            "La robotique"
          ],
          correctAnswer: 2,
          explanation: "La télépathie n'est pas un domaine de l'IA, contrairement aux autres options."
        },
        {
          id: 10,
          type: "true-false",
          question: "Les systèmes experts étaient une forme populaire d'IA dans les années 80.",
          correctAnswer: true,
          explanation: "Vrai. Ils utilisaient des règles 'si-alors' pour imiter le raisonnement d'un expert humain."
        }
      ]
    },
    {
      id: "checkpoint_0_2",
      title: "Checkpoint : Machine Learning et Données",
      passingScore: 50,
      maxQuestions: 5,
      questions: [
        {
          id: 1,
          type: "true-false",
          question: "Le Machine Learning est une sous-catégorie de l'Intelligence Artificielle.",
          correctAnswer: true,
          explanation: "Vrai. Le Machine Learning est effectivement une branche de l'IA qui permet aux machines d'apprendre sans être explicitement programmées."
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Quelle bibliothèque Python est principalement utilisée pour la manipulation de données ?",
          options: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Seaborn"
          ],
          correctAnswer: 1,
          explanation: "Pandas est la bibliothèque de référence pour la manipulation et l'analyse de données en Python."
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Qu'est-ce qu'un algorithme supervisé ?",
          options: [
            "Un algorithme qui apprend sans données d'entraînement",
            "Un algorithme qui apprend à partir d'exemples étiquetés",
            "Un algorithme qui ne nécessite aucune supervision",
            "Un algorithme qui fonctionne uniquement en temps réel"
          ],
          correctAnswer: 1,
          explanation: "L'apprentissage supervisé utilise des données d'entraînement étiquetées pour apprendre à faire des prédictions."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Dans un DataFrame Pandas, comment appelle-t-on les colonnes ?",
          options: [
            "Index",
            "Series",
            "Rows",
            "Arrays"
          ],
          correctAnswer: 1,
          explanation: "Chaque colonne d'un DataFrame est un objet de type 'Series'."
        },
        {
          id: 5,
          type: "true-false",
          question: "La régression linéaire est un algorithme d'apprentissage non supervisé.",
          correctAnswer: false,
          explanation: "Faux. La régression linéaire est un algorithme supervisé utilisé pour prédire des valeurs continues."
        },
        {
          id: 6,
          type: "multiple-choice",
          question: "Quel type de problème le clustering (ex: K-Means) résout-il ?",
          options: [
            "Supervisé",
            "Non supervisé",
            "Par renforcement",
            "Semi-supervisé"
          ],
          correctAnswer: 1,
          explanation: "Le clustering est une méthode non supervisée pour regrouper des données similaires sans étiquettes."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "Quelle bibliothèque est célèbre pour la visualisation de données en Python ?",
          options: [
            "Scikit-learn",
            "Matplotlib",
            "Flask",
            "Django"
          ],
          correctAnswer: 1,
          explanation: "Matplotlib est la bibliothèque fondamentale pour créer des graphiques en Python."
        },
        {
          id: 8,
          type: "true-false",
          question: "Le nettoyage des données (data cleaning) est une étape optionnelle.",
          correctAnswer: false,
          explanation: "Faux. C'est une étape cruciale car des données de mauvaise qualité entraînent de mauvais modèles ('Garbage In, Garbage Out')."
        },
        {
          id: 9,
          type: "multiple-choice",
          question: "Que signifie CSV ?",
          options: [
            "Computer Saved Values",
            "Comma Separated Values",
            "Complex System Verification",
            "Code Syntax Validator"
          ],
          correctAnswer: 1,
          explanation: "CSV signifie 'Comma Separated Values', un format courant pour stocker des données tabulaires."
        },
        {
          id: 10,
          type: "multiple-choice",
          question: "Quelle fonction Pandas affiche les 5 premières lignes d'un DataFrame ?",
          options: [
            "df.tail()",
            "df.head()",
            "df.start()",
            "df.top()"
          ],
          correctAnswer: 1,
          explanation: "df.head() affiche par défaut les 5 premières lignes."
        }
      ]
    },
    {
      id: "checkpoint_0_3",
      title: "Checkpoint : Réseaux de Neurones et Validation",
      passingScore: 50,
      maxQuestions: 10,
      questions: [
        {
          id: 1,
          type: "true-false",
          question: "Les réseaux de neurones sont inspirés du fonctionnement du cerveau humain.",
          correctAnswer: true,
          explanation: "Vrai. Les réseaux de neurones artificiels s'inspirent de la structure et du fonctionnement des neurones biologiques."
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Qu'est-ce que l'overfitting en Machine Learning ?",
          options: [
            "Quand le modèle apprend trop bien les données d'entraînement",
            "Quand le modèle n'apprend pas assez",
            "Quand le modèle est trop simple",
            "Quand le modèle manque de données"
          ],
          correctAnswer: 0,
          explanation: "L'overfitting se produit quand le modèle mémorise les données d'entraînement au lieu d'apprendre des patterns généralisables."
        },
        {
          id: 3,
          type: "true-false",
          question: "La validation croisée aide à éviter l'overfitting.",
          correctAnswer: true,
          explanation: "Vrai. La validation croisée permet d'évaluer la capacité de généralisation du modèle et de détecter l'overfitting."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Quelle métrique est appropriée pour évaluer un modèle de classification binaire ?",
          options: [
            "Précision uniquement",
            "Rappel uniquement",
            "F1-score",
            "Erreur quadratique moyenne"
          ],
          correctAnswer: 2,
          explanation: "Le F1-score combine précision et rappel, offrant une évaluation équilibrée pour la classification binaire."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "Comment appelle-t-on une couche cachée dans un réseau de neurones ?",
          options: [
            "Input layer",
            "Hidden layer",
            "Output layer",
            "Final layer"
          ],
          correctAnswer: 1,
          explanation: "Les couches situées entre l'entrée et la sortie sont appelées couches cachées (hidden layers)."
        },
        {
          id: 6,
          type: "true-false",
          question: "Une fonction d'activation introduit de la non-linéarité dans le réseau.",
          correctAnswer: true,
          explanation: "Vrai. Sans fonctions d'activation non-linéaires (comme ReLU, Sigmoid), un réseau de neurones ne serait qu'une régression linéaire géante."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "Quelle fonction d'activation est souvent utilisée pour la classification binaire en sortie ?",
          options: [
            "ReLU",
            "Sigmoid",
            "Tanh",
            "Softmax"
          ],
          correctAnswer: 1,
          explanation: "La fonction Sigmoid compresse la sortie entre 0 et 1, ce qui est idéal pour une probabilité en classification binaire."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "Qu'est-ce que la 'Backpropagation' ?",
          options: [
            "Un moyen d'initialiser les poids",
            "L'algorithme pour entraîner le réseau en propageant l'erreur",
            "Une technique de prétraitement des données",
            "Une méthode de validation"
          ],
          correctAnswer: 1,
          explanation: "La rétropropagation du gradient (backpropagation) permet de mettre à jour les poids du réseau pour minimiser l'erreur."
        },
        {
          id: 9,
          type: "true-false",
          question: "Plus un réseau de neurones a de couches, plus il est toujours performant.",
          correctAnswer: false,
          explanation: "Faux. Un réseau trop profond peut être difficile à entraîner (vanishing gradient) ou faire de l'overfitting."
        },
        {
          id: 10,
          type: "multiple-choice",
          question: "Quelle bibliothèque est populaire pour créer des réseaux de neurones en Python ?",
          options: [
            "React",
            "TensorFlow",
            "jQuery",
            "Pandas"
          ],
          correctAnswer: 1,
          explanation: "TensorFlow (et Keras) est l'une des bibliothèques les plus utilisées pour le Deep Learning."
        },
        {
          id: 11,
          type: "multiple-choice",
          question: "Quel est le rôle de la fonction de coût (Loss Function) ?",
          options: [
            "Augmenter la vitesse d'entraînement",
            "Mesurer l'écart entre la prédiction et la valeur réelle",
            "Initialiser les poids du réseau",
            "Diviser les données en lots"
          ],
          correctAnswer: 1,
          explanation: "La fonction de coût quantifie l'erreur du modèle, que l'algorithme d'optimisation cherche à minimiser."
        },
        {
          id: 12,
          type: "multiple-choice",
          question: "Qu'est-ce qu'une 'epoch' dans l'entraînement d'un réseau de neurones ?",
          options: [
            "Une étape de mise à jour des poids",
            "Le temps total d'entraînement",
            "Un passage complet de tout le jeu de données d'entraînement",
            "Le nombre de couches cachées"
          ],
          correctAnswer: 2,
          explanation: "Une epoch correspond à un passage complet de l'ensemble des données d'entraînement à travers le réseau."
        },
        {
          id: 13,
          type: "multiple-choice",
          question: "Si le Learning Rate est trop élevé, que risque-t-il de se passer ?",
          options: [
            "L'entraînement sera très lent",
            "Le modèle ne convergera jamais et l'erreur peut osciller/diverger",
            "Le modèle fera de l'overfitting",
            "Rien de particulier"
          ],
          correctAnswer: 1,
          explanation: "Un taux d'apprentissage trop grand peut faire 'sauter' l'optimiseur par-dessus le minimum, empêchant la convergence."
        },
        {
          id: 14,
          type: "true-false",
          question: "La technique de 'Dropout' consiste à éteindre aléatoirement des neurones pendant l'entraînement.",
          correctAnswer: true,
          explanation: "Vrai. Le Dropout est une technique de régularisation pour prévenir l'overfitting en forçant le réseau à être plus robuste."
        },
        {
          id: 15,
          type: "multiple-choice",
          question: "Dans une matrice de confusion, que représente un 'Faux Positif' ?",
          options: [
            "Le modèle a prédit Vrai, et c'était Vrai",
            "Le modèle a prédit Faux, et c'était Faux",
            "Le modèle a prédit Vrai, mais c'était Faux",
            "Le modèle a prédit Faux, mais c'était Vrai"
          ],
          correctAnswer: 2,
          explanation: "Un Faux Positif est une erreur où le modèle prédit la classe positive alors que la réalité est négative."
        },
        {
          id: 16,
          type: "multiple-choice",
          question: "Pourquoi divise-t-on les données en Train, Validation et Test ?",
          options: [
            "Pour avoir plus de données",
            "Pour entraîner sur Test et valider sur Train",
            "Pour entraîner, régler les hyperparamètres, et évaluer la performance finale",
            "C'est inutile, Train suffit"
          ],
          correctAnswer: 2,
          explanation: "Train sert à apprendre, Validation à ajuster le modèle, et Test à vérifier la performance réelle sur des données inconnues."
        },
        {
          id: 17,
          type: "multiple-choice",
          question: "Un modèle avec une variance élevée (High Variance) souffre généralement de :",
          options: [
            "Underfitting",
            "Overfitting",
            "Biais élevé",
            "Convergence lente"
          ],
          correctAnswer: 1,
          explanation: "Une variance élevée signifie que le modèle est très sensible aux données d'entraînement spécifiques, signe d'overfitting."
        },
        {
          id: 18,
          type: "multiple-choice",
          question: "Quelle est la particularité de la fonction d'activation ReLU pour les valeurs négatives ?",
          options: [
            "Elle renvoie -1",
            "Elle renvoie la valeur absolue",
            "Elle renvoie 0",
            "Elle renvoie l'infini"
          ],
          correctAnswer: 2,
          explanation: "ReLU (Rectified Linear Unit) renvoie x si x > 0, et 0 sinon."
        },
        {
          id: 19,
          type: "multiple-choice",
          question: "Quelle fonction d'activation est utilisée en sortie pour une classification multi-classes ?",
          options: [
            "Sigmoid",
            "ReLU",
            "Softmax",
            "Tanh"
          ],
          correctAnswer: 2,
          explanation: "Softmax transforme un vecteur de nombres en une distribution de probabilités dont la somme vaut 1."
        },
        {
          id: 20,
          type: "true-false",
          question: "Les poids (weights) et les biais (biases) sont des hyperparamètres.",
          correctAnswer: false,
          explanation: "Faux. Ce sont des paramètres appris par le réseau. Les hyperparamètres (learning rate, nb de couches) sont fixés avant l'entraînement."
        },
        {
          id: 21,
          type: "multiple-choice",
          question: "Pourquoi initialiser les poids aléatoirement plutôt qu'à zéro ?",
          options: [
            "Pour gagner du temps",
            "Pour briser la symétrie et permettre aux neurones d'apprendre des choses différentes",
            "C'est une convention sans importance",
            "Pour éviter l'overfitting"
          ],
          correctAnswer: 1,
          explanation: "Si tous les poids sont à zéro, tous les neurones de la couche apprendront la même chose (symétrie)."
        },
        {
          id: 22,
          type: "multiple-choice",
          question: "Qu'est-ce que la 'Forward Propagation' ?",
          options: [
            "Le calcul de l'erreur",
            "La mise à jour des poids",
            "Le passage des données de l'entrée vers la sortie pour obtenir une prédiction",
            "Le mélange des données"
          ],
          correctAnswer: 2,
          explanation: "C'est l'étape où les données traversent le réseau couche par couche pour générer un résultat."
        },
        {
          id: 23,
          type: "multiple-choice",
          question: "Quelle est la différence entre le Gradient Descent classique et le Stochastic Gradient Descent (SGD) ?",
          options: [
            "SGD utilise tout le dataset à chaque étape",
            "SGD met à jour les poids après chaque exemple (ou petit lot)",
            "SGD est plus lent",
            "Il n'y a pas de différence"
          ],
          correctAnswer: 1,
          explanation: "SGD met à jour les poids plus fréquemment (par exemple ou mini-batch), ce qui est souvent plus rapide et aide à échapper aux minima locaux."
        },
        {
          id: 24,
          type: "multiple-choice",
          question: "La Précision (Precision) se calcule comme :",
          options: [
            "Vrais Positifs / (Vrais Positifs + Faux Positifs)",
            "Vrais Positifs / (Vrais Positifs + Faux Négatifs)",
            "Vrais Positifs / Total",
            "Vrais Négatifs / Total"
          ],
          correctAnswer: 0,
          explanation: "La précision mesure la proportion de prédictions positives correctes parmi toutes les prédictions positives."
        },
        {
          id: 25,
          type: "multiple-choice",
          question: "Le Rappel (Recall) est crucial quand :",
          options: [
            "On veut être sûr de ce qu'on prédit positif (ex: recommandation vidéo)",
            "On veut absolument éviter de rater un cas positif (ex: détection de cancer)",
            "Le dataset est équilibré",
            "On a trop de données"
          ],
          correctAnswer: 1,
          explanation: "Le rappel mesure la capacité à trouver tous les cas positifs. C'est critique quand les Faux Négatifs sont coûteux."
        }
      ]
    }
  ],
  1: [
    {
      id: "checkpoint_1_1",
      title: "Checkpoint: Python Avancé",
      passingScore: 50,
      maxQuestions: 5,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Quelle est la sortie de print(type([])) ?",
          options: [
            "<class 'list'>",
            "<class 'tuple'>",
            "<class 'dict'>",
            "<class 'set'>"
          ],
          correctAnswer: 0,
          explanation: "En Python, [] représente une liste vide."
        },
        {
          id: 2,
          type: "true-false",
          question: "Les tuples sont immuables en Python.",
          correctAnswer: true,
          explanation: "Vrai. Contrairement aux listes, on ne peut pas modifier un tuple après sa création."
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Que fait la fonction map() ?",
          options: [
            "Crée une carte géographique",
            "Applique une fonction à chaque élément d'un itérable",
            "Filtre une liste",
            "Trie une liste"
          ],
          correctAnswer: 1,
          explanation: "map(fonction, itérable) applique la fonction donnée à chaque élément de la liste."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Quel mot-clé est utilisé pour créer un générateur ?",
          options: [
            "return",
            "yield",
            "generate",
            "produce"
          ],
          correctAnswer: 1,
          explanation: "Le mot-clé 'yield' permet de renvoyer une valeur tout en suspendant l'exécution de la fonction, créant ainsi un générateur."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "Comment gérer les exceptions en Python ?",
          options: [
            "try / catch",
            "try / except",
            "do / while",
            "if / else"
          ],
          correctAnswer: 1,
          explanation: "En Python, on utilise les blocs 'try' et 'except' pour capturer et gérer les erreurs."
        },
        {
          id: 6,
          type: "true-false",
          question: "Une fonction lambda est une fonction anonyme.",
          correctAnswer: true,
          explanation: "Vrai. Les fonctions lambda sont de petites fonctions définies sans nom avec le mot-clé lambda."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "Quelle méthode permet d'ajouter un élément à la fin d'une liste ?",
          options: [
            "push()",
            "add()",
            "append()",
            "insert()"
          ],
          correctAnswer: 2,
          explanation: "La méthode .append() ajoute un élément à la fin de la liste."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "Que retourne 3 ** 2 en Python ?",
          options: [
            "6",
            "9",
            "5",
            "Erreur"
          ],
          correctAnswer: 1,
          explanation: "L'opérateur ** est utilisé pour la puissance. 3 au carré vaut 9."
        },
        {
          id: 9,
          type: "true-false",
          question: "Python est un langage compilé.",
          correctAnswer: false,
          explanation: "Faux. Python est principalement un langage interprété (bien qu'il y ait une étape de compilation en bytecode)."
        },
        {
          id: 10,
          type: "multiple-choice",
          question: "Quel décorateur définit une méthode de classe ?",
          options: [
            "@staticmethod",
            "@classmethod",
            "@method",
            "@class"
          ],
          correctAnswer: 1,
          explanation: "@classmethod définit une méthode qui reçoit la classe comme premier argument (cls) au lieu de l'instance."
        }
      ]
    },
    {
      id: "checkpoint_1_2",
      title: "Checkpoint: Data Science",
      passingScore: 50,
      maxQuestions: 5,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Quelle méthode Pandas permet de lire un fichier CSV ?",
          options: [
            "pd.read_csv()",
            "pd.load_csv()",
            "pd.import_csv()",
            "pd.open_csv()"
          ],
          correctAnswer: 0,
          explanation: "pd.read_csv() est la fonction standard de Pandas pour charger des données CSV."
        },
        {
          id: 2,
          type: "true-false",
          question: "NumPy est plus rapide que les listes Python standards pour les calculs numériques.",
          correctAnswer: true,
          explanation: "Vrai. NumPy utilise des tableaux optimisés en C, ce qui le rend beaucoup plus performant pour les calculs."
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Quelle méthode Pandas donne un résumé statistique des données ?",
          options: [
            "df.info()",
            "df.describe()",
            "df.stats()",
            "df.summary()"
          ],
          correctAnswer: 1,
          explanation: "df.describe() fournit des statistiques descriptives (moyenne, min, max, quartiles...) pour les colonnes numériques."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Comment sélectionner une colonne 'Age' dans un DataFrame df ?",
          options: [
            "df.get('Age')",
            "df['Age']",
            "df(Age)",
            "df.select('Age')"
          ],
          correctAnswer: 1,
          explanation: "La syntaxe df['Age'] (ou df.Age) est utilisée pour accéder à une colonne."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "Quelle bibliothèque est basée sur Matplotlib et offre des graphiques statistiques plus esthétiques ?",
          options: [
            "Seaborn",
            "Pandas",
            "NumPy",
            "SciPy"
          ],
          correctAnswer: 0,
          explanation: "Seaborn est une bibliothèque de visualisation de données basée sur Matplotlib."
        },
        {
          id: 6,
          type: "true-false",
          question: "On peut gérer les valeurs manquantes avec fillna().",
          correctAnswer: true,
          explanation: "Vrai. La méthode fillna() permet de remplacer les valeurs NaN par une valeur spécifique."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "Que fait df.groupby('Category').mean() ?",
          options: [
            "Trie par catégorie",
            "Groupe par catégorie et calcule la moyenne des colonnes numériques",
            "Supprime la colonne Category",
            "Affiche la moyenne de la colonne Category"
          ],
          correctAnswer: 1,
          explanation: "Cela regroupe les données par la colonne 'Category' et calcule la moyenne pour chaque groupe."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "Quel objet NumPy représente une matrice ?",
          options: [
            "np.matrix",
            "np.array",
            "np.list",
            "np.table"
          ],
          correctAnswer: 1,
          explanation: "Bien que np.matrix existe, np.array (tableau multidimensionnel) est l'objet standard pour représenter vecteurs et matrices."
        },
        {
          id: 9,
          type: "true-false",
          question: "Pandas est construit au-dessus de NumPy.",
          correctAnswer: true,
          explanation: "Vrai. Pandas utilise les tableaux NumPy pour stocker ses données de manière efficace."
        },
        {
          id: 10,
          type: "multiple-choice",
          question: "Comment supprimer une ligne dans un DataFrame ?",
          options: [
            "df.remove()",
            "df.delete()",
            "df.drop()",
            "df.pop()"
          ],
          correctAnswer: 2,
          explanation: "La méthode df.drop() permet de supprimer des lignes (ou des colonnes avec axis=1)."
        }
      ]
    }
  ],
  2: [
    {
      id: "checkpoint_2_1",
      title: "Checkpoint: Deep Learning Avancé",
      passingScore: 50,
      maxQuestions: 5,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Quel type de couche est utilisé pour le traitement d'images ?",
          options: [
            "Dense layer",
            "Couche convolutionnelle (Conv2D)",
            "Couche récurrente (LSTM)",
            "Embedding layer"
          ],
          correctAnswer: 1,
          explanation: "Les couches de convolution (CNN) sont spécialisées dans l'extraction de caractéristiques d'images."
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Que signifie RNN ?",
          options: [
            "Random Neural Network",
            "Recurrent Neural Network",
            "Rapid Neural Network",
            "Regression Neural Network"
          ],
          correctAnswer: 1,
          explanation: "RNN signifie Réseau de Neurones Récurrent, utilisé pour les données séquentielles."
        },
        {
          id: 3,
          type: "true-false",
          question: "Le Transfer Learning permet de réutiliser un modèle pré-entraîné.",
          correctAnswer: true,
          explanation: "Vrai. On utilise un modèle entraîné sur une grande base de données pour une nouvelle tâche similaire."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Qu'est-ce qu'un GAN ?",
          options: [
            "General AI Network",
            "Generative Adversarial Network",
            "Global Artificial Neuron",
            "Graphic Analysis Node"
          ],
          correctAnswer: 1,
          explanation: "Un GAN (Réseau Antagoniste Génératif) est composé d'un générateur et d'un discriminateur."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "Quelle couche est utilisée pour réduire la dimensionnalité spatiale (downsampling) ?",
          options: [
            "Flatten",
            "Pooling (ex: MaxPooling)",
            "Dense",
            "Dropout"
          ],
          correctAnswer: 1,
          explanation: "Le Pooling (comme MaxPooling2D) réduit la taille de l'image pour diminuer les calculs et éviter l'overfitting."
        },
        {
          id: 6,
          type: "true-false",
          question: "Le Dropout est une technique de régularisation.",
          correctAnswer: true,
          explanation: "Vrai. Le Dropout désactive aléatoirement des neurones pendant l'entraînement pour forcer le réseau à être plus robuste."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "Quel problème le 'Vanishing Gradient' affecte-t-il principalement ?",
          options: [
            "Les réseaux peu profonds",
            "Les réseaux profonds (Deep Networks)",
            "La régression linéaire",
            "Les arbres de décision"
          ],
          correctAnswer: 1,
          explanation: "Dans les réseaux profonds, le gradient peut devenir très petit lors de la rétropropagation, empêchant les premières couches d'apprendre."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "Lequel est un framework de Deep Learning ?",
          options: [
            "PyTorch",
            "NumPy",
            "Matplotlib",
            "Requests"
          ],
          correctAnswer: 0,
          explanation: "PyTorch (développé par Facebook/Meta) est un framework majeur de Deep Learning."
        },
        {
          id: 9,
          type: "multiple-choice",
          question: "A quoi sert la couche 'Flatten' ?",
          options: [
            "À lisser l'image",
            "À transformer une matrice multidimensionnelle en vecteur 1D",
            "À supprimer des neurones",
            "À normaliser les données"
          ],
          correctAnswer: 1,
          explanation: "Flatten est utilisé pour passer des couches de convolution (2D/3D) aux couches denses (1D)."
        },
        {
          id: 10,
          type: "true-false",
          question: "Les Transformers (ex: GPT) sont basés sur le mécanisme d'attention.",
          correctAnswer: true,
          explanation: "Vrai. Le mécanisme 'Self-Attention' est au cœur de l'architecture Transformer."
        }
      ]
    }
  ]
};

export const formationCheckpointsEn = {
  0: [
    {
      id: "checkpoint_0_1",
      title: "Checkpoint: AI Fundamentals",
      passingScore: 50,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What does AI stand for?",
          options: [
            "Artificial Intelligence",
            "Automatic Information",
            "Advanced Interface",
            "Algorithmic Instruction"
          ],
          correctAnswer: 0,
          explanation: "AI stands for Artificial Intelligence, which refers to systems mimicking human intelligence."
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Which programming language is most used in AI?",
          options: [
            "Java",
            "Python",
            "C++",
            "JavaScript"
          ],
          correctAnswer: 1,
          explanation: "Python is the most popular language in AI thanks to its specialized libraries like TensorFlow, PyTorch, scikit-learn."
        },
        {
          id: 7,
          type: "multiple-choice",
          question: "What is the main difference between Weak AI and Strong AI?",
          options: [
            "Weak AI is less powerful",
            "Weak AI is specialized, Strong AI is generalist",
            "Strong AI consumes less resources",
            "There is no difference"
          ],
          correctAnswer: 1,
          explanation: "Weak AI (ANI) is specialized in specific tasks, while Strong AI (AGI) would have general cognitive abilities like a human."
        }
      ]
    },
    {
      id: "checkpoint_0_2",
      title: "Checkpoint: Machine Learning & Data",
      passingScore: 50,
      questions: [
        {
          id: 3,
          type: "true-false",
          question: "Machine Learning is a subcategory of Artificial Intelligence.",
          correctAnswer: true,
          explanation: "True. Machine Learning is indeed a branch of AI that allows machines to learn without being explicitly programmed."
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "Which Python library is mainly used for data manipulation?",
          options: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Seaborn"
          ],
          correctAnswer: 1,
          explanation: "Pandas is the reference library for data manipulation and analysis in Python."
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "What is a supervised algorithm?",
          options: [
            "An algorithm that learns without training data",
            "An algorithm that learns from labeled examples",
            "An algorithm that requires no supervision",
            "An algorithm that works only in real-time"
          ],
          correctAnswer: 1,
          explanation: "Supervised learning uses labeled training data to learn how to make predictions."
        }
      ]
    },
    {
      id: "checkpoint_0_3",
      title: "Checkpoint: Neural Networks & Validation",
      passingScore: 50,
      questions: [
        {
          id: 6,
          type: "true-false",
          question: "Neural networks are inspired by the functioning of the human brain.",
          correctAnswer: true,
          explanation: "True. Artificial neural networks are inspired by the structure and functioning of biological neurons."
        },
        {
          id: 8,
          type: "multiple-choice",
          question: "What is overfitting in Machine Learning?",
          options: [
            "When the model learns the training data too well",
            "When the model does not learn enough",
            "When the model is too simple",
            "When the model lacks data"
          ],
          correctAnswer: 0,
          explanation: "Overfitting occurs when the model memorizes training data instead of learning generalizable patterns."
        },
        {
          id: 9,
          type: "true-false",
          question: "Cross-validation helps avoid overfitting.",
          correctAnswer: true,
          explanation: "True. Cross-validation allows evaluating the model's generalization ability and detecting overfitting."
        },
        {
          id: 10,
          type: "multiple-choice",
          question: "Which metric is appropriate for evaluating a binary classification model?",
          options: [
            "Precision only",
            "Recall only",
            "F1-score",
            "Mean Squared Error"
          ],
          correctAnswer: 2,
          explanation: "The F1-score combines precision and recall, offering a balanced evaluation for binary classification."
        }
      ]
    }
  ],
  1: [
    {
      id: "checkpoint_1_1",
      title: "Checkpoint: Advanced Python",
      passingScore: 50,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "What is the output of print(type([]))?",
          options: [
            "<class 'list'>",
            "<class 'tuple'>",
            "<class 'dict'>",
            "<class 'set'>"
          ],
          correctAnswer: 0,
          explanation: "In Python, [] represents an empty list."
        },
        {
          id: 2,
          type: "true-false",
          question: "Tuples are immutable in Python.",
          correctAnswer: true,
          explanation: "True. Unlike lists, you cannot modify a tuple after its creation."
        }
      ]
    },
    {
      id: "checkpoint_1_2",
      title: "Checkpoint: Data Science",
      passingScore: 50,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which Pandas method allows reading a CSV file?",
          options: [
            "pd.read_csv()",
            "pd.load_csv()",
            "pd.import_csv()",
            "pd.open_csv()"
          ],
          correctAnswer: 0,
          explanation: "pd.read_csv() is the standard Pandas function to load CSV data."
        }
      ]
    }
  ],
  2: [
    {
      id: "checkpoint_2_1",
      title: "Checkpoint: Advanced Deep Learning",
      passingScore: 50,
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Which layer type is used for image processing?",
          options: [
            "Dense layer",
            "Convolutional layer (Conv2D)",
            "Recurrent layer (LSTM)",
            "Embedding layer"
          ],
          correctAnswer: 1,
          explanation: "Convolutional layers (CNN) are specialized in extracting features from images."
        }
      ]
    }
  ]
};
