import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';

export const NotFoundPage = ({ title, content }) => {
  const selectedLang = useLang();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#010116] text-gray-900 dark:text-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#5328EA] to-[#7855E6] bg-clip-text text-transparent">
            {TranslationsDictionary[selectedLang]?.['error_404'] || '404'}
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-[#1a1a2e] shadow-2xl rounded-3xl overflow-hidden p-8 md:p-12"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {TranslationsDictionary[selectedLang]?.['page_not_found_title'] || 'Page Not Found'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                {TranslationsDictionary[selectedLang]?.['page_not_found_subtitle'] || "Oops! The page you're looking for doesn't exist."}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {TranslationsDictionary[selectedLang]?.['page_not_found_description'] || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
              </p>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center my-8"
            >
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-[#5328EA] to-[#7855E6] rounded-full flex items-center justify-center">
                  <Search size={64} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/"
                className="flex items-center gap-2 bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Home size={20} />
                {TranslationsDictionary[selectedLang]?.['back_to_home'] || 'Back to Home'}
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft size={20} />
                {selectedLang === 'FR' ? 'Retour' : 'Go Back'}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-[#5328EA] to-[#7855E6] rounded-full opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-[#7855E6] to-[#5328EA] rounded-full opacity-20"
        />
      </motion.div>
    </div>
  );
};