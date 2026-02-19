import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import LoginModal from './modal/LoginModal';
import SignUpModal from './modal/SignUpModal';

const AuthRequired = ({ type = 'login' }) => {
  const selectedLang = useLang();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => setIsSignUpOpen(false);
  
  const getContent = () => {
    if (type === 'verification') {
      return {
        title: TranslationsDictionary[selectedLang]?.["email_verification_required"] || "Email Verification Required",
        message: TranslationsDictionary[selectedLang]?.["please_verify_email"] || "Please verify your email address to access this content.",
        icon: (
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        action: (
          <p className="text-gray-600 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.["check_email_inbox"] || "Check your email inbox and click the verification link."}
          </p>
        )
      };
    } else if (type === 'admin') {
      return {
        title: TranslationsDictionary[selectedLang]?.["admin_access_required"] || "Administrator Access Required",
        message: TranslationsDictionary[selectedLang]?.["admin_only_content"] || "This content is only accessible to administrators.",
        icon: (
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        ),
        action: (
          <p className="text-gray-600 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.["contact_admin_access"] || "Please contact an administrator if you believe you should have access."}
          </p>
        )
      };
    } else {
      // type === 'login' (default)
      return {
        title: TranslationsDictionary[selectedLang]?.["authentication_required"] || "Authentication Required",
        message: TranslationsDictionary[selectedLang]?.["login_to_access"] || "Please log in to access this content.",
        icon: (
          <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        action: (
          <div className="space-y-3">
            <button
              onClick={openLogin}
              className="bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 w-full"
            >
              {TranslationsDictionary[selectedLang]?.["login"]}
            </button>
            <button
              onClick={openSignUp}
              className="border border-[#5328EA] text-[#5328EA] dark:text-[#9579FA] px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full"
            >
              {TranslationsDictionary[selectedLang]?.["register"]}
            </button>
          </div>
        )
      };
    }
  };

  const content = getContent();

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-[#010116] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          {content.icon}
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-Gotham">
            {content.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {content.message}
          </p>
          
          <div className="space-y-3">
            {content.action}
            
            <Link
              to="/"
              className="block text-gray-500 dark:text-gray-400 hover:text-[#5328EA] dark:hover:text-[#9579FA] transition-colors text-sm"
            >
              {TranslationsDictionary[selectedLang]?.["back_to_home"]}
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Modals de connexion et d'inscription */}
      {isLoginOpen && (
        <LoginModal 
          onClose={closeLogin} 
          onSignUpClick={openSignUp}
        />
      )}
      
      {isSignUpOpen && (
        <SignUpModal 
          onClose={closeSignUp} 
          onLoginClick={openLogin}
        />
      )}
    </>
  );
};

export default AuthRequired;