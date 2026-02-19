import React, { useState, useEffect } from 'react';
import GoogleIcon from '../../icons-svg/GoogleIcon';
import LumiaIcon from '../../icons-svg/LumiaIcon';
import { Check } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useLang } from '../../LangProvider';
import TranslationsDictionary from '../../Translations';
import Turnstile from '../Turnstile';

const SignUpModal = ({ onClose, onLoginClick, redirectTo }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptNewsletter, setAcceptNewsletter] = useState(false);
    const [token, setToken] = useState(null);
    const [turnstileError, setTurnstileError] = useState(false);
    const selectedLang = useLang();
    const navigate = useNavigate();

    const siteKey = process.env.REACT_APP_SITE_KEY;

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleTurnstileError = () => {
        console.warn("Turnstile error - proceeding without verification in dev mode");
        setTurnstileError(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            setError("Veuillez compléter la vérification de sécurité");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const responseReg = await axios.post(`/api/newUser?cf-turnstile-response=${token}`, {
                email: email,
                password: password,
                userName: userName,
                subscribed: acceptNewsletter,
            });

            console.log("Inscription réussie:", responseReg.data);

            const loginResponse = await axios.post("/api/login", {
                email: email,
                password: password,
            });

            if (loginResponse.data.accessToken) {
                localStorage.setItem("accessToken", loginResponse.data.accessToken);
                localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
                localStorage.setItem("roles", JSON.stringify(loginResponse.data.roles || [loginResponse.data.role]));
                localStorage.setItem('id', loginResponse.data.userId);

                // Récupérer les informations utilisateur
                const responseUser = await axios.get(`/api/users/${loginResponse.data.userId}`, {
                    headers: {
                        "Authorization": `Bearer ${loginResponse.data.accessToken}`,
                    },
                });

                // Stocker toutes les informations utilisateur
                localStorage.setItem("emailVerified", responseUser.data.emailVerified);
                localStorage.setItem("userName", responseUser.data.userName);
                localStorage.setItem("email", responseUser.data.email);
                localStorage.setItem("lumiaCoin", responseUser.data.lumiaCoin || 0);
                localStorage.setItem("roles", JSON.stringify(responseUser.data.roles || []));
                localStorage.setItem("xp", responseUser.data.xp || 0);
                localStorage.setItem("level", responseUser.data.level || 1);
                localStorage.setItem('newsletter', responseUser.data.subscribed);
                localStorage.setItem('tutoAsk', true);
            
                console.log(TranslationsDictionary[selectedLang]?.["login_success"] || "Login successful");

                // Fermer le modal et rediriger ou recharger
                onClose();
                if (redirectTo) {
                    window.location.replace(redirectTo);
                } else {
                    window.location.reload();
                }
            } else {
                throw new Error(TranslationsDictionary[selectedLang]?.["missing_token"]);
            }

        } catch (error) {
            console.error(TranslationsDictionary[selectedLang]?.["registration_error"], error);

            if (error.response) {
                if (error.response.status === 403) {
                    setError(TranslationsDictionary[selectedLang]?.['banned_email'] || 'Cet e-mail est banni. Inscription impossible.');
                } else if (error.response.status === 409) {
                    setError(TranslationsDictionary[selectedLang]?.["user_exists"] || "A user with this email or username already exists.");
                } else if (error.response.status === 401) {
                    setError(TranslationsDictionary[selectedLang]?.["login_error"] || "Login error. Please check your credentials.");
                    setTimeout(() => {
                        onLoginClick();
                    }, 2000);
                } else {
                    setError(TranslationsDictionary[selectedLang]?.["registration_error"] || "Registration error. Please try again.");
                }
            } else if (error.request) {
                setError(TranslationsDictionary[selectedLang]?.["server_prob"]);
            } else {
                setError(TranslationsDictionary[selectedLang]?.["registration_error"] || "Registration error. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl w-96 z-50 relative ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5328EA]"></div>
                    </div>
                )}

                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 mb-4">
                        <LumiaIcon />
                    </div>
                    <h2 className="text-2xl font-bold text-center dark:text-white">
                        {TranslationsDictionary[selectedLang]?.["join_researcher"]}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {TranslationsDictionary[selectedLang]?.["already_account"]} {' '}
                        <button
                            onClick={onLoginClick}
                            className="text-[#5328EA] hover:text-[#7855E6] dark:text-[#9579FA] dark:hover:text-[#7855E6] transition-colors"
                        >
                            {TranslationsDictionary[selectedLang]?.["sign_in"]}
                        </button>
                    </p>
                </div>
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
                            placeholder="Ney"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {TranslationsDictionary[selectedLang]?.["email"]}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
                            placeholder="john.doe@example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {TranslationsDictionary[selectedLang]?.["password"]}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#5328EA] focus:border-[#5328EA] dark:text-white dark:focus:ring-[#9579FA] dark:focus:border-[#9579FA]"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <Turnstile
                        siteKey={siteKey}
                        onVerify={(t) => setToken(t)}
                        onError={handleTurnstileError}
                        onExpire={() => setToken(null)}
                    />

                    <div className="flex items-start space-x-3">
                        <div className="relative w-5 h-5">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="peer appearance-none w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-600
                                       hover:border-[#5328EA] dark:hover:border-[#9579FA] cursor-pointer transition-all duration-200
                                       checked:border-[#5328EA] checked:bg-[#5328EA] dark:checked:border-[#9579FA] dark:checked:bg-[#9579FA]"
                                disabled={isLoading}
                                required
                            />
                            <Check className="absolute inset-0 w-3.5 h-3.5 text-white m-auto
                                          opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                            {TranslationsDictionary[selectedLang]?.["agree_to"]}{' '}
                            <button
                                type="button"
                                onClick={() => window.open('/cgu', '_blank')}
                                className="font-medium text-[#5328EA] hover:text-[#7855E6] dark:text-[#9579FA] dark:hover:text-[#7855E6] transition-colors"
                            >
                                {TranslationsDictionary[selectedLang]?.["terms_of_service"]}
                            </button>
                            {' '}{TranslationsDictionary[selectedLang]?.["and"]}{' '}
                            <button
                                type="button"
                                onClick={() => window.open('/confidentialite', '_blank')}
                                className="font-medium text-[#5328EA] hover:text-[#7855E6] dark:text-[#9579FA] dark:hover:text-[#7855E6] transition-colors"
                            >
                                {TranslationsDictionary[selectedLang]?.["privacy_policy"]}
                            </button>
                        </label>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#5328EA] text-white rounded-lg hover:bg-[#4520c4] dark:bg-[#9579FA] dark:hover:bg-[#7855E6] transition-colors disabled:opacity-50"
                        disabled={isLoading || !acceptTerms || (!token)}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {TranslationsDictionary[selectedLang]?.["loading"] || "Chargement..."}
                            </span>
                        ) : (
                            TranslationsDictionary[selectedLang]?.["create_account"]
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;