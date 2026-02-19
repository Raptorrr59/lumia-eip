import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { Link } from 'react-router-dom';

// Composant pour chaque question/réponse
const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      className="mb-6 overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-left font-semibold text-lg bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <span className="text-[#010116] dark:text-white">{question}</span>
        <motion.div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#5328EA]/10 text-[#5328EA]"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          height: isOpen ? 'auto' : 0,
          marginTop: isOpen ? '0.5rem' : '0rem'
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-5 bg-[#5328EA]/5 dark:bg-[#5328EA]/10 rounded-xl border-l-4 border-[#5328EA]">
          <p className="text-gray-700 dark:text-gray-300">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const selectedLang = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Fonction pour rechercher par mots entiers
  const searchByWords = (text, searchTerm) => {
    if (!searchTerm.trim()) return true;
    
    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
    const textWords = text.toLowerCase().split(/\s+/);
    
    return searchWords.every(searchWord => 
      textWords.some(textWord => 
        textWord === searchWord
      )
    );
  };

  // Données des questions/réponses avec catégories
  const faqItems = [
    {
      question: TranslationsDictionary[selectedLang]?.["faq_q1"],
      answer: TranslationsDictionary[selectedLang]?.["faq_a1"],
      category: "general"
    },
    {
      question: TranslationsDictionary[selectedLang]?.["faq_q2"],
      answer: TranslationsDictionary[selectedLang]?.["faq_a2"],
      category: "abonnements"
    },
    {
      question: TranslationsDictionary[selectedLang]?.["faq_q3"],
      answer: TranslationsDictionary[selectedLang]?.["faq_a3"],
      category: "jeux"
    },
    {
      question: TranslationsDictionary[selectedLang]?.["faq_q4"],
      answer: TranslationsDictionary[selectedLang]?.["faq_a4"],
      category: "general"
    },
    {
      question: TranslationsDictionary[selectedLang]?.["faq_q5"],
      answer: TranslationsDictionary[selectedLang]?.["faq_a5"],
      category: "support"
    },
  ];

  // Filtrer les questions en fonction de la recherche et de la catégorie
  const filteredFaqItems = faqItems.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (searchByWords(item.question, searchTerm) || searchByWords(item.answer, searchTerm))
  );

  // Catégories disponibles
  const categories = [
    { id: 'all', name: TranslationsDictionary[selectedLang]?.["toutes_questions"] },
    { id: 'abonnements', name: TranslationsDictionary[selectedLang]?.["abonnements"] },
    { id: 'jeux', name: TranslationsDictionary[selectedLang]?.["jeux"] },
    { id: 'formations', name: TranslationsDictionary[selectedLang]?.["formations"] },
    { id: 'support', name: TranslationsDictionary[selectedLang]?.["support"] },
    { id: 'general', name: TranslationsDictionary[selectedLang]?.["general"] }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#010116] pt-20 pb-16">
      <div className="lg:px-[150px] md:px-[75px] px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#010116] dark:text-white mb-4">
            {selectedLang === 'EN' ? (
              <><span className="text-[#5328EA]">Q</span>uestions <span className="text-[#5328EA]">A</span>nd <span className="text-[#5328EA]">A</span>nswers</>
            ) : (
              <><span className="text-[#5328EA]">F</span>oire <span className="text-[#5328EA]">A</span>ux <span className="text-[#5328EA]">Q</span>uestions</>
            )}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {TranslationsDictionary[selectedLang]?.["faq_subtitle"] || "Trouvez rapidement des réponses à vos questions les plus fréquentes"}
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={TranslationsDictionary[selectedLang]?.["search_mot_cle"]}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#5328EA] dark:focus:border-[#7855E6] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md transition-all duration-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Catégories */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-[#5328EA] text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Questions/Réponses */}
        <div className="mb-12">
          {filteredFaqItems.length > 0 ? (
            filteredFaqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleQuestion(index)}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-10"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {searchTerm 
                  ? `Aucun résultat trouvé pour "${searchTerm}" dans la catégorie ${categories.find(c => c.id === selectedCategory).name}. Essayez une autre recherche.`
                  : `Aucune question disponible dans la catégorie ${categories.find(c => c.id === selectedCategory).name}.`
                }
              </p>
            </motion.div>
          )}
        </div>

        {/* Section de contact */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 bg-gradient-to-r from-[#5328EA]/10 to-[#7855E6]/5 dark:from-[#5328EA]/20 dark:to-[#7855E6]/10 rounded-xl p-8 text-center relative overflow-hidden"
        >
          {/* Éléments décoratifs */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#5328EA]/10 dark:bg-[#5328EA]/20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#7855E6]/10 dark:bg-[#7855E6]/20"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#FF774D]/10 dark:bg-[#FF774D]/20"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#5328EA] mb-4">
              {TranslationsDictionary[selectedLang]?.["faq_not_found"] || "Vous n'avez pas trouvé votre réponse ?"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {TranslationsDictionary[selectedLang]?.["faq_contact_us"] || "N'hésitez pas à contacter notre équipe de support qui se fera un plaisir de vous aider."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to='/contact'
                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5328EA] hover:bg-[#7855E6] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {TranslationsDictionary[selectedLang]?.["contact_support"] || "Contacter le support"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;