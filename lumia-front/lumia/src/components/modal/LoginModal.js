import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LumiaIcon from "../../icons-svg/LumiaIcon";
import ForgotPasswordModal from "./ForgotPasswordModal";
import axios from "axios";

import { useLang } from "../../LangProvider";
import TranslationsDictionary from "../../Translations";

const LoginModal = ({ onClose, onSignUpClick, redirectTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectedLang = useLang();

  // Empêcher le défilement en arrière-plan
  useEffect(() => {
    // Sauvegarder la valeur actuelle d'overflow
    const originalOverflow = document.body.style.overflow;
    // Empêcher le défilement
    document.body.style.overflow = 'hidden';

    // Nettoyer lors du démontage du composant
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("roles", JSON.stringify(response.data.roles || [response.data.role]));
        localStorage.setItem('id', response.data.userId);

        console.log(response.data.roles);
        await new Promise(resolve => setTimeout(resolve, 500));

        const responseUser = await axios.get(`/api/users/${localStorage.getItem("id")}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        localStorage.setItem("emailVerified", responseUser.data.emailVerified);
        localStorage.setItem("userName", responseUser.data.userName);
        localStorage.setItem("email", responseUser.data.email);
        localStorage.setItem("lumiaCoin", responseUser.data.lumiaCoin);
        localStorage.setItem("roles", JSON.stringify(responseUser.data.roles || []));
        localStorage.setItem("xp", responseUser.data.xp || 0);
        localStorage.setItem("level", responseUser.data.level || 1);
        localStorage.setItem('newsletter', responseUser.data.subscribed);

        // Redirect to specific page or reload
        if (redirectTo) {
          window.location.replace(redirectTo);
        } else {
          window.location.reload();
        }
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError(TranslationsDictionary[selectedLang]?.["banned_email"] || "Cet e-mail est banni. Connexion impossible.");
      } else if (error.response && error.response.status === 401) {
        setError(TranslationsDictionary[selectedLang]?.["incorrect_credentials"]);
      } else if (error.response && error.response.status === 409) {
        const responseUser = await axios.get(`/api/users/${localStorage.getItem("id")}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        localStorage.setItem("emailVerified", responseUser.data.emailVerified);
        localStorage.setItem("userName", responseUser.data.userName);
        localStorage.setItem("email", responseUser.data.email);
        localStorage.setItem("lumiaCoin", responseUser.data.lumiaCoin);
        window.location.reload();
      } else {
        setError(TranslationsDictionary[selectedLang]?.["unknown_error"]);
      }
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        onClose={onClose}
        onBackToLogin={() => setShowForgotPassword(false)}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl w-96 z-50 relative ${isLoading ? "opacity-70 pointer-events-none" : ""}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.3
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5328EA]"></div>
          </div>
        )}

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 mb-4">
            <LumiaIcon />
          </div>
          <h2 className="text-2xl font-bold text-center dark:text-white">
            {TranslationsDictionary[selectedLang]?.["welcome_back_researcher"]}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {TranslationsDictionary[selectedLang]?.["dont_account"]}{" "}
            <button
              onClick={onSignUpClick}
              className="text-[#5328EA] hover:text-[#7855E6] dark:text-[#9579FA] dark:hover:text-[#7855E6] transition-colors"
            >
              {TranslationsDictionary[selectedLang]?.["sign_up"]}
            </button>
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {TranslationsDictionary[selectedLang]?.["email"]}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {TranslationsDictionary[selectedLang]?.["password"]}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#5328EA] text-white rounded-lg hover:bg-[#4520c4] transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {TranslationsDictionary[selectedLang]?.["loading"] || "Chargement..."}
              </span>
            ) : (
              TranslationsDictionary[selectedLang]?.["sign_in"]
            )}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {/* Message de succès supprimé */}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;