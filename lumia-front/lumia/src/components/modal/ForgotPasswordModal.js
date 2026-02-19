import React, { useEffect } from 'react';
import LumiaIcon from '../../icons-svg/LumiaIcon';

import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';

const ForgotPasswordModal = ({ onClose, onBackToLogin }) => {
	const selectedLang = useLang();

	// Empêcher le défilement en arrière-plan
	useEffect(() => {
		// Sauvegarder la valeur actuelle d'overflow
		const originalOverflow = document.body.style.overflow;
		// Empêcher le défilement
		document.body.style.overflow = 'hidden';
		
		// Nettoyer lors du démontage du composant
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl w-96 z-50 relative">
				<div className="flex flex-col items-center mb-6">
					<div className="w-16 mb-4">
						<LumiaIcon />
					</div>
					<h2 className="text-2xl font-bold text-center dark:text-white">{TranslationsDictionary[selectedLang]?.["reset_password"]}</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
						{TranslationsDictionary[selectedLang]?.["enter_mail_recover"]}
					</p>
				</div>

				<form className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						{TranslationsDictionary[selectedLang]?.["enter"]}
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
							placeholder="Enter your email"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 bg-[#5328EA] text-white rounded-lg hover:bg-[#4520c4] dark:bg-[#9579FA] dark:hover:bg-[#7855E6] transition-colors"
					>
						{TranslationsDictionary[selectedLang]?.["send_reset"]}
					</button>
				</form>

				<div className="mt-6 text-center">
					<button
						onClick={onBackToLogin}
						className="text-sm text-[#5328EA] hover:text-[#7855E6] dark:text-[#9579FA] dark:hover:text-[#7855E6] transition-colors"
					>
						{TranslationsDictionary[selectedLang]?.["back_login"]}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordModal
