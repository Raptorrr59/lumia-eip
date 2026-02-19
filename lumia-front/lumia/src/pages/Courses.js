import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import RedirectionCourse from '../components/redirections/RedirectionCourse';
import { motion } from 'framer-motion';
import RedirectionFormation from '../components/redirections/RedirectionFormation';
import { coursesDataFr } from '../utils/CoursesDataFR';
import { coursesDataEn } from '../utils/CoursesDataEN';
import axios from 'axios';
import TutorialPopup from '../components/tutorials/TutorialPopup';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';
import { tutorialCoursesFr } from '../utils/TutorialUtilsFR';
import { tutorialCoursesEn } from '../utils/TutorialUtilsEN';
import { formationsFrData, formationsEnData } from '../utils/Formations';

const Courses = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [selectedDifficulties, setSelectedDifficulties] = useState([]);
	const [selectedDurees, setSelectedDurees] = useState([]);
	const selectedLang = useLang();
	const [showTutorialPopup, setShowTutorialPopup] = useState(false);
  const [pendingNavTutorial, setPendingNavTutorial] = useState(false);
  const [navTutorialTarget, setNavTutorialTarget] = useState(null);
  const [isNavTutorialActive, setIsNavTutorialActive] = useState(false);
	
	const formationsData = selectedLang === 'FR' ? formationsFrData : formationsEnData;
	
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const checkTutorialAsk = () => {
			const tutoAsk = localStorage.getItem('tutoCourses');
			if (tutoAsk === 'true') {
				setShowTutorialPopup(true);
			}
		};
		
		checkTutorialAsk();
	}, []);

  useEffect(() => {
    if (pendingNavTutorial && !showTutorialPopup) {
      const target = document.querySelector("[data-tutorial-target='nav-games']");
      if (target) {
        setNavTutorialTarget(target);
        setIsNavTutorialActive(true);
        setPendingNavTutorial(false);
      }
    }
  }, [pendingNavTutorial, showTutorialPopup]);

	const languageList = ["Python",];

	const difficultyList = [
		TranslationsDictionary[selectedLang]?.["debutant"],
		TranslationsDictionary[selectedLang]?.["intermediaire"],
		TranslationsDictionary[selectedLang]?.["avance"],
		TranslationsDictionary[selectedLang]?.["expert"]
	];

	const dureeList = [
		TranslationsDictionary[selectedLang]?.["fast"],
		TranslationsDictionary[selectedLang]?.["medium"],
		TranslationsDictionary[selectedLang]?.["long"],
		TranslationsDictionary[selectedLang]?.["longer"]
	];

	// Gestion des filtres
	const handleLanguageChange = (language) => {
		setSelectedLanguages((prev) =>
			prev.includes(language)
				? prev.filter((l) => l !== language)
				: [...prev, language]
		);
	};

	const handleDifficultyChange = (diff) => {
		setSelectedDifficulties((prev) =>
			prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
		);
	};

	const handleDureeChange = (duree) => {
		setSelectedDurees((prev) =>
			prev.includes(duree) ? prev.filter((dr) => dr !== duree) : [...prev, duree]
		);
	};

	const handleClearFilters = () => {
		setSelectedLanguages([]);
		setSelectedDifficulties([]);
		setSelectedDurees([]);
	};

	// Filtrage
	const filteredCourses = useMemo(() => {
		const coursesData = selectedLang === 'FR' ? coursesDataFr : coursesDataEn;
		return coursesData.filter((course) => {
			const matchSearch =
				course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				course.language.toLowerCase().includes(searchTerm.toLowerCase());

			const matchLang =
				selectedLanguages.length === 0 ||
				selectedLanguages.includes(course.language);

			const matchDiff =
				selectedDifficulties.length === 0 ||
				selectedDifficulties.includes(course.difficulty);

			const matchDuree =
				selectedDurees.length === 0 ||
				selectedDurees.includes(course.duree);

			return matchSearch && matchLang && matchDiff && matchDuree;
		});
	}, [searchTerm, selectedLanguages, selectedDifficulties, selectedDurees]);

	const [completionData, setCompletionData] = useState({
	  courses: [],
	  formations: []
	});
	
	useEffect(() => {
	  const loadUserProgress = async () => {
	    const userId = localStorage.getItem('id');
	    const accessToken = localStorage.getItem('accessToken');
	    
	    if (userId && accessToken) {
	      try {
	        const response = await axios.get(`/api/user/${userId}`, {
	          headers: {
	            'Authorization': `Bearer ${accessToken}`
	          }
	        });
	        
	        const userProgress = response.data;
	        const completedCourses = [];
	        const completedFormations = [];
	        
	        userProgress.forEach(progress => {
	          if (progress.completedCourses) {
	            completedCourses.push(...progress.completedCourses);
	          }
	          if (progress.moduleCompleted) {
	            completedFormations.push(progress.moduleId);
	          }
	        });
	        
	        // Vérifier automatiquement les formations complètes
	        const autoCompletedFormations = [];
	        formationsData.forEach(formation => {
	          const allCoursesCompleted = formation.content.every(course => 
	            completedCourses.includes(course.id)
	          );
	          if (allCoursesCompleted && !completedFormations.includes(formation.id)) {
	            autoCompletedFormations.push(formation.id);
	          }
	        });
	        
	        setCompletionData({
	          courses: [...new Set(completedCourses)],
	          formations: [...new Set([...completedFormations, ...autoCompletedFormations])]
	        });
	      } catch (error) {
	        console.error('Error loading user progress:', error);
	        // Fallback vers localStorage si l'API échoue
	        const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
	        const completedFormations = JSON.parse(localStorage.getItem('completedFormations') || '{}');
	        
	        setCompletionData({
	          courses: completedCourses[userId] || [],
	          formations: completedFormations[userId] || []
	        });
	      }
	    }
	  };
	  
	  loadUserProgress();
	  
	  // Recharger les données quand on revient sur la page
	  const handleFocus = () => {
	    loadUserProgress();
	  };
	  
	  window.addEventListener('focus', handleFocus);
	  return () => window.removeEventListener('focus', handleFocus);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#010116] dark:to-[#0a0a29] pb-20">
			{/* En-tête avec bannière */}
			<div className="w-full bg-gradient-to-r from-[#5328EA] to-[#7855E6] relative overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
				</div>
				
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
							{TranslationsDictionary[selectedLang]?.["our_courses"] || "Nos cours"}
						</h1>
						<p className="text-xl text-white/80 max-w-3xl mx-auto">
							{TranslationsDictionary[selectedLang]?.["courses_subtitle"] || "Découvrez notre collection de cours interactifs conçus pour vous aider à maîtriser l'IA."}
						</p>
					</motion.div>
				</div>
				
				{/* Vagues décoratives en bas de la bannière - avec les pointes moins prononcées */}
				<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 translate-y-8">
					<svg className="relative block w-full h-10 sm:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
						<path d="M0,0 L300,40 L600,40 L900,40 L1200,0 L1200,120 L0,120 Z" className="fill-white dark:fill-[#010116]"></path>
					</svg>
				</div>
			</div>

			{/* Section de recherche et filtres */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-12 relative z-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
				>
					<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
						<div className="w-full md:w-2/3">
							<SearchBar 
								searchTerm={searchTerm} 
								onChange={handleSearchChange} 
								placeholder={TranslationsDictionary[selectedLang]?.["search_course"] || "Rechercher un cours..."} 
							/>
						</div>
						<div className="w-full md:w-1/3 flex justify-end">
							<FilterDropdown
								languageOptions={languageList}
								typeOptions={difficultyList}
								categoryOptions={dureeList}
								selectedLanguages={selectedLanguages}
								onLanguageChange={handleLanguageChange}
								selectedTypes={selectedDifficulties}
								onTypeChange={handleDifficultyChange}
								selectedCategories={selectedDurees}
								onCategoryChange={handleDureeChange}
								onClear={handleClearFilters}
							/>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Contenu principal */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Parcours de formation */}
				<motion.section 
					initial={{ opacity: 0 }} 
					animate={{ opacity: 1 }} 
					transition={{ duration: 0.7, delay: 0.3 }}
					className="mb-16"
				>
					<div className="flex items-center mb-8">
						<div className="w-2 h-8 bg-[#5328EA] rounded-full mr-3"></div>
						<h2 className="text-2xl sm:text-3xl font-bold text-[#010116] dark:text-white">
							{TranslationsDictionary[selectedLang]?.["learning_paths"] || "Parcours de formation"}
						</h2>
					</div>
					
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{formationsData.map((formation, index) => {
							// Vérifier si tous les cours de la formation sont terminés
							const allCoursesCompleted = formation.content.every(course => 
								completionData.courses.includes(course.id)
							);
							
							// Une formation est complète si elle est marquée comme telle OU si tous ses cours sont terminés
							const isFormationCompleted = completionData.formations.includes(formation.id) || allCoursesCompleted;
							
							return (
								<motion.div 
									key={formation.id} 
									initial={{ opacity: 0, scale: 0.95 }} 
									animate={{ opacity: 1, scale: 1 }} 
									transition={{ duration: 0.4, delay: 0.1 * index }}
									className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
								>
									<RedirectionFormation
										id={formation.id}
										name={formation.name}
										image={formation.image}
										difficulty={formation.difficulty}
										isFree={formation.isFree}
										locked={formation.locked}
										content={formation.content}
										completed={isFormationCompleted}
									/>
								</motion.div>
							);
						})}
					</div>
				</motion.section>

				{/* Tous les cours */}
				<motion.section 
					initial={{ opacity: 0 }} 
					animate={{ opacity: 1 }} 
					transition={{ duration: 0.7, delay: 0.5 }}
				>
					<div className="flex items-center mb-8">
						<div className="w-2 h-8 bg-[#FF774D] rounded-full mr-3"></div>
						<h2 className="text-2xl sm:text-3xl font-bold text-[#010116] dark:text-white">
							{TranslationsDictionary[selectedLang]?.["all_courses"] || "Tous les cours"}
						</h2>
					</div>
					
					{filteredCourses.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredCourses.map((course, index) => {
								// Utiliser completionData au lieu de localStorage directement
								const isCourseCompleted = completionData.courses.includes(course.id);
								
								return (
									<motion.div 
										key={course.id} 
										initial={{ opacity: 0, scale: 0.95 }} 
										animate={{ opacity: 1, scale: 1 }} 
										transition={{ duration: 0.4, delay: 0.05 * (index % 8) }}
										className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
									>
										<RedirectionCourse
											id={course.id}
											name={course.name}
											difficulty={course.difficulty}
											language={course.language}
											image={course.image}
											duration={course.duree}
											isFree={course.isFree}
											locked={course.locked}
											completed={isCourseCompleted}
										/>
									</motion.div>
								);
							})}
						</div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-12"
						>
							<p className="text-gray-500 dark:text-gray-400 text-lg">
								{TranslationsDictionary[selectedLang]?.["no_courses_found"] || "Aucun cours trouvé avec ces filtres."}
							</p>
						</motion.div>
					)}
				</motion.section>
			</div>
			<TutorialPopup
				isOpen={showTutorialPopup}
				onClose={() => {
					setShowTutorialPopup(false);
					localStorage.setItem('tutoCourses', 'false');
				}}
				tutorialPages={selectedLang === 'EN' ? tutorialCoursesEn : tutorialCoursesFr}
				initial={false}
        onComplete={() => {
          setPendingNavTutorial(true);
        }}
			/>
      {isNavTutorialActive && navTutorialTarget && (
        <TutorialInteractif
          target={navTutorialTarget}
          text={selectedLang === 'EN' ? "Click here to open the Games page" : "Clique ici pour ouvrir la page des jeux"}
          onClose={() => {
            setIsNavTutorialActive(false);
            setNavTutorialTarget(null);
          }}
        />
      )}
		</div>
	);
};

export default Courses;
