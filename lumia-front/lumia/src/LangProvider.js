import React, { createContext, useState, useContext, useEffect } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
    const [selectedLang] = useState(localStorage.getItem('language') || 'FR');

    useEffect(() => {
      localStorage.setItem('language', selectedLang);
    }, [selectedLang]);

    return (
      <LangContext.Provider value={selectedLang}>
        {children}
      </LangContext.Provider>
    );
  };

  export const useLang = () => {
    const selectedLang = useContext(LangContext);
    if (!selectedLang) {
      throw new Error('useLang must be used within a LangProvider');
    }
    return selectedLang;
};
