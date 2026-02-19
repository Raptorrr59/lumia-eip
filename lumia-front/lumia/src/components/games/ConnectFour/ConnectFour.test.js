import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConnectFour from './ConnectFour';
import { LangProvider } from '../../../LangProvider';

// Mock SockJS and STOMP
jest.mock('sockjs-client', () => {
    return function MockSockJS(url) {
        this.url = url;
        this.readyState = 1;
        this.onopen = null;
        this.onclose = null;
        this.close = jest.fn();
    };
});

jest.mock('@stomp/stompjs', () => ({
    Client: class MockClient {
        constructor() {
            this.onConnect = null;
            this.onStompError = null;
        }
        activate = jest.fn();
        deactivate = jest.fn();
        subscribe = jest.fn(() => ({ unsubscribe: jest.fn() }));
    }
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../../../tests/mocks/framer-motion');
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'id': '123',
            'accessToken': 'test-token',
            'userName': 'TestUser',
            'language': 'EN'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ gameStates: [] }),
        body: {
            getReader: () => ({
                read: jest.fn().mockResolvedValue({ done: true, value: undefined })
            })
        }
    })
);

// Test wrapper component
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderConnectFour = (props = {}) => {
    const defaultProps = {
        game: 'connect4',
        isLoading: false,
        setIsLoading: jest.fn(),
        isUploaded: true
    };
    return render(
        <TestWrapper>
            <ConnectFour {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('ConnectFour Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderConnectFour();
            expect(document.body).toBeInTheDocument();
        });

        test('renders the game board with correct grid size', () => {
            renderConnectFour();
            const rows = document.querySelectorAll('.row');
            expect(rows).toHaveLength(7);
        });

        test('displays score section', () => {
            renderConnectFour();
            expect(screen.getByText(/Score/i)).toBeInTheDocument();
        });

        test('displays loading screen when isLoading is true', () => {
            renderConnectFour({ isLoading: true });
            expect(screen.getByText(/chargement|loading/i)).toBeInTheDocument();
        });

        test('renders game control buttons', () => {
            renderConnectFour({ isUploaded: true });
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });

    describe('Speed Control', () => {
        test('renders speed control slider', () => {
            renderConnectFour();
            const slider = screen.getByRole('slider');
            expect(slider).toBeInTheDocument();
        });

        test('displays speed section', () => {
            renderConnectFour();
            expect(screen.getByText(/Speed/i)).toBeInTheDocument();
        });

        test('slider changes speed value', () => {
            renderConnectFour();
            const slider = screen.getByRole('slider');
            fireEvent.change(slider, { target: { value: '1500' } });
            expect(screen.getByText(/600ms/)).toBeInTheDocument();
        });
    });

    describe('Game Controls', () => {
        test('all game cells start empty', () => {
            renderConnectFour();
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                expect(cell.classList.contains('yellow')).toBe(false);
                expect(cell.classList.contains('red')).toBe(false);
            });
        });
    });

    describe('Game Over State', () => {
        test('does not show game over overlay initially', () => {
            renderConnectFour();
            expect(screen.queryByText('GAME OVER')).not.toBeInTheDocument();
        });

        test('does not show win overlay initially', () => {
            renderConnectFour();
            expect(screen.queryByText('YOU WON')).not.toBeInTheDocument();
        });
    });
});
