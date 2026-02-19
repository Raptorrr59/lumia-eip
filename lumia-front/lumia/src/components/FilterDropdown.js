import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';

const FilterDropdown = ({ 
  languageOptions, 
  typeOptions, 
  categoryOptions,
  selectedLanguages,
  onLanguageChange,
  selectedTypes,
  onTypeChange,
  selectedCategories,
  onCategoryChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedLang = useLang();

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Compter le nombre total de filtres sélectionnés
  const totalFiltersSelected = selectedLanguages.length + selectedTypes.length + selectedCategories.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5328EA]/20"
      >
        <div className="flex items-center">
          <FilterIcon className="w-5 h-5 mr-2 text-[#5328EA]" />
          <span className="font-medium">
            {TranslationsDictionary[selectedLang]?.["filters"] || "Filtres"}
          </span>
          {totalFiltersSelected > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-[#5328EA] text-white text-xs font-bold rounded-full">
              {totalFiltersSelected}
            </span>
          )}
        </div>
        <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 w-72 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4">
              {/* Langages */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {TranslationsDictionary[selectedLang]?.["languages"] || "Langages"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <button
                      key={language}
                      onClick={() => onLanguageChange(language)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                        selectedLanguages.includes(language)
                          ? 'bg-[#5328EA] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Types de jeux */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {TranslationsDictionary[selectedLang]?.["game_types"] || "Types de jeux"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => onTypeChange(type)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                        selectedTypes.includes(type)
                          ? 'bg-[#FF774D] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Catégories */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {TranslationsDictionary[selectedLang]?.["categories"] || "Catégories"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                        selectedCategories.includes(category)
                          ? 'bg-[#00C896] text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer avec bouton de réinitialisation */}
            {totalFiltersSelected > 0 && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    onLanguageChange([]);
                    onTypeChange([]);
                    onCategoryChange([]);
                  }}
                  className="w-full py-2 text-sm text-[#5328EA] hover:text-[#7855E6] transition-colors duration-200"
                >
                  {TranslationsDictionary[selectedLang]?.["reset_filters"] || "Réinitialiser les filtres"}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
