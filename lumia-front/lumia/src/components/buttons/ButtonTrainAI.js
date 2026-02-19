import React, { useState } from 'react';
import { useLang } from '../../LangProvider';
import FileUploadModal from '../modal/FileUploadModal';
import TranslationsDictionary from '../../Translations';

const ButtonTrainAI = ({ onClick }) => {
    const selectedLang = useLang();

    return (
        <>
            <button
                onClick={onClick}
                className="w-[300px] h-[40px] text-white font-[600] font-Gotham rounded-[12px] duration-300 bg-[#FF774D] hover:bg-black flex items-center justify-center px-4"
            >
                <p>{TranslationsDictionary[selectedLang]?.["train_ai"]}</p>
            </button>
        </>
    );
};

export default ButtonTrainAI;