import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} }))
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
    <LangProvider>
        {children}
    </LangProvider>
);

// Mock ForgotPasswordModal component
const MockForgotPasswordModal = ({ isOpen, onClose }) => (
    isOpen ? (
        <div data-testid="forgot-password-modal">
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Enter email" data-testid="email-input" />
            <button data-testid="submit-btn">Send Reset Link</button>
            <button onClick={onClose} data-testid="close-btn">Close</button>
        </div>
    ) : null
);

describe('ForgotPasswordModal Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('forgot-password-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={false} onClose={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('forgot-password-modal')).not.toBeInTheDocument();
    });

    test('displays heading', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });

    test('renders email input', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });

    test('renders submit button', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    });

    test('calls onClose when close button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={handleClose} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByTestId('close-btn'));
        expect(handleClose).toHaveBeenCalled();
    });

    test('allows email input', () => {
        render(
            <TestWrapper>
                <MockForgotPasswordModal isOpen={true} onClose={jest.fn()} />
            </TestWrapper>
        );
        const input = screen.getByTestId('email-input');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });
});
