import React from 'react';
import PropTypes from 'prop-types';

const BadgePreview = ({picture, name}) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={picture} className="w-12 h-12 rounded-full border-[3.5px] border-[#5328EA]" alt='Badge'/>
            <p className='text-[#FF774D] font-bold text-[10px] font-Gotham pt-1'>{name}</p>
        </div>
    );
};

BadgePreview.propTypes = {
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default BadgePreview;