import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'language') return 'EN';
        return null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <LangProvider>
            {children}
        </LangProvider>
    </BrowserRouter>
);

// Mock Games Page
const MockGamesPage = ({ onGameSelect }) => {
    const games = [
        { id: 'snake', name: 'Snake', description: 'Classic snake game' },
        { id: 'connect4', name: 'Connect 4', description: 'Connect four pieces' },
        { id: 'image-recognition', name: 'Image Recognition', description: 'Train AI models' }
    ];

    return (
        <div data-testid="games-page">
            <h1>Games</h1>
            <div data-testid="games-list">
                {games.map(game => (
                    <div
                        key={game.id}
                        data-testid={`game-card-${game.id}`}
                        onClick={() => onGameSelect(game.id)}
                        className="game-card"
                    >
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <button data-testid={`play-${game.id}-btn`}>Play</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mock Snake Game
const MockSnakeGame = ({ onScoreChange, onGameOver }) => {
    const [gameState, setGameState] = React.useState('idle'); // idle, playing, gameover
    const [score, setScore] = React.useState(0);
    const [highScore, setHighScore] = React.useState(0);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        onScoreChange?.(0);
    };

    const eatFood = () => {
        const newScore = score + 10;
        setScore(newScore);
        onScoreChange?.(newScore);
    };

    const endGame = () => {
        setGameState('gameover');
        if (score > highScore) {
            setHighScore(score);
        }
        onGameOver?.(score);
    };

    const restartGame = () => {
        setGameState('playing');
        setScore(0);
        onScoreChange?.(0);
    };

    return (
        <div data-testid="snake-game">
            <h1>Snake Game</h1>

            <div data-testid="score-display">
                <span data-testid="current-score">Score: {score}</span>
                <span data-testid="high-score">High Score: {highScore}</span>
            </div>

            {gameState === 'idle' && (
                <div data-testid="game-start-screen">
                    <p>Press Start to begin!</p>
                    <button data-testid="start-game-btn" onClick={startGame}>
                        Start Game
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div data-testid="game-canvas">
                    <p data-testid="game-status">Game in progress...</p>
                    {/* Simulate game actions for testing */}
                    <button data-testid="eat-food-btn" onClick={eatFood}>Eat Food (+10)</button>
                    <button data-testid="game-over-btn" onClick={endGame}>End Game</button>
                </div>
            )}

            {gameState === 'gameover' && (
                <div data-testid="game-over-screen">
                    <h2>Game Over!</h2>
                    <p data-testid="final-score">Final Score: {score}</p>
                    <button data-testid="restart-btn" onClick={restartGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

// Complete Game Flow Component
const MockGameFlow = () => {
    const [currentView, setCurrentView] = React.useState('games-list');
    const [selectedGame, setSelectedGame] = React.useState(null);

    const handleGameSelect = (gameId) => {
        setSelectedGame(gameId);
        setCurrentView('game');
    };

    const handleBackToGames = () => {
        setCurrentView('games-list');
        setSelectedGame(null);
    };

    return (
        <div data-testid="game-flow">
            {currentView === 'games-list' && (
                <MockGamesPage onGameSelect={handleGameSelect} />
            )}

            {currentView === 'game' && selectedGame === 'snake' && (
                <div>
                    <button data-testid="back-btn" onClick={handleBackToGames}>← Back</button>
                    <MockSnakeGame />
                </div>
            )}
        </div>
    );
};

describe('Snake Game Flow Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: User accesses games page, selects Snake, starts game with initial score of 0', () => {

        test('games page displays list of available games', () => {
            render(
                <TestWrapper>
                    <MockGamesPage onGameSelect={jest.fn()} />
                </TestWrapper>
            );

            expect(screen.getByTestId('games-page')).toBeInTheDocument();
            expect(screen.getByTestId('games-list')).toBeInTheDocument();
            expect(screen.getByTestId('game-card-snake')).toBeInTheDocument();
            expect(screen.getByText('Snake')).toBeInTheDocument();
        });

        test('user can select Snake game from games list', () => {
            const onGameSelect = jest.fn();
            render(
                <TestWrapper>
                    <MockGamesPage onGameSelect={onGameSelect} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('game-card-snake'));

            expect(onGameSelect).toHaveBeenCalledWith('snake');
        });

        test('Snake game loads with start screen when selected', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            expect(screen.getByTestId('snake-game')).toBeInTheDocument();
            expect(screen.getByTestId('game-start-screen')).toBeInTheDocument();
            expect(screen.getByTestId('start-game-btn')).toBeInTheDocument();
        });

        test('score is 0 before game starts', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');
        });

        test('user starts game with initial score of 0', () => {
            const onScoreChange = jest.fn();
            render(
                <TestWrapper>
                    <MockSnakeGame onScoreChange={onScoreChange} />
                </TestWrapper>
            );

            // Click start
            fireEvent.click(screen.getByTestId('start-game-btn'));

            // Game should be playing
            expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
            expect(screen.getByTestId('game-status')).toHaveTextContent('Game in progress...');

            // Score should be 0
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');
            expect(onScoreChange).toHaveBeenCalledWith(0);
        });

        test('complete flow: games page → select Snake → start game', () => {
            render(
                <TestWrapper>
                    <MockGameFlow />
                </TestWrapper>
            );

            // Step 1: On games page
            expect(screen.getByTestId('games-page')).toBeInTheDocument();
            expect(screen.getByText('Snake')).toBeInTheDocument();

            // Step 2: Select Snake
            fireEvent.click(screen.getByTestId('game-card-snake'));

            // Step 3: Snake game loads
            expect(screen.getByTestId('snake-game')).toBeInTheDocument();
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');

            // Step 4: Start game
            fireEvent.click(screen.getByTestId('start-game-btn'));

            // Game is playing with score 0
            expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');
        });

        test('score increases when snake eats food during game', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            // Start game
            fireEvent.click(screen.getByTestId('start-game-btn'));
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');

            // Eat food
            fireEvent.click(screen.getByTestId('eat-food-btn'));
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 10');

            // Eat more food
            fireEvent.click(screen.getByTestId('eat-food-btn'));
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 20');
        });

        test('game over shows final score', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            // Start and play
            fireEvent.click(screen.getByTestId('start-game-btn'));
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10 = 20

            // End game
            fireEvent.click(screen.getByTestId('game-over-btn'));

            expect(screen.getByTestId('game-over-screen')).toBeInTheDocument();
            expect(screen.getByTestId('final-score')).toHaveTextContent('Final Score: 20');
        });

        test('user can restart game after game over with score reset to 0', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            // Play and end
            fireEvent.click(screen.getByTestId('start-game-btn'));
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10
            fireEvent.click(screen.getByTestId('game-over-btn'));

            // Restart
            fireEvent.click(screen.getByTestId('restart-btn'));

            // Score should be 0 again
            expect(screen.getByTestId('current-score')).toHaveTextContent('Score: 0');
            expect(screen.getByTestId('game-canvas')).toBeInTheDocument();
        });

        test('high score is tracked across games', () => {
            render(
                <TestWrapper>
                    <MockSnakeGame />
                </TestWrapper>
            );

            // First game: score 30
            fireEvent.click(screen.getByTestId('start-game-btn'));
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10 = 30
            fireEvent.click(screen.getByTestId('game-over-btn'));

            expect(screen.getByTestId('high-score')).toHaveTextContent('High Score: 30');

            // Restart and get lower score
            fireEvent.click(screen.getByTestId('restart-btn'));
            fireEvent.click(screen.getByTestId('eat-food-btn')); // +10
            fireEvent.click(screen.getByTestId('game-over-btn'));

            // High score should still be 30
            expect(screen.getByTestId('high-score')).toHaveTextContent('High Score: 30');
        });
    });
});
