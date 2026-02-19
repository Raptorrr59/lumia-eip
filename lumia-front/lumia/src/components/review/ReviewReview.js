import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ReviewReview = ({ pseudo, rating, review, date, picture }) => {
    return (
        <motion.div 
            className="relative group max-w-sm"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glassmorphism container */}
            <div className="relative bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl h-full">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5328EA]/20 to-[#9579FA]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* User info */}
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                            <img
                                src={picture}
                                alt={`${pseudo} profile`}
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#5328EA]/30"
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5328EA]/20 to-[#9579FA]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        <div className="flex-1">
                            <p className="font-semibold text-white text-base md:text-lg mb-1 truncate">{pseudo}</p>
                            <div className="flex space-x-1">
                                {[...Array(rating)].map((_, index) => (
                                    <span key={index} className="text-[#5328EA] text-lg drop-shadow-lg">★</span>
                                ))}
                                {[...Array(5 - rating)].map((_, index) => (
                                    <span key={index} className="text-gray-500 text-lg">★</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Review text */}
                    <div className="flex-1 mb-4">
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium break-words overflow-hidden">
                            "{review}"
                        </p>
                    </div>
                    
                    {/* Date */}
                    <div className="pt-2 border-t border-white/10">
                        <p className="text-gray-500 text-xs md:text-sm">{date}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

ReviewReview.propTypes = {
    pseudo: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};

export default ReviewReview;