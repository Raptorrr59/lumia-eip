import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizDataFR } from '../utils/QuizDataFR';
import { quizDataEN } from '../utils/QuizDataEN';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';

const Quiz = ({ courseId, onQuizComplete, onCourseComplete }) => {
  const selectedLang = useLang();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [codeAnswers, setCodeAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Fonction pour mélanger un tableau de manière aléatoire (algorithme Fisher-Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const source = selectedLang === 'FR' ? quizDataFR : quizDataEN;
    const courseQuiz = source[courseId];
    if (courseQuiz) {
      // Créer une copie du quiz avec les questions mélangées
      const shuffledQuiz = {
        ...courseQuiz,
        questions: shuffleArray(courseQuiz.questions)
      };
      setQuiz(shuffledQuiz);
      
      // Initialiser les réponses de code
      const initialCodeAnswers = {};
      shuffledQuiz.questions.forEach((question, index) => {
        if (question.type === 'code') {
          initialCodeAnswers[index] = question.initialCode || '';
        }
      });
      setCodeAnswers(initialCodeAnswers);
    }
  }, [courseId]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleCodeChange = (questionIndex, code) => {
    setCodeAnswers({
      ...codeAnswers,
      [questionIndex]: code
    });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      if (question.type === 'code') {
        // Pour les questions de code, vérification simple
        const userCode = codeAnswers[index] || '';
        const correctCode = question.correctAnswer;
        if (userCode.trim().toLowerCase().includes(correctCode.toLowerCase().trim())) {
          correctAnswers++;
        }
      } else if (question.type === 'true-false') {
        if (selectedAnswers[index] === (question.correctAnswer ? 0 : 1)) {
          correctAnswers++;
        }
      } else {
        // Multiple choice
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const submitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);

    // Sauvegarder le résultat
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    const userId = localStorage.getItem('userId') || 'anonymous';
    
    if (!quizResults[userId]) {
      quizResults[userId] = {};
    }
    
    quizResults[userId][courseId] = {
      score: finalScore,
      passed: finalScore >= quiz.passingScore,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    // Marquer le cours comme terminé si score >= 80%
    if (finalScore >= quiz.passingScore) {
      const completionData = JSON.parse(localStorage.getItem('courseCompletion') || '{}');
      if (!completionData[userId]) {
        completionData[userId] = { courses: [] };
      }
      if (!completionData[userId].courses.includes(courseId)) {
        completionData[userId].courses.push(courseId);
      }
      localStorage.setItem('courseCompletion', JSON.stringify(completionData));
    }

    if (onQuizComplete) {
      onQuizComplete(finalScore, finalScore >= quiz.passingScore);
    }
  };

  // ✅ Ajouter cette fonction ici, après submitQuiz
  const isCurrentQuestionAnswered = () => {
    const currentQuestionData = quiz.questions[currentQuestion];
    
    if (currentQuestionData.type === 'code') {
      // Pour les questions de code, vérifier qu'il y a du contenu
      return (codeAnswers[currentQuestion] || '').trim().length > 0;
    } else {
      // Pour les questions à choix multiples et vrai/faux
      return selectedAnswers[currentQuestion] !== undefined;
    }
  };

  const renderQuestion = (question, questionIndex) => {
    if (question.type === 'code') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {question.question}
          </h3>
          <div className="bg-gray-900 rounded-lg p-4">
            <textarea
              className="w-full h-32 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none"
              value={codeAnswers[questionIndex] || ''}
              onChange={(e) => handleCodeChange(questionIndex, e.target.value)}
              placeholder={TranslationsDictionary[selectedLang]?.['write_code_here']}
            />
          </div>
        </div>
      );
    }

    if (question.type === 'true-false') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {question.question}
          </h3>
          <div className="space-y-2">
            {[TranslationsDictionary[selectedLang]?.['true'], TranslationsDictionary[selectedLang]?.['false']].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(questionIndex, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[questionIndex] === index
                    ? 'border-[#5328EA] bg-[#5328EA]/10 text-[#5328EA]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#5328EA]/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Multiple choice
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {question.question}
        </h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(questionIndex, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[questionIndex] === index
                  ? 'border-[#5328EA] bg-[#5328EA]/10 text-[#5328EA]'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#5328EA]/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!quiz) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          {TranslationsDictionary[selectedLang]?.['no_quiz_available']}
        </p>
        <div className="mt-4">
          <button
            onClick={() => onCourseComplete && onCourseComplete()}
            className="bg-[#5328EA] text-white px-6 py-2 rounded-lg hover:bg-[#4320c0] transition-colors"
          >
            {TranslationsDictionary[selectedLang]?.['finish_course']}
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div className="text-center space-y-6">
          <div className={`text-6xl ${score >= quiz.passingScore ? 'text-green-500' : 'text-red-500'}`}>
            {score >= quiz.passingScore ? '🎉' : '📚'}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {score >= quiz.passingScore ? TranslationsDictionary[selectedLang]?.['congratulations'] : TranslationsDictionary[selectedLang]?.['keep_trying']}
          </h2>
          
          <div className="space-y-2">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {TranslationsDictionary[selectedLang]?.['your_score']} <span className="font-bold text-[#5328EA]">{score}%</span>
            </p>
            <p className="text-sm text-gray-500">
              {TranslationsDictionary[selectedLang]?.['required_score']} {quiz.passingScore}%
            </p>
          </div>

          {score >= quiz.passingScore ? (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-green-700 dark:text-green-300">
                🎓 {TranslationsDictionary[selectedLang]?.['course_validated']}
              </p>
            </div>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-red-700 dark:text-red-300">
                📖 {TranslationsDictionary[selectedLang]?.['recommend_reread']}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {score >= quiz.passingScore && onCourseComplete && (
              <button
                onClick={onCourseComplete}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{TranslationsDictionary[selectedLang]?.['mark_as_completed']}</span>
              </button>
            )}
            
            <button
              onClick={() => {
                // Remonter en haut de la page pour relire le cours
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>{TranslationsDictionary[selectedLang]?.['reread_course']}</span>
            </button>
            
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setCodeAnswers({});
                setQuizStarted(false);
              }}
              className="px-6 py-3 bg-[#5328EA] text-white rounded-lg hover:bg-[#5328EA]/90 transition-colors"
            >
              {TranslationsDictionary[selectedLang]?.['retake_quiz']}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div className="text-center space-y-6">
          <div className="text-4xl">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {quiz.title}
          </h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>📊 {quiz.questions.length} {TranslationsDictionary[selectedLang]?.['question']}s</p>
            <p>⏱️ {TranslationsDictionary[selectedLang]?.['no_time_limit']}</p>
            <p>🎯 {TranslationsDictionary[selectedLang]?.['required_score_label']} {quiz.passingScore}%</p>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="px-8 py-3 bg-[#5328EA] text-white rounded-lg hover:bg-[#5328EA]/90 transition-colors font-semibold"
          >
            {TranslationsDictionary[selectedLang]?.['start_quiz']}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.['question']} {currentQuestion + 1} {TranslationsDictionary[selectedLang]?.['of']} {quiz.questions.length}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-[#5328EA] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          {renderQuestion(quiz.questions[currentQuestion], currentQuestion)}
        </motion.div>
      </AnimatePresence>

      {/* Navigation - supprimer la définition de fonction d'ici */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {TranslationsDictionary[selectedLang]?.['previous']}
        </button>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isCurrentQuestionAnswered()
                ? 'bg-[#5328EA] text-white hover:bg-[#5328EA]/90'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.['finish_quiz']}
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isCurrentQuestionAnswered()
                ? 'bg-[#5328EA] text-white hover:bg-[#5328EA]/90'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.['next']}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;
