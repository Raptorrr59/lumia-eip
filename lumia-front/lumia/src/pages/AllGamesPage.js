import React, { useState } from 'react';
import RedirectionGame from '../components/redirections/RedirectionGames';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { GamesData } from './Games';
import { motion } from 'framer-motion';
import FilterDropdown from '../components/FilterDropdown';
import SearchBar from '../components/SearchBar';

const AllGamesPage = () => {
  const selectedLang = useLang();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleLanguageChange = (language) => setSelectedLanguages((prev) => 
    prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
  );
  const handleTypeChange = (type) => setSelectedTypes((prev) => 
    prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
  );
  const handleCategoryChange = (category) => setSelectedCategories((prev) => 
    prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
  );

  const languageList = ["Python", "C", "C++", "Java"];
  const typeList = ["Stratégie", "Arcade", "Jeux de tir", "Course", "Combat", "Jeu d'arcade", "Jeu de plateau", "Jeu de réflexion"];
  const categoryList = ["Les plus joués", "Les mieux notés", "Pour les débutants", "Pour les vétérans"];

  const filteredGames = GamesData.filter((game) => {
    const matchSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLang = selectedLanguages.length === 0 || selectedLanguages.includes(game.language);
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(game.type);
    const matchCategory = selectedCategories.length === 0 || (game.category && selectedCategories.includes(game.category));
    return matchSearch && matchLang && matchType && matchCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#010116] dark:to-[#0a0a29] px-4 sm:px-6 lg:px-8 xl:px-16 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-[#5328EA] dark:text-white">
          {TranslationsDictionary[selectedLang]?.["all_our_games"] || "Tous nos jeux"}
        </h1>

        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-2/3">
              <SearchBar 
                searchTerm={searchTerm} 
                onChange={handleSearchChange} 
                placeholder={TranslationsDictionary[selectedLang]?.["search_game"] || "Rechercher un jeu..."} 
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
        </div>
      </motion.div>

      {/* Affichage en grille avec les mêmes animations que Games.js */}
      <div className="max-w-7xl mx-auto">
        {filteredGames.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 * (index % 4),
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {TranslationsDictionary[selectedLang]?.["no_games_found"] || "Aucun jeu ne correspond à votre recherche."}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AllGamesPage;
