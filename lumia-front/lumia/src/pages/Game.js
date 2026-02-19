import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../LangProvider';
import TranslationsDictionary from '../Translations';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import GameCode from '../components/GameCode';
import { TrophyIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewsCommunity from '../components/review/ReviewsCommunity';
import FileUploadModal from '../components/modal/FileUploadModal';
import LoginModal from '../components/modal/LoginModal';
import SignUpModal from '../components/modal/SignUpModal';
import axios from 'axios';
import { GameEnum } from '../components/games/GameEnum';
import TutorialInteractif from '../components/tutorials/TutorialInteractif';

const Game = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedLang = useLang();
    const game = location.state;
    const [showLeaderboard, setShowLeaderboard] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isAIUploadModalOpen, setIsAIUploadModalOpen] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [trainingStatus, setTrainingStatus] = useState(null);
    const [isTrainingComplete, setIsTrainingComplete] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const handleLeaderboardClick = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/leaderboard');
        } else {
            setShowLoginModal(true);
        }
    };

    const openLogin = () => {
        setShowSignUpModal(false);
        setShowLoginModal(true);
    };

    const openSignUp = () => {
        setShowLoginModal(false);
        setShowSignUpModal(true);
    };

    // Tutorial state + target refs
    const [isTrainTutorialActive, setIsTrainTutorialActive] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);

    const uploadAiButtonRef = React.useRef(null);
    const downloadTrainingButtonRef = React.useRef(null);
    const trainAiButtonRef = React.useRef(null);
    const checkStatusButtonRef = React.useRef(null);
    const downloadModelButtonRef = React.useRef(null);
    const gameHeaderRef = React.useRef(null);
    const gameCodeCardRef = React.useRef(null);
    const uploadAiButtonSendRef = React.useRef(null);
    const uploadAiButtonSendFinalRef = React.useRef(null);

    useEffect(() => {
        let flag = null;
        if (game.name === 'Image Recognition') {
            flag = localStorage.getItem('tutoGameTrain');
        } else {
            flag = localStorage.getItem('tutoGameNoTrain');
        }
        setIsTrainTutorialActive(flag === 'true');
    }, [game.id]);

    const tutorialTargets = React.useMemo(() => {
        const steps = [];
        steps.push({ ref: gameHeaderRef, text: TranslationsDictionary[selectedLang]?.["tutorial_welcome"] });
        if (game.name === 'Image Recognition') {
            steps.push({ ref: trainAiButtonRef, text: TranslationsDictionary[selectedLang]?.["tutorial_train_start"] });
            steps.push({ ref: checkStatusButtonRef, text: TranslationsDictionary[selectedLang]?.["tutorial_check_status"] });
            steps.push({ ref: downloadModelButtonRef, text: TranslationsDictionary[selectedLang]?.["tutorial_download_model"] });
        } else {
            steps.push({ ref: uploadAiButtonRef, text: TranslationsDictionary[selectedLang]?.["tutorial_upload_ai"] });
            steps.push({ ref: gameCodeCardRef, text: TranslationsDictionary[selectedLang]?.["tutorial_file_ready"] });
            steps.push({ ref: gameHeaderRef, text: TranslationsDictionary[selectedLang]?.["tutorial_check_logs"] });
            steps.push({ ref: downloadTrainingButtonRef, text: TranslationsDictionary[selectedLang]?.["tutorial_download_package"] });
        }
        steps.push({ ref: gameHeaderRef, text: TranslationsDictionary[selectedLang]?.["tutorial_proceed"] });

        return steps;
    }, [game.name, selectedLang]);

    useEffect(() => {
        if (!isTrainTutorialActive) return;
        const current = tutorialTargets[tutorialStep]?.ref?.current;
        if (!current) return;

        const onTargetClick = () => {
            setTutorialStep(prev => {
                const next = prev + 1;
                if (next >= tutorialTargets.length) {
                    if (game.name === 'Image Recognition') {
                        localStorage.setItem('tutoGameTrain', 'false');
                    } else {
                        localStorage.setItem('tutoGameNoTrain', 'false');
                    }
                    setIsTrainTutorialActive(false);
                    return prev;
                }
                return next;
            });
        };

        current.addEventListener('click', onTargetClick, { capture: true });
        return () => current.removeEventListener('click', onTargetClick, { capture: true });
    }, [isTrainTutorialActive, tutorialStep, tutorialTargets]);

    let stompClientRef = React.useRef(null);
    let isFileReadyRef = React.useRef(true);

    useEffect(() => {
        initializeWebSocket();
        return () => {
            closeWebSocket();
        };
    }, []);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(`/api/ranking/${GameEnum[game.id].name}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    setLeaderboardData(response.data);
                } else {
                    console.error("Invalid leaderboard data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };
        fetchLeaderboard();
    }, [game.id]);

    const initializeWebSocket = () => {
        const userId = localStorage.getItem('id');
        const dockerId = localStorage.getItem('dockerId') || 'defaultDocker';
        if (!userId) return;

        try {
            const socket = new SockJS('http://localhost:8000/ws');
            const client = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
            });

            client.onConnect = () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/', (message) => {
                    const messageBody = message.body;
                    console.log('Message WebSocket reçu:', messageBody);
                    const match = messageBody.match(/dockerId:\s*(\w+)/);
                    if (match && match[1]) {
                        const dockerId = match[1];
                        localStorage.setItem('dockerIdImage', dockerId);
                        console.log('dockerId:', dockerId);
                    }
                    isFileReadyRef.current = true;
                });
            };

            client.onStompError = (frame) => {
                console.error('Erreur STOMP:', frame.headers['message']);
                console.error('Détails:', frame.body);
            };

            client.activate();
            stompClientRef.current = client;
        } catch (error) {
            console.error("Erreur lors de l'initialisation WebSocket:", error);
        }
    };

    const closeWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenAIUploadModal = () => {
        setIsAIUploadModalOpen(true);
        setUploadError(null);
    };
    const handleCloseAIUploadModal = () => {
        setIsAIUploadModalOpen(false);
        setUploadError(null);
    };

    const handleAIFileUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('game', 'image');
            formData.append('isTraining', true);

            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if (response.status === 200) {
                setUploadError(null);
                setIsAIUploadModalOpen(false);
                setSelectedFile(null);
                setTrainingStatus(null);
                setIsTrainingComplete(false);
            } else {
                setUploadError(response.data.message);
            }
        } catch (error) {
            console.error('Error uploading AI file:', error);
            setUploadError(error.response?.data?.message || 'Erreur lors de l\'upload du fichier IA');
        }
    };

    const handleCheckTrainingStatus = async () => {
        setIsCheckingStatus(true);
        try {
            const userId = localStorage.getItem('id') || 'defaultUser';
            const response = await axios.get(`/api/training/status?userId=${userId}&game=IMAGE`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            const status = response.data;
            setTrainingStatus(status);

            // Only mark complete if training exists AND is processed
            if (status.trainingExists && status.isProcessed) {
                isFileReadyRef.current = true;
                setIsTrainingComplete(true);
                // User will click "Download trained model" button to download
            } else if (status.trainingExists && !status.isProcessed) {
                // Training is still in progress
                setIsTrainingComplete(false);
                setUploadError('L\'entraînement est encore en cours. Veuillez patienter.');
            } else {
                // No training exists
                setIsTrainingComplete(false);
                setUploadError('Aucun entraînement trouvé. Veuillez d\'abord uploader un fichier d\'entraînement.');
            }
        } catch (error) {
            console.error('Error checking training status:', error);
            setUploadError('Erreur lors de la vérification du statut');
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const handleDownloadTrainedModel = async () => {
        const userId = localStorage.getItem('id');
        const accessToken = localStorage.getItem('accessToken');
        const emailVerified = localStorage.getItem('emailVerified');

        if (!userId || !accessToken) {
            alert('Vous devez être connecté pour télécharger le modèle.');
            return;
        }

        if (emailVerified !== 'true') {
            alert('Vous devez vérifier votre email pour télécharger le modèle.');
            return;
        }

        if (!isFileReadyRef.current) {
            alert("Le fichier n'est pas encore prêt. Veuillez patienter.");
            return;
        }

        try {
            const dockerId = localStorage.getItem('dockerIdImage') || 'defaultDocker';
            await downloadFile(userId, dockerId);
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            alert('Erreur lors du téléchargement du modèle.');
        }
    };

    const downloadFile = async (userId, dockerId) => {
        try {
            const response = await axios.get(`/api/training/getfile?userId=${userId}&dockerId=${dockerId}&gameName=IMAGE`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'trained_model.zip');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log('Téléchargement terminé');
            isFileReadyRef.current = false;
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier:', error);
            alert('Erreur lors du téléchargement du modèle.');
        }
    };


    const handleDownloadTrainingPackage = async () => {
        // Vérifier l'authentification et la vérification
        const userId = localStorage.getItem('id');
        const accessToken = localStorage.getItem('accessToken');
        const emailVerified = localStorage.getItem('emailVerified');

        if (!userId || !accessToken) {
            alert('Vous devez être connecté pour télécharger le paquet d\'entraînement.');
            return;
        }

        if (emailVerified !== 'true') {
            alert('Vous devez vérifier votre email avant de pouvoir télécharger le paquet d\'entraînement.');
            return;
        }

        // Procéder au téléchargement
        const link = document.createElement('a');
        const gameName = game.name.toLowerCase().replace(/\s+/g, '-');
        link.href = `/tp-${gameName}.zip`;
        link.setAttribute('download', `tp-${gameName}.zip`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className="min-h-screen bg-white dark:bg-[#010116] pt-20 pb-16"
            ref={gameHeaderRef}
        >
            <div className="lg:px-[150px] md:px-[75px] px-6 max-w-7xl mx-auto">
                {/* Game Header with Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#010116] dark:text-white mb-4">
                        {game.name}
                    </h1>
                </motion.div>

                {/* Game Content in Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Game Rules Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    >
                        <h2 className="text-2xl font-bold text-[#5328EA] mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {TranslationsDictionary[selectedLang]?.["game_rules"]}
                        </h2>
                        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#5328EA]/10 text-[#5328EA] mr-3 mt-0.5">•</span>
                                <span>{TranslationsDictionary[selectedLang]?.[`${game.name}_rule_1`]}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#5328EA]/10 text-[#5328EA] mr-3 mt-0.5">•</span>
                                <span>{TranslationsDictionary[selectedLang]?.[`${game.name}_rule_2`]}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#5328EA]/10 text-[#5328EA] mr-3 mt-0.5">•</span>
                                <span>{TranslationsDictionary[selectedLang]?.[`${game.name}_rule_3`]}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#5328EA]/10 text-[#5328EA] mr-3 mt-0.5">•</span>
                                <span>{TranslationsDictionary[selectedLang]?.[`${game.name}_rule_4`]}</span>
                            </li>
                        </ul>

                        {/* Compact Leaderboard */}
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <motion.button
                                onClick={() => setShowLeaderboard(!showLeaderboard)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full px-4 py-2 rounded-lg font-medium flex items-center justify-between transition-all duration-300 ${showLeaderboard
                                    ? 'bg-[#5328EA] text-white shadow-md'
                                    : 'bg-white dark:bg-gray-700 text-[#5328EA] dark:text-white border border-[#5328EA] dark:border-gray-600 hover:bg-[#5328EA]/10'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        animate={{
                                            rotate: showLeaderboard ? [0, -10, 10, -10, 0] : 0,
                                            scale: showLeaderboard ? [1, 1.1, 1] : 1
                                        }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </motion.svg>
                                    {TranslationsDictionary[selectedLang]?.["leaderboard"] || "Leaderboard"}
                                </div>
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{ rotate: showLeaderboard ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </motion.button>

                            {/* Leaderboard list with AnimatePresence for proper exit animations */}
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={!showLeaderboard ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                                transition={{
                                    duration: 0.3,
                                    opacity: { duration: 0.2 },
                                    height: { duration: 0.3 }
                                }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3">
                                    {/* Leaderboard column headers */}
                                    <div className="grid grid-cols-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                        <span className="col-span-3 px-2 py-2 text-center font-semibold text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                                            {TranslationsDictionary[selectedLang]?.["rank"] || "Rank"}
                                        </span>
                                        <span className="col-span-6 px-2 py-2 text-center font-semibold text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                                            {TranslationsDictionary[selectedLang]?.["player"] || "Player"}
                                        </span>
                                        <span className="col-span-3 px-2 py-2 text-center font-semibold text-gray-500 dark:text-gray-400">
                                            {TranslationsDictionary[selectedLang]?.["score"] || "Score"}
                                        </span>
                                    </div>
                                    {[...leaderboardData.slice(0, 5), ...Array(5).fill(null)].slice(0, 5).map((player, index) => (
                                        <motion.div
                                            key={player ? player.id : `empty-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: !showLeaderboard ? index * 0.05 : 0,
                                                exit: { delay: 0 }
                                            }}
                                            className="grid grid-cols-12 border-b border-gray-100 dark:border-gray-700 last:border-0 bg-white dark:bg-gray-800"
                                        >
                                            <span className="col-span-3 px-2 py-2 text-center font-semibold text-[#5328EA] border-r border-gray-200 dark:border-gray-700">
                                                {player ? index + 1 : "-"}
                                            </span>
                                            <span className="col-span-6 px-2 py-2 text-center text-gray-800 dark:text-gray-200 truncate whitespace-nowrap min-w-0 border-r border-gray-200 dark:border-gray-700">
                                                {player ? player.userName : "-"}
                                            </span>
                                            <span className="col-span-3 px-2 py-2 text-center text-gray-800 dark:text-gray-200">
                                                {player ? player.score : "-"}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleLeaderboardClick}
                                    className="mt-3 block w-full text-center text-[#5328EA] dark:text-[#9579FA] hover:text-[#7855E6] dark:hover:text-white text-xs font-medium transition-colors duration-300 hover:underline cursor-pointer"
                                >
                                    {TranslationsDictionary[selectedLang]?.["want_to_see_global_leaderboard"] || "Want to see the global leaderboard?"} →
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Game Code Card */}
                    <motion.div
                        ref={gameCodeCardRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 overflow-hidden flex flex-col justify-center"
                        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    >
                        <motion.div
                            className="mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center justify-center">
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2 text-[#5328EA]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 5
                                    }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </motion.svg>
                                <motion.span
                                    initial={{ y: -5, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                >
                                    {TranslationsDictionary[selectedLang]?.["game_interface"] || "Game Interface"}
                                </motion.span>
                            </h3>
                            <motion.div
                                className="flex justify-center items-center"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <div className="rounded-lg overflow-hidden">
                                    <GameCode game={game} isLoading={isLoading} setIsLoading={setIsLoading} isUploaded={isUploaded} />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Train Your AI Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-16 bg-gradient-to-r from-[#FF774D]/10 to-[#FF774D]/5 dark:from-[#FF774D]/20 dark:to-[#FF774D]/10 rounded-xl p-8 text-center"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <TrophyIcon className="w-8 h-8 text-[#FF774D]" />
                            <h2 className="text-2xl font-bold text-[#FF774D]">
                                {TranslationsDictionary[selectedLang]?.["train_your_ai"]}
                            </h2>
                            <TrophyIcon className="w-8 h-8 text-[#FF774D]" />
                        </div>

                        <p className="text-lg text-[#FF774D] mb-8">
                            {TranslationsDictionary[selectedLang]?.["train_your_ai_first"]} <br />
                            {TranslationsDictionary[selectedLang]?.["train_your_ai_second"]}
                        </p>

                        <div className="flex justify-center">
                            <button
                                ref={downloadTrainingButtonRef}
                                className="px-6 py-3 bg-gradient-to-r from-[#5328EA] to-[#7855E6] text-white font-semibold rounded-lg shadow-md hover:from-[#4419d8] hover:to-[#6642e0] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ml-4"
                                onClick={handleDownloadTrainingPackage}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {game.name === "Image Recognition"
                                    ? TranslationsDictionary[selectedLang]?.["download_dataset_button"] || "Télécharger le dataset"
                                    : TranslationsDictionary[selectedLang]?.["install_tp_button"] || "Installer le training package"}
                            </button>
                            {/* AI Upload Button - Only for Image Recognition */}
                            {game.name === "Image Recognition" && (
                                <button
                                    ref={trainAiButtonRef}
                                    onClick={handleOpenAIUploadModal}
                                    className="px-6 py-3 bg-gradient-to-r from-[#28a745] to-[#20c997] text-white font-semibold rounded-lg shadow-md hover:from-[#218838] hover:to-[#1e7e34] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ml-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {TranslationsDictionary[selectedLang]?.["train_your_ai_button"] || "Entraîner votre IA"}
                                </button>
                            )}
                            <button
                                ref={uploadAiButtonRef}
                                onClick={handleOpenModal}
                                className="px-6 py-3 bg-gradient-to-r from-[#FF774D] to-[#FF9B4D] text-white font-semibold rounded-lg shadow-md hover:from-[#FF5A2D] hover:to-[#FF8A2D] transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ml-4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {TranslationsDictionary[selectedLang]?.["upload_ai_button"] || "Uploader votre IA"}
                            </button>
                        </div>

                        {/* AI Training Status Section - Only for Image Recognition */}
                        {game.name === "Image Recognition" && (
                            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h3 className="text-lg font-semibold text-[#010116] dark:text-white mb-4">{TranslationsDictionary[selectedLang]?.["training_status"]}</h3>

                                {uploadError && (
                                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                        {uploadError}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-4 justify-center">
                                    <button
                                        onClick={handleCheckTrainingStatus}
                                        disabled={isCheckingStatus}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isCheckingStatus ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {TranslationsDictionary[selectedLang]?.["checking"] || "Checking..."}
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                {TranslationsDictionary[selectedLang]?.["reload_status"] || "Reload status"}
                                            </>
                                        )}
                                    </button>

                                    {isTrainingComplete && (
                                        <button
                                            ref={downloadModelButtonRef}
                                            onClick={handleDownloadTrainedModel}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            {TranslationsDictionary[selectedLang]?.["download_model_button"]}
                                        </button>
                                    )}
                                </div>

                                {trainingStatus && (
                                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
                                        <p className="text-sm text-blue-800 dark:text-blue-200">
                                            {isTrainingComplete
                                                ? TranslationsDictionary[selectedLang]?.["training_complete"] || "✅ Entraînement terminé ! Vous pouvez télécharger votre modèle."
                                                : TranslationsDictionary[selectedLang]?.["training_in_progress"] || "⏳ Entraînement en cours... Veuillez patienter."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Game Tutorial Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-[#010116] dark:text-white mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#5328EA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {TranslationsDictionary[selectedLang]?.["game_tutorial"]}
                    </h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-[480px] rounded-xl"
                            src={`https://www.youtube.com/embed/${game.tuto}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Game Tutorial"
                        />
                    </div>
                </motion.div>

                {/* Reviews Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <ReviewsCommunity moduleId={-game.id - 1} courseId={0} />
                </motion.div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <FileUploadModal onClose={handleCloseModal} game={game} isLoading={isLoading} setIsLoading={setIsLoading} setIsUploaded={setIsUploaded} />
            )}

            {/* AI Upload Modal - Only for Image Recognition */}
            {isAIUploadModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                >
                    {/* Backdrop amélioré */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
                        onClick={handleCloseAIUploadModal}
                    />

                    {/* Modal container avec design moderne */}
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/30 w-full max-w-md z-50 relative overflow-hidden"
                    >
                        {/* Header avec gradient */}
                        <div className="bg-gradient-to-r from-[#5328EA] to-[#7C3AED] p-6 text-white relative">
                            <button
                                onClick={handleCloseAIUploadModal}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-white/20 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{TranslationsDictionary[selectedLang]?.["upload_your_ai_button"] || "Uploader votre IA"}</h2>
                                    <p className="text-white/80 text-sm mt-1">{TranslationsDictionary[selectedLang]?.["select_your_ai_file"] || "Sélectionnez votre fichier Python (.py)"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Message d'erreur amélioré */}
                            {uploadError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-red-700 dark:text-red-400 font-medium">{uploadError}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Zone d'upload stylisée */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {TranslationsDictionary[selectedLang]?.["select_your_ai_file"] || "Sélectionnez votre fichier IA (.py)"}
                                </label>

                                <div
                                    ref={uploadAiButtonSendRef}
                                    className="relative group"
                                >
                                    <input
                                        type="file"
                                        accept=".py"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setSelectedFile(file); // Stocker le fichier sans l'envoyer immédiatement
                                            }
                                        }}
                                        className="block w-full text-sm text-gray-600 dark:text-gray-400
                                                 file:mr-4 file:py-3 file:px-6
                                                 file:rounded-xl file:border-0
                                                 file:text-sm file:font-semibold
                                                 file:bg-gradient-to-r file:from-gray-100 file:to-gray-200
                                                 file:text-gray-700 file:shadow-md
                                                 hover:file:from-gray-200 hover:file:to-gray-300
                                                 file:cursor-pointer cursor-pointer
                                                 file:transition-all file:duration-200
                                                 hover:file:shadow-lg hover:file:scale-105
                                                 focus:outline-none focus:ring-2 focus:ring-[#5328EA]/50 focus:ring-offset-2
                                                 dark:focus:ring-offset-gray-900
                                                 dark:file:bg-gradient-to-r dark:file:from-gray-700 dark:file:to-gray-600
                                                 dark:file:text-gray-200 dark:hover:file:from-gray-600 dark:hover:file:to-gray-500"
                                    />

                                    {/* Effet de brillance */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                                </div>

                                {/* Affichage du fichier sélectionné */}
                                {selectedFile && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                                    {TranslationsDictionary[selectedLang]?.["selected_file"] || "Fichier sélectionné"}: {selectedFile.name}
                                                </p>
                                                <p className="text-xs text-green-600 dark:text-green-400">
                                                    {TranslationsDictionary[selectedLang]?.["file_size"] || "Taille"}: {(selectedFile.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Info supplémentaire */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                    <div className="flex items-start space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            {TranslationsDictionary[selectedLang]?.["ensure_functional_ai"]}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Boutons d'action */}
                            <div className="flex justify-end space-x-3 mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCloseAIUploadModal}
                                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                                >
                                    {TranslationsDictionary[selectedLang]?.["cancel"]}
                                </motion.button>

                                {/* Bouton de validation - Vérifie si connecté ET vérifié */}
                                {localStorage.getItem('accessToken') && localStorage.getItem('emailVerified') === 'true' ? (
                                    <motion.button
                                        ref={uploadAiButtonSendFinalRef}
                                        whileHover={{ scale: selectedFile ? 1.02 : 1 }}
                                        whileTap={{ scale: selectedFile ? 0.98 : 1 }}
                                        onClick={() => {
                                            if (selectedFile) {
                                                handleAIFileUpload(selectedFile);
                                            }
                                        }}
                                        disabled={!selectedFile}
                                        className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${selectedFile
                                            ? 'bg-gradient-to-r from-[#5328EA] to-[#7C3AED] hover:from-[#4320c0] hover:to-[#6B21A8] text-white shadow-lg hover:shadow-xl'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span>{TranslationsDictionary[selectedLang]?.["send"] || "Envoyer"}</span>
                                        </div>
                                    </motion.button>
                                ) : (
                                    <div className="flex flex-col items-end space-y-2">
                                        <button
                                            disabled
                                            className="px-6 py-3 font-semibold rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 flex items-center space-x-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span>{TranslationsDictionary[selectedLang]?.["send"] || "Envoyer"}</span>
                                        </button>
                                        <p className="text-sm text-red-500 dark:text-red-400">
                                            {!localStorage.getItem('accessToken')
                                                ? (TranslationsDictionary[selectedLang]?.["please_login_first"] || "Veuillez vous connecter")
                                                : (TranslationsDictionary[selectedLang]?.["please_verify_email"] || "Veuillez vérifier votre email")
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Tutorial overlay renderer */}
            {isTrainTutorialActive && (
                <TutorialInteractif
                    target={tutorialTargets[tutorialStep]?.ref?.current}
                    text={tutorialTargets[tutorialStep]?.text}
                    onClose={() => { localStorage.setItem('tutoGameTrain', 'false'); setIsTrainTutorialActive(false); }}
                />
            )}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSignUpClick={openSignUp}
                    redirectTo="/leaderboard"
                />
            )}
            {showSignUpModal && (
                <SignUpModal
                    onClose={() => setShowSignUpModal(false)}
                    onLoginClick={openLogin}
                    redirectTo="/leaderboard"
                />
            )}
        </div>
    );
};

export default Game;
