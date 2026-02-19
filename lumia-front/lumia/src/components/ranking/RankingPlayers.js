import React from 'react';
import PropTypes from 'prop-types';

const RankingPlayer = ({ranking, pseudo, score, left}) => {
    return (
        <div className={left ? 'pt-[10px]' : 'pt-[10px]'}>
    <div className={left? 'w-[350px] h-[30px] bg-white dark:bg-[#010116] rounded-[7px] flex items-center justify-stretch space-x-3' :
    'w-[350px] h-[30px] bg-white dark:bg-[#010116] rounded-[7px] px-[120px] flex items-center justify-stretch space-x-3'}>
        <div className='w-5 h-5 bg-[#5328EA] text-white flex items-center justify-center rounded-full text-[10px] font-Gotham font-bold shrink-0'>
            {ranking}
        </div>
        <p className='text-[#5328EA] dark:text-white font-[650] font-Gotham text-[13px] overflow-hidden text-ellipsis whitespace-nowrap w-[80px] shrink-0'>
            {pseudo}
        </p>
        <p className='text-[#5328EA] dark:text-white font-[650] font-Gotham text-[13px] ml-auto'>
            {score}
        </p>
    </div>
</div>

    );
};

RankingPlayer.propTypes = {
    ranking: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired
};

export default RankingPlayer;
