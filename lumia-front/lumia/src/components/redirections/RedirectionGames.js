import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const RedirectionGame = ({ name, type, language, image, locked, id, tuto }) => {
  const navigate = useNavigate();
  const selectedLang = useLang();

  const handleClick = (e) => {
    // Empêcher la propagation de l'événement pour éviter les conflits
    e.stopPropagation();
    
    if (!locked) {
      navigate(`/game/${id}`, { state: { name, type, language, image, locked, id, tuto } });
    }
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full ${!locked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {locked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">{TranslationsDictionary[selectedLang]?.['coming_soon']}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#010116] dark:text-white mb-1">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">{TranslationsDictionary[selectedLang]?.[type]}</span>
          <span className="text-xs px-2 py-1 bg-[#5328EA]/10 text-[#5328EA] rounded-full">{language}</span>
        </div>
      </div>
    </div>
  );
};

export default RedirectionGame;
