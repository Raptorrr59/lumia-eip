import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TranslationsDictionary from '../../Translations';
import { useLang } from "../../LangProvider";
import { Award, CheckCircle, Clock, BookOpen, Lock } from 'lucide-react';
import axios from 'axios';

const CourseModal = ({ formation, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [quizResults, setQuizResults] = useState({});
  const navigate = useNavigate();
  const selectedLang = useLang();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    loadCompletedCourses();
    loadQuizResults();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const loadQuizResults = () => {
    try {
      const results = JSON.parse(localStorage.getItem('formationQuizResults') || '{}');
      const userId = localStorage.getItem('userId') || 'anonymous';
      setQuizResults(results[userId] || {});
    } catch (error) {
      console.error('Error loading quiz results:', error);
    }
  };

  const loadCompletedCourses = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    
    if (userId && accessToken) {
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        const userProgress = response.data;
        const moduleProgress = userProgress.find(progress => progress.moduleId === formation.id);
        
        if (moduleProgress && moduleProgress.completedCourses) {
          setCompletedCourses(moduleProgress.completedCourses);
        }
      } catch (error) {
        console.error('Error loading completed courses:', error);
        // Fallback vers localStorage
        const completedCoursesData = JSON.parse(localStorage.getItem('completedCourses') || '{}');
        const userCompletedCourses = completedCoursesData[userId] || [];
        setCompletedCourses(userCompletedCourses);
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleStartCourse = () => {
    onClose();
    navigate(`/formation/${formation.id}`, { state: { formation } });
  };

  const handleCourseClick = (index) => {
    onClose();
    navigate(`/formation/${formation.id}`, { 
      state: { 
        formation,
        initialStep: index 
      } 
    });
  };

  const isCourseCompleted = (courseIndex) => {
    // Utiliser l'ID réel du cours au lieu de l'index
    const course = formation.content[courseIndex];
    return completedCourses.includes(course.id);
  };

  const getCompletionPercentage = () => {
    if (formation.content.length === 0) return 0;
    // Compter les cours réellement terminés
    const completedCount = formation.content.filter(course => 
      completedCourses.includes(course.id)
    ).length;
    return Math.round((completedCount / formation.content.length) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
         onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white dark:bg-[#121224] rounded-lg p-8 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (fixed) */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#6a3ff5]">
              {formation.name}
            </h2>
            {/* Barre de progression */}
            <div className="mt-2 flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {completedCourses.length}/{formation.content.length} {TranslationsDictionary[selectedLang]?.["courses"]}
              </span>
              <span className="text-sm font-bold text-[#5328EA] dark:text-[#6a3ff5]">
                {getCompletionPercentage()}%
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Course Info (fixed) */}
        <div className="flex items-center mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 mr-5 flex items-center justify-center">
            {!imageError ? (
              <img 
                src={formation.image} 
                alt={formation.name} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="text-[#5328EA] text-3xl font-bold">
                {formation.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">{TranslationsDictionary[selectedLang]?.["difficulty"]} :</span> {formation.difficulty}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-medium">{TranslationsDictionary[selectedLang]?.["statut"]} :</span> {formation.isFree ? `${TranslationsDictionary[selectedLang]?.["free"]}` : 'Premium'}
              {formation.locked ? ` • ${TranslationsDictionary[selectedLang]?.["locked"]}` : ''}
            </p>
            
            {/* Statistiques de completion */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{formation.content.filter(course => completedCourses.includes(course.id)).length} {TranslationsDictionary[selectedLang]?.["completed"]}</span>
              </div>
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{formation.content.length - formation.content.filter(course => completedCourses.includes(course.id)).length} {TranslationsDictionary[selectedLang]?.["remaining"]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="overflow-y-auto flex-1">
          <h3 className="text-xl font-semibold mb-4 text-[#5328EA] dark:text-[#6a3ff5] border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            {TranslationsDictionary[selectedLang]?.["parcours_content"]}
          </h3>
          <ul className="space-y-4 pr-2">
            {formation.content.map((course, index) => {
              const isCompleted = isCourseCompleted(index);
              
              // Determine if locked based on previous quizzes
              let isLocked = false;
              for (let i = 0; i < index; i++) {
                const prevItem = formation.content[i];
                if (prevItem.type === 'quiz') {
                  const quizId = prevItem.id || formation.id;
                  // If a previous quiz is not passed, this content is locked
                  if (!quizResults[quizId]?.passed) {
                    isLocked = true;
                    break;
                  }
                }
              }

              return (
                <li 
                  key={index} 
                  className={`relative border-l-4 pl-4 py-3 rounded-r-md transition-all duration-300 transform ${
                    isLocked 
                      ? 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 opacity-60 cursor-not-allowed'
                      : (isCompleted 
                          ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-md cursor-pointer hover:scale-[1.02]' 
                          : 'border-[#5328EA] dark:border-[#6a3ff5] bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:scale-[1.02]')
                  }`}
                  onClick={() => !isLocked && handleCourseClick(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className={`font-semibold ${
                          isLocked
                            ? 'text-gray-500 dark:text-gray-500'
                            : (isCompleted 
                                ? 'text-green-800 dark:text-green-200' 
                                : 'text-gray-800 dark:text-white')
                        }`}>
                          {course.type === 'quiz' ? `🏆 ${course.title || course.name}` : course.name}
                        </p>
                        {isCompleted && !isLocked && (
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
                              <Award className="w-3 h-3" />
                              <span>{TranslationsDictionary[selectedLang]?.["completed"]}</span>
                            </div>
                          </div>
                        )}
                        {isLocked && (
                          <div className="flex items-center">
                            <div className="bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-1 text-xs font-bold rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>{TranslationsDictionary[selectedLang]?.["locked"] || "Verrouillé"}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${
                        isLocked
                          ? 'text-gray-400 dark:text-gray-600'
                          : (isCompleted 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-gray-600 dark:text-gray-400')
                      }`}>
                        {course.language} {course.difficulty ? `• ${course.difficulty}` : ''} {course.duree ? `• ${course.duree}` : ''}
                      </p>
                    </div>
                    
                    {/* Icône de statut - CENTRAGE VERTICAL ET DÉCALAGE GAUCHE */}
                    <div className="ml-4 mr-2 flex-shrink-0 flex items-center justify-center h-full">
                      {isLocked ? (
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </div>
                      ) : isCompleted ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none">{index + 1}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Effet de brillance pour les cours terminés - ANIMATION LIMITÉE */}
                  {isCompleted && !isLocked && (
                    <div className="absolute inset-0 overflow-hidden rounded-r-md">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Modal Footer (fixed) */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            {/* Résumé de progression */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              {getCompletionPercentage() === 100 && (
                <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{TranslationsDictionary[selectedLang]?.["training_complete"]}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
              >
                {TranslationsDictionary[selectedLang]?.["close"]}
              </button>
              {!formation.locked && (
                <button
                  onClick={handleStartCourse}
                  className="px-5 py-2.5 bg-[#5328EA] text-white rounded-md hover:bg-[#4320c0] transition-colors shadow-md flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {getCompletionPercentage() === 0 
                      ? TranslationsDictionary[selectedLang]?.["parcours_begin"] 
                      : "Continuer la formation"
                    }
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

CourseModal.propTypes = {
  formation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    difficulty: PropTypes.string,
    image: PropTypes.string,
    isFree: PropTypes.bool,
    locked: PropTypes.bool,
    content: PropTypes.array.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CourseModal;