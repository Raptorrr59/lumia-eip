import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import TranslationsDictionary from '../Translations';
import { Link } from "react-router-dom";
import { useLang } from '../LangProvider';

const Footer = () => {
	const selectedLang = useLang();
  
	const handleLinkClick = () => {
	  window.scrollTo(0, 0);
	};
  
	return (
	  <footer className="bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white py-12 px-8">
		<div className="container mx-auto flex flex-wrap justify-between">
		  {/* Logo */}
		  <div className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col items-center md:items-start">
			<div className="w-36 hover:opacity-90 transition-opacity duration-300">
			  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280.57 611.91" className="fill-white drop-shadow-md">
				<g>
				  <path d="M225.45,489.74l-38.34,49.21H18.02v-191.4h59.22v142.19h148.2Z" />
				  <path d="M493.81,455.41c0,57.79-39.77,86.69-119.3,86.69-92.12,0-131.89-28.9-131.89-86.69v-107.86h58.94v107.86c0,28.32,12.02,37.48,72.96,37.48,45.49,0,59.8-10.59,59.8-37.48v-107.86h59.51v107.86Z" />
				  <path d="M648.87,418.79c16.88,29.47,24.32,43.77,30.9,57.22,6.29-13.45,13.73-27.47,30.61-56.93l30.61-54.36c6.87-12.3,17.17-20.31,32.62-20.31s28.04,8.58,33.19,26.32l48.35,168.23h-58.94l-18.02-66.66c-6.01-21.74-10.01-37.19-13.16-52.64-6.29,13.45-13.45,28.04-26.61,52.93l-25.75,48.07c-10.01,18.88-19.74,21.46-34.05,21.46s-24.03-2.58-34.05-21.46l-25.75-48.35c-14.02-26.32-20.89-39.77-26.89-52.64-2.86,15.16-7.15,31.19-12.88,52.64l-18.02,66.66h-58.08l49.5-168.23c5.15-17.74,18.6-26.32,33.47-26.32s25.46,7.72,32.33,20.31l30.61,54.07Z" />
				  <path d="M936.97,538.95h-59.22v-191.4h59.22v191.4Z" />
				  <path d="M1054.84,538.95l35.76-49.21h48.07c11.44,0,24.89,0,34.05.57-5.15-6.87-13.16-18.6-19.46-27.75l-34.33-50.64-89.84,127.03h-70.09l122.74-173.09c8.01-11.16,19.74-21.46,38.34-21.46s29.47,9.44,37.77,21.46l119.59,173.09h-222.59Z" />
				</g>
				<path d="M556.17,183c0,19.27-15.62,34.89-34.89,34.89s-34.89-15.62-34.89-34.89,15.62-34.89,34.89-34.89c.68,0,1.39.02,2.07.07-2.24,3.5-3.52,7.68-3.52,12.12,0,12.54,10.16,22.7,22.7,22.7,4.99,0,9.61-1.63,13.35-4.36.2,1.43.29,2.88.29,4.36Z" />
				<path d="M717.72,217.82c-19.23,1.23-35.82-13.35-37.07-32.58-1.23-19.23,13.35-35.82,32.58-37.07,1.94-.13,3.85-.09,5.72.09-2.2,3.5-3.48,7.61-3.48,12.03,0,12.54,10.16,22.7,22.7,22.7,4.4,0,8.54-1.28,12.01-3.45.04.4.09.79.11,1.21,1.23,19.23-13.33,35.82-32.58,37.07Z" />
				<g>
				  <path d="M617.87,28.87c-132.27,0-239.88,107.61-239.88,239.88h31.69c0-114.79,93.39-208.19,208.19-208.19s208.19,93.39,208.19,208.19h31.69c0-132.27-107.61-239.88-239.88-239.88Z" />
				  <path d="M938.57,8.22c.71-3.76-1.76-7.39-5.53-8.1-3.76-.7-7.39,1.76-8.1,5.53l-27.59,146.12c-11.13-10.4-27.29-14.71-42.78-10.18C809.15,57.37,720.09,0,617.87,0s-190.69,56.97-236.26,140.73c-9.77-2.08-19.88-.85-28.95,3.67-3.68,1.84-7.02,4.16-9.99,6.84L315.18,5.65c-.71-3.76-4.34-6.23-8.1-5.53-3.76.71-6.24,4.34-5.53,8.1l29.74,157.51c.07.4.19.77.32,1.14-.44,1.04-.87,2.08-1.23,3.16-7.13,21.29,2.88,44.21,22.5,53.85-2.46,14.6-3.77,29.59-3.77,44.88h13.87c0-140.54,114.34-254.88,254.89-254.88s254.88,114.34,254.88,254.88h13.87c0-14.76-1.22-29.24-3.52-43.37,21.89-8.52,33.51-32.86,25.98-55.36-.27-.82-.62-1.59-.93-2.38.31-.59.56-1.22.69-1.91l29.74-157.51Z" />
				</g>
			  </svg>
			</div>
			<p className="text-sm mt-4 text-white/80 max-w-xs hidden md:block">
			  {TranslationsDictionary[selectedLang]?.["slogan"] || "Lumia - Brillez dans l'IA, quel que soit votre départ !"}
			</p>
		  </div>
  
		  {/* Société */}
		  <div className="w-full md:w-1/5 mb-6 md:mb-0 flex flex-col items-center md:items-start">
			<h3 className="font-bold text-lg mb-4 border-b-2 border-white/30 pb-2 inline-block">{TranslationsDictionary[selectedLang]?.["company"]}</h3>
			<ul className="space-y-2">
			  <li><Link to="/about" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["about_us"]}</Link></li>
			  <li><Link to="/confidentialite" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["confidentiality"]}</Link></li>
			  <li><Link to="/mentions-legales" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["legal_notices"]}</Link></li>
			  <li><Link to="/cgu" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["tcu"]}</Link></li>
			  <li><Link to="/cgv" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["gtc"]}</Link></li>
			</ul>
		  </div>
  
		  {/* Utils */}
		  <div className="w-full md:w-1/5 mb-6 md:mb-0 flex flex-col items-center md:items-start">
			<h3 className="font-bold text-lg mb-4 border-b-2 border-white/30 pb-2 inline-block">{TranslationsDictionary[selectedLang]?.["utils"]}</h3>
			<ul className="space-y-2">
			  <li><Link to="/contact" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["contact"]}</Link></li>
			  <li><Link to="/faq" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["faq"] || "FAQ"}</Link></li>
			  <li><Link to="/leaderboard" className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["leaderboard"] || "Classement"}</Link></li>
			  <li><Link to='/games' className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["games"]}</Link></li>
			  <li><Link to='/courses' className="hover:text-[#9579FA] transition-colors duration-200 flex items-center" onClick={handleLinkClick}>{TranslationsDictionary[selectedLang]?.["courses"]}</Link></li>
			</ul>
		  </div>
		  {/* Social Media */}
		  <div className="w-full md:w-1/5 flex flex-col items-center md:items-start">
			<h3 className="font-bold text-lg mb-4 border-b-2 border-white/30 pb-2 inline-block">{TranslationsDictionary[selectedLang]?.["our_networks"]}</h3>
			<div className="flex space-x-4 mb-4">
			  <button 
				aria-label="Instagram" 
				onClick={() => window.open('https://instagram.com/lumia_project', '_blank')} 
				className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
			  >
				<Instagram size={20} />
			  </button>
			</div>
			<div className="mt-4">
			  <p className="text-sm text-white/80">
				{TranslationsDictionary[selectedLang]?.["contact_us_at"] || "Contact us at:"}
			  </p>
			  <a href="mailto:contact@lumia.ai" className="text-sm hover:text-[#9579FA] transition-colors duration-200">
				contact@lumia.ai
			  </a>
			</div>
		  </div>
		</div>
		
		<div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/70">
		  {TranslationsDictionary[selectedLang]?.["all_rights"]} | Lumia © {new Date().getFullYear()}
		</div>
	  </footer>
	);
  };
  
  export default Footer;