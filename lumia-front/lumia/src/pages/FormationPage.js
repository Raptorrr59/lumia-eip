import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import ReviewsCommunity from '../components/review/ReviewsCommunity';
import FormationQuiz from '../components/FormationQuiz';
import axios from 'axios';
import { Lock } from 'lucide-react';


const FormationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedLang = useLang();
  const [formation, setFormation] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState({});

  const loadQuizResults = () => {
    try {
      const results = JSON.parse(localStorage.getItem('formationQuizResults') || '{}');
      const userId = localStorage.getItem('userId') || 'anonymous';
      setQuizResults(results[userId] || {});
    } catch (error) {
      console.error('Error loading quiz results:', error);
    }
  };

  useEffect(() => {
    if (location.state?.formation) {
      setFormation(location.state.formation);
      
      if (location.state.initialStep !== undefined) {
        setActiveStep(location.state.initialStep);
      }
    } else {
      navigate('/courses');
    }
    loadQuizResults();
  }, [id, location.state, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    loadQuizResults();
  }, [activeStep]);

  useEffect(() => {
    if (showQuiz) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showQuiz]);

  const handleNextStep = async () => {
    const currentCourse = formation.content[activeStep];
    
    if (currentCourse.type !== 'quiz') {
      const userId = localStorage.getItem('id');
      const accessToken = localStorage.getItem('accessToken');
      
      if (userId && accessToken) {
        try {
          // Marquer le cours actuel comme terminé en utilisant son vrai ID
          await axios.post('/api/complete-course', null, {
            params: {
              userId: userId,
              courseId: currentCourse.id, // Utiliser l'ID réel du cours
              moduleId: Number(id)
            },
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          });
          
          console.log('Course completed successfully:', currentCourse.name);
        } catch (error) {
          console.error('Error completing course:', error);
        }
      }
    }
      
    if (activeStep < formation.content.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleCompleteModule();
    }
  };

  const handleCompleteModule = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    
    if (userId && accessToken) {
      try {
        // Marquer le dernier cours comme terminé
        const currentCourse = formation.content[activeStep];
        
        await axios.post('/api/complete-course', null, {
          params: {
            userId: userId,
            courseId: currentCourse.id,
            moduleId: Number(id)
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        console.log('Module completed successfully');
      } catch (error) {
        console.error('Error completing module:', error);
      }
    }
    navigate('/courses');
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, passed) => {
    setQuizCompleted(true);
    if (passed) {
      // Si le quiz est réussi, terminer la formation
      handleCompleteModule();
    }
  };

  const handleRetryFormation = () => {
    // Retourner au premier cours de la formation
    setActiveStep(0);
    setShowQuiz(false);
    setQuizCompleted(false);
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  if (!formation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5328EA]"></div>
      </div>
    );
  }

  // Ajouter la logique du quiz ici, AVANT le return principal
  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowQuiz(false)}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ← {TranslationsDictionary[selectedLang]?.['back']}
              </button>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              {TranslationsDictionary[selectedLang]?.['formation_final_quiz']}
            </h1>
            
            <FormationQuiz 
              formationId={formation.id}
              onQuizComplete={handleQuizComplete}
            />
            
            {quizCompleted && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleRetryFormation}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {TranslationsDictionary[selectedLang]?.['retry_formation']}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentCourse = formation.content[activeStep];

  return (
    <div className="min-h-screen bg-white dark:bg-[#010116] pt-20 pb-12">
      {/* Header */}
      <div className="lg:px-[150px] md:px-[75px] px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center text-[#5328EA] mb-4 hover:text-[#4320c0] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {TranslationsDictionary[selectedLang]?.["back_to_courses"]}
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-[#010116] dark:text-white"
          >
            {formation.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 mt-2"
          >
            {TranslationsDictionary[selectedLang]?.["difficulty"]}: {formation.difficulty}
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((activeStep + 1) / formation.content.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#5328EA] h-2.5 rounded-full"
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {TranslationsDictionary[selectedLang]?.["step"]} {activeStep + 1}/{formation.content.length}
            </motion.span>
            <motion.span
              key={activeStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentCourse.name}
            </motion.span>
          </div>
        </motion.div>

        {/* Main content with permanent sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Table of Contents Sidebar - Now permanent */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="md:w-64 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 md:mb-8 md:sticky md:top-24 md:self-start"
          >
            <h3 className="font-bold text-lg text-[#5328EA] mb-4">{TranslationsDictionary[selectedLang]?.["index"]}</h3>
            <ul className="space-y-2">
              {formation.content.map((course, index) => {
                // Determine if locked based on previous quizzes
                let isLocked = false;
                for (let i = 0; i < index; i++) {
                  const prevItem = formation.content[i];
                  if (prevItem.type === 'quiz') {
                    const quizId = prevItem.id || formation.id;
                    if (!quizResults[quizId]?.passed) {
                      isLocked = true;
                      break;
                    }
                  }
                }

                return (
                <React.Fragment key={index}>
                  <motion.li 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <button
                      onClick={() => !isLocked && setActiveStep(index)}
                      disabled={isLocked}
                      className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-[#5328EA]/10 text-[#5328EA] font-medium'
                          : (isLocked
                              ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700')
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`min-w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium mr-3 transition-all duration-300 ${
                          activeStep === index 
                            ? 'bg-[#5328EA] text-white shadow-sm' 
                            : (isLocked
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400')
                        }`}>
                          {isLocked ? <Lock className="w-3 h-3" /> : (course.type === 'quiz' ? '🏆' : index + 1)}
                        </span>
                        <span className={`truncate ${course.type === 'quiz' ? 'font-bold' : ''}`}>
                          {course.type === 'quiz' ? (course.title || course.name) : course.name}
                        </span>
                      </div>
                    </button>
                  </motion.li>
                  {course.type === 'quiz' && (
                    <hr className="my-2 border-gray-300 dark:border-gray-600 border-dashed" />
                  )}
                </React.Fragment>
              )})}
            </ul>
          </motion.div>
          
          {/* Course content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, type: "spring", damping: 25 }}
            className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-[#5328EA] mb-4"
            >
              {currentCourse.name}
            </motion.h2>
            
            {currentCourse.type === 'quiz' ? (
              <div className="mt-8">
                <FormationQuiz 
                  formationId={formation.id}
                  quizData={currentCourse}
                  onFormationComplete={handleNextStep}
                  onQuizComplete={(score, passed) => {
                    if (passed) loadQuizResults();
                  }}
                />
              </div>
            ) : (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {currentCourse.language}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {currentCourse.difficulty}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                    {currentCourse.duree}
                  </span>
                </motion.div>
                
                {/* Render course content - this assumes HTML content */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: currentCourse.content }}
                />
                
                {/* Navigation buttons moved inside content area */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <motion.button
                    whileHover={{ scale: activeStep === 0 ? 1 : 1.05 }}
                    whileTap={{ scale: activeStep === 0 ? 1 : 0.95 }}
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    className={`px-5 py-2.5 rounded-md transition-colors ${
                      activeStep === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                    }`}
                  >
                    {TranslationsDictionary[selectedLang]?.["previous"]}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className={`px-5 py-2.5 rounded-md transition-colors ${
                      activeStep === formation.content.length - 1
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                        : 'bg-[#5328EA] text-white hover:bg-[#4320c0] shadow-md'
                    }`}
                  >
                    {activeStep === formation.content.length - 1 
                      ? (TranslationsDictionary[selectedLang]?.["finish"] || "Terminer")
                      : TranslationsDictionary[selectedLang]?.["next"]
                    }
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <ReviewsCommunity moduleId={id + 1} courseId={0} />
        </motion.div> 
      </div>
    </div>
  );
};

export default FormationPage;