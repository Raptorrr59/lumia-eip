import React from 'react';
import { render, screen } from '@testing-library/react';
import RankingRow from '../../components/ranking/RankingRow';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

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
    <LangProvider>
        {children}
    </LangProvider>
);

const mockRankingData = [
    { userName: 'Player1', score: 500 },
    { userName: 'Player2', score: 400 },
    { userName: 'Player3', score: 300 }
];

describe('RankingRow Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <RankingRow rankingData={mockRankingData} scrollable={false} />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders ranking section', () => {
        render(
            <TestWrapper>
                <RankingRow rankingData={mockRankingData} scrollable={false} />
            </TestWrapper>
        );
        expect(screen.getByTestId('ranking-section')).toBeInTheDocument();
    });

    test('displays player names', () => {
        render(
            <TestWrapper>
                <RankingRow rankingData={mockRankingData} scrollable={false} />
            </TestWrapper>
        );
        expect(screen.getByText('Player1')).toBeInTheDocument();
        expect(screen.getByText('Player2')).toBeInTheDocument();
    });

    test('displays player scores', () => {
        render(
            <TestWrapper>
                <RankingRow rankingData={mockRankingData} scrollable={false} />
            </TestWrapper>
        );
        expect(screen.getByText('500')).toBeInTheDocument();
    });

    test('renders with scrollable mode', () => {
        render(
            <TestWrapper>
                <RankingRow rankingData={mockRankingData} scrollable={true} />
            </TestWrapper>
        );
        expect(screen.getByTestId('ranking-section')).toBeInTheDocument();
    });

    test('limits to 6 players when not scrollable', () => {
        const manyPlayers = Array.from({ length: 10 }, (_, i) => ({
            userName: `Player${i + 1}`,
            score: 1000 - i * 100
        }));

        render(
            <TestWrapper>
                <RankingRow rankingData={manyPlayers} scrollable={false} />
            </TestWrapper>
        );

        expect(screen.getByText('Player1')).toBeInTheDocument();
        expect(screen.getByText('Player6')).toBeInTheDocument();
        expect(screen.queryByText('Player7')).not.toBeInTheDocument();
    });
});
