import React from 'react';
import PropTypes from 'prop-types';

const AchievementPreview = ({picture, name, description, date}) => {
    return (
        <div className="max-w-sm border-[1px] rounded-[20px] overflow-hidden border-[#5328EA]">
            <div className='bg-black relative'>
                <img src={picture} alt="Achievement" className="w-full h-32 object-cover opacity-40" />
                <div className="absolute inset-0 flex justify-center items-center">
                    {date !== "00/00/00" ? (
                        <div className='text-center'>
                            <img src="https://i.imgur.com/4b1oRs0.png" alt="Red Trophy" className="w-6 h-8" />
                            <p className='pt-2 font-Gotham text-[16px] font-semibold text-[#FF774D]'>{name}</p>
                        </div>
                    ) : (
                        <img src="https://i.imgur.com/lgRJHRZ.png" alt="White Trophy" className="w-6 h-8" />
                    )}
                </div>
            </div>
            <div className='p-4'>
                <h2 className={`text-[12px] font-semibold font-Gotham ${date === "00/00/00" ? "text-[#5328EA]" : "text-[#FF774D]"}`}>{name}</h2>
                <p className="pb-2 text-black dark:text-white text-[10px] font-medium font-Gotham">{description}</p>
                <div className="width-full h-[2px] bg-[#5328EA] opacity-50"></div>
                <p className="text-[10px] text-black dark:text-white opacity-50 font-Gotham">{date}</p>
            </div>
        </div>
    );
};

AchievementPreview.propTypes = {
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

export default AchievementPreview;