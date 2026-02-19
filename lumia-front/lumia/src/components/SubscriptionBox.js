import React from "react";
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';
import { motion } from "framer-motion";

// Composant de chaque boîte d'abonnement
const SubscriptionBox = ({ title, price, currency, credits, recommended, bonus, onClick }) => {
  const selectedLang = useLang();
  
  return (
    <motion.div
      className={`border-4 rounded-[15px] p-6 text-center relative flex flex-col border-[#5328EA] h-full cursor-pointer`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(83, 40, 234, 0.4)"
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
      onClick={onClick}
    >
      {/* Badge "Recommandé" */}
      {recommended && (
        <motion.p 
          className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#010116] text-orange-500 font-bold px-3 whitespace-nowrap"
          whileHover={{ scale: 1.1 }}
        >
          {TranslationsDictionary[selectedLang]?.["recommended"]}
        </motion.p>
      )}
      
      {/* Contenu de l'offre */}
      <div className="flex-grow flex flex-col">
        {/* Titre */}
        <h2 className="text-[#5328EA] text-xl font-bold mb-4">{title}</h2>
        
        {/* Prix */}
        <div className="mb-4">
          <p className="text-4xl font-bold">
            <span>{price}</span>
            <span className="text-[#5328EA] ml-1">{currency}</span>
          </p>
        </div>
        
        {/* Crédits principaux */}
        <motion.div 
          className="bg-[#5328EA]/10 rounded-lg p-3 mb-2"
          whileHover={{ scale: 1.03 }}
        >
          <p className="text-2xl font-bold text-[#5328EA]">{credits} {TranslationsDictionary[selectedLang]?.["credits"]} </p>
        </motion.div>
        
        {/* Bonus (si applicable) */}
        {bonus && (
          <motion.div 
            className="mt-auto pt-2"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              +{bonus} {TranslationsDictionary[selectedLang]?.["credits_bonus"]}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionBox;