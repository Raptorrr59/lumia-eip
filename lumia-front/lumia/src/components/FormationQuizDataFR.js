export const formationQuizDataFR = {
  // Quiz pour le Parcours Facile (Formation ID: 0)
  0: {
    id: 0,
    formationId: 0,
    title: "Quiz : Parcours Facile - Fondamentaux de l'IA",
    passingScore: 75,
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
        type: "true-false",
        question: "Le Machine Learning est une sous-catégorie de l'Intelligence Artificielle.",
        correctAnswer: true,
        explanation: "Vrai. Le Machine Learning est effectivement une branche de l'IA qui permet aux machines d'apprendre sans être explicitement programmées."
      },
      {
        id: 4,
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
        id: 5,
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
        id: 6,
        type: "true-false",
        question: "Les réseaux de neurones sont inspirés du fonctionnement du cerveau humain.",
        correctAnswer: true,
        explanation: "Vrai. Les réseaux de neurones artificiels s'inspirent de la structure et du fonctionnement des neurones biologiques."
      },
      {
        id: 7,
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
        id: 8,
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
        id: 9,
        type: "true-false",
        question: "La validation croisée aide à éviter l'overfitting.",
        correctAnswer: true,
        explanation: "Vrai. La validation croisée permet d'évaluer la capacité de généralisation du modèle et de détecter l'overfitting."
      },
      {
        id: 10,
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
      }
    ]
  },

  // Quiz pour le Parcours Intermédiaire (Formation ID: 1)
  1: {
    id: 1,
    formationId: 1,
    title: "Quiz : Parcours Intermédiaire - IA Avancée",
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Qu'est-ce que le Deep Learning ?",
        options: [
          "Une technique de programmation",
          "Un sous-domaine du Machine Learning utilisant des réseaux de neurones profonds",
          "Un type de base de données",
          "Un langage de programmation"
        ],
        correctAnswer: 1,
        explanation: "Le Deep Learning utilise des réseaux de neurones avec plusieurs couches cachées pour apprendre des représentations complexes."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Quelle fonction d'activation est couramment utilisée dans les réseaux de neurones modernes ?",
        options: [
          "Sigmoid",
          "Tanh",
          "ReLU",
          "Linear"
        ],
        correctAnswer: 2,
        explanation: "ReLU (Rectified Linear Unit) est largement utilisée car elle évite le problème de gradient vanishing et accélère l'entraînement."
      },
      {
        id: 3,
        type: "true-false",
        question: "Les CNN (Convolutional Neural Networks) sont particulièrement efficaces pour le traitement d'images.",
        correctAnswer: true,
        explanation: "Vrai. Les CNN utilisent des convolutions qui préservent la structure spatiale des images, les rendant très efficaces pour la vision par ordinateur."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Qu'est-ce que le gradient descent ?",
        options: [
          "Une technique de visualisation",
          "Un algorithme d'optimisation pour minimiser la fonction de coût",
          "Une méthode de collecte de données",
          "Un type de réseau de neurones"
        ],
        correctAnswer: 1,
        explanation: "Le gradient descent est un algorithme d'optimisation qui ajuste les paramètres du modèle pour minimiser l'erreur."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Quelle technique permet de réduire l'overfitting ?",
        options: [
          "Dropout",
          "Régularisation L1/L2",
          "Early stopping",
          "Toutes les réponses"
        ],
        correctAnswer: 3,
        explanation: "Toutes ces techniques aident à réduire l'overfitting en régularisant le modèle de différentes manières."
      },
      {
        id: 6,
        type: "true-false",
        question: "Les RNN (Recurrent Neural Networks) sont adaptés pour traiter des séquences de données.",
        correctAnswer: true,
        explanation: "Vrai. Les RNN ont une mémoire interne qui leur permet de traiter des séquences de longueur variable comme le texte ou les séries temporelles."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "Qu'est-ce que le transfer learning ?",
        options: [
          "Transférer des données entre serveurs",
          "Utiliser un modèle pré-entraîné comme point de départ",
          "Convertir un modèle d'un langage à un autre",
          "Partager des modèles entre équipes"
        ],
        correctAnswer: 1,
        explanation: "Le transfer learning consiste à utiliser un modèle pré-entraîné sur une tâche similaire pour accélérer l'apprentissage sur une nouvelle tâche."
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "Quelle est la principale différence entre la classification et la régression ?",
        options: [
          "La classification prédit des catégories, la régression des valeurs continues",
          "La classification est plus rapide",
          "La régression nécessite plus de données",
          "Il n'y a pas de différence"
        ],
        correctAnswer: 0,
        explanation: "La classification prédit des classes discrètes (ex: chat/chien), tandis que la régression prédit des valeurs numériques continues (ex: prix)."
      },
      {
        id: 9,
        type: "true-false",
        question: "L'attention mechanism a révolutionné le traitement du langage naturel.",
        correctAnswer: true,
        explanation: "Vrai. Le mécanisme d'attention, notamment dans les Transformers, a considérablement amélioré les performances en NLP."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "Qu'est-ce que l'apprentissage par renforcement ?",
        options: [
          "Apprendre en répétant les mêmes exercices",
          "Apprendre par interaction avec un environnement via récompenses/punitions",
          "Renforcer les connexions neuronales",
          "Augmenter la taille du dataset"
        ],
        correctAnswer: 1,
        explanation: "L'apprentissage par renforcement apprend des politiques optimales en interagissant avec un environnement et en recevant des récompenses."
      },
      {
        id: 11,
        type: "multiple-choice",
        question: "Quelle bibliothèque est principalement utilisée pour le Deep Learning ?",
        options: [
          "Pandas",
          "NumPy",
          "TensorFlow/PyTorch",
          "Matplotlib"
        ],
        correctAnswer: 2,
        explanation: "TensorFlow et PyTorch sont les frameworks de référence pour développer des modèles de Deep Learning."
      },
      {
        id: 12,
        type: "true-false",
        question: "Les GANs (Generative Adversarial Networks) utilisent deux réseaux en compétition.",
        correctAnswer: true,
        explanation: "Vrai. Les GANs utilisent un générateur et un discriminateur qui s'entraînent en opposition pour créer des données synthétiques réalistes."
      }
    ]
  },

  // Quiz pour le Parcours Expert (Formation ID: 2)
  2: {
    id: 2,
    formationId: 2,
    title: "Quiz : Parcours Expert - IA de Pointe",
    passingScore: 85,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Qu'est-ce que l'architecture Transformer ?",
        options: [
          "Un type de robot",
          "Une architecture de réseau basée sur l'attention",
          "Un compilateur de code",
          "Un système d'exploitation"
        ],
        correctAnswer: 1,
        explanation: "L'architecture Transformer utilise uniquement des mécanismes d'attention, révolutionnant le NLP avec des modèles comme BERT et GPT."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Qu'est-ce que BERT ?",
        options: [
          "Bidirectional Encoder Representations from Transformers",
          "Basic Encoding and Retrieval Tool",
          "Binary Evaluation and Recognition Technology",
          "Behavioral Enhancement and Response Training"
        ],
        correctAnswer: 0,
        explanation: "BERT est un modèle de langage bidirectionnel basé sur l'architecture Transformer, pré-entraîné sur de vastes corpus de texte."
      },
      {
        id: 3,
        type: "true-false",
        question: "Les modèles GPT utilisent une approche autoregressive pour générer du texte.",
        correctAnswer: true,
        explanation: "Vrai. GPT génère du texte token par token en prédisant le prochain mot basé sur le contexte précédent."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Qu'est-ce que le fine-tuning ?",
        options: [
          "Ajuster les hyperparamètres",
          "Adapter un modèle pré-entraîné à une tâche spécifique",
          "Optimiser les performances du serveur",
          "Nettoyer les données d'entraînement"
        ],
        correctAnswer: 1,
        explanation: "Le fine-tuning consiste à continuer l'entraînement d'un modèle pré-entraîné sur des données spécifiques à une nouvelle tâche."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Qu'est-ce que l'apprentissage fédéré ?",
        options: [
          "Entraîner des modèles sur des données distribuées sans les centraliser",
          "Utiliser plusieurs GPU simultanément",
          "Combiner plusieurs algorithmes",
          "Partager des modèles entre entreprises"
        ],
        correctAnswer: 0,
        explanation: "L'apprentissage fédéré permet d'entraîner des modèles sur des données décentralisées tout en préservant la confidentialité."
      },
      {
        id: 6,
        type: "true-false",
        question: "Les modèles de diffusion comme DALL-E utilisent un processus de débruitage progressif.",
        correctAnswer: true,
        explanation: "Vrai. Les modèles de diffusion apprennent à générer des images en inversant un processus de bruitage progressif."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "Qu'est-ce que l'explicabilité en IA ?",
        options: [
          "La capacité à expliquer les décisions du modèle",
          "La vitesse d'exécution du modèle",
          "La précision du modèle",
          "La taille du modèle"
        ],
        correctAnswer: 0,
        explanation: "L'explicabilité (XAI) vise à rendre les décisions des modèles d'IA compréhensibles et interprétables par les humains."
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "Qu'est-ce que l'apprentissage par méta-apprentissage ?",
        options: [
          "Apprendre à apprendre",
          "Utiliser des métadonnées",
          "Optimiser les métaparamètres",
          "Analyser les métamodèles"
        ],
        correctAnswer: 0,
        explanation: "Le méta-apprentissage (learning to learn) vise à développer des algorithmes qui s'adaptent rapidement à de nouvelles tâches."
      },
      {
        id: 9,
        type: "true-false",
        question: "Les modèles multimodaux peuvent traiter simultanément texte, images et audio.",
        correctAnswer: true,
        explanation: "Vrai. Les modèles multimodaux comme CLIP ou GPT-4V peuvent comprendre et générer du contenu dans plusieurs modalités."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "Qu'est-ce que l'IA neurosymbolique ?",
        options: [
          "Combiner apprentissage neuronal et raisonnement symbolique",
          "Utiliser des symboles dans les réseaux de neurones",
          "Créer des neurones artificiels",
          "Symboliser les données d'entraînement"
        ],
        correctAnswer: 0,
        explanation: "L'IA neurosymbolique combine les forces de l'apprentissage neuronal et du raisonnement symbolique logique."
      },
      {
        id: 11,
        type: "multiple-choice",
        question: "Qu'est-ce que l'alignement en IA ?",
        options: [
          "Aligner les données d'entraînement",
          "S'assurer que l'IA agit selon les valeurs humaines",
          "Synchroniser plusieurs modèles",
          "Optimiser l'architecture du modèle"
        ],
        correctAnswer: 1,
        explanation: "L'alignement vise à s'assurer que les systèmes d'IA agissent conformément aux intentions et valeurs humaines."
      },
      {
        id: 12,
        type: "true-false",
        question: "Les LLMs (Large Language Models) peuvent présenter des biais présents dans leurs données d'entraînement.",
        correctAnswer: true,
        explanation: "Vrai. Les LLMs peuvent reproduire et amplifier les biais sociétaux présents dans leurs données d'entraînement."
      },
      {
        id: 13,
        type: "multiple-choice",
        question: "Qu'est-ce que l'inférence causale en IA ?",
        options: [
          "Identifier les relations de cause à effet dans les données",
          "Accélérer les calculs d'inférence",
          "Réduire la latence du modèle",
          "Optimiser la mémoire utilisée"
        ],
        correctAnswer: 0,
        explanation: "L'inférence causale cherche à identifier et quantifier les relations de causalité, au-delà des simples corrélations."
      },
      {
        id: 14,
        type: "true-false",
        question: "L'IA générative peut créer du contenu original qui n'existait pas dans les données d'entraînement.",
        correctAnswer: true,
        explanation: "Vrai. L'IA générative peut créer du nouveau contenu en combinant et extrapolant à partir des patterns appris."
      },
      {
        id: 15,
        type: "multiple-choice",
        question: "Qu'est-ce que l'optimisation bayésienne ?",
        options: [
          "Une méthode d'optimisation d'hyperparamètres",
          "Un type de réseau bayésien",
          "Une technique de compression",
          "Un algorithme de tri"
        ],
        correctAnswer: 0,
        explanation: "L'optimisation bayésienne utilise des modèles probabilistes pour optimiser efficacement les hyperparamètres de modèles complexes."
      }
    ]
  }
};