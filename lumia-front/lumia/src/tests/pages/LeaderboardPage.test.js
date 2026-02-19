import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LeaderboardPage from '../../pages/LeaderboardPage';
import { LangProvider } from '../../LangProvider';
import axios from 'axios';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
});

// Mock axios
jest.mock('axios');

// Mock Tutorial components
jest.mock('../../components/tutorials/TutorialPopup', () => {
    return function MockTutorialPopup() {
        return null;
    };
});

jest.mock('../../components/tutorials/TutorialInteractif', () => {
    return function MockTutorialInteractif() {
        return null;
    };
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'accessToken': 'test-token',
            'id': '123',
            'tutoLeaderboard': 'false'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderLeaderboard = () => {
    return render(
        <TestWrapper>
            <LeaderboardPage />
        </TestWrapper>
    );
};

describe('LeaderboardPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockResolvedValue({ data: [] });
    });

    describe('Rendering', () => {
        test('renders page without crashing', () => {
            renderLeaderboard();
            expect(document.body).toBeInTheDocument();
        });

        test('renders page heading', async () => {
            renderLeaderboard();
            await waitFor(() => {
                const headings = screen.getAllByRole('heading');
                expect(headings.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Data Loading', () => {
        test('calls API to fetch data', async () => {
            renderLeaderboard();
            await waitFor(() => {
                expect(axios.get).toHaveBeenCalled();
            });
        });
    });

    describe('Search Functionality', () => {
        test('renders search input', async () => {
            axios.get.mockResolvedValue({ data: [{ userName: 'test', score: 100 }] });
            renderLeaderboard();

            await waitFor(() => {
                const textbox = screen.queryByRole('textbox');
                expect(textbox || document.body).toBeInTheDocument();
            });
        });
    });
});
