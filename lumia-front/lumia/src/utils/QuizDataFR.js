export const quizDataFR = {
  // Quiz pour le cours "Qu'est-ce qu'une IA?" (ID: 8)
  8: {
    id: 8,
    courseId: 8,
    title: "Quiz : Qu'est-ce qu'une IA ?",
    passingScore: 50,
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
        question: "Quel type d'IA existe actuellement ?",
        options: [
          "IA générale (AGI)",
          "IA faible (ANI)",
          "Super IA (ASI)",
          "Toutes les réponses"
        ],
        correctAnswer: 1,
        explanation: "Actuellement, seule l'IA faible (ANI) existe, spécialisée dans des tâches précises."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Sur quoi repose principalement l'IA moderne ?",
        options: [
          "Seulement sur la programmation classique",
          "Machine Learning et Deep Learning",
          "Uniquement sur les bases de données",
          "Sur l'intuition humaine"
        ],
        correctAnswer: 1,
        explanation: "L'IA moderne repose principalement sur le Machine Learning et le Deep Learning."
      },
      {
        id: 4,
        type: "true-false",
        question: "Les IA pensent exactement comme les humains.",
        correctAnswer: false,
        explanation: "Faux. Les IA simulent certains aspects de la pensée mais ne pensent pas comme les humains."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Quelle est une application concrète de l'IA ?",
        options: [
          "Reconnaissance d'images",
          "Assistants vocaux",
          "Analyse prédictive",
          "Toutes les réponses"
        ],
        correctAnswer: 3,
        explanation: "Toutes ces applications sont des exemples concrets d'utilisation de l'IA aujourd'hui."
      }
    ]
  },

  // Quiz pour le cours "Premiers Pas avec Python" (ID: 9)
  9: {
    id: 9,
    courseId: 9,
    title: "Quiz : Premiers pas avec Python",
    passingScore: 50,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Pourquoi Python est-il populaire en IA ?",
        options: [
          "Syntaxe simple et lisible",
          "Nombreuses bibliothèques spécialisées",
          "Grande communauté",
          "Toutes les réponses"
        ],
        correctAnswer: 3,
        explanation: "Python combine une syntaxe simple, de nombreuses bibliothèques IA et une grande communauté."
      },
      {
        id: 2,
        type: "code",
        question: "Complétez ce code pour afficher 'Hello World' :",
        initialCode: "# Complétez le code\n_____(\"Hello World\")",
        correctAnswer: "print",
        explanation: "La fonction print() permet d'afficher du texte en Python."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Quel est le type de données de la variable : x = [1, 2, 3] ?",
        options: [
          "String",
          "Integer",
          "List",
          "Dictionary"
        ],
        correctAnswer: 2,
        explanation: "Les crochets [] définissent une liste (list) en Python."
      },
      {
        id: 4,
        type: "true-false",
        question: "Python est un langage compilé.",
        correctAnswer: false,
        explanation: "Faux. Python est un langage interprété, pas compilé."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Quelle bibliothèque est couramment utilisée pour le machine learning ?",
        options: [
          "requests",
          "scikit-learn",
          "flask",
          "pygame"
        ],
        correctAnswer: 1,
        explanation: "scikit-learn est une bibliothèque populaire pour le machine learning en Python."
      }
    ]
  }
};

export default quizDataFR;