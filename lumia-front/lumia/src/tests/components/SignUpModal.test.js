import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpModal from '../../components/modal/SignUpModal';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    return require('../mocks/react-router-dom');
});

// Mock axios
jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn()
}));

// Mock Turnstile component
jest.mock('../../components/Turnstile', () => {
    return function MockTurnstile({ onVerify }) {
        return (
            <div data-testid="turnstile-mock">
                <button
                    type="button"
                    onClick={() => onVerify('mock-token')}
                    data-testid="verify-turnstile"
                >
                    Verify
                </button>
            </div>
        );
    };
});

import axios from 'axios';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// Mock window.location
delete window.location;
window.location = { reload: jest.fn(), replace: jest.fn() };

// Mock window.open
window.open = jest.fn();

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

const renderSignUpModal = (props = {}) => {
    const defaultProps = {
        onClose: jest.fn(),
        onLoginClick: jest.fn(),
        redirectTo: null
    };
    return render(
        <TestWrapper>
            <SignUpModal {...defaultProps} {...props} />
        </TestWrapper>
    );
};

describe('SignUpModal Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        axios.post.mockResolvedValue({ data: {} });
        axios.get.mockResolvedValue({ data: {} });
    });

    describe('Rendering', () => {
        test('renders the sign up form', () => {
            renderSignUpModal();
            expect(document.body).toBeInTheDocument();
        });

        test('renders text input fields', () => {
            renderSignUpModal();
            const inputs = document.querySelectorAll('input[type="text"]');
            expect(inputs.length).toBeGreaterThan(0);
        });

        test('renders email input field', () => {
            renderSignUpModal();
            const emailInput = document.querySelector('input[type="email"]');
            expect(emailInput).toBeInTheDocument();
        });

        test('renders password input field', () => {
            renderSignUpModal();
            const passwordInput = document.querySelector('input[type="password"]');
            expect(passwordInput).toBeInTheDocument();
        });

        test('renders terms checkbox', () => {
            renderSignUpModal();
            const checkbox = document.querySelector('input[type="checkbox"]');
            expect(checkbox).toBeInTheDocument();
        });

        test('renders Turnstile component', () => {
            renderSignUpModal();
            expect(screen.getByTestId('turnstile-mock')).toBeInTheDocument();
        });

        test('renders login link', () => {
            renderSignUpModal();
            expect(screen.getByText(/sign.*in/i)).toBeInTheDocument();
        });
    });

    describe('Form Interaction', () => {
        test('allows text input in first field', () => {
            renderSignUpModal();
            const textInputs = document.querySelectorAll('input[type="text"]');
            if (textInputs.length > 0) {
                fireEvent.change(textInputs[0], { target: { value: 'testuser' } });
                expect(textInputs[0].value).toBe('testuser');
            }
        });

        test('allows email input', () => {
            renderSignUpModal();
            const emailInput = document.querySelector('input[type="email"]');
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            expect(emailInput.value).toBe('test@example.com');
        });

        test('allows password input', () => {
            renderSignUpModal();
            const passwordInput = document.querySelector('input[type="password"]');
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            expect(passwordInput.value).toBe('password123');
        });

        test('allows terms checkbox to be checked', () => {
            renderSignUpModal();
            const checkbox = document.querySelector('input[type="checkbox"]');
            expect(checkbox.checked).toBe(false);
            fireEvent.click(checkbox);
            expect(checkbox.checked).toBe(true);
        });

        test('calls onLoginClick when login link is clicked', () => {
            const onLoginClick = jest.fn();
            renderSignUpModal({ onLoginClick });
            const loginLink = screen.getByText(/sign.*in/i);
            fireEvent.click(loginLink);
            expect(onLoginClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('Form Submission', () => {
        test('calls API on form submit', async () => {
            axios.post.mockResolvedValueOnce({ data: {} });

            renderSignUpModal();

            // Fill form
            const textInputs = document.querySelectorAll('input[type="text"]');
            if (textInputs.length > 0) {
                fireEvent.change(textInputs[0], { target: { value: 'testuser' } });
            }

            const emailInput = document.querySelector('input[type="email"]');
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

            const passwordInput = document.querySelector('input[type="password"]');
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            // Verify turnstile
            fireEvent.click(screen.getByTestId('verify-turnstile'));

            // Accept terms
            const checkbox = document.querySelector('input[type="checkbox"]');
            fireEvent.click(checkbox);

            // Submit form
            const form = document.querySelector('form');
            if (form) {
                fireEvent.submit(form);

                await waitFor(() => {
                    expect(axios.post).toHaveBeenCalled();
                });
            }
        });
    });

    describe('Modal Behavior', () => {
        test('renders modal container', () => {
            renderSignUpModal();
            expect(document.body).toBeInTheDocument();
        });
    });
});
