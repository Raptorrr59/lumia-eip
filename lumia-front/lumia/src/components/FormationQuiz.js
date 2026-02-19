import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formationQuizDataFR } from './FormationQuizDataFR';
import { formationQuizDataEN } from './FormationQuizDataEN';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';

const FormationQuiz = ({ formationId, quizData, onQuizComplete, onFormationComplete }) => {
  const selectedLang = useLang();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const source = selectedLang === 'FR' ? formationQuizDataFR : formationQuizDataEN;
    const baseQuiz = quizData || source[formationId];
    if (baseQuiz) {
      // Shuffle questions
      let shuffledQuestions = shuffleArray(baseQuiz.questions);
      
      // If maxQuestions is defined, slice the array
      if (baseQuiz.maxQuestions && baseQuiz.maxQuestions > 0) {
        shuffledQuestions = shuffledQuestions.slice(0, baseQuiz.maxQuestions);
      }

      const shuffledQuiz = {
        ...baseQuiz,
        questions: shuffledQuestions
      };
      setQuiz(shuffledQuiz);
    }
  }, [formationId, quizData]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
    // Reset correction view when changing selection
    setShowCorrection(false);
  };

  const getCorrectIndex = (question) => {
    if (question.type === 'true-false') {
      return question.correctAnswer ? 0 : 1; // 0: Vrai, 1: Faux
    }
    return question.correctAnswer;
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      if (question.type === 'true-false') {
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
    const quizResults = JSON.parse(localStorage.getItem('formationQuizResults') || '{}');
    const userId = localStorage.getItem('userId') || 'anonymous';
    
    if (!quizResults[userId]) {
      quizResults[userId] = {};
    }
    
    const resultKey = quiz.id || formationId;
    
    quizResults[userId][resultKey] = {
      score: finalScore,
      passed: finalScore >= quiz.passingScore,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('formationQuizResults', JSON.stringify(quizResults));

    // Marquer la formation comme terminée si score suffisant ET c'est le quiz final (pas un checkpoint)
    if (finalScore >= quiz.passingScore && !quiz.id?.startsWith('checkpoint')) {
      const completionData = JSON.parse(localStorage.getItem('formationCompletion') || '{}');
      if (!completionData[userId]) {
        completionData[userId] = { formations: [] };
      }
      if (!completionData[userId].formations.includes(formationId)) {
        completionData[userId].formations.push(formationId);
      }
      localStorage.setItem('formationCompletion', JSON.stringify(completionData));
    }

    if (onQuizComplete) {
      onQuizComplete(finalScore, finalScore >= quiz.passingScore);
    }
  };

  const isCurrentQuestionAnswered = () => {
    return selectedAnswers[currentQuestion] !== undefined;
  };

  if (!quiz) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          {TranslationsDictionary[selectedLang]?.['no_quiz_available'] || 'Aucun quiz disponible pour cette formation.'}
        </p>
      </div>
    );
  }

  const renderQuestion = (question, questionIndex) => {
    const correctIndex = getCorrectIndex(question);
    if (question.type === 'true-false') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {question.question}
          </h3>
          <div className="space-y-2">
            {['Vrai', 'Faux'].map((option, index) => (
              <button
                key={index}
                onClick={() => { if (showCorrection) return; handleAnswerSelect(questionIndex, index); }}
                disabled={showCorrection}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showCorrection
                    ? (index === correctIndex
                        ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                        : 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300')
                    : (selectedAnswers[questionIndex] === index
                        ? 'border-[#5328EA] bg-[#5328EA]/10 text-[#5328EA]'
                        : 'border-gray-200 dark:border-gray-700 hover:border-[#5328EA]/50')
                } ${showCorrection ? 'cursor-not-allowed' : ''}`}
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
              onClick={() => { if (showCorrection) return; handleAnswerSelect(questionIndex, index); }}
              disabled={showCorrection}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                showCorrection
                  ? (index === correctIndex
                      ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300')
                  : (selectedAnswers[questionIndex] === index
                      ? 'border-[#5328EA] bg-[#5328EA]/10 text-[#5328EA]'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#5328EA]/50')
              } ${showCorrection ? 'cursor-not-allowed' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {quiz.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {TranslationsDictionary[selectedLang]?.['formation_quiz_description1'] + ` ${quiz.questions.length} ` + TranslationsDictionary[selectedLang]?.['formation_quiz_description2'] || 
            `Ce quiz contient ${quiz.questions.length} questions pour valider vos connaissances sur cette formation.`}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-4 text-sm text-blue-800 dark:text-blue-200">
              <span>📊 {quiz.questions.length} questions</span>
              <span>⏱️ ~{Math.ceil(quiz.questions.length * 1.5)} minutes</span>
              <span>🎯 {quiz.passingScore}% requis</span>
            </div>
          </div>
          <button
            onClick={() => { setQuizStarted(true); setShowCorrection(false); }}
            className="bg-[#5328EA] text-white px-8 py-3 rounded-lg hover:bg-[#5328EA]/90 transition-colors font-semibold"
          >
            {TranslationsDictionary[selectedLang]?.['start_quiz'] || 'Commencer le quiz'}
          </button>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center"
      >
        <div className="text-6xl mb-4">
          {score >= quiz.passingScore ? '🎉' : '📚'}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {TranslationsDictionary[selectedLang]?.['quiz_completed'] || 'Quiz terminé !'}
        </h2>
        <div className="text-4xl font-bold mb-4">
          <span className={score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'}>
            {TranslationsDictionary[selectedLang]?.['quiz_valid'] + ":\n" || 'Validé à'} {score}%
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {score >= quiz.passingScore
            ? (TranslationsDictionary[selectedLang]?.['formation_validated'] || 'Formation validée ! Félicitations !')
            : (TranslationsDictionary[selectedLang]?.['formation_not_validated1'] + ` ${quiz.passingScore}` + TranslationsDictionary[selectedLang]?.['formation_not_validated2'] || `Il vous faut ${quiz.passingScore}% pour valider cette formation.`)}
        </p>

        {score >= quiz.passingScore ? (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-green-700 dark:text-green-300">
              🎓 {TranslationsDictionary[selectedLang]?.['formation_completed'] || 'Formation terminée avec succès !'}
            </p>
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <p className="text-red-700 dark:text-red-300">
              📖 {TranslationsDictionary[selectedLang]?.['recommend_review'] || 'Nous recommandons de revoir les cours de cette formation.'}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center mt-6">
          {score >= quiz.passingScore && onFormationComplete && (
            <button
              onClick={onFormationComplete}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {TranslationsDictionary[selectedLang]?.['continue'] || 'Continuer'}
            </button>
          )}
          <button
            onClick={() => {
              setShowResults(false);
              setQuizStarted(false);
              setCurrentQuestion(0);
              setSelectedAnswers({});
              setShowCorrection(false);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {TranslationsDictionary[selectedLang]?.['retry'] || 'Recommencer'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.['question'] || 'Question'} {currentQuestion + 1} {TranslationsDictionary[selectedLang]?.['of'] || 'sur'} {quiz.questions.length}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-[#5328EA] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderQuestion(quiz.questions[currentQuestion], currentQuestion)}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        {currentQuestion > 0 && (
          <button
            onClick={() => { setCurrentQuestion(currentQuestion - 1); setShowCorrection(false); }}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {TranslationsDictionary[selectedLang]?.['previous'] || 'Précédent'}
          </button>
        )}
        
        <div className="flex-1"></div>
        
        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={() => {
              if (!isCurrentQuestionAnswered()) return;
              if (!showCorrection) { setShowCorrection(true); return; }
              setCurrentQuestion(currentQuestion + 1);
              setShowCorrection(false);
            }}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isCurrentQuestionAnswered()
                ? 'bg-[#5328EA] text-white hover:bg-[#5328EA]/90'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.['next'] || 'Suivant'}
          </button>
        ) : (
          <button
            onClick={() => {
              if (!isCurrentQuestionAnswered()) return;
              if (!showCorrection) { setShowCorrection(true); return; }
              submitQuiz();
            }}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isCurrentQuestionAnswered()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {TranslationsDictionary[selectedLang]?.['submit_quiz'] || 'Terminer le quiz'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FormationQuiz;
