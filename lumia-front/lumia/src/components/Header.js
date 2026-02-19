import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';
import LoginModal from './modal/LoginModal';
import SignUpModal from './modal/SignUpModal';
import LumiaIcon from '../icons-svg/LumiaIcon';
import { useTheme } from '../contexts/ThemeContext';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';
import { Link } from "react-router-dom";

const Header = () => {
	const { isDarkMode, toggleDarkMode } = useTheme();
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const [isLangOpen, setIsLangOpen] = useState(false);
	const selectedLang = useLang();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lumiaCoins, setLumiaCoins] = useState(() => {return localStorage.getItem('lumiaCoin') || '0';});

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'lumiaCoin') {
        setLumiaCoins(e.newValue || '0');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(() => {
      const currentCoins = localStorage.getItem('lumiaCoin') || '0';
      if (currentCoins !== lumiaCoins) {
        setLumiaCoins(currentCoins);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [lumiaCoins]);

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

	const toggleLangMenu = () => setIsLangOpen(!isLangOpen);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<>
		  <header className="bg-white dark:bg-[#010116] text-[#5328EA] dark:text-white p-4 shadow-md dark:shadow-[0_4px_6px_-1px_rgba(83,40,234,0.1),0_2px_4px_-2px_rgba(83,40,234,0.1)] transition-colors duration-200 border-b border-gray-200 dark:border-[#1a1a2e]">
			  <div className="container mx-auto flex justify-between items-center px-2 sm:px-4 md:px-10">
			    {/* Bouton du menu mobile (visible uniquement en dessous de 768px) */}
			    <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none" aria-label="Toggle mobile menu">
				    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
			    </button>
			    {/* Navigation principale (masquée sur mobile) */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
            <li>
                <Link to='/games' data-tutorial-target="nav-games" className="hover:text-[#7855E6] transition-colors duration-300 relative group">
                  {TranslationsDictionary[selectedLang]?.["our_games"]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to='/courses' data-tutorial-target="nav-courses" className="hover:text-[#7855E6] transition-colors duration-300 relative group">
                  {TranslationsDictionary[selectedLang]?.["our_courses"]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to='/events' data-tutorial-target="nav-events" className="hover:text-[#7855E6] transition-colors duration-300 relative group">
                  {TranslationsDictionary[selectedLang]?.["events"]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to='/leaderboard' data-tutorial-target="nav-leaderboard" className="hover:text-[#7855E6] transition-colors duration-300 relative group">
                  {TranslationsDictionary[selectedLang]?.["leaderboard"] || "Classement"}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
			  
          {/* Logo (centré sur mobile) */}
          <Link to='/' data-tutorial-target="nav-home" className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex items-center">
            <div className="w-16 sm:w-20 md:w-32">
              <LumiaIcon />
            </div>
          </Link>
	
          {/* Contrôles de droite (profil/connexion, dark mode, langue) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Bouton de dark mode */}
          <button
            onClick={toggleDarkMode}
            className="relative w-8 h-8 md:w-10 md:h-8 rounded-full overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {/* Sun Icon */}
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isDarkMode ? '-translate-y-12' : 'translate-y-0'}`}>
              <Sun size={20} className="text-[#5328EA] transform group-hover:rotate-45 transition-transform duration-300"/>
            </div>
            {/* Moon Icon */}
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isDarkMode ? 'translate-y-0' : 'translate-y-12'}`}>
              <Moon size={20} className="text-slate-700 dark:text-slate-200 transform group-hover:rotate-45 transition-transform duration-300"/>
            </div>
				  </button>
	
          {/* Bouton de connexion ou icône de profil */}
          {localStorage.getItem('id') === null ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={openSignUp} className="bg-[#5328EA] text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full hover:bg-[#7855E6] transition-colors">
                {TranslationsDictionary[selectedLang]?.["sign_up"]}
              </button>
              <button onClick={openLogin} className="text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base">
                {TranslationsDictionary[selectedLang]?.["connection"]}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Affichage des LumiaCoins */}
              <Link to="/shop" data-tutorial-target="nav-shop" className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <img 
                  src="https://i.imgur.com/wJV8pnT.png"
                  alt="LumiaCoins" 
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">
                  {lumiaCoins}
                </span>
                <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </Link>

              {/* Icône de profil */}
              <Link to='/profile' className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-2 sm:border-4 border-[#5328EA]">
                  <span className="text-[14px] sm:text-[18px] md:text-[20px] font-semibold text-[#5328EA] dark:text-white">
                    {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Cercle de vérification */}
                {JSON.parse(localStorage.getItem("roles"))[0].name === "ADMIN" ? (
                  <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 border-white bg-blue-500`}/>
                ) : (
                  <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${JSON.parse(localStorage.getItem("emailVerified")) ? 'bg-green-500' : 'bg-gray-400'}`}/>
                )}
              </Link>
            </div>
          )}
	
          {/* Sélecteur de langue */}
          <div className="relative">
            <button
              onClick={toggleLangMenu}
              className="flex items-center space-x-1 px-1 sm:px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm sm:text-base">{selectedLang}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}/>
            </button>
    
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-16 sm:w-20 bg-white dark:bg-[#2a2a2a] rounded-md shadow-lg py-1 z-10">
                <button
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    localStorage.setItem('language', 'FR');
                    window.location.reload();
                    setIsLangOpen(false);
                  }}
                >
                  FR
                </button>
                <button
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    localStorage.setItem('language', 'EN');
                    window.location.reload();
                    setIsLangOpen(false);
                  }}
                >
                  EN
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
	
			{/* Menu mobile (visible uniquement en dessous de 768px) */}
			{isMobileMenuOpen && (
			  <div className="md:hidden mt-4 px-4 py-2 bg-white dark:bg-[#010116] border-t border-gray-200 dark:border-[#1a1a2e] animate-fadeDown">
				<ul className="flex flex-col space-y-4">
				  {/* Onglet Leaderboard ajouté */}
				  <li>
				    <Link to='/leaderboard' data-tutorial-target="nav-leaderboard" className="hover:text-[#7855E6] transition-colors duration-300 relative group">
				      {TranslationsDictionary[selectedLang]?.["leaderboard"] || "Classement"}
				      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
				    </Link>
				  </li>
				  <li>
					<Link to='/games' data-tutorial-target="nav-games" className="block py-2 hover:text-[#7855E6] transition-colors relative overflow-hidden group">
					  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
					    {TranslationsDictionary[selectedLang]?.["our_games"]}
					  </span>
					  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
					</Link>
				  </li>
				  <li>
					<Link to='/courses' data-tutorial-target="nav-courses" className="block py-2 hover:text-[#7855E6] transition-colors relative overflow-hidden group">
					  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
					    {TranslationsDictionary[selectedLang]?.["our_courses"]}
					  </span>
					  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
					</Link>
				  </li>
          <li>
            <Link to='/events' data-tutorial-target="nav-events" className="block py-2 hover:text-[#7855E6] transition-colors relative overflow-hidden group">
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                {TranslationsDictionary[selectedLang]?.["events"]}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7855E6] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
				</ul> 
			  </div>
			)}
		  </header>
	
		  {/* Modales de connexion et d'inscription */}
		  {isLoginOpen && (
			<LoginModal
			  onClose={closeLogin}
			  onSignUpClick={() => {
				closeLogin();
				openSignUp();
			  }}
			/>
		  )}
	
		  {isSignUpOpen && (
			<SignUpModal
			  onClose={closeSignUp}
			  onLoginClick={() => {
				  closeSignUp();
				  openLogin();
			  }}
			/>
		  )}
		</>
	  );
	};
	
	export default Header;
