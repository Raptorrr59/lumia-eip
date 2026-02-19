import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TranslationsDictionary from '../../Translations';
import { useLang } from '../../LangProvider';
import { Clock, Lock, BookOpen, Tag, Award } from 'lucide-react';

const RedirectionCourse = ({ id, name, difficulty, language, image, duration, isFree, locked, completed }) => {
  const selectedLang = useLang();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!locked) {
      navigate(`/courses/${id}`);
    }
  };

  // Déterminer la couleur de badge en fonction de la difficulté
  const getDifficultyColor = () => {
    switch(difficulty) {
      case 'Débutant':
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
    <motion.div
      className={`h-full ${locked ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={handleClick}
      whileHover={{ y: locked ? 0 : -8, boxShadow: '0 10px 25px -5px rgba(83, 40, 234, 0.3)' }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative h-full bg-white dark:bg-[#121225] rounded-xl overflow-hidden shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]">
        {/* Image du cours */}
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
          
          {/* Durée */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-md flex items-center min-w-[60px] justify-center">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </div>
          
          {/* Badge de completion ultra-moderne - DÉPLACÉ EN BAS À DROITE */}
          {completed && (
            <div className="absolute bottom-3 right-3 z-20">
              <div className="relative">
                {/* Badge principal avec animation */}
                <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-xl backdrop-blur-sm flex items-center gap-1.5 border-2 border-white/30 animate-pulse">
                  <div className="relative">
                    <Award className="w-3.5 h-3.5" />
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                  </div>
                  <span className="tracking-wide text-xs">{TranslationsDictionary[selectedLang]?.["completed"] || "Terminé"}</span>
                </div>
                
                {/* Effet de halo */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-md opacity-60 -z-10 scale-110"></div>
                
                {/* Particules flottantes */}
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-200 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          )}
          
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
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
            {name}
          </h3>
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center text-sm text-white/80">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{language}</span>
            </div>
            
            <div className="flex items-center text-sm text-white/80">
              <Tag className="w-4 h-4 mr-1" />
              <span>IA</span>
            </div>
          </div>
        </div>
        
        {/* SUPPRIMÉ : Badge de completion ultra-moderne en haut à gauche */}
      </div>
    </motion.div>
  );
};

RedirectionCourse.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  duration: PropTypes.string,
  isFree: PropTypes.bool,
  locked: PropTypes.bool,
  completed: PropTypes.bool,
};

RedirectionCourse.defaultProps = {
  duration: '–',
  isFree: false,
  locked: false,
  completed: false,
};

export default RedirectionCourse;
