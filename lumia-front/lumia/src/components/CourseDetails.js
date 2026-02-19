import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesDataFr } from '../utils/CoursesDataFR';
import StyledCourseContent from './StyledCourseContent';
import { useLang } from "../LangProvider";
import ReviewsCommunity from './review/ReviewsCommunity';
import { createRoot } from 'react-dom/client';
import {formationsData} from '../pages/Courses';
import PythonRunner from '../components/PythonRunner';
import axios from 'axios';
import TranslationsDictionary from '../Translations';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = coursesDataFr.find(c => c.id === parseInt(courseId));
  const selectedLang = useLang();
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);

  // Check if course is completed on component mount
  useEffect(() => {
    const checkCourseCompletion = async () => {
      const userId = localStorage.getItem('id');
      const accessToken = localStorage.getItem('accessToken');
      
      if (userId && accessToken) {
        try {
          const response = await axios.get(`/api/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          
          // Chercher si ce cours est complété dans les données utilisateur
          const userProgress = response.data;
          let courseCompleted = false;
          
          userProgress.forEach(progress => {
            if (progress.completedCourses && progress.completedCourses.includes(parseInt(courseId))) {
              courseCompleted = true;
            }
          });
          
          setIsCompleted(courseCompleted);
        } catch (error) {
          console.error('Error checking course completion:', error);
          // Fallback vers localStorage si l'API échoue
          const userId = localStorage.getItem('id');
          const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
          const isCompleted = completedCourses[userId]?.includes(parseInt(courseId)) || false;
          setIsCompleted(isCompleted);
        }
      }
    };
    
    checkCourseCompletion();
  }, [courseId]);

  const handleCompleteCourse = async () => {
    const userId = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    
    if (userId && accessToken) {
      try {
        // Use URL parameters instead of JSON body to match backend expectations
        await axios.post('/api/complete-course', null, {
          params: {
            userId: userId,
            courseId: parseInt(courseId),
            moduleId: 0
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        setIsCompleted(true);
        setShowCompletionAnimation(true);
        console.log('Course marked as completed');
        
        // Hide animation after 3 seconds and redirect
        setTimeout(() => {
          setShowCompletionAnimation(false);
          setTimeout(() => {
            navigate('/courses');
          }, 500);
        }, 3000);
      } catch (error) {
        console.error('Error completing course:', error);
        // Fallback vers localStorage si l'API échoue
        const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
        if (!completedCourses[userId]) {
          completedCourses[userId] = [];
        }
        completedCourses[userId].push(parseInt(courseId));
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
        
        setIsCompleted(true);
        console.log('Course completed successfully (localStorage fallback)');
        
        setTimeout(() => {
          navigate('/courses');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById('python-interpreter-root');
    if (container) {
      const root = createRoot(container);
      root.render(<PythonRunner />);
    }
  }, []);

  if (!course) {
    return <p>{TranslationsDictionary[selectedLang]?.["course_not_found"] || "Course not found"}</p>;
  }

  return (
    <>
    <div className="min-h-screen lg:px-[150px] md:px-[75px] py-10 dark:bg-[#010116] dark:text-white relative">
      {/* Completion Animation Overlay */}
      {showCompletionAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4 transform animate-scaleIn">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                🎉 {TranslationsDictionary[selectedLang]?.["congralutations"]}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {TranslationsDictionary[selectedLang]?.["you_succeed_course"]} <span className="font-semibold text-[#5328EA]">{course.name}</span>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {TranslationsDictionary[selectedLang]?.["progression_saved"]}
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-[40px] font-bold">{course.name}</h1>
      <p className="mt-2 text-[18px]">
        {course.language} • {course.difficulty}
      </p>

      {/* Course Status Banner */}
      {isCompleted && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">{TranslationsDictionary[selectedLang]?.["course_finished"]}</h3>
                <p className="text-sm text-green-600 dark:text-green-300">{TranslationsDictionary[selectedLang]?.["congratulations_course"]}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl">🏆</div>
              <p className="text-xs text-green-600 dark:text-green-300 mt-1">{TranslationsDictionary[selectedLang]?.["succeed"]}</p>
            </div>
          </div>
        </div>
      )}

      <img
        src={course.image}
        alt={course.name}
        className={`w-full h-[300px] object-cover mt-4 rounded ${isCompleted ? 'ring-4 ring-green-400 ring-opacity-50' : ''}`} />

      {course.content ? (
        <StyledCourseContent html={course.content} />
      ) : (
        <p>{course.content}</p>
      )}
    </div>
      <div className="mt-4 max-w-6xl mx-auto text-center">
        <ReviewsCommunity moduleId={course.id} courseId={0} />
      </div>
    </>
  );
};

export default CourseDetails;
