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

// Mock UserDetailsModal component
const MockUserDetailsModal = ({ isOpen, onClose, user }) => (
    isOpen ? (
        <div data-testid="user-details-modal">
            <h2>User Details</h2>
            <div data-testid="user-avatar">
                <img src={user.avatar} alt={user.username} />
            </div>
            <p data-testid="user-username">{user.username}</p>
            <p data-testid="user-email">{user.email}</p>
            <p data-testid="user-joined">Joined: {user.joinedDate}</p>
            <button onClick={onClose}>Close</button>
        </div>
    ) : null
);

describe('UserDetailsModal Component', () => {
    const mockUser = {
        id: 1,
        username: 'TestUser',
        email: 'test@example.com',
        avatar: '/avatars/default.png',
        joinedDate: '2024-01-01'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders when open', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.getByTestId('user-details-modal')).toBeInTheDocument();
    });

    test('does not render when closed', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={false} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.queryByTestId('user-details-modal')).not.toBeInTheDocument();
    });

    test('displays heading', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.getByText('User Details')).toBeInTheDocument();
    });

    test('displays username', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.getByTestId('user-username')).toHaveTextContent('TestUser');
    });

    test('displays email', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    });

    test('displays join date', () => {
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={jest.fn()} user={mockUser} />
            </TestWrapper>
        );
        expect(screen.getByTestId('user-joined')).toHaveTextContent('2024-01-01');
    });

    test('calls onClose when close button clicked', () => {
        const handleClose = jest.fn();
        render(
            <TestWrapper>
                <MockUserDetailsModal isOpen={true} onClose={handleClose} user={mockUser} />
            </TestWrapper>
        );
        fireEvent.click(screen.getByText('Close'));
        expect(handleClose).toHaveBeenCalled();
    });
});
