import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewAverage = () => {
    return (
        <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glassmorphism container */}
            <div className="relative bg-gradient-to-br from-[#030318]/80 to-[#1a1a2e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5328EA]/20 to-[#9579FA]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                    {/* Star icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5328EA] to-[#9579FA] rounded-full flex items-center justify-center mb-2">
                        <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                    
                    {/* Stars display */}
                    <div className="flex space-x-1 text-2xl md:text-3xl">
                        {[...Array(4)].map((_, index) => (
                            <span key={index} className="text-[#5328EA] drop-shadow-lg">★</span>
                        ))}
                        <span className="text-gray-400">★</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold font-Gotham text-white mb-1">
                            4,6<span className="text-[#9579FA]">/5</span>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewAverage;