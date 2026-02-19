import React from 'react';
import { motion } from 'framer-motion';

import ReviewAverage from './ReviewAverage';
import ReviewReview from './ReviewReview';

const ReviewComponent = ({ data }) => {
    return (
        <motion.div 
            className='flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
            <ReviewAverage />
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ReviewReview 
                            pseudo={item.pseudo} 
                            rating={item.rating} 
                            review={item.review} 
                            date={item.date} 
                            picture={item.image} 
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ReviewComponent;