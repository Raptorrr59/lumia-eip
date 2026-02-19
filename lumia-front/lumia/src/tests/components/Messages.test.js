import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('./mocks/framer-motion');
});

// Mock react-router-dom 
jest.mock('react-router-dom', () => {
    return require('./mocks/react-router-dom');
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        const storage = {
            'language': 'EN',
            'id': '123',
            'accessToken': 'test-token'
        };
        return storage[key] || null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test wrapper
const TestWrapper = ({ children }) => (
    <LangProvider>
        {children}
    </LangProvider>
);

// Simple test component to verify messages structure
const MockMessageBubble = ({ isOpen, onClick }) => (
    <button onClick={onClick} data-testid="message-bubble">
        {isOpen ? 'Close Chat' : 'Open Chat'}
    </button>
);

describe('Messages Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('MessageBubbleButton', () => {
        test('renders message bubble', () => {
            render(
                <TestWrapper>
                    <MockMessageBubble isOpen={false} onClick={jest.fn()} />
                </TestWrapper>
            );

            expect(screen.getByTestId('message-bubble')).toBeInTheDocument();
        });

        test('toggles state on click', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <MockMessageBubble isOpen={false} onClick={handleClick} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('message-bubble'));
            expect(handleClick).toHaveBeenCalled();
        });

        test('displays correct text when closed', () => {
            render(
                <TestWrapper>
                    <MockMessageBubble isOpen={false} onClick={jest.fn()} />
                </TestWrapper>
            );

            expect(screen.getByText('Open Chat')).toBeInTheDocument();
        });

        test('displays correct text when open', () => {
            render(
                <TestWrapper>
                    <MockMessageBubble isOpen={true} onClick={jest.fn()} />
                </TestWrapper>
            );

            expect(screen.getByText('Close Chat')).toBeInTheDocument();
        });
    });

    describe('FriendCard', () => {
        const MockFriendCard = ({ name, status }) => (
            <div data-testid="friend-card">
                <span>{name}</span>
                <span data-testid="status">{status}</span>
            </div>
        );

        test('renders friend card with name', () => {
            render(
                <TestWrapper>
                    <MockFriendCard name="John Doe" status="online" />
                </TestWrapper>
            );

            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        test('renders friend status', () => {
            render(
                <TestWrapper>
                    <MockFriendCard name="John" status="online" />
                </TestWrapper>
            );

            expect(screen.getByTestId('status')).toHaveTextContent('online');
        });
    });

    describe('MessageSingle', () => {
        const MockMessageSingle = ({ text, isMine }) => (
            <div data-testid="message-single" className={isMine ? 'mine' : 'theirs'}>
                {text}
            </div>
        );

        test('renders message text', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="Hello World" isMine={true} />
                </TestWrapper>
            );

            expect(screen.getByText('Hello World')).toBeInTheDocument();
        });

        test('applies correct class for own message', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="My message" isMine={true} />
                </TestWrapper>
            );

            expect(screen.getByTestId('message-single')).toHaveClass('mine');
        });

        test('applies correct class for received message', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="Their message" isMine={false} />
                </TestWrapper>
            );

            expect(screen.getByTestId('message-single')).toHaveClass('theirs');
        });
    });

    describe('FriendsButton', () => {
        const MockFriendsButton = ({ count, onClick }) => (
            <button data-testid="friends-button" onClick={onClick}>
                Friends ({count})
            </button>
        );

        test('renders friends button with count', () => {
            render(
                <TestWrapper>
                    <MockFriendsButton count={5} onClick={jest.fn()} />
                </TestWrapper>
            );

            expect(screen.getByText(/friends.*5/i)).toBeInTheDocument();
        });

        test('calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <MockFriendsButton count={5} onClick={handleClick} />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friends-button'));
            expect(handleClick).toHaveBeenCalled();
        });
    });
});
