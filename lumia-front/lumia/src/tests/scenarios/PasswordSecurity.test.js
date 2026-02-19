import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// Password validation function with security criteria
const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return errors;
};

// Mock Password Form with security validation
const MockPasswordSecurityForm = ({ onSubmit }) => {
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [isValid, setIsValid] = React.useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const validationErrors = validatePassword(newPassword);
        setErrors(validationErrors);
        setIsValid(validationErrors.length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onSubmit?.(password);
        }
    };

    return (
        <form data-testid="password-form" onSubmit={handleSubmit}>
            <h2>Create Secure Password</h2>

            <input
                type="password"
                placeholder="Enter password"
                data-testid="password-input"
                value={password}
                onChange={handlePasswordChange}
            />

            <div data-testid="password-criteria">
                <p>Password must contain:</p>
                <ul>
                    <li data-testid="criteria-length" className={password.length >= 8 ? 'valid' : 'invalid'}>
                        At least 8 characters {password.length >= 8 ? '✓' : '✗'}
                    </li>
                    <li data-testid="criteria-uppercase" className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>
                        One uppercase letter {/[A-Z]/.test(password) ? '✓' : '✗'}
                    </li>
                    <li data-testid="criteria-lowercase" className={/[a-z]/.test(password) ? 'valid' : 'invalid'}>
                        One lowercase letter {/[a-z]/.test(password) ? '✓' : '✗'}
                    </li>
                    <li data-testid="criteria-number" className={/[0-9]/.test(password) ? 'valid' : 'invalid'}>
                        One number {/[0-9]/.test(password) ? '✓' : '✗'}
                    </li>
                    <li data-testid="criteria-special" className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'}>
                        One special character {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '✗'}
                    </li>
                </ul>
            </div>

            {errors.length > 0 && (
                <div data-testid="error-messages">
                    {errors.map((error, index) => (
                        <p key={index} className="error" data-testid={`error-${index}`}>{error}</p>
                    ))}
                </div>
            )}

            <button
                type="submit"
                data-testid="submit-btn"
                disabled={!isValid}
            >
                Create Account
            </button>

            {isValid && <span data-testid="password-valid">Password meets all criteria ✓</span>}
        </form>
    );
};

describe('Password Security Criteria Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: System rejects password not meeting security criteria', () => {

        test('rejects password that is too short (< 8 characters)', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Abc1!' } });

            expect(screen.getByTestId('criteria-length')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-length')).toHaveTextContent('✗');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('rejects password without uppercase letter', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123!' } });

            expect(screen.getByTestId('criteria-uppercase')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-uppercase')).toHaveTextContent('✗');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('rejects password without lowercase letter', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'PASSWORD123!' } });

            expect(screen.getByTestId('criteria-lowercase')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-lowercase')).toHaveTextContent('✗');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('rejects password without number', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'PasswordTest!' } });

            expect(screen.getByTestId('criteria-number')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-number')).toHaveTextContent('✗');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('rejects password without special character', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Password123' } });

            expect(screen.getByTestId('criteria-special')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-special')).toHaveTextContent('✗');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('rejects password with multiple missing criteria', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            // Only lowercase letters
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });

            expect(screen.getByTestId('criteria-uppercase')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-number')).toHaveClass('invalid');
            expect(screen.getByTestId('criteria-special')).toHaveClass('invalid');
            expect(screen.getByTestId('submit-btn')).toBeDisabled();
        });

        test('accepts password meeting all security criteria', () => {
            const onSubmit = jest.fn();
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm onSubmit={onSubmit} />
                </TestWrapper>
            );

            // Valid password: 8+ chars, uppercase, lowercase, number, special
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'SecurePass1!' } });

            expect(screen.getByTestId('criteria-length')).toHaveClass('valid');
            expect(screen.getByTestId('criteria-uppercase')).toHaveClass('valid');
            expect(screen.getByTestId('criteria-lowercase')).toHaveClass('valid');
            expect(screen.getByTestId('criteria-number')).toHaveClass('valid');
            expect(screen.getByTestId('criteria-special')).toHaveClass('valid');
            expect(screen.getByTestId('password-valid')).toBeInTheDocument();
            expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
        });

        test('displays error messages for each failed criterion', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            // Password missing everything
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'abc' } });

            expect(screen.getByTestId('error-messages')).toBeInTheDocument();
            expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
            expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
            expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();
            expect(screen.getByText('Password must contain at least one special character')).toBeInTheDocument();
        });

        test('criteria update dynamically as user types', () => {
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm />
                </TestWrapper>
            );

            const input = screen.getByTestId('password-input');

            // Start with empty
            expect(screen.getByTestId('criteria-length')).toHaveClass('invalid');

            // Add length
            fireEvent.change(input, { target: { value: 'password' } });
            expect(screen.getByTestId('criteria-length')).toHaveClass('valid');
            expect(screen.getByTestId('criteria-lowercase')).toHaveClass('valid');

            // Add uppercase
            fireEvent.change(input, { target: { value: 'Password' } });
            expect(screen.getByTestId('criteria-uppercase')).toHaveClass('valid');

            // Add number
            fireEvent.change(input, { target: { value: 'Password1' } });
            expect(screen.getByTestId('criteria-number')).toHaveClass('valid');

            // Add special character - now all valid
            fireEvent.change(input, { target: { value: 'Password1!' } });
            expect(screen.getByTestId('criteria-special')).toHaveClass('valid');
            expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
        });

        test('submit button only enabled with valid password', () => {
            const onSubmit = jest.fn();
            render(
                <TestWrapper>
                    <MockPasswordSecurityForm onSubmit={onSubmit} />
                </TestWrapper>
            );

            // Invalid password
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'weak' } });
            expect(screen.getByTestId('submit-btn')).toBeDisabled();

            // Valid password
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'StrongPass1!' } });
            expect(screen.getByTestId('submit-btn')).not.toBeDisabled();

            // Submit
            fireEvent.click(screen.getByTestId('submit-btn'));
            expect(onSubmit).toHaveBeenCalledWith('StrongPass1!');
        });
    });
});
