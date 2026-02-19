import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthRequired from '../../components/AuthRequired';
import { LangProvider } from '../../LangProvider';

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

describe('AuthRequired Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(
            <TestWrapper>
                <AuthRequired type="login" />
            </TestWrapper>
        );
        expect(document.body).toBeInTheDocument();
    });

    test('renders login type content', () => {
        render(
            <TestWrapper>
                <AuthRequired type="login" />
            </TestWrapper>
        );
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    test('renders verification type content', () => {
        render(
            <TestWrapper>
                <AuthRequired type="verification" />
            </TestWrapper>
        );
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    test('renders admin type content', () => {
        render(
            <TestWrapper>
                <AuthRequired type="admin" />
            </TestWrapper>
        );
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    test('renders login button for login type', () => {
        render(
            <TestWrapper>
                <AuthRequired type="login" />
            </TestWrapper>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
    });

    test('renders back to home link', () => {
        render(
            <TestWrapper>
                <AuthRequired type="login" />
            </TestWrapper>
        );
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
    });
});
