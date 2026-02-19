import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
    post: jest.fn()
}));

import axios from 'axios';

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

// Mock Turnstile Captcha component
const MockTurnstileCaptcha = ({ onVerify, onError }) => {
    const [isVerified, setIsVerified] = React.useState(false);

    const handleVerify = () => {
        setIsVerified(true);
        onVerify?.('mock-turnstile-token-12345');
    };

    return (
        <div data-testid="turnstile-captcha">
            {!isVerified ? (
                <button data-testid="verify-captcha-btn" onClick={handleVerify}>
                    Verify Captcha
                </button>
            ) : (
                <span data-testid="captcha-verified">✓ Verified</span>
            )}
        </div>
    );
};

// Mock SignUp Form with Turnstile
const MockSignUpForm = ({ onSuccess, onError }) => {
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [turnstileToken, setTurnstileToken] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username || formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!turnstileToken) {
            newErrors.captcha = 'Please verify the captcha';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                turnstileToken: turnstileToken
            });

            setIsSuccess(true);
            onSuccess?.(response.data);
        } catch (error) {
            setErrors({ submit: error.response?.data?.message || 'Registration failed' });
            onError?.(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div data-testid="registration-success">
                <h2>Account Created Successfully!</h2>
                <p>Welcome, {formData.username}!</p>
            </div>
        );
    }

    return (
        <form data-testid="signup-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    data-testid="username-input"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                {errors.username && <span data-testid="username-error">{errors.username}</span>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    data-testid="email-input"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors.email && <span data-testid="email-error">{errors.email}</span>}
            </div>

            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    data-testid="password-input"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {errors.password && <span data-testid="password-error">{errors.password}</span>}
            </div>

            <div>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    data-testid="confirm-password-input"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                {errors.confirmPassword && <span data-testid="confirm-password-error">{errors.confirmPassword}</span>}
            </div>

            <MockTurnstileCaptcha
                onVerify={(token) => setTurnstileToken(token)}
            />
            {errors.captcha && <span data-testid="captcha-error">{errors.captcha}</span>}

            {errors.submit && <span data-testid="submit-error">{errors.submit}</span>}

            <button
                type="submit"
                data-testid="submit-btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
        </form>
    );
};

describe('User Registration with Turnstile Captcha', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        axios.post.mockReset();
    });

    describe('Scenario: User fills form with valid data, validates Turnstile captcha, and creates account', () => {

        test('renders signup form correctly', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            expect(screen.getByTestId('signup-form')).toBeInTheDocument();
            expect(screen.getByTestId('username-input')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
            expect(screen.getByTestId('turnstile-captcha')).toBeInTheDocument();
        });

        test('user can fill in all form fields', async () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            const usernameInput = screen.getByTestId('username-input');
            const emailInput = screen.getByTestId('email-input');
            const passwordInput = screen.getByTestId('password-input');
            const confirmPasswordInput = screen.getByTestId('confirm-password-input');

            fireEvent.change(usernameInput, { target: { value: 'testuser' } });
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
            fireEvent.change(confirmPasswordInput, { target: { value: 'SecurePass123!' } });

            expect(usernameInput.value).toBe('testuser');
            expect(emailInput.value).toBe('test@example.com');
            expect(passwordInput.value).toBe('SecurePass123!');
            expect(confirmPasswordInput.value).toBe('SecurePass123!');
        });

        test('turnstile captcha can be verified', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            // Initially captcha is not verified
            expect(screen.getByTestId('verify-captcha-btn')).toBeInTheDocument();

            // Click to verify captcha
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            // Captcha should now show as verified
            expect(screen.getByTestId('captcha-verified')).toBeInTheDocument();
            expect(screen.queryByTestId('verify-captcha-btn')).not.toBeInTheDocument();
        });

        test('form validation fails without captcha verification', async () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            // Fill form but don't verify captcha
            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'SecurePass123!' } });

            // Submit without captcha
            fireEvent.click(screen.getByTestId('submit-btn'));

            // Should show captcha error
            expect(screen.getByTestId('captcha-error')).toHaveTextContent('Please verify the captcha');
        });

        test('complete registration flow with valid data and captcha', async () => {
            const onSuccess = jest.fn();
            axios.post.mockResolvedValueOnce({
                data: {
                    message: 'Registration successful',
                    userId: '12345'
                }
            });

            render(
                <TestWrapper>
                    <MockSignUpForm onSuccess={onSuccess} />
                </TestWrapper>
            );

            // Step 1: Fill form with valid data
            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'newuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'newuser@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'MySecure123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'MySecure123!' } });

            // Step 2: Verify Turnstile captcha
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));
            expect(screen.getByTestId('captcha-verified')).toBeInTheDocument();

            // Step 3: Submit form
            fireEvent.click(screen.getByTestId('submit-btn'));

            // Step 4: Verify API was called with correct data
            await waitFor(() => {
                expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
                    username: 'newuser',
                    email: 'newuser@example.com',
                    password: 'MySecure123!',
                    turnstileToken: 'mock-turnstile-token-12345'
                });
            });

            // Step 5: Verify success callback and message
            await waitFor(() => {
                expect(screen.getByTestId('registration-success')).toBeInTheDocument();
                expect(screen.getByText('Account Created Successfully!')).toBeInTheDocument();
                expect(screen.getByText(/Welcome, newuser!/)).toBeInTheDocument();
            });

            expect(onSuccess).toHaveBeenCalled();
        });

        test('shows validation errors for invalid username', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            // Short username
            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'ab' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('username-error')).toHaveTextContent('Username must be at least 3 characters');
        });

        test('shows validation errors for invalid email', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('email-error')).toHaveTextContent('Please enter a valid email');
        });

        test('shows validation errors for short password', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'short' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'short' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 8 characters');
        });

        test('shows validation errors for password mismatch', () => {
            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'DifferentPass!' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('confirm-password-error')).toHaveTextContent('Passwords do not match');
        });

        test('handles API registration error', async () => {
            const onError = jest.fn();
            axios.post.mockRejectedValueOnce({
                response: {
                    data: { message: 'Email already exists' }
                }
            });

            render(
                <TestWrapper>
                    <MockSignUpForm onError={onError} />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'existing@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            await waitFor(() => {
                expect(screen.getByTestId('submit-error')).toHaveTextContent('Email already exists');
            });

            expect(onError).toHaveBeenCalled();
        });

        test('submit button is disabled while submitting', async () => {
            axios.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

            render(
                <TestWrapper>
                    <MockSignUpForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'SecurePass123!' } });
            fireEvent.click(screen.getByTestId('verify-captcha-btn'));

            fireEvent.click(screen.getByTestId('submit-btn'));

            expect(screen.getByTestId('submit-btn')).toBeDisabled();
            expect(screen.getByTestId('submit-btn')).toHaveTextContent('Creating...');
        });
    });
});
