import React from 'react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const ButtonMultiplayer = ({ multiplayer, onClick }) => {
    const selectedLang = useLang();
  
    return (
        <button
            disabled={!multiplayer}
            onClick={onClick}
            className="w-[204px] h-[40px] bg-[#5328EA] text-white font-[600] font-Gotham rounded-[12px] duration-300 hover:bg-black mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#5328EA]"
        >
            <p>{TranslationsDictionary[selectedLang]?.["multiplayer"]}</p>
        </button>
    )
    }

export default ButtonMultiplayer;
