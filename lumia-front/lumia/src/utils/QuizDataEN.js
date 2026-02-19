export const quizDataEN = {
  8: {
    id: 8,
    courseId: 8,
    title: "Quiz: What is AI?",
    passingScore: 50,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does AI stand for?",
        options: [
          "Artificial Intelligence",
          "Automated Information",
          "Advanced Interface",
          "Algorithmic Instruction"
        ],
        correctAnswer: 0,
        explanation: "AI stands for Artificial Intelligence, referring to systems that imitate human intelligence."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which type of AI currently exists?",
        options: [
          "General AI (AGI)",
          "Narrow AI (ANI)",
          "Super AI (ASI)",
          "All of the above"
        ],
        correctAnswer: 1,
        explanation: "Currently, only Narrow AI (ANI) exists, specialized in specific tasks."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is modern AI primarily based on?",
        options: [
          "Only classic programming",
          "Machine Learning and Deep Learning",
          "Only databases",
          "Human intuition"
        ],
        correctAnswer: 1,
        explanation: "Modern AI is primarily based on Machine Learning and Deep Learning."
      },
      {
        id: 4,
        type: "true-false",
        question: "AIs think exactly like humans.",
        correctAnswer: false,
        explanation: "False. AIs simulate certain aspects of thinking but do not think like humans."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which is a real-world application of AI?",
        options: [
          "Image recognition",
          "Voice assistants",
          "Predictive analytics",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "All these applications are concrete examples of AI usage today."
      }
    ]
  },
  9: {
    id: 9,
    courseId: 9,
    title: "Quiz: First steps with Python",
    passingScore: 50,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Why is Python popular in AI?",
        options: [
          "Simple and readable syntax",
          "Numerous specialized libraries",
          "Large community",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Python combines a simple syntax, many AI libraries, and a large community."
      },
      {
        id: 2,
        type: "code",
        question: "Complete this code to print 'Hello World':",
        initialCode: "# Complete the code\n_____(\"Hello World\")",
        correctAnswer: "print",
        explanation: "The print() function is used to display text in Python."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "What is the data type of the variable: x = [1, 2, 3]?",
        options: [
          "String",
          "Integer",
          "List",
          "Dictionary"
        ],
        correctAnswer: 2,
        explanation: "Brackets [] define a list in Python."
      },
      {
        id: 4,
        type: "true-false",
        question: "Python is a compiled language.",
        correctAnswer: false,
        explanation: "False. Python is an interpreted language, not compiled."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which library is commonly used for machine learning?",
        options: [
          "requests",
          "scikit-learn",
          "flask",
          "pygame"
        ],
        correctAnswer: 1,
        explanation: "scikit-learn is a popular library for machine learning in Python."
      }
    ]
  }
};

export default quizDataEN;
