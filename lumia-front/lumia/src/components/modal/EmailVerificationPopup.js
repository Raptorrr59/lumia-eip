import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';
import axios from 'axios';

const EmailVerificationPopup = ({ isOpen, onClose }) => {
  const selectedLang = useLang();
  const [isEmailButtonDisabled, setIsEmailButtonDisabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const sendMailFunc = async () => {
    setIsEmailButtonDisabled(true);
    setCountdown(60);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsEmailButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    try {
      const response = await axios.post(`/api/newEmailValidation`, {
        params: {
          userId: localStorage.getItem("id"),
        },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Ferme la popup après avoir affiché le message de succès
      }, 2000); // Réduit le délai à 2 secondes pour une meilleure UX
    } catch(error) {
      console.log(error.response);
      clearInterval(timer);
      setIsEmailButtonDisabled(false);
      setCountdown(0);
    }
  };

  // Auto-hide after 10 seconds if no interaction
  useEffect(() => {
    if (isOpen && !showSuccess) {
      const autoHideTimer = setTimeout(() => {
        onClose();
      }, 10000);
      
      return () => clearTimeout(autoHideTimer);
    }
  }, [isOpen, showSuccess, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.8 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
          className="fixed bottom-4 right-4 z-50 w-64 max-w-[calc(100vw-2rem)]"
        >
          <div className="bg-white dark:bg-[#1A1A2E] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header compact */}
            <div className="bg-gradient-to-r from-[#5328EA] to-[#9579FA] p-3 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-1 right-1 text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-3 h-3" />
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-medium text-xs">
                    {TranslationsDictionary[selectedLang]?.["verif_needed"]}
                  </h3>
                </div>
              </div>
            </div>

            {/* Contenu compact */}
            <div className="p-3">
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 dark:text-green-400"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {TranslationsDictionary[selectedLang]?.["mail_sent"]}
                  </span>
                </motion.div>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
                    {TranslationsDictionary[selectedLang]?.["verify_mail_feature"]}
                  </p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={sendMailFunc}
                      disabled={isEmailButtonDisabled}
                      className={`w-full bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white font-medium py-1.5 px-3 rounded text-xs transition-all duration-300 flex items-center justify-center gap-1 ${
                        isEmailButtonDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:shadow-md hover:scale-[1.02]'
                      }`}
                    >
                      <Mail className="w-3 h-3" />
                      {isEmailButtonDisabled
                        ? `Renvoyer (${countdown}s)`
                        : TranslationsDictionary[selectedLang]?.["send"]
                      }
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium py-1 text-xs transition-colors"
                    >
                      {TranslationsDictionary[selectedLang]?.["later"]}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            {/* Barre de progression plus fine */}
            {!showSuccess && (
              <motion.div
                className="h-0.5 bg-gradient-to-r from-[#5328EA] to-[#9579FA]"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 10, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailVerificationPopup;