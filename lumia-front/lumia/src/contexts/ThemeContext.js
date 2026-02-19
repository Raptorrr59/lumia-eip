import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem('darkMode');
		// Si aucune préférence sauvegardée, utiliser dark mode par défaut
		return savedTheme !== null ? savedTheme === 'true' : true;
	});

	const [daltonismType, setDaltonismType] = useState(() => {
		return localStorage.getItem('daltonismType') || 'none';
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('darkMode', isDarkMode);
	}, [isDarkMode]);

	useEffect(() => {
		document.documentElement.setAttribute('data-daltonism', daltonismType);
		localStorage.setItem('daltonismType', daltonismType);
	}, [daltonismType]);

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, daltonismType, setDaltonismType }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
