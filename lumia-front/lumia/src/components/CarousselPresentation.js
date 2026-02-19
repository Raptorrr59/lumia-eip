import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RedirectionGame from './redirections/RedirectionGames';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
    rotateX: 15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

const CarousselPresentation = ({ data }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const selectedLang = useLang();

  const updateItemsPerPage = useCallback(() => {
    if (window.innerWidth < 640) {
      setItemsPerPage(1); // 1 élément pour mobile
    } else if (window.innerWidth < 768) {
      setItemsPerPage(2); // 2 éléments pour tablette
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(3); // 3 éléments pour écrans moyens
    } else {
      setItemsPerPage(4); // 4 éléments pour grands écrans
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || data.length <= itemsPerPage) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => {
        const nextIndex = prev + itemsPerPage;
        return nextIndex >= data.length ? 0 : nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerPage, data.length]);

  const handleNext = useCallback(() => {
    if (startIndex + itemsPerPage < data.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    } else {
      setStartIndex(0); // Retour au début
    }
  }, [startIndex, itemsPerPage, data.length]);

  const handlePrev = useCallback(() => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex((prev) => prev - itemsPerPage);
    } else {
      setStartIndex(Math.max(0, data.length - itemsPerPage)); // Aller à la fin
    }
  }, [startIndex, itemsPerPage, data.length]);

  const visibleItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{TranslationsDictionary[selectedLang]?.["no_games"] || "No games available for the moment."}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Indicateurs de pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mb-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setStartIndex(i * itemsPerPage);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage
                  ? 'bg-[#5328EA] w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#5328EA]/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Conteneur principal du carrousel */}
      <div 
        className="relative bg-gradient-to-r from-[#5328EA]/5 to-[#7855E6]/5 dark:from-[#5328EA]/10 dark:to-[#7855E6]/10 rounded-2xl p-6 pt-10 pb-6 backdrop-blur-sm flex items-center" // Ajout de pt-10 pour plus d'espace en haut
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Bouton précédent */}
        <motion.button
          onClick={handlePrev}
          className="flex-shrink-0 bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-full p-3 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300 mr-4 z-10"
          disabled={data.length <= itemsPerPage}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(83, 40, 234, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-5 h-5 text-[#5328EA] hover:text-[#4520c0] transition-colors" />
        </motion.button>

        {/* Conteneur des jeux */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              className="grid gap-6 py-4" // Ajout de padding vertical
              style={{
                gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
              }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {visibleItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${startIndex}-${index}`}
                  className="relative group"
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    rotateY: 5,
                    transition: { 
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                >
                  {/* Effet de lueur au survol */}
                  <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-[#5328EA]/20 via-[#7855E6]/20 to-[#5328EA]/20 rounded-xl opacity-0 blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      opacity: 1, 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  {/* Effet de bordure animée */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl border border-transparent"
                    initial={{ 
                      borderColor: "rgba(83, 40, 234, 0)",
                      boxShadow: "0 0 0 0px rgba(83, 40, 234, 0)"
                    }}
                    whileHover={{ 
                      borderColor: "rgba(83, 40, 234, 0.3)",
                      boxShadow: "0 8px 25px -5px rgba(83, 40, 234, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animation de particules flottantes */}
                  <motion.div 
                    className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#5328EA]/60 rounded-full"
                        initial={{ 
                          x: `${20 + i * 20}%`,
                          y: "100%",
                          opacity: 0
                        }}
                        animate={{ 
                          y: "-20%",
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                  
                  <RedirectionGame
                    name={item.name}
                    type={item.type}
                    language={item.language}
                    image={item.image}
                    locked={item.locked}
                    id={item.id}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bouton suivant */}
        <motion.button
          onClick={handleNext}
          className="flex-shrink-0 bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-full p-3 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300 ml-4 z-10"
          disabled={data.length <= itemsPerPage}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(83, 40, 234, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-[#5328EA] hover:text-[#4520c0] transition-colors" />
        </motion.button>

        {/* Indicateur de lecture automatique */}
        {isAutoPlaying && data.length > itemsPerPage && (
          <motion.div 
            className="absolute bottom-2 right-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
              <motion.div 
                className="w-2 h-2 bg-[#5328EA] rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-xs text-white/80">{TranslationsDictionary[selectedLang]?.["auto"] || "Auto"}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Contrôles de navigation en bas (mobile) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-3 sm:hidden">
          <motion.button
            onClick={handlePrev}
            className="bg-[#5328EA] text-white px-4 py-2 rounded-lg hover:bg-[#4520c0] transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4" />
            {TranslationsDictionary[selectedLang]?.["previous"] || "Previous"}
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="bg-[#5328EA] text-white px-4 py-2 rounded-lg hover:bg-[#4520c0] transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {TranslationsDictionary[selectedLang]?.["next"] || "Next"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default CarousselPresentation;