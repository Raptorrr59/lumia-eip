import React, { useCallback, useEffect, useState, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import CircularProgress from "@mui/material/CircularProgress";
import './ImageRecognition.css';
import TranslationsDictionary from '../../../Translations';
import { useLang } from '../../../LangProvider';

const ImageRecognition = ({game, isLoading, setIsLoading, isUploaded}) => {
    const selectedLang = useLang();
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(0);
    const [gameLogs, setGameLogs] = useState({});
    const [turn, setTurn] = useState(0);
    const [feedbackStatus, setFeedbackStatus] = useState("");
    const [indicatorVisible, setIndicatorVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [gameImages, setGameImages] = useState([]); // Stockage des images pour chaque tour
    const [lastExpected, setLastExpected] = useState(null);
    const [gameInterval, setGameInterval] = useState(null);
    const [streamCompleted, setStreamCompleted] = useState(false); // Nouveau state pour savoir si le stream est terminé

    const responses = useMemo(() => 
        gameLogs.gameStates?.filter(log => log.itemType === "response") || [], 
        [gameLogs.gameStates]
    );

    // Fonction modifiée pour ne pas filtrer les responses
    const filterGameLogs = (logs) => {
        if (!logs || !logs.gameStates) return logs;
        
        // Ne pas filtrer les responses, garder toutes les responses
        const filteredStates = logs.gameStates.filter(state => {
            return state.itemType === "response" ||
                   (state.itemType === "system" && 
                    (state.properties?.message === "Game over." || 
                     state.properties?.message === "20 images loaded for evaluation."));
        });
        
        return {
            ...logs,
            gameStates: filteredStates
        };
    };

    const fetchDogImage = useCallback(async () => {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/images/search');
            if (!response.ok) throw new Error("Failed to fetch dog image");
            const data = await response.json();
            return data[0].url;
        } catch (error) {
            console.error("Error fetching dog image:", error);
            return "/dog.jpg";
        }
    }, []);

    const fetchCatImage = useCallback(async () => {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            if (!response.ok) throw new Error("Failed to fetch cat image");
            const data = await response.json();
            return data[0].url;
        } catch (error) {
            console.error("Error fetching cat image:", error);
            return "/cat.jpg";
        }
    }, []);

    // Fonction pour préparer toutes les images du jeu
    const prepareGameImages = useCallback(async (responsesToPrepare) => {
        if (!responsesToPrepare || responsesToPrepare.length === 0) return;
        
        console.log(`Preparing ${responsesToPrepare.length} images...`);
        const images = [];
        
        for (let i = 0; i < responsesToPrepare.length; i++) {
            const expected = responsesToPrepare[i].properties?.expected;
            let imageUrl;
            
            if (expected === "cat") {
                imageUrl = await fetchCatImage();
            } else {
                imageUrl = await fetchDogImage();
            }
            
            images.push({
                url: imageUrl,
                expected: expected,
                turn: i
            });
        }
        
        setGameImages(images);
        console.log(`Images prepared: ${images.length}`);
    }, [fetchCatImage, fetchDogImage]);

    const fetchAllLogs = async () => {
        const response = await fetch(`/api/game/game-log?userId=${localStorage.getItem('id')}&gameType=image`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        setGameLogs(filterGameLogs(data));
        setIsLoading(false);
    };
    
    const fetchLogs = async () => {
        try {
            const response = await fetch(`/api/game/stream?userId=${localStorage.getItem('id')}&gameType=image`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.body) throw new Error("No response body found.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });

                chunk.split("\n").forEach((line) => {
                    if (line.startsWith("data:")) {
                        const rawData = line.replace("data:", "").trim();
                        
                        if (!rawData) {
                            return;
                        }

                        if (rawData === "Tous les états ont été envoyés" || rawData === "All game states sent") {
                            console.log("Stream completed. Stopping listener.");
                            setStreamCompleted(true); // Marquer le stream comme terminé
                            reader.cancel();
                            fetchAllLogs();
                            return;
                        }

                        try {
                            const parsedData = JSON.parse(rawData);
                            
                            if (parsedData && typeof parsedData === 'object' && parsedData.timestamp) {
                                setGameLogs((prevLogs) => {
                                    const newLogs = {
                                        ...prevLogs,
                                        gameStates: [...(prevLogs.gameStates || []), parsedData]
                                    };
                                    return filterGameLogs(newLogs);
                                });
                            }
                        } catch (error) {
                            console.warn("Ignoring non-JSON message:", rawData);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
            setIsLoading(false);
        }
    };

    const runGame = async () => {
        setIsPlaying(1);
        setScore(0);
        setTurn(0);
        setGameOver(false);
        setFeedbackStatus("");
        
        // Attendre que les images soient prêtes
        await prepareGameImages(responses);
    };

    const stopGame = () => {
        setIsPlaying(0);
        setGameOver(true);
        if (gameInterval) {
            clearInterval(gameInterval);
            setGameInterval(null);
        }
    };

    // Function to register a new score
    const registerScore = async (score) => {
        const username = localStorage.getItem('userName');
        if (!username) return;
        try {
            await fetch('/api/newScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({
                    userName: username,
                    gameName: 'image',
                    score: score,
                }),
            });
        } catch (error) {
            console.error('Failed to register score:', error);
        }
    };

    useEffect(() => {
        const socket = new SockJS('http://localhost:8000/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });
    
        stompClient.onConnect = () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/topic/', (message) => {
                setIsLoading(true);
                fetchLogs();
            });
        };
    
        stompClient.activate();

        return () => {
            console.log('Disconnecting WebSocket');
            stompClient.deactivate();
        };
    }, []);

    // Effet principal pour gérer le jeu
    useEffect(() => {
        if (isPlaying === 0 || responses.length === 0 || turn >= responses.length || gameImages.length === 0) {
            return;
        }
    
        console.log(`Starting turn ${turn} with ${responses.length} responses`);
        
        const interval = setInterval(() => {
            if (turn >= responses.length) {
                clearInterval(interval);
                stopGame();
                return;
            }

            const log = responses[turn];
            const isCorrect = log.properties?.correct;

            // 1. Mettre à jour l'image actuelle
            if (gameImages[turn]) {
                setCurrentImage(gameImages[turn].url);
            }

            // 2. Attendre que l'image s'affiche, puis afficher le feedback
            setTimeout(() => {
                setFeedbackStatus(isCorrect ? "correct" : "incorrect");
                setIndicatorVisible(true);
                setScore(log.properties?.score || 0);

                setTimeout(() => {
                    setIndicatorVisible(false);

                    setTimeout(() => {
                        setFeedbackStatus("");
                        if (turn >= responses.length - 1) {
                            clearInterval(interval);
                            stopGame();
                        } else {
                            setTurn(prev => prev + 1);
                        }
                    }, 300);
                }, 1500);
            }, 100); // 100ms pour laisser le temps à l'image de s'afficher

        }, 3000); // Interval de 3 secondes entre chaque tour
        
        setGameInterval(interval);
    
        return () => {
            clearInterval(interval);
            // Always use the latest score from the last response
            let latestScore = score;
            if (responses.length > 0) {
                const lastResponse = responses[responses.length - 1];
                if (lastResponse && lastResponse.properties && typeof lastResponse.properties.score === 'number') {
                    latestScore = lastResponse.properties.score;
                }
            }
            registerScore(latestScore);
        };
    }, [responses, turn, gameImages]);

    // Effet pour démarrer automatiquement le jeu une fois que tout est prêt
    useEffect(() => {
        if (streamCompleted && responses.length > 0 && isPlaying === 0 && !gameOver) {
            console.log(`Stream completed. Responses loaded: ${responses.length} items`);
            console.log('All responses:', responses);
            
            // Démarrer automatiquement le jeu
            setTimeout(async () => {
                await runGame();
            }, 1000);
        }
    }, [streamCompleted, responses.length, gameOver]); // Utiliser responses.length au lieu de responses

    // Debug: Afficher les informations sur les responses
    useEffect(() => {
        if (responses.length > 0) {
            console.log(`Responses loaded: ${responses.length} items`);
            console.log('First response:', responses[0]);
            console.log('Last response:', responses[responses.length - 1]);
        }
    }, [responses]);
    
    return (
        <div className="app-container">
            {isLoading ? (
                <div className="loading-screen-1">
                    <CircularProgress className="loading-spinner-1" size={60} thickness={4} />
                    <p className="loading-text-1">{TranslationsDictionary[selectedLang]?.["loading_game"] || "Loading game..."}</p>
                </div>
            ) : (
                <>
                    <div className="game-image-section">
                        <h2>{TranslationsDictionary[selectedLang]?.["guess_the_image"] || "Guess the image: Cat or Dog?"}</h2>
                        <div className={`image-box ${feedbackStatus}`}>
                            {isPlaying === 0 && !gameOver && (
                                <div className="preload-image">
                                    <div className="question-mark">?</div>
                                </div>
                            )}
                            {!gameOver && isPlaying === 1 && (
                                <>
                                    <img
                                        src={currentImage || "/placeholder.jpg"}
                                        alt="Guess"
                                        className={`game-image ${feedbackStatus}`}
                                    />
                                    <div className={`response-indicator ${feedbackStatus} ${indicatorVisible ? 'visible' : ''}`}>
                                        {feedbackStatus === "correct" ? "✓" : "✗"}
                                    </div>
                                </>
                            )}
                            {gameOver && (
                                <div className="game-over-overlay">
                                    <h3>GAME OVER</h3>
                                    <div className="final-score">{TranslationsDictionary[selectedLang]?.["score"]}: {score}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="score-controls">
                        <p className="score">{TranslationsDictionary[selectedLang]?.["score"]}: {score}</p>
                        <button
                            className={`game-button ${isPlaying === 1 ? "stop-button" : "start-button"}`}
                            onClick={isPlaying === 1 ? stopGame : runGame}
                            disabled={isLoading || !gameLogs || !isUploaded || !streamCompleted}
                        >
                            {isPlaying ? TranslationsDictionary[selectedLang]?.["stop"] : TranslationsDictionary[selectedLang]?.["start"]} {TranslationsDictionary[selectedLang]?.["game"]}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageRecognition;