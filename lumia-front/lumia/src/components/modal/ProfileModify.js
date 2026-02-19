import React, { useState, useEffect } from 'react';
import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';
import axios from "axios";
import { motion } from 'framer-motion';

const ProfileModify = ({ isOpen, onClose }) => {
    const selectedLang = useLang();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [lumiaCoins, setLumiaCoins] = useState(() => localStorage.getItem('lumiaCoin') || '0');
    const [newsletter, setNewsletter] = useState(() => localStorage.getItem('newsletter') === 'true');
    const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
    const [tutos, setTutos] = useState(false);
    const [isTutosLoading, setIsTutosLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');

    useEffect(() => {
        const handleStorageChange = () => {
            setLumiaCoins(localStorage.getItem('lumiaCoin') || '0');
        };

        window.addEventListener('storage', handleStorageChange);

        const interval = setInterval(() => {
            const currentCoins = localStorage.getItem('lumiaCoin') || '0';
            if (currentCoins !== lumiaCoins) {
                setLumiaCoins(currentCoins);
            }
        }, 500);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [lumiaCoins]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError(TranslationsDictionary[selectedLang]?.["password_mismatch"] || "Passwords don't match");
            return;
        }

        if (password.length < 8) {
            setPasswordError(TranslationsDictionary[selectedLang]?.["password_too_short"] || "Password must be at least 8 characters");
            return;
        }
        if (!oldPassword) {
            setPasswordError(TranslationsDictionary[selectedLang]?.["old_password_required"] || "Current password is required");
            return;
        }
        try {
            const userId = localStorage.getItem('id');
            await axios.put(`/api/${userId}/password`, { oldPassword: oldPassword, newPassword: password }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setSuccessMessage(TranslationsDictionary[selectedLang]?.["password_updated"] || "Password updated successfully");
            setPassword('');
            setConfirmPassword('');
            setOldPassword('');
            setTimeout(() => {
                onClose();
                window.location.href = '/';
            }, 1500);
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordError(TranslationsDictionary[selectedLang]?.["update_error"] || "Error updating password");
        }
    };

    const handleNewsletterToggle = async () => {
        setIsNewsletterLoading(true);
        try {
            const userId = localStorage.getItem('id');
            console.log(userId)
            console.log(newsletter)
            console.log(localStorage.getItem('accessToken'))
            await axios.patch('/api/set-news-letter', null, {
                params: {
                    userId: userId,
                    subscribed: !newsletter
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                }
            });


            setNewsletter(!newsletter);
            localStorage.setItem('newsletter', (!newsletter).toString());
        } catch (error) {
            console.error(TranslationsDictionary[selectedLang]?.["update_error"] || "Error updating newsletter subscription", error);
        } finally {
            setIsNewsletterLoading(false);
        }
    };

    const handleTutosToggle = async () => {
        setIsTutosLoading(true);
        try {
            localStorage.setItem('tutoAsk', true);

            setTutos(!tutos);
            localStorage.setItem('tutoAsk', (!tutos).toString());
        } catch (error) {
            console.error(TranslationsDictionary[selectedLang]?.["update_error"] || "Error updating tutos subscription", error);
        } finally {
            setIsTutosLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-4xl w-full bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg overflow-hidden"
            >
                <div className="md:flex">
                    {/* Profile sidebar */}
                    <div className="md:w-1/3 bg-gradient-to-b from-[#5328EA] to-[#9579FA] p-8 text-white">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white mb-4">
                                <span className="text-[48px] font-semibold text-[#5328EA]">
                                    {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold mb-1 break-all overflow-hidden">
                                {localStorage.getItem("userName")?.length > 20
                                    ? localStorage.getItem("userName").substring(0, 20) + "..."
                                    : localStorage.getItem("userName")}
                            </h2>
                            <p className="text-sm opacity-80 mb-6 break-all overflow-hidden">{localStorage.getItem("email")}</p>

                            <div className="w-full bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                                <p className="text-sm font-medium">{TranslationsDictionary[selectedLang]?.["subscription"]}</p>
                                <div className="flex items-center">
                                    <img
                                        src="https://i.imgur.com/wJV8pnT.png"
                                        alt="LumiaCoins"
                                        className="w-5 h-5 mr-2"
                                    />
                                    <p className="text-lg font-bold">{lumiaCoins}</p>
                                </div>
                            </div>

                            <div className="w-full bg-white bg-opacity-20 rounded-lg p-3">
                                <p className="text-sm font-medium">{TranslationsDictionary[selectedLang]?.["geo_area"]}</p>
                                <p className="text-lg font-bold">{localStorage.getItem("place") || "France"}</p>
                            </div>

                            <div className="w-full bg-white bg-opacity-20 rounded-lg p-3 mt-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{TranslationsDictionary[selectedLang]?.["newsletter"] || "Newsletter"}</p>
                                    <button
                                        onClick={handleNewsletterToggle}
                                        disabled={isNewsletterLoading}
                                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${newsletter ? 'bg-[#5328EA]' : 'bg-gray-400'
                                            }`}
                                    >
                                        <span
                                            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${newsletter ? 'translate-x-7' : 'translate-x-0'
                                                } ${isNewsletterLoading ? 'animate-pulse' : ''}`}
                                        />
                                    </button>
                                </div>
                                {isNewsletterLoading && (
                                    <p className="text-xs text-white mt-2">{TranslationsDictionary[selectedLang]?.["loading"] || "Newsletter"}</p>
                                )}
                            </div>
                            <div className="w-full bg-white bg-opacity-20 rounded-lg p-3 mt-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{TranslationsDictionary[selectedLang]?.["tutorials"] || "Tutorials"}</p>
                                    <button
                                        onClick={handleTutosToggle}
                                        disabled={isTutosLoading}
                                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${tutos ? 'bg-[#5328EA]' : 'bg-gray-400'
                                            }`}
                                    >
                                        <span
                                            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${tutos ? 'translate-x-7' : 'translate-x-0'
                                                } ${isTutosLoading ? 'animate-pulse' : ''}`}
                                        />
                                    </button>
                                </div>
                                {isTutosLoading && (
                                    <p className="text-xs text-white mt-2">{TranslationsDictionary[selectedLang]?.["loading"] || "Tutorials"}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="md:w-2/3 p-8 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {TranslationsDictionary[selectedLang]?.["account_settings"]}
                        </h1>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-[#5328EA] mb-4">
                                {TranslationsDictionary[selectedLang]?.["basic_infos"]}
                            </h2>

                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {TranslationsDictionary[selectedLang]?.["username"]}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            disabled
                                            value={localStorage.getItem("userName")?.length > 20
                                                ? localStorage.getItem("userName").substring(0, 20) + "..."
                                                : localStorage.getItem("userName") || ''}
                                            className="w-full bg-gray-200 dark:bg-gray-700 px-4 py-2 pr-10 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-300 dark:border-gray-600"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {TranslationsDictionary[selectedLang]?.["cannot_change"]}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {TranslationsDictionary[selectedLang]?.["email"]}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            disabled
                                            value={localStorage.getItem("email") || ''}
                                            className="w-full bg-gray-200 dark:bg-gray-700 px-4 py-2 pr-10 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed border border-gray-300 dark:border-gray-600 truncate"
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {TranslationsDictionary[selectedLang]?.["cannot_change"]}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-8">
                                <h2 className="text-lg font-semibold text-[#5328EA] mb-4">
                                    {TranslationsDictionary[selectedLang]?.["change_password"] || "Mot de passe"}
                                </h2>

                                {successMessage && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                        {successMessage}
                                    </div>
                                )}

                                {passwordError && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                        {passwordError}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {TranslationsDictionary[selectedLang]?.["current_password"] || "Current password"}
                                        </label>
                                        <input
                                            id="oldPassword"
                                            type="password"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5328EA] dark:bg-gray-800 dark:text-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {TranslationsDictionary[selectedLang]?.["new_password"] || "Nouveau mot de passe"}
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5328EA] dark:bg-gray-800 dark:text-white"
                                            placeholder="••••••••"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {TranslationsDictionary[selectedLang]?.["password_min_length"] || "Minimum 8 characters"}
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {TranslationsDictionary[selectedLang]?.["confirm_password"] || "Confirmer le mot de passe"}
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5328EA] dark:bg-gray-800 dark:text-white"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#5328EA] to-[#9579FA] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5328EA]"
                                    >
                                        {TranslationsDictionary[selectedLang]?.["finish"] || "Terminer"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileModify;
