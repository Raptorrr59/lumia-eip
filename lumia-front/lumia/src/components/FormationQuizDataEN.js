export const formationQuizDataEN = {
  0: {
    id: 0,
    formationId: 0,
    title: "Quiz: Easy Path - AI Fundamentals",
    passingScore: 75,
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
        question: "Which programming language is most used in AI?",
        options: ["Java", "Python", "C++", "JavaScript"],
        correctAnswer: 1,
        explanation: "Python is most popular in AI thanks to libraries like TensorFlow, PyTorch, and scikit-learn."
      },
      {
        id: 3,
        type: "true-false",
        question: "Machine Learning is a subcategory of Artificial Intelligence.",
        correctAnswer: true,
        explanation: "True. Machine Learning is a branch of AI that enables machines to learn without being explicitly programmed."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which Python library is mainly used for data manipulation?",
        options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
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
          "An algorithm that only works in real time"
        ],
        correctAnswer: 1,
        explanation: "Supervised learning uses labeled training data to learn to make predictions."
      },
      {
        id: 6,
        type: "true-false",
        question: "Neural networks are inspired by the functioning of the human brain.",
        correctAnswer: true,
        explanation: "True. Artificial neural networks are inspired by the structure and function of biological neurons."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What is the main difference between weak AI and strong AI?",
        options: [
          "Weak AI is less powerful",
          "Weak AI is specialized, strong AI is generalist",
          "Strong AI uses fewer resources",
          "There is no difference"
        ],
        correctAnswer: 1,
        explanation: "Weak AI (ANI) is specialized in specific tasks, while strong AI (AGI) would have general cognitive abilities like humans."
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "What is overfitting in Machine Learning?",
        options: [
          "When the model learns the training data too well",
          "When the model doesn't learn enough",
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
        explanation: "True. Cross-validation evaluates a model's generalization ability and helps detect overfitting."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "Which metric is appropriate for evaluating a binary classification model?",
        options: ["Accuracy only", "Recall only", "F1-score", "Mean Squared Error"],
        correctAnswer: 2,
        explanation: "F1-score combines precision and recall, offering a balanced evaluation for binary classification."
      }
    ]
  },
  1: {
    id: 1,
    formationId: 1,
    title: "Quiz: Intermediate Path - Advanced AI",
    passingScore: 80,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is Deep Learning?",
        options: [
          "A programming technique",
          "A subfield of Machine Learning using deep neural networks",
          "A type of database",
          "A programming language"
        ],
        correctAnswer: 1,
        explanation: "Deep Learning uses neural networks with multiple hidden layers to learn complex representations."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which activation function is commonly used in modern neural networks?",
        options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
        correctAnswer: 2,
        explanation: "ReLU (Rectified Linear Unit) is widely used as it avoids vanishing gradients and speeds up training."
      },
      {
        id: 3,
        type: "true-false",
        question: "CNNs (Convolutional Neural Networks) are particularly effective for image processing.",
        correctAnswer: true,
        explanation: "True. CNNs use convolutions that preserve spatial structure, making them very effective for computer vision."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What is gradient descent?",
        options: [
          "A visualization technique",
          "An optimization algorithm to minimize the loss function",
          "A data collection method",
          "A type of neural network"
        ],
        correctAnswer: 1,
        explanation: "Gradient descent is an optimization algorithm that adjusts model parameters to minimize error."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which technique helps reduce overfitting?",
        options: ["Dropout", "L1/L2 regularization", "Early stopping", "All of the above"],
        correctAnswer: 3,
        explanation: "All these techniques help reduce overfitting by regularizing the model in different ways."
      },
      {
        id: 6,
        type: "true-false",
        question: "RNNs (Recurrent Neural Networks) are suitable for sequence data.",
        correctAnswer: true,
        explanation: "True. RNNs have internal memory allowing them to process variable-length sequences like text or time series."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What is transfer learning?",
        options: [
          "Transferring data between servers",
          "Using a pre-trained model as a starting point",
          "Converting a model from one language to another",
          "Sharing models between teams"
        ],
        correctAnswer: 1,
        explanation: "Transfer learning uses a pre-trained model on a similar task to accelerate learning on a new task."
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "What is the main difference between classification and regression?",
        options: [
          "Classification predicts categories, regression predicts continuous values",
          "Classification is faster",
          "Regression requires more data",
          "There is no difference"
        ],
        correctAnswer: 0,
        explanation: "Classification predicts discrete classes (e.g., cat/dog), while regression predicts continuous numerical values (e.g., price)."
      },
      {
        id: 9,
        type: "true-false",
        question: "The attention mechanism revolutionized natural language processing.",
        correctAnswer: true,
        explanation: "True. The attention mechanism, notably in Transformers, greatly improved NLP performance."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is reinforcement learning?",
        options: [
          "Learning by repeating the same exercises",
          "Learning through interaction with an environment via rewards/punishments",
          "Strengthening neural connections",
          "Increasing dataset size"
        ],
        correctAnswer: 1,
        explanation: "Reinforcement learning learns optimal policies by interacting with an environment and receiving rewards."
      },
      {
        id: 11,
        type: "multiple-choice",
        question: "Which library is mainly used for Deep Learning?",
        options: ["Pandas", "NumPy", "TensorFlow/PyTorch", "Matplotlib"],
        correctAnswer: 2,
        explanation: "TensorFlow and PyTorch are the reference frameworks for building Deep Learning models."
      },
      {
        id: 12,
        type: "true-false",
        question: "GANs (Generative Adversarial Networks) use two competing networks.",
        correctAnswer: true,
        explanation: "True. GANs use a generator and a discriminator that train in opposition to create realistic synthetic data."
      }
    ]
  },
  2: {
    id: 2,
    formationId: 2,
    title: "Quiz: Expert Path - Cutting-edge AI",
    passingScore: 85,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the Transformer architecture?",
        options: [
          "A type of robot",
          "An attention-based network architecture",
          "A code compiler",
          "An operating system"
        ],
        correctAnswer: 1,
        explanation: "The Transformer architecture relies solely on attention mechanisms, revolutionizing NLP with models like BERT and GPT."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "What is BERT?",
        options: [
          "Bidirectional Encoder Representations from Transformers",
          "Basic Encoding and Retrieval Tool",
          "Binary Evaluation and Recognition Technology",
          "Behavioral Enhancement and Response Training"
        ],
        correctAnswer: 0,
        explanation: "BERT is a bidirectional language model based on the Transformer architecture, pre-trained on large text corpora."
      },
      {
        id: 3,
        type: "true-false",
        question: "GPT models use an autoregressive approach to generate text.",
        correctAnswer: true,
        explanation: "True. GPT generates text token by token, predicting the next word based on previous context."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What is fine-tuning?",
        options: [
          "Adjusting hyperparameters",
          "Adapting a pre-trained model to a specific task",
          "Optimizing server performance",
          "Cleaning training data"
        ],
        correctAnswer: 1,
        explanation: "Fine-tuning continues training a pre-trained model on data specific to a new task."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is federated learning?",
        options: [
          "Training models on distributed data without centralizing it",
          "Using multiple GPUs simultaneously",
          "Combining multiple algorithms",
          "Sharing models between companies"
        ],
        correctAnswer: 0,
        explanation: "Federated learning trains models on decentralized data while preserving privacy."
      },
      {
        id: 6,
        type: "true-false",
        question: "Diffusion models like DALL-E use a progressive denoising process.",
        correctAnswer: true,
        explanation: "True. Diffusion models learn to generate images by reversing a progressive noising process."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What is explainability in AI?",
        options: [
          "The ability to explain a model's decisions",
          "The execution speed of the model",
          "The accuracy of the model",
          "The size of the model"
        ],
        correctAnswer: 0,
        explanation: "Explainability (XAI) aims to make AI model decisions understandable and interpretable to humans."
      },
      {
        id: 8,
        type: "multiple-choice",
        question: "What is meta-learning?",
        options: [
          "Learning to learn",
          "Using metadata",
          "Optimizing metaparameters",
          "Analyzing metamodels"
        ],
        correctAnswer: 0,
        explanation: "Meta-learning (learning to learn) aims to develop algorithms that quickly adapt to new tasks."
      },
      {
        id: 9,
        type: "true-false",
        question: "Multimodal models can process text, images, and audio simultaneously.",
        correctAnswer: true,
        explanation: "True. Multimodal models like CLIP or GPT-4V can understand and generate content across multiple modalities."
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is neurosymbolic AI?",
        options: [
          "Combining neural learning and symbolic reasoning",
          "Using symbols in neural networks",
          "Creating artificial neurons",
          "Symbolizing training data"
        ],
        correctAnswer: 0,
        explanation: "Neurosymbolic AI combines the strengths of neural learning and logical symbolic reasoning."
      },
      {
        id: 11,
        type: "multiple-choice",
        question: "What is alignment in AI?",
        options: [
          "Aligning training data",
          "Ensuring AI acts according to human values",
          "Synchronizing multiple models",
          "Optimizing model architecture"
        ],
        correctAnswer: 1,
        explanation: "Alignment seeks to ensure AI systems act in accordance with human intentions and values."
      },
      {
        id: 12,
        type: "true-false",
        question: "LLMs (Large Language Models) can present biases found in their training data.",
        correctAnswer: true,
        explanation: "True. LLMs can reproduce and amplify societal biases present in their training data."
      },
      {
        id: 13,
        type: "multiple-choice",
        question: "What is causal inference in AI?",
        options: [
          "Identifying cause-and-effect relationships in data",
          "Speeding up inference calculations",
          "Reducing model latency",
          "Optimizing memory usage"
        ],
        correctAnswer: 0,
        explanation: "Causal inference aims to identify and quantify causal relationships beyond simple correlations."
      },
      {
        id: 14,
        type: "true-false",
        question: "Generative AI can create original content that did not exist in the training data.",
        correctAnswer: true,
        explanation: "True. Generative AI can create new content by combining and extrapolating from learned patterns."
      },
      {
        id: 15,
        type: "multiple-choice",
        question: "What is Bayesian optimization?",
        options: [
          "A method for hyperparameter optimization",
          "A type of Bayesian network",
          "A compression technique",
          "A sorting algorithm"
        ],
        correctAnswer: 0,
        explanation: "Bayesian optimization uses probabilistic models to efficiently optimize hyperparameters of complex models."
      }
    ]
  }
};

export default formationQuizDataEN;
