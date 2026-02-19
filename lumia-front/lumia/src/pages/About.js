import React from 'react';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { motion } from 'framer-motion';

const About = () => {
  const selectedLang = useLang();
  const teamMembersData = [
    {
        name: "Marc Allari",
        role: "Backend Developer",
        description: TranslationsDictionary[selectedLang]?.["marc_description"],
        image: "https://i.imgur.com/hmnn9q3.png",
    },
    {
        name: "Alex di Venanzio",
        role: "Backend Developer",
        description: TranslationsDictionary[selectedLang]?.["alex_description"],
        image: "https://i.imgur.com/6FuTgKJ.jpeg",
    },
    {
        name: "Jonathan Vigin",
        role: "Backend Developer",
        description: TranslationsDictionary[selectedLang]?.["jonathan_description"],
        image: "https://i.imgur.com/tVgy89e.png",
    },
    {
        name: "Lucas Mariette",
        role: "Frontend Developer",
        description: TranslationsDictionary[selectedLang]?.["lucas_description"],
        image: "https://i.imgur.com/TtCtC28.jpeg",
    },
    {
        name: "Damien Birembaut",
        role: "Frontend Developer",
        description: TranslationsDictionary[selectedLang]?.["damien_description"],
        image: "https://i.imgur.com/UIAs8jO.jpeg",
    },
    {
        name: "Tiago Guterres Rodrigues",
        role: "Frontend Developer",
        description: TranslationsDictionary[selectedLang]?.["tiago_description"],
        image: "https://i.imgur.com/LYuSztH.jpeg",
    },
];

  return (
    <div className="min-h-screen bg-white dark:bg-[#010116] py-16 px-4 sm:px-6 lg:px-16 xl:px-24">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-Gotham font-bold text-[#5328EA] dark:text-white">
          {TranslationsDictionary[selectedLang]?.["our_team"]}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {TranslationsDictionary[selectedLang]?.["team_description"]}
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {teamMembersData.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Member Photo */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5328EA] to-[#9579FA] opacity-75 blur-md transform group-hover:scale-110 transition-all duration-300"></div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#1a1a2e] shadow-lg">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  "{member.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Values Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-24 text-center"
      >
        <h2 className="text-3xl font-Gotham font-bold text-[#5328EA] dark:text-white mb-12">
          {TranslationsDictionary[selectedLang]?.["our_values"]}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 dark:bg-[#1a1a2e] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#5328EA] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{TranslationsDictionary[selectedLang]?.["innovation"]}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {TranslationsDictionary[selectedLang]?.["innovation_description"] || "We push boundaries and explore new possibilities in AI education."}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-[#1a1a2e] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#5328EA] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{TranslationsDictionary[selectedLang]?.["accessibility"]}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {TranslationsDictionary[selectedLang]?.["accessibility_description"] || "Making AI education accessible to everyone, regardless of background."}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-[#1a1a2e] p-6 rounded-xl shadow-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#5328EA] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{TranslationsDictionary[selectedLang]?.["community"]}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {TranslationsDictionary[selectedLang]?.["community_description"] || "Building a supportive community of learners and educators."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
