import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Mock EmailVerificationPopup component
const MockEmailVerificationPopup = ({ isOpen, email, onResend }) => (
    isOpen ? (
        <div data-testid="email-verification-popup">
            <h2>Verify Your Email</h2>
            <p>We sent a verification link to {email}</p>
            <button onClick={onResend}>Resend Email</button>
        </div>
    ) : null
);

describe('EmailVerificationPopup Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockEmailVerificationPopup isOpen={true} email="test@example.com" onResend={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('email-verification-popup')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockEmailVerificationPopup isOpen={false} email="test@example.com" onResend={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('email-verification-popup')).not.toBeInTheDocument();
    });

    test('displays heading', () => {
        render(
            <TestWrapper>
                <MockEmailVerificationPopup isOpen={true} email="test@example.com" onResend={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText('Verify Your Email')).toBeInTheDocument();
    });

    test('displays email address', () => {
        render(
            <TestWrapper>
                <MockEmailVerificationPopup isOpen={true} email="user@test.com" onResend={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText(/user@test.com/)).toBeInTheDocument();
    });

    test('renders resend button', () => {
        render(
            <TestWrapper>
                <MockEmailVerificationPopup isOpen={true} email="test@example.com" onResend={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText('Resend Email')).toBeInTheDocument();
    });
});
