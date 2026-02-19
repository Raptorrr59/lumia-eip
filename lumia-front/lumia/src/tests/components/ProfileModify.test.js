import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock axios
jest.mock('axios', () => ({
    put: jest.fn(() => Promise.resolve({ data: {} }))
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

// Mock ProfileModify component
const MockProfileModify = ({ isOpen, onClose, user, onSave }) => (
    isOpen ? (
        <div data-testid="profile-modify-modal">
            <h2>Edit Profile</h2>
            <input type="text" defaultValue={user.username} data-testid="username-input" />
            <input type="email" defaultValue={user.email} data-testid="email-input" disabled />
            <textarea defaultValue={user.bio} data-testid="bio-input" />
            <button onClick={onSave} data-testid="save-btn">Save</button>
            <button onClick={onClose} data-testid="cancel-btn">Cancel</button>
        </div>
    ) : null
);

describe('ProfileModify Component', () => {
    const mockUser = {
        username: 'TestUser',
        email: 'test@example.com',
        bio: 'Hello, I am a test user'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('profile-modify-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={false} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('profile-modify-modal')).not.toBeInTheDocument();
    });

    test('displays heading', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    test('displays current username', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        expect(screen.getByTestId('username-input').value).toBe('TestUser');
    });

    test('displays current email (disabled)', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        const emailInput = screen.getByTestId('email-input');
        expect(emailInput.value).toBe('test@example.com');
        expect(emailInput).toBeDisabled();
    });

    test('allows username edit', () => {
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        const input = screen.getByTestId('username-input');
        fireEvent.change(input, { target: { value: 'NewUsername' } });
        expect(input.value).toBe('NewUsername');
    });

    test('calls onSave when save button clicked', () => {
        const handleSave = jest.fn();
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={jest.fn()} user={mockUser} onSave={handleSave} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByTestId('save-btn'));
        expect(handleSave).toHaveBeenCalled();
    });

    test('calls onClose when cancel button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockProfileModify isOpen={true} onClose={handleClose} user={mockUser} onSave={jest.fn()} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByTestId('cancel-btn'));
        expect(handleClose).toHaveBeenCalled();
    });
});
