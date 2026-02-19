
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CourseModal from '../modal/CourseModal';
import { Lock, BookOpen, Users, Award } from 'lucide-react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const RedirectionFormation = ({ id, name, image, difficulty, isFree, locked, content, completed }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedLang = useLang();

  const handleClick = () => {
    if (!locked) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Déterminer la couleur de badge en fonction de la difficulté
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Débutant':
      case 'Facile':
        return 'bg-green-500';
      case 'Intermédiaire':
        return 'bg-yellow-500';
      case 'Avancé':
        return 'bg-orange-500';
      case 'Expert':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <>
      <motion.div
        className={`h-full ${locked ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleClick}
        whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(83, 40, 234, 0.3)' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative h-full bg-[#5328EA] dark:bg-[#5328EA] rounded-xl overflow-hidden shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]">
          {/* Image de la formation */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isFree && (
                <div className="bg-[#FF774D] text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm min-w-[70px] text-center">
                  {TranslationsDictionary[selectedLang]?.["free"] || "Gratuit"}
                </div>
              )}
              <div className={`${getDifficultyColor()} text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm min-w-[70px] text-center`}>
                {difficulty}
              </div>
            </div>
            
            {/* Badge de parcours */}
            <div className="absolute top-3 right-3 bg-[#5328EA]/80 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-md flex items-center min-w-[70px] justify-center">
              <Award className="w-3 h-3 mr-1" />
              {TranslationsDictionary[selectedLang]?.["parcours"] || "Parcours"}
            </div>
            
            {/* Overlay si verrouillé */}
            {locked && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
                <Lock className="w-8 h-8 text-white mb-2" />
                <p className="text-white font-bold">
                  {TranslationsDictionary[selectedLang]?.["locked"] || "Verrouillé"}
                </p>
              </div>
            )}
            
            {/* Dégradé subtil en bas de l'image */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          {/* Contenu */}
          <div className="p-4 bg-[#5328EA] rounded-b-xl">
            <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 min-h-[1.75rem]">
              {name}
            </h3>
            
            <div className="flex items-center justify-between mt-1 mb-3">
              <div className="flex items-center text-sm text-white/80">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{content.length} {TranslationsDictionary[selectedLang]?.["courses"] || "cours"}</span>
              </div>
              
              <div className="flex items-center text-sm text-white/80">
                <Users className="w-4 h-4 mr-1" />
                <span>+500</span>
              </div>
            </div>
            
            {/* Liste des cours inclus */}
            {content.length > 0 && (
              <div className="mt-3 border-t border-white/20 pt-3">
                <p className="text-xs font-medium text-white/70 mb-2">
                  {TranslationsDictionary[selectedLang]?.["included_courses"] || "Cours inclus"}:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  {content.slice(0, 3).map((course, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-white mr-2">•</span>
                      <span className="line-clamp-1">{course.name}</span>
                    </li>
                  ))}
                  {content.length > 3 && (
                    <li className="text-xs font-medium mt-1">
                      <span className="text-white/90">+{content.length - 3} {TranslationsDictionary[selectedLang]?.["more"] || "autres"}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Badge de completion en bas à droite - CONSERVÉ */}
          {completed && (
            <div className="absolute bottom-3 right-3 z-20">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-xl backdrop-blur-sm flex items-center gap-1.5 border-2 border-white/30">
                  <Award className="w-3.5 h-3.5" />
                  <span className="tracking-wide font-extrabold">{TranslationsDictionary[selectedLang]?.["completed"] || "Terminé"}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full blur-md opacity-70 -z-10 scale-110 animate-pulse"></div>
                <div className="absolute -top-2 -right-2 text-yellow-300 text-sm animate-spin" style={{animationDuration: '3s'}}>⭐</div>
                <div className="absolute -bottom-2 -left-2 text-yellow-200 text-xs animate-bounce" style={{animationDelay: '1s'}}>✨</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modale pour choisir les cours */}
      {isModalOpen && (
        <CourseModal
          formation={{ id, name, image, difficulty, isFree, locked, content }}
          onClose={closeModal}
        />
      )}
    </>
  );
};

RedirectionFormation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  difficulty: PropTypes.string,
  isFree: PropTypes.bool,
  locked: PropTypes.bool,
  content: PropTypes.array.isRequired,
  completed: PropTypes.bool,
};

RedirectionFormation.defaultProps = {
  isFree: false,
  locked: false,
  difficulty: 'Non spécifiée',
};

export default RedirectionFormation;
