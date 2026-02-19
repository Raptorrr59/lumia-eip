import React, { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './Snake.css';
import Tooltip from '@mui/material/Tooltip';
import TranslationsDictionary from '../../../Translations';
import { useLang } from '../../../LangProvider';

const GameState = {
    ROWS: 10,
    COLS: 10,
};

const Snake = ({ game, isLoading, setIsLoading, isUploaded }) => {
    const selectedLang = useLang();
    const timer = useRef(null);
    const snakeCoords = useRef([]);
    const snakeCoordinatesMap = useRef(new Set());
    const head = useRef({ row: -1, col: -1 });
    const foodCoordinates = useRef({
        row: -1,
        col: -1,
    });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(0);
    const [gameLogs, setGameLogs] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepMode, setIsStepMode] = useState(false);
    const [gameOverType, setGameOverType] = useState("");
    const [gameSpeed, setGameSpeed] = useState(1000);
    const [sliderValue, setSliderValue] = useState(1100);
    const filterGameLogs = (logs) => {
        if (!logs || !logs.gameStates) return logs;
        
        const filteredStates = logs.gameStates.filter(state => {
            // Keep only game-relevant states
            return state.itemType === "food" || 
                   state.itemType === "score" || 
                   state.itemType === "snake" ||
                   (state.itemType === "system" && 
                    (state.properties.message === "Game over." || 
                     state.properties.message === "Collision detected. Player lost."));
        });
        
        return {
            ...logs,
            gameStates: filteredStates
        };
    };

    const fetchAllLogs = async () => {
        const response = await fetch(`/api/game/game-log?userId=${localStorage.getItem('id')}&gameType=snake`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log("🔸 DATA ALL:", data);
        setGameLogs(filterGameLogs(data));
        setIsLoading(false);
    };

    const fetchLogs = async () => {
        try {
            const response = await fetch(`/api/game/stream?userId=${localStorage.getItem('id')}&gameType=snake`, {
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
            fetchLogs();
          });
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
        snakeCoordinatesMap.current.clear();
        snakeCoords.current = [];
        head.current = { row: -1, col: -1 };
        foodCoordinates.current = { row: -1, col: -1 };
        setIsStepMode(false);
        setCurrentStep(0);
        setGameOver(false);
        setScore(0);
        const gameStates = gameLogs.gameStates;
        let i = 0;
        let latestScore = 0;

        timer.current = setInterval(() => {
            if (i < gameStates.length) {
                setIsPlaying((s) => s + 1);
                let state = gameStates[i];
                if (state.properties.message === "Game over." || state.properties.message === "Collision detected. Player lost.") {
                    clearInterval(timer.current);
                    setGameOver(true);
                    setIsPlaying(0);
                    // Find the last score before game over
                    for (let j = i - 1; j >= 0; j--) {
                        if (gameStates[j].itemType === "score") {
                            latestScore = gameStates[j].properties.int;
                            break;
                        }
                    }
                    setScore(latestScore);
                    registerScore(latestScore);
                    return;
                }
                if (state.itemType === "food") {
                    foodCoordinates.current = { row: state.properties.position[0], col: state.properties.position[1] };
                    i++;
                    state = gameStates[i];
                }
                if (state.itemType === "score") {
                    latestScore = state.properties.int;
                    setScore(latestScore);
                    i++;
                    state = gameStates[i];
                }
                if (state.itemType === "snake") {
                    const snake = state.properties.position;
                    const headPosition = snake[0];
                    head.current = { row: headPosition[0], col: headPosition[1] };
                    snakeCoords.current = snake;
                    i++;
                    state = gameStates[i];
                }
                if (state.itemType === "system") {
                    if (state.properties.message === "Game over.") {
                        setGameOver(true);
                        setIsPlaying(0);
                        clearInterval(timer.current);
                        // Find the last score before game over
                        for (let j = i - 1; j >= 0; j--) {
                            if (gameStates[j].itemType === "score") {
                                latestScore = gameStates[j].properties.int;
                                break;
                            }
                        }
                        setScore(latestScore);
                        registerScore(latestScore);
                        return;
                    } else if (state.properties.message === "Collision detected. Player lost.") {
                        setGameOverType("Collision detected. Player lost.");
                        setGameOver(true);
                        setIsPlaying(0);
                        clearInterval(timer.current);
                        // Find the last score before game over
                        for (let j = i - 1; j >= 0; j--) {
                            if (gameStates[j].itemType === "score") {
                                latestScore = gameStates[j].properties.int;
                                break;
                            }
                        }
                        setScore(latestScore);
                        registerScore(latestScore);
                        return;
                    }
                    i++;
                }
                syncSnakeCoordinatesMap();
            } else {
                clearInterval(timer.current);
                // Find the last score in the gameStates
                for (let j = gameStates.length - 1; j >= 0; j--) {
                    if (gameStates[j].itemType === "score") {
                        latestScore = gameStates[j].properties.int;
                        break;
                    }
                }
                setScore(latestScore);
                registerScore(latestScore);
            }
        }, gameSpeed); // Use gameSpeed instead of hardcoded 2000
    };

    const handlePreviousStep = () => {
        if (currentStep <= 0) return;
        const targetStep = currentStep - 1;

        // Reset state
        snakeCoordinatesMap.current.clear();
        snakeCoords.current = [];
        head.current = { row: -1, col: -1 };
        foodCoordinates.current = { row: -1, col: -1 };
        
        let tempScore = 0;
        let tempGameOver = false;
        let tempGameOverType = "";

        const gameStates = gameLogs.gameStates || [];
        
        // Replay up to targetStep
        for (let i = 0; i < targetStep; i++) {
            const state = gameStates[i];

            if (state.itemType === "food") {
                foodCoordinates.current = {
                    row: state.properties.position[0],
                    col: state.properties.position[1]
                };
            }

            if (state.itemType === "score") {
                tempScore = state.properties.int;
            }

            if (state.itemType === "snake") {
                const snake = state.properties.position;
                snakeCoords.current = snake;
                head.current = { row: snake[0][0], col: snake[0][1] };
            }

            if (state.itemType === "system") {
                if (state.properties.message === "Game over.") {
                    tempGameOver = true;
                    // Find the last score before game over
                    let latestScore = tempScore;
                    for (let j = i - 1; j >= 0; j--) {
                        if (gameStates[j].itemType === "score") {
                            latestScore = gameStates[j].properties.int;
                            break;
                        }
                    }
                    tempScore = latestScore;
                }
                if (state.properties.message === "Collision detected. Player lost.") {
                    tempGameOverType = "Collision detected. Player lost.";
                    tempGameOver = true;
                    let latestScore = tempScore;
                    for (let j = i - 1; j >= 0; j--) {
                        if (gameStates[j].itemType === "score") {
                            latestScore = gameStates[j].properties.int;
                            break;
                        }
                    }
                    tempScore = latestScore;
                }
            }
        }

        syncSnakeCoordinatesMap();
        setScore(tempScore);
        setGameOver(tempGameOver);
        setGameOverType(tempGameOverType);
        setCurrentStep(targetStep);
    };

    const handleNextStep = () => {
        const gameStates = gameLogs.gameStates || [];
        if (currentStep >= gameStates.length) return;
    
        let step = currentStep;
        let state = gameStates[step];
        let latestScore = score;
    
        // Process all consecutive related states at the same step
        while (step < gameStates.length) {
            state = gameStates[step];
    
            if (state.properties.message === "Game over." || state.properties.message === "Collision detected. Player lost.") {
                setGameOver(true);
                setIsPlaying(0);
                // Find the last score before game over
                for (let j = step - 1; j >= 0; j--) {
                    if (gameStates[j].itemType === "score") {
                        latestScore = gameStates[j].properties.int;
                        break;
                    }
                }
                setScore(latestScore);
                registerScore(latestScore);
                setCurrentStep(step + 1);
                return;
            }
    
            if (state.itemType === "food") {
                foodCoordinates.current = {
                    row: state.properties.position[0],
                    col: state.properties.position[1]
                };
            }
    
            if (state.itemType === "score") {
                latestScore = state.properties.int;
                setScore(latestScore);
            }
    
            if (state.itemType === "snake") {
                const snake = state.properties.position;
                snakeCoords.current = snake;
                head.current = { row: snake[0][0], col: snake[0][1] };
                syncSnakeCoordinatesMap();
            }
    
            // You can handle 'system' messages if needed
            if (state.itemType === "system") {
                if (state.properties.message === "Game over.") {
                    setGameOver(true);
                    setIsPlaying(0);
                    // Find the last score before game over
                    for (let j = step - 1; j >= 0; j--) {
                        if (gameStates[j].itemType === "score") {
                            latestScore = gameStates[j].properties.int;
                            break;
                        }
                    }
                    setScore(latestScore);
                    registerScore(latestScore);
                }
                if (state.properties.message === "Collision detected. Player lost.") {
                    setGameOverType("Collision detected. Player lost.");
                    setGameOver(true);
                    setIsPlaying(0);
                    // Find the last score before game over
                    for (let j = step - 1; j >= 0; j--) {
                        if (gameStates[j].itemType === "score") {
                            latestScore = gameStates[j].properties.int;
                            break;
                        }
                    }
                    setScore(latestScore);
                    registerScore(latestScore);
                }
            }
    
            step++;
            break; // Move forward only one item per call (for true step-by-step)
        }
    
        setCurrentStep(step);
    };
    

    const startStepMode = () => {
        setGameOver(false);
        setIsStepMode(!isStepMode);
        setIsPlaying(0);
    };

    const resetStepMode = () => {
        setCurrentStep(0);
        setScore(0);
        setGameOver(false);
        setGameOverType("");
        snakeCoordinatesMap.current.clear();
        snakeCoords.current = [];
        head.current = { row: -1, col: -1 };
        foodCoordinates.current = { row: -1, col: -1 };
    };

    const getCell = useCallback((row, col) => {
        const coords = `${row}-${col}`;
        const foodPosition = `${foodCoordinates.current.row}-${foodCoordinates.current.col}`;
        const headPosition = `${head.current.row}-${head.current.col}`;

        const isFood = coords === foodPosition;
        const isHead = coords === headPosition;

        // Find index of this cell in snake body if it exists
        let snakeIndex = -1;
        for (let i = 0; i < snakeCoords.current.length; i++) {
            if (snakeCoords.current[i][0] === row && snakeCoords.current[i][1] === col) {
                snakeIndex = i;
                break;
            }
        }

        const isSnakeBody = snakeIndex > 0 && snakeIndex < snakeCoords.current.length - 1;
        const isTail = snakeIndex === snakeCoords.current.length - 1 && snakeIndex > 0;

        let className = "snake-cell";
        if (isFood) {
            className += " food";
        } else if (isHead) {
            className += " head";

            // Determine head direction
            if (snakeCoords.current.length > 1) {
                const [headX, headY] = snakeCoords.current[0];
                const [neckX, neckY] = snakeCoords.current[1];

                if (headY < neckY) className += " head-up";
                else if (headY > neckY) className += " head-down";
                else if (headX > neckX) className += " head-right";
                else if (headX < neckX) className += " head-left";
            }
        } else if (isSnakeBody) {
            className += " snake";

            // Determine body segment type (straight or corner)
            const [prevX, prevY] = snakeCoords.current[snakeIndex - 1];
            const [currX, currY] = snakeCoords.current[snakeIndex];
            const [nextX, nextY] = snakeCoords.current[snakeIndex + 1];

            // Check if this is a corner piece
            const isCorner = (prevX !== nextX) && (prevY !== nextY);

            if (isCorner) {
                className += " corner";

                // Determine corner type
                if ((prevX < currX && prevY === currY && nextX === currX && nextY < currY) ||
                    (prevY < currY && prevX === currX && nextX < currX && nextY === currY)) {
                    className += " corner-top-left";
                } else if ((prevX > currX && prevY === currY && nextX === currX && nextY < currY) ||
                    (prevY < currY && prevX === currX && nextX > currX && nextY === currY)) {
                    className += " corner-top-right";
                } else if ((prevX < currX && prevY === currY && nextX === currX && nextY > currY) ||
                    (prevY > currY && prevX === currX && nextX < currX && nextY === currY)) {
                    className += " corner-bottom-left";
                } else if ((prevX > currX && prevY === currY && nextX === currX && nextY > currY) ||
                    (prevY > currY && prevX === currX && nextX > currX && nextY === currY)) {
                    className += " corner-bottom-right";
                }
            } else {
                // Straight piece
                if (prevX === nextX) {
                    className += " vertical";
                } else {
                    className += " horizontal";
                }
            }
        } else if (isTail) {
            className += " tail";

            // Determine tail direction
            const [tailX, tailY] = snakeCoords.current[snakeCoords.current.length - 1];
            const [beforeTailX, beforeTailY] = snakeCoords.current[snakeCoords.current.length - 2];

            if (tailY < beforeTailY) className += " tail-up";
            else if (tailY > beforeTailY) className += " tail-down";
            else if (tailX > beforeTailX) className += " tail-right";
            else if (tailX < beforeTailX) className += " tail-left";
        }

        return <div key={coords} className={className} />;
    }, []);

    const syncSnakeCoordinatesMap = () => {
        snakeCoordinatesMap.current.clear();
        snakeCoords.current.forEach((coord) => {
            snakeCoordinatesMap.current.add(`${coord[0]}-${coord[1]}`);
        });
    };

    // Function to register a new score
    const registerScore = async (score) => {
        const username = localStorage.getItem('userName');
        console.log(score);
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
                    gameName: 'snake',
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
                </div>
            ) : (
            <div className="snake-board">
                {gameOver && <div className="game-over-overlay">{gameOverType || "Game Over!"}</div>}
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
                        disabled={isLoading || isStepMode || !isUploaded}
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
                            {isPlaying ? TranslationsDictionary[selectedLang]?.["stop"] : TranslationsDictionary[selectedLang]?.["start"]} {TranslationsDictionary[selectedLang]?.["game"]}
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

export default Snake;
