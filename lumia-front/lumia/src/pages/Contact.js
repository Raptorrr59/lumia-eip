import React from 'react';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import { motion } from 'framer-motion';

const Contact = () => {
  const selectedLang = useLang();

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#010116] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <h1 className="text-4xl sm:text-5xl font-Gotham font-bold text-center text-[#5328EA] dark:text-white mb-12">
          {TranslationsDictionary[selectedLang]?.["contact_us"] || "Nous contacter"}
        </h1>

        <div className="bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl p-8 sm:p-12 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
          <p className="mb-6">
          {TranslationsDictionary[selectedLang]?.["contact_at"]} <strong>Lumia</strong>{TranslationsDictionary[selectedLang]?.["contact_intro"]}
          </p>
          <p className="mb-6">
          {TranslationsDictionary[selectedLang]?.["contact_explain"]}
          </p>
          <p className="mb-8">
          {TranslationsDictionary[selectedLang]?.["contact_link"]}
          </p>

          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeZeRs3OxILmEQNnfJTyQDbV6JNtKwGYyFNviOdQPlFwKVU9A/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#5328EA] hover:bg-[#7855E6] text-white font-semibold rounded-lg shadow-md transition duration-300 text-center"
            >
              {TranslationsDictionary[selectedLang]?.["contact_fill"]}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
