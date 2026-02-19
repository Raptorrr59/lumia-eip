import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Snake from './Snake';
import { LangProvider } from '../../../LangProvider';

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

jest.mock('framer-motion', () => {
    return require('../../../tests/mocks/framer-motion');
});

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

const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderSnake = (props = {}) => {
    const defaultProps = {
        game: 'snake',
        isLoading: false,
        setIsLoading: jest.fn(),
        isUploaded: true
    };
    return render(
        <TestWrapper>
            <Snake {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('Snake Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderSnake();
            expect(document.body).toBeInTheDocument();
        });

        test('renders the game board with correct grid size (10x10)', () => {
            renderSnake();
            const rows = document.querySelectorAll('.row');
            expect(rows).toHaveLength(10);
        });

        test('displays score section', () => {
            renderSnake();
            expect(screen.getByText(/Score/i)).toBeInTheDocument();
        });

        test('displays loading screen when isLoading is true', () => {
            renderSnake({ isLoading: true });
            expect(document.querySelector('.loading-screen')).toBeInTheDocument();
        });

        test('renders game control buttons', () => {
            renderSnake({ isUploaded: true });
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });

    describe('Speed Control', () => {
        test('renders speed control slider', () => {
            renderSnake();
            const slider = screen.getByRole('slider');
            expect(slider).toBeInTheDocument();
        });

        test('displays speed section', () => {
            renderSnake();
            expect(screen.getByText(/Speed/i)).toBeInTheDocument();
        });

        test('slider changes speed value', () => {
            renderSnake();
            const slider = screen.getByRole('slider');
            fireEvent.change(slider, { target: { value: '1500' } });
            expect(screen.getByText(/600ms/)).toBeInTheDocument();
        });
    });

    describe('Game Cells', () => {
        test('all game cells start without snake or food', () => {
            renderSnake();
            const cells = document.querySelectorAll('.snake-cell');
            cells.forEach(cell => {
                expect(cell.classList.contains('head')).toBe(false);
                expect(cell.classList.contains('food')).toBe(false);
            });
        });
    });

    describe('Game Over State', () => {
        test('does not show game over overlay initially', () => {
            renderSnake();
            expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
        });
    });
});
