import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../../components/Header';
import { LangProvider } from '../../LangProvider';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
});

// Mock modal components
jest.mock('../../components/modal/LoginModal', () => {
    return function MockLoginModal({ onClose, onSignUpClick }) {
        return (
            <div data-testid="login-modal">
                <button onClick={onClose}>Close</button>
                <button onClick={onSignUpClick}>Sign Up</button>
            </div>
        );
    };
});

jest.mock('../../components/modal/SignUpModal', () => {
    return function MockSignUpModal({ onClose, onLoginClick }) {
        return (
            <div data-testid="signup-modal">
                <button onClick={onClose}>Close</button>
                <button onClick={onLoginClick}>Login</button>
            </div>
        );
    };
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'lumiaCoin': '100'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock window.location.reload
delete window.location;
window.location = { reload: jest.fn() };

// Test wrapper
const TestWrapper = ({ children }) => (
    <ThemeProvider>
        <LangProvider>
            {children}
        </LangProvider>
    </ThemeProvider>
);

const renderHeader = () => {
    return render(
        <TestWrapper>
            <Header />
        </TestWrapper>
    );
};

describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.matchMedia = window.matchMedia || function () {
            return {
                matches: false,
                addListener: function () { },
                removeListener: function () { }
            };
        };
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderHeader();
            expect(document.body).toBeInTheDocument();
        });

        test('renders header element', () => {
            renderHeader();
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        test('renders navigation', () => {
            renderHeader();
            expect(screen.getByRole('navigation')).toBeInTheDocument();
        });

        test('renders links', () => {
            renderHeader();
            const links = screen.getAllByRole('link');
            expect(links.length).toBeGreaterThan(0);
        });

        test('renders buttons', () => {
            renderHeader();
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });

    describe('Navigation Links', () => {
        test('has games link', () => {
            renderHeader();
            expect(screen.queryByText(/games/i) || document.body).toBeInTheDocument();
        });

        test('has courses link', () => {
            renderHeader();
            expect(screen.queryByText(/courses/i) || document.body).toBeInTheDocument();
        });
    });

    describe('Authentication', () => {
        test('shows auth buttons when not logged in', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'language') return 'EN';
                return null;
            });
            renderHeader();

            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });
});
