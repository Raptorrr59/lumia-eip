import React from 'react';
import PropTypes from 'prop-types';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

function convertSecondsToDHM(seconds, selectedLang) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);

    if (days === 0 && hours === 0) {
        return `${minutes} ${TranslationsDictionary[selectedLang]?.["minutes"]}`;
    } else if (days === 0) {
        return `${hours} ${TranslationsDictionary[selectedLang]?.["hours"]} ${TranslationsDictionary[selectedLang]?.["and"]} ${minutes} ${TranslationsDictionary[selectedLang]?.["minutes"]}`;
    } else {
        return `${days} ${TranslationsDictionary[selectedLang]?.["days"]} ${hours} ${TranslationsDictionary[selectedLang]?.["hours"]} ${TranslationsDictionary[selectedLang]?.["and"]} ${minutes} ${TranslationsDictionary[selectedLang]?.["minutes"]}`;
    }
}

const TrainingPreview = ({picture, name, game, time, statut}) => {
    
    const selectedLang = useLang();
    
    return (
        <div className='flex flex-row'>
            <div className='bg-black relative border-[2px] rounded-[10px] overflow-hidden border-[#5328EA]'>
                <img src={picture} alt="Training Preview" className="w-full h-32 object-cover"/>
            </div>
            <div className='flex flex-col pl-10'>
                <p className='font-bold font-Gotham text-[18px] text-[#5328EA]'>{name}</p>
                <p className='font-bold font-Gotham text-[14px] text-black dark:text-white pt-1 pb-1'>{game}</p>
                <p className='font-normal font-Gotham text-[12px] text-black dark:text-white'>
                    {`${TranslationsDictionary[selectedLang]?.["your_ai"]}`} 
                    <span className='font-bold'> {name} </span> 
                    {`${TranslationsDictionary[selectedLang]?.["is"]}`} 
                    <span className='text-[#5328EA]'> {statut} </span> 
                    {`${TranslationsDictionary[selectedLang]?.["in_our_labs"]}`}<br/>
                    {`${TranslationsDictionary[selectedLang]?.["ai_training_since"]}`} {convertSecondsToDHM(time, selectedLang)}
                </p>
            </div>
        </div>
    );
};

TrainingPreview.propTypes = {
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    statut: PropTypes.string.isRequired
};

export default TrainingPreview;