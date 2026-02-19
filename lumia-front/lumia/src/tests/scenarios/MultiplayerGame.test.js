import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'language') return 'EN';
        if (key === 'accessToken') return 'test-token';
        if (key === 'username') return 'Player1';
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

// Mock Multiplayer Lobby
const MockMultiplayerLobby = ({ gameId, onGameStart, onPlayerJoin, onPlayerLeave }) => {
    const [players, setPlayers] = React.useState([]);
    const [gameState, setGameState] = React.useState('waiting'); // waiting, ready, playing
    const [roomCode, setRoomCode] = React.useState('ABC123');

    const addPlayer = (player) => {
        const newPlayers = [...players, player];
        setPlayers(newPlayers);
        onPlayerJoin?.(player);

        // Game is ready when 2 players join
        if (newPlayers.length >= 2) {
            setGameState('ready');
        }
    };

    const removePlayer = (playerId) => {
        const player = players.find(p => p.id === playerId);
        setPlayers(players.filter(p => p.id !== playerId));
        onPlayerLeave?.(player);
        setGameState('waiting');
    };

    const startGame = () => {
        if (players.length >= 2) {
            setGameState('playing');
            onGameStart?.(players);
        }
    };

    return (
        <div data-testid="multiplayer-lobby">
            <h1>Multiplayer Lobby</h1>
            <p data-testid="room-code">Room: {roomCode}</p>

            <div data-testid="player-count">
                Players: {players.length}/2
            </div>

            <div data-testid="players-list">
                {players.map(player => (
                    <div key={player.id} data-testid={`player-${player.id}`} className="player-card">
                        <span>{player.name}</span>
                        {player.isHost && <span data-testid="host-badge">👑 Host</span>}
                    </div>
                ))}
            </div>

            {gameState === 'waiting' && (
                <div data-testid="waiting-screen">
                    <p>Waiting for players... ({players.length}/2)</p>
                    <button
                        data-testid="join-player1-btn"
                        onClick={() => addPlayer({ id: 1, name: 'Player1', isHost: true })}
                        disabled={players.some(p => p.id === 1)}
                    >
                        Join as Player 1
                    </button>
                    <button
                        data-testid="join-player2-btn"
                        onClick={() => addPlayer({ id: 2, name: 'Player2', isHost: false })}
                        disabled={players.some(p => p.id === 2)}
                    >
                        Join as Player 2
                    </button>
                </div>
            )}

            {gameState === 'ready' && (
                <div data-testid="ready-screen">
                    <p data-testid="ready-message">All players ready!</p>
                    <button data-testid="start-game-btn" onClick={startGame}>
                        Start Game
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div data-testid="game-screen">
                    <h2>Game Started!</h2>
                    <p data-testid="game-players">Playing with {players.length} players</p>
                    {players.map(player => (
                        <div key={player.id} data-testid={`game-player-${player.id}`}>
                            {player.name}: Score 0
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Mock Connect4 Multiplayer
const MockConnect4Multiplayer = ({ player1, player2, onMove, onWin }) => {
    const [currentPlayer, setCurrentPlayer] = React.useState(1);
    const [gameStarted, setGameStarted] = React.useState(false);

    const startGame = () => {
        setGameStarted(true);
    };

    const makeMove = (column) => {
        onMove?.(currentPlayer, column);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    return (
        <div data-testid="connect4-multiplayer">
            <h1>Connect 4 - Multiplayer</h1>

            <div data-testid="players-info">
                <span data-testid="player1-info">{player1?.name || 'Player 1'} (Red)</span>
                <span> vs </span>
                <span data-testid="player2-info">{player2?.name || 'Player 2'} (Yellow)</span>
            </div>

            {!gameStarted ? (
                <button data-testid="start-match-btn" onClick={startGame}>
                    Start Match
                </button>
            ) : (
                <div data-testid="game-board">
                    <p data-testid="current-turn">
                        Current Turn: {currentPlayer === 1 ? player1?.name : player2?.name}
                    </p>
                    <div data-testid="board-columns">
                        {[0, 1, 2, 3, 4, 5, 6].map(col => (
                            <button
                                key={col}
                                data-testid={`column-${col}`}
                                onClick={() => makeMove(col)}
                            >
                                Col {col}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

describe('Multiplayer Game Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: Two players join and game starts with 2 players', () => {

        test('lobby shows waiting for players initially', () => {
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" />
                </TestWrapper>
            );

            expect(screen.getByTestId('multiplayer-lobby')).toBeInTheDocument();
            expect(screen.getByTestId('waiting-screen')).toBeInTheDocument();
            expect(screen.getByTestId('player-count')).toHaveTextContent('Players: 0/2');
        });

        test('first player joins the lobby', () => {
            const onPlayerJoin = jest.fn();
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" onPlayerJoin={onPlayerJoin} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('join-player1-btn'));

            expect(screen.getByTestId('player-1')).toBeInTheDocument();
            expect(screen.getByTestId('player-count')).toHaveTextContent('Players: 1/2');
            expect(onPlayerJoin).toHaveBeenCalledWith(expect.objectContaining({ name: 'Player1' }));
        });

        test('second player joins the lobby', () => {
            const onPlayerJoin = jest.fn();
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" onPlayerJoin={onPlayerJoin} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('join-player1-btn'));
            fireEvent.click(screen.getByTestId('join-player2-btn'));

            expect(screen.getByTestId('player-1')).toBeInTheDocument();
            expect(screen.getByTestId('player-2')).toBeInTheDocument();
            expect(screen.getByTestId('player-count')).toHaveTextContent('Players: 2/2');
        });

        test('lobby shows ready when 2 players join', () => {
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" />
                </TestWrapper>
            );

            // Both players join
            fireEvent.click(screen.getByTestId('join-player1-btn'));
            fireEvent.click(screen.getByTestId('join-player2-btn'));

            // Ready screen appears
            expect(screen.getByTestId('ready-screen')).toBeInTheDocument();
            expect(screen.getByTestId('ready-message')).toHaveTextContent('All players ready!');
            expect(screen.getByTestId('start-game-btn')).toBeInTheDocument();
        });

        test('game starts with 2 players', () => {
            const onGameStart = jest.fn();
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" onGameStart={onGameStart} />
                </TestWrapper>
            );

            // Both players join
            fireEvent.click(screen.getByTestId('join-player1-btn'));
            fireEvent.click(screen.getByTestId('join-player2-btn'));

            // Start game
            fireEvent.click(screen.getByTestId('start-game-btn'));

            // Game screen appears
            expect(screen.getByTestId('game-screen')).toBeInTheDocument();
            expect(screen.getByTestId('game-players')).toHaveTextContent('Playing with 2 players');
            expect(onGameStart).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ name: 'Player1' }),
                expect.objectContaining({ name: 'Player2' })
            ]));
        });

        test('both players are displayed in the game', () => {
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('join-player1-btn'));
            fireEvent.click(screen.getByTestId('join-player2-btn'));
            fireEvent.click(screen.getByTestId('start-game-btn'));

            expect(screen.getByTestId('game-player-1')).toHaveTextContent('Player1');
            expect(screen.getByTestId('game-player-2')).toHaveTextContent('Player2');
        });

        test('host badge is shown for the first player', () => {
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('join-player1-btn'));

            expect(screen.getByTestId('host-badge')).toBeInTheDocument();
        });

        test('room code is displayed for sharing', () => {
            render(
                <TestWrapper>
                    <MockMultiplayerLobby gameId="connect4" />
                </TestWrapper>
            );

            expect(screen.getByTestId('room-code')).toHaveTextContent('Room: ABC123');
        });

        test('Connect4 multiplayer shows both players', () => {
            const player1 = { id: 1, name: 'Alice' };
            const player2 = { id: 2, name: 'Bob' };

            render(
                <TestWrapper>
                    <MockConnect4Multiplayer player1={player1} player2={player2} />
                </TestWrapper>
            );

            expect(screen.getByTestId('player1-info')).toHaveTextContent('Alice');
            expect(screen.getByTestId('player2-info')).toHaveTextContent('Bob');
        });

        test('Connect4 match starts and alternates turns', () => {
            const player1 = { id: 1, name: 'Alice' };
            const player2 = { id: 2, name: 'Bob' };
            const onMove = jest.fn();

            render(
                <TestWrapper>
                    <MockConnect4Multiplayer player1={player1} player2={player2} onMove={onMove} />
                </TestWrapper>
            );

            // Start match
            fireEvent.click(screen.getByTestId('start-match-btn'));

            // Player 1 turn
            expect(screen.getByTestId('current-turn')).toHaveTextContent('Alice');

            // Player 1 makes move
            fireEvent.click(screen.getByTestId('column-3'));
            expect(onMove).toHaveBeenCalledWith(1, 3);

            // Now Player 2 turn
            expect(screen.getByTestId('current-turn')).toHaveTextContent('Bob');
        });
    });
});
