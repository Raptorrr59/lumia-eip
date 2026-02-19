import React, { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './ConnectFour.css';
import Tooltip from '@mui/material/Tooltip';
import TranslationsDictionary from '../../../Translations';
import { useLang } from '../../../LangProvider';

const GameState = {
    ROWS: 7,
    COLS: 6,
};

const ConnectFour = ({game, isLoading, setIsLoading, isUploaded}) => {
    const selectedLang = useLang();
    const timer = useRef(null);
    const [gameGrid, setGameGrid] = useState(Array.from({ length: GameState.ROWS }, () => Array(GameState.COLS).fill("")));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [isPlaying, setIsPlaying] = useState(0);
    const [gameLogs, setGameLogs] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepMode, setIsStepMode] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(1000);
    const [sliderValue, setSliderValue] = useState(2100 - 1000);

    const filterGameLogs = (logs) => {
        if (!logs || !logs.gameStates) return logs;
        
        const filteredStates = logs.gameStates.filter(state => {
            // Keep only game-relevant states
            return state.itemType === "move" ||
                   (state.itemType === "system" && 
                    (state.properties?.message === "Game over." || 
                     state.properties?.message === "Player won.")) ||
                   (state.itemType === "score");
        });
        
        return {
            ...logs,
            gameStates: filteredStates
        };
    };

    const fetchAllLogs = async () => {
        const response = await fetch(`/api/game/game-log?userId=${localStorage.getItem('id')}&gameType=connect4`, {
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
            const response = await fetch(`/api/game/stream?userId=${localStorage.getItem('id')}&gameType=connect4`, {
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

                        if (rawData === "Tous les états ont été envoyés") {
                            fetchAllLogs();
                        }
                        
                        if (!rawData) {
                            return;
                        }
                        
                        // Vérifier si c'est du JSON valide avant de parser
                        let parsedData;
                        try {
                            parsedData = JSON.parse(rawData);
                        } catch (parseError) {
                            return;
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des logs:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const socket = new SockJS('http://localhost:8000/ws');
        const stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000, // Auto-reconnect en cas de coupure
        });
    
        stompClient.onConnect = () => {
          console.log('Connected to WebSocket');
          stompClient.subscribe('/topic/', (message) => {
            // On every message, fetch logs from the API
            fetchLogs();
          });
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    
        stompClient.activate();

        return () => {
            console.log('Disconnecting WebSocket');
            stompClient.deactivate();
        };
    }, []);

    const stopGame = async () => {
        setGameOver(true);
        setIsPlaying(0);
        if (timer.current) {
            clearInterval(timer.current);
        }
    };

    const runGameWithLogs = () => {
        setGameOver(false);
        setGameWon(false);
        setGameGrid(Array.from({ length: GameState.ROWS }, () => Array(GameState.COLS).fill("")));
        setIsPlaying(true);
      
        const gameStates = gameLogs.gameStates || [];
        let i = 0;
      
        timer.current = setInterval(() => {
            if (i >= gameStates.length) {
                clearInterval(timer.current);
                setIsPlaying(false);
                return;
            }
      
            const state = gameStates[i];
      
            if (state.itemType === "move") {
                const player = state.properties?.player === "O" ? "yellow" : "red";
                const row = state.properties?.column;
                const col = state.properties?.row;
      
                setGameGrid(prevGrid => {
                    const newGrid = [...prevGrid.map(row => [...row])];
                    newGrid[row][col] = player;
                    return newGrid;
                });
            }

            if (state.itemType === "score") {
                setScore(state.properties?.int || 0);
            }
      
            if (state.itemType === "system") {
                const message = state.properties?.message;
                if (message === "Game over." || message === "Player lost.") {
                    setGameOver(true);
                    setIsPlaying(false);
                    clearInterval(timer.current);
                    registerScore(score);
                    return;
                }
        
                if (message === "Player won.") {
                    setGameWon(true);
                    if (score > 0) {
                        registerScore(score);
                    } else if (gameStates[i + 1] && gameStates[i + 1].itemType === "score") {
                        const newScore = gameStates[i + 1].properties?.int || 0;
                        setScore(newScore);
                        registerScore(newScore);
                    }
                    setIsPlaying(false);
                    clearInterval(timer.current);
                    return;
                }
            }
      
            i++;
        }, gameSpeed); // Use gameSpeed instead of hardcoded 1000
    };

    const handlePreviousStep = () => {
        if (currentStep <= 0) return;
        const targetStep = currentStep - 1;

        // Reset state
        let tempGrid = Array.from({ length: GameState.ROWS }, () => Array(GameState.COLS).fill(""));
        let tempScore = 0;
        let tempGameOver = false;
        let tempGameWon = false;

        const gameStates = gameLogs.gameStates || [];

        for (let i = 0; i < targetStep; i++) {
            const state = gameStates[i];

            if (state.itemType === "move") {
                const player = state.properties?.player === "O" ? "yellow" : "red";
                const row = state.properties?.column;
                const col = state.properties?.row;
                
                if (tempGrid[row] && tempGrid[row][col] !== undefined) {
                    tempGrid[row][col] = player;
                }
            }

            if (state.itemType === "score") {
                tempScore = state.properties?.int || 0;
            }

            if (state.itemType === "system") {
                const message = state.properties?.message;
                if (message === "Game over." || message === "Player lost.") {
                    tempGameOver = true;
                }

                if (message === "Player won.") {
                    tempGameWon = true;
                    if (tempScore > 0) {
                         // already set
                    } else if (gameStates[i + 1] && gameStates[i + 1].itemType === "score") {
                        const newScore = gameStates[i + 1].properties?.int || 0;
                        tempScore = newScore;
                    }
                }
            }
        }

        setGameGrid(tempGrid);
        setScore(tempScore);
        setGameOver(tempGameOver);
        setGameWon(tempGameWon);
        setCurrentStep(targetStep);
    };

    const handleNextStep = () => {
        const gameStates = gameLogs.gameStates || [];
        if (currentStep >= gameStates.length) return;
    
        const state = gameStates[currentStep];
    
        if (state.itemType === "move") {
            const player = state.properties?.player === "O" ? "yellow" : "red";
            const row = state.properties?.column;
            const col = state.properties?.row;
    
            setGameGrid(prevGrid => {
                const newGrid = [...prevGrid.map(row => [...row])];
                newGrid[row][col] = player;
                return newGrid;
            });
        }

        if (state.itemType === "score") {
            setScore(state.properties?.int || 0);
        }
    
        if (state.itemType === "system") {
            const message = state.properties?.message;
            if (message === "Game over." || message === "Player lost.") {
                setGameOver(true);
                registerScore(score);
                setIsPlaying(false);
            }
    
            if (message === "Player won.") {
                setGameWon(true);
                if (score > 0) {
                    registerScore(score);
                } else if (gameStates[currentStep + 1] && gameStates[currentStep + 1].itemType === "score") {
                    const newScore = gameStates[currentStep + 1].properties?.int || 0;
                    setScore(newScore);
                    registerScore(newScore);
                }
                setIsPlaying(false);
            }
        }
    
        setCurrentStep(prev => prev + 1);
    };

    const startStepMode = () => {
        setGameOver(false);
        setIsStepMode(!isStepMode);
        setIsPlaying(false);
    };

    const resetStepMode = () => {
        setCurrentStep(0);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setGameGrid(Array.from({ length: GameState.ROWS }, () => Array(GameState.COLS).fill("")));
    };

    const getCell = useCallback((row, col) => {
        const coords = `${col}-${row}`;
        const className = `cell ${gameGrid[row][col] || ""}`;
        return <div key={coords} className={className}></div>;
    }, [gameGrid]);

    // Function to register a new score
    const registerScore = async (score) => {
        console.log(score)
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
                    gameName: 'connect4',
                    score: score,
                }),
            });
        } catch (error) {
            console.error('Failed to register score:', error);
        }
    };

    return (
        <div className="app-container">
            {isLoading ? (
                <div className="loading-screen">
                    <p>Chargement...</p>
                </div>
            ) : (
            <div className="board">
                {gameOver && <div className="game-over-overlay">GAME OVER</div>}
                {gameWon && <div className="game-won-overlay">YOU WON</div>}
                {Array.from({ length: GameState.ROWS }).map((_, row_idx) => (
                    <div key={row_idx} className="row"> 
                        {Array.from({ length: GameState.COLS }).map((_, col_idx) => getCell(row_idx, col_idx))}
                    </div>
                ))}
            </div>
            )}
            
            {/* Speed Control Slider */}
            <div className="speed-control">
                <label htmlFor="speed-slider" className="speed-label">
                    {TranslationsDictionary[selectedLang]?.["game_speed"] || "Game Speed"}: {gameSpeed}ms
                </label>
                <input
                    id="speed-slider"
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={sliderValue}
                    onChange={(e) => {
                        const v = parseInt(e.target.value);
                        setSliderValue(v);
                        setGameSpeed(2100 - v);
                    }}
                    disabled={isPlaying}
                    className="speed-slider"
                    style={{ accentColor: '#5328ea' }}
                />
                <div className="speed-labels">
                    <span>{TranslationsDictionary[selectedLang]?.["slow_game"] || "Slow"} (2000ms)</span>
                    <span>{TranslationsDictionary[selectedLang]?.["fast_game"] || "Fast"} (100ms)</span>
                </div>
            </div>

            <div className="score-controls">
                <p className="score">{TranslationsDictionary[selectedLang]?.["score"] || "Score"}: {score}</p>

                {isUploaded ? (
                    <button
                        className={`game-button ${!isStepMode ? isPlaying ? "stop-button" : "start-button" : "button-disabled"}`}
                        onClick={isPlaying ? stopGame : runGameWithLogs}
                        disabled={isLoading || isStepMode}
                    >
                        {isPlaying ? TranslationsDictionary[selectedLang]?.["stop"] : TranslationsDictionary[selectedLang]?.["start"]} {TranslationsDictionary[selectedLang]?.["game"]}
                    </button>
                ) : (
                    <Tooltip title="You must upload your AI before starting the game." followCursor placement="top">
                        <span>
                            <button
                                className={`game-button button-disabled`}
                                disabled={true}
                            >
                                {TranslationsDictionary[selectedLang]?.["start"]} {TranslationsDictionary[selectedLang]?.["game"]}
                            </button>
                        </span>
                    </Tooltip>
                )}

                <button
                    className={`game-button ${!isUploaded ? "button-disabled" : "step-mode-button"}`}
                    onClick={startStepMode}
                    disabled={isPlaying || !isUploaded}
                >
                    {TranslationsDictionary[selectedLang]?.["step_mode"]}
                </button>

                <button
                    className={`game-button ${!isStepMode ? "button-disabled" : "next-step-button"}`}
                    onClick={handleNextStep}
                    disabled={!isStepMode || gameOver || !isUploaded}
                >
                    {TranslationsDictionary[selectedLang]?.["next_step"]}
                </button>
            </div>
            
            {isStepMode && (
                <div className="step-info">
                    <p>{TranslationsDictionary[selectedLang]?.["current_step"]}: {currentStep + 1} / {gameLogs.gameStates ? gameLogs.gameStates.length + 1 : 1}</p>
                    <button
                        className={`game-button ${!isStepMode ? "button-disabled" : "next-step-button"}`}
                        onClick={resetStepMode}
                        disabled={!isStepMode}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                            <path d="M21 3v5h-5"/>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                            <path d="M3 21v-5h5"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectFour;
