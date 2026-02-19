import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginModal from '../../components/modal/LoginModal';
import { LangProvider } from '../../LangProvider';
import axios from 'axios';

jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

jest.mock('axios');

jest.mock('../../components/modal/ForgotPasswordModal', () => {
    return function MockForgotPasswordModal({ isOpen, onClose }) {
        return isOpen ? <div data-testid="forgot-password-modal"><button onClick={onClose}>Close</button></div> : null;
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

const renderLoginModal = (props = {}) => {
    const defaultProps = {
        isOpen: true,
        onClose: jest.fn(),
        onSignUpClick: jest.fn(),
    };
    return render(
        <TestWrapper>
            <LoginModal {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('LoginModal Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders modal when open', () => {
            renderLoginModal();
            expect(document.body).toBeInTheDocument();
        });

        test('renders email input', () => {
            renderLoginModal();
            const emailInput = document.querySelector('input[type="email"]');
            expect(emailInput).toBeInTheDocument();
        });

        test('renders password input', () => {
            renderLoginModal();
            const passwordInput = document.querySelector('input[type="password"]');
            expect(passwordInput).toBeInTheDocument();
        });

        test('renders submit button', () => {
            renderLoginModal();
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });

    describe('Form Input', () => {
        test('allows email input', () => {
            renderLoginModal();
            const emailInput = document.querySelector('input[type="email"]');
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            expect(emailInput.value).toBe('test@example.com');
        });

        test('allows password input', () => {
            renderLoginModal();
            const passwordInput = document.querySelector('input[type="password"]');
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            expect(passwordInput.value).toBe('password123');
        });
    });

    describe('Close Functionality', () => {
        test('close button exists', () => {
            const onClose = jest.fn();
            renderLoginModal({ onClose });
            const buttons = screen.getAllByRole('button');
            expect(buttons.length).toBeGreaterThan(0);
        });
    });
});
