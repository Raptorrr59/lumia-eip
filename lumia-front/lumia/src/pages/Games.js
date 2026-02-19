import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import RedirectionGame from '../components/redirections/RedirectionGames';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { Link } from 'react-router-dom';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';
import { tutorialGamesFr } from '../utils/TutorialUtilsFR';
import { tutorialGamesEn } from '../utils/TutorialUtilsEN';

// Données mockées pour les jeux
export const GamesData = [
  { id: 0, name: "Snake", type: "Arcade", language: "Python", category: "pour débutants", image: 'https://i.imgur.com/eSw0Vj8.png', locked: false, tuto:'DekS8Pgb1qc'},
  { id: 1, name: "Connect Four", type: "affrontement", language: "Python", category: "pour débutants", image: 'https://i.imgur.com/D9DyBX3.jpeg', locked: false, tuto:'ylZBRUJi3UQ'},
  { id: 2, name: "Image Recognition", type: "utils", language: "Python", category:"mieux notés", image: 'https://i.imgur.com/AhNuPAZ.jpeg', locked: false, tuto:'v0ssiOY6cfg' },
  { id: 3, name: "Echecs", type: "affrontement", language: "Python", image: 'https://i.imgur.com/VsmidSz.png', locked: true },
  { id: 4, name: "Casse briques", type: "Arcade", language: "Python", image: 'https://i.imgur.com/eplA3LW.jpeg', locked: true },
  { id: 5, name: "L'imposteur", type: "Logique", language: "Python", image: 'https://i.imgur.com/Q5kD0dN.png', locked: true },
  { id: 6, name: "Go", type: "affrontement", language: "Python", image: 'https://i.imgur.com/5XdOfh6.jpeg', locked: true },
];

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const selectedLang = useLang();
  const [showTutorialPopup, setShowTutorialPopup] = useState(false);
  const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
  const [navTutorialTarget, setNavTutorialTarget] = useState(null);
  const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLanguageChange = (language) => setSelectedLanguages((prev) => prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]);
  const handleTypeChange = (type) => setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  const handleCategoryChange = (category) => setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);

  const languageList = ["Python", "C++",]
  const typeList = ["Arcade", TranslationsDictionary[selectedLang]?.["affrontement"], TranslationsDictionary[selectedLang]?.["utils"],]
  const categoryList = [TranslationsDictionary[selectedLang]?.["plus joués"], TranslationsDictionary[selectedLang]?.["mieux notés"], TranslationsDictionary[selectedLang]?.["pour débutants"]]

  useEffect(() => {
		const checkTutorialAsk = () => {
			const tutoAsk = localStorage.getItem('tutoGames');
			if (tutoAsk === 'true') {
				setShowTutorialPopup(true);
			}
		};

		checkTutorialAsk();
	}, []);

  useEffect(() => {
    if (pendingNavTutorial && !showTutorialPopup) {
      const target = document.querySelector("[data-tutorial-target='nav-leaderboard']");
      if (target) {
        setNavTutorialTarget(target);
        setIsNavTutorialActive(true);
        setPendingNavTutorial(false);
      }
    }
  }, [pendingNavTutorial, showTutorialPopup]);

  const filteredGames = useMemo(() => {
    return GamesData.filter((game) => {
      const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLang = selectedLanguages.length === 0 || selectedLanguages.includes(game.language);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(game.type);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(game.category);
      return matchSearch && matchLang && matchType && matchCategory;
    });
  }, [searchTerm, selectedLanguages, selectedTypes, selectedCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#010116] dark:to-[#0a0a29] px-4 sm:px-6 lg:px-8 xl:px-16 pb-16">
      {/* Hero Section avec phrase d'accroche et image décorative */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto pt-24 pb-16 relative"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-3/5 mb-10 lg:mb-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-[#010116] dark:text-white">{TranslationsDictionary[selectedLang]?.["create"]}</span>
              <span className="text-[#5328EA]"> {TranslationsDictionary[selectedLang]?.["and"]} </span>
              <span className="text-[#010116] dark:text-white">{TranslationsDictionary[selectedLang]?.["train"]}</span>
              <span className="text-[#5328EA]"> {TranslationsDictionary[selectedLang]?.["ai_our_games"]} </span>
              <span className="text-[#010116] dark:text-white">{TranslationsDictionary[selectedLang]?.["today"]}.</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {TranslationsDictionary[selectedLang]?.["discover_our_games"]}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/all-games" 
                className="px-6 py-3 bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              >
                {TranslationsDictionary[selectedLang]?.["explore_all_games"]}
              </Link>
              <Link 
                to="/courses" 
                className="px-6 py-3 bg-white dark:bg-gray-800 text-[#5328EA] border-2 border-[#5328EA] font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              >
                {TranslationsDictionary[selectedLang]?.["see_courses"]}
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:w-2/5 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <img 
                src="https://i.imgur.com/eSw0Vj8.png" 
                alt="Featured Game" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold">Snake</h3>
                  <p className="text-gray-200">{TranslationsDictionary[selectedLang]?.["our_most_popular_game"]}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#FF774D]/20 rounded-full blur-xl z-0"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#5328EA]/20 rounded-full blur-xl z-0"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Barre de recherche et filtres avec design amélioré */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto mb-16 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-[#010116] dark:text-white mb-4">{TranslationsDictionary[selectedLang]?.["find_your_next_challenge"]}</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-2/3">
            <SearchBar 
              searchTerm={searchTerm} 
              onChange={handleSearchChange} 
              placeholder={TranslationsDictionary[selectedLang]?.["search_game"]} 
            />
          </div>
          <div className="w-full sm:w-auto">
            <FilterDropdown
              languageOptions={languageList}
              typeOptions={typeList}
              categoryOptions={categoryList}
              selectedLanguages={selectedLanguages}
              onLanguageChange={handleLanguageChange}
              selectedTypes={selectedTypes}
              onTypeChange={handleTypeChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </motion.div>

      {/* Conteneur principal avec design amélioré */}
      <div className="max-w-7xl mx-auto">
        {/* Nouveaux jeux */}
        <motion.section 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-[#5328EA] rounded-full mr-3"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#010116] dark:text-white">
                {TranslationsDictionary[selectedLang]?.["new_games"] || "New Games"}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.slice(0, 3).map((game, index) => (
              <motion.div 
                key={game.id} 
                initial={{ opacity: 0, y: 30, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateY: 5,
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="relative group"
              >
                {/* Effet de lueur au survol */}
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-[#5328EA]/20 via-[#7855E6]/20 to-[#5328EA]/20 rounded-xl opacity-0 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Bordure animée */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border border-transparent"
                  initial={{ 
                    borderColor: "rgba(83, 40, 234, 0)",
                    boxShadow: "0 0 0 0px rgba(83, 40, 234, 0)"
                  }}
                  whileHover={{ 
                    borderColor: "rgba(83, 40, 234, 0.3)",
                    boxShadow: "0 12px 30px -8px rgba(83, 40, 234, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <RedirectionGame 
                  name={game.name} 
                  type={game.type} 
                  language={game.language} 
                  image={game.image} 
                  locked={game.locked} 
                  id={game.id} 
                  tuto={game.tuto}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Les plus joués avec design amélioré */}
        <motion.section 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-16"
        >
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.filter((game) => game.category === 'Les plus jouer').map((game, index) => (
              <motion.div 
                key={game.id} 
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 15 }} 
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} 
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateY: 8,
                  rotateX: -5,
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="relative group perspective-1000"
              >
                {/* Effet de lueur au survol */}
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-[#FF774D]/20 via-[#5328EA]/20 to-[#FF774D]/20 rounded-xl opacity-0 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Particules flottantes */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#FF774D]/60 rounded-full"
                      initial={{ 
                        x: `${20 + i * 25}%`,
                        y: "100%",
                        opacity: 0
                      }}
                      animate={{ 
                        y: "-20%",
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
                
                <RedirectionGame 
                  name={game.name} 
                  type={game.type} 
                  language={game.language} 
                  image={game.image} 
                  locked={game.locked} 
                  id={game.id} 
                  tuto={game.tuto}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pour débutants avec design amélioré */}
        <motion.section 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-[#00C896] rounded-full mr-3"></div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#010116] dark:text-white">
                {TranslationsDictionary[selectedLang]?.["for_beginners"] || "For Beginners"}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.filter((game) => game.category === 'Pour les débutants').map((game, index) => (
              <motion.div 
                key={game.id} 
                initial={{ opacity: 0, y: 30, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * index,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="relative group"
              >
                {/* Effet de lueur verte */}
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-[#00C896]/20 via-[#5328EA]/15 to-[#00C896]/20 rounded-xl opacity-0 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Bordure douce */}
                <motion.div 
                  className="absolute inset-0 rounded-xl border border-transparent"
                  initial={{ 
                    borderColor: "rgba(0, 200, 150, 0)",
                    boxShadow: "0 0 0 0px rgba(0, 200, 150, 0)"
                  }}
                  whileHover={{ 
                    borderColor: "rgba(0, 200, 150, 0.3)",
                    boxShadow: "0 8px 25px -5px rgba(0, 200, 150, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <RedirectionGame 
                  name={game.name} 
                  type={game.type} 
                  language={game.language} 
                  image={game.image} 
                  locked={game.locked} 
                  id={game.id} 
                  tuto={game.tuto}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section CTA améliorée */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-gradient-to-r from-[#5328EA]/10 to-[#7855E6]/5 dark:from-[#5328EA]/20 dark:to-[#7855E6]/10 rounded-2xl p-8 text-center mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#5328EA]/10 dark:bg-[#5328EA]/20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#7855E6]/10 dark:bg-[#7855E6]/20"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#FF774D]/10 dark:bg-[#FF774D]/20"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#5328EA] mb-4">
              {TranslationsDictionary[selectedLang]?.["do_you_want_to_explore_all_our_games"]}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {TranslationsDictionary[selectedLang]?.["discover_our_complete_collection_of_games"]}
            </p>
            <Link 
              to="/all-games" 
              className="px-8 py-3 bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 inline-block"
            >
              {TranslationsDictionary[selectedLang]?.["see_everything"]}
            </Link>
          </div>
        </motion.div>
      </div>
      <TutorialPopup
				isOpen={showTutorialPopup}
				onClose={() => {
					setShowTutorialPopup(false);
					localStorage.setItem('tutoGames', 'false');
				}}
				tutorialPages={selectedLang === 'EN' ? tutorialGamesEn : tutorialGamesFr}
				initial={false}
        onComplete={() => {
          setPendingNavTutorial(true);
        }}
			/>
      {isNavTutorialActive && navTutorialTarget && (
        <TutorialInteractif
          target={navTutorialTarget}
          text={selectedLang === 'EN' ? "Click here to open the Leaderboard page" : "Clique ici pour ouvrir la page du classement"}
          onClose={() => {
            setIsNavTutorialActive(false);
            setNavTutorialTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default Games;
