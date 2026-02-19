import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const ButtonLeaderboard = ({ onClick, showLeaderboard }) => {
  const selectedLang = useLang();

    return (
        <button
            onClick={onClick}
            className="w-[300px] h-[40px] border-2 border-[#5328EA] text-[#5328EA] font-[600] font-Gotham rounded-[12px] duration-300 bg-white hover:bg-black mt-6 flex items-center justify-between px-4"
        >
            {showLeaderboard ? <ChevronUpIcon className="w-6 h-6 mr-2" /> : <ChevronDownIcon className="w-6 h-6 mr-2" />}
            <p>{TranslationsDictionary[selectedLang]?.["leaderboard"]}</p>
            <p>2536 / 20000</p>
        </button>
    )
    }

export default ButtonLeaderboard;
