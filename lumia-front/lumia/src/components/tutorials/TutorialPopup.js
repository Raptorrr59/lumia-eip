import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TranslationsDictionary from '../../Translations';
import { useLang } from '../../LangProvider';

const TutorialPopup = ({ isOpen, onClose, tutorialPages, initial, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(initial ? 'initial' : 'tutorial'); // 'initial', 'tutorial', 'declined'
  const [currentPage, setCurrentPage] = useState(0);
  const selectedLang = useLang();

  const handleClose = () => {
    localStorage.setItem('tutoAsk', 'false');
    onClose();
  };

  const handleYes = () => {
    setCurrentStep('tutorial');
    localStorage.setItem('tutoCourses', 'true');
    localStorage.setItem('tutoGames', 'true');
    localStorage.setItem('tutoGameNoTrain', 'true');
    localStorage.setItem('tutoGameTrain', 'true');
    localStorage.setItem('tutoEvents', 'true');
    localStorage.setItem('tutoLeaderboard', 'true');
    localStorage.setItem('tutoShop', 'true');
  };

  const handleNo = () => {
    setCurrentStep('declined');
  };

  const handleNext = () => {
    if (currentPage < tutorialPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentStep('initial');
    }
  };

  const renderInitialStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl w-[520px] h-[200px] mx-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-8">
        {TranslationsDictionary[selectedLang].tuto_ask}
      </h2>
      
      <div className="flex gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYes}
          className="px-8 py-3 bg-[#5328EA] text-white font-semibold rounded-xl hover:bg-[#7855E6] transition-colors"
        >
          {TranslationsDictionary[selectedLang].tuto_yes}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNo}
          className="px-8 py-3 border-2 border-[#5328EA] text-[#5328EA] font-semibold rounded-xl hover:bg-[#5328EA] hover:text-white transition-colors"
        >
          {TranslationsDictionary[selectedLang].tuto_no}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderDeclinedStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl w-[520px] h-[200px] mx-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
        {TranslationsDictionary[selectedLang].tuto_decline}
      </h2>
      
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
          className="px-8 py-3 bg-[#5328EA] text-white font-semibold rounded-xl hover:bg-[#7855E6] transition-colors"
        >
          {TranslationsDictionary[selectedLang].tuto_close}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderTutorialStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl w-[720px] h-[700px] mx-4 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {tutorialPages[currentPage].title}
      </h2>
      
      {/* Vertically centered content (image + description) */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <img
            src={tutorialPages[currentPage].image}
            alt={tutorialPages[currentPage].description}
            className="w-[480px] h-[360px] object-cover rounded-xl mx-auto mb-3 shadow-lg"
        />
        <p className="text-base text-gray-600 dark:text-gray-300 text-center">
            {tutorialPages[currentPage].description}
        </p>
      </div>
      
      {/* Navigation row pinned to bottom */}
      <div className="mt-auto flex items-center justify-between pt-6">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 border-2 border-[#5328EA] text-[#5328EA] font-semibold rounded-xl hover:bg-[#5328EA] hover:text-white transition-colors"
        >
            <ChevronLeft className="w-4 h-4" />
            {TranslationsDictionary[selectedLang].back}
        </motion.button>
        
        <div className="flex justify-center space-x-2">
            {tutorialPages.map((_, index) => (
                <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentPage 
                            ? 'bg-[#5328EA]' 
                            : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                />
            ))}
        </div>
        
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-[#5328EA] text-white font-semibold rounded-xl hover:bg-[#7855E6] transition-colors"
        >
            {currentPage === tutorialPages.length - 1 ? TranslationsDictionary[selectedLang].end : TranslationsDictionary[selectedLang].next}
            {currentPage !== tutorialPages.length - 1 && <ChevronRight className="w-4 h-4" />}
        </motion.button>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop with blur and dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={currentStep === 'initial' ? handleClose : undefined}
        />

        {/* Popup content */}
        <div className="relative z-10">
          {currentStep === 'initial' && renderInitialStep()}
          {currentStep === 'declined' && renderDeclinedStep()}
          {currentStep === 'tutorial' && renderTutorialStep()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialPopup;
