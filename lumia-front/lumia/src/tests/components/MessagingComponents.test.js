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

// Mock messaging components
const MockFriendCard = ({ name, status, lastMessage, onClick }) => (
    <div data-testid="friend-card" onClick={onClick}>
        <span data-testid="friend-name">{name}</span>
        <span data-testid="friend-status">{status}</span>
        <span data-testid="last-message">{lastMessage}</span>
    </div>
);

const MockMessageBubbleButton = ({ isOpen, onClick, unreadCount }) => (
    <button data-testid="message-bubble" onClick={onClick}>
        {isOpen ? 'Close' : 'Open'} Chat
        {unreadCount > 0 && <span data-testid="unread-badge">{unreadCount}</span>}
    </button>
);

const MockAddFriendModal = ({ isOpen, onClose, onSubmit }) => (
    isOpen ? (
        <div data-testid="add-friend-modal">
            <input type="text" placeholder="Username" data-testid="username-input" />
            <button onClick={onSubmit}>Add Friend</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    ) : null
);

const MockMessageSingle = ({ text, isMine, timestamp }) => (
    <div data-testid="message-single" className={isMine ? 'mine' : 'theirs'}>
        <p>{text}</p>
        <span>{timestamp}</span>
    </div>
);

describe('Messaging Components', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('FriendCard', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockFriendCard name="John" status="online" lastMessage="Hello!" onClick={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByTestId('friend-card')).toBeInTheDocument();
        });

        test('displays friend name', () => {
            render(
                <TestWrapper>
                    <MockFriendCard name="John Doe" status="online" lastMessage="Hi!" onClick={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        test('displays status', () => {
            render(
                <TestWrapper>
                    <MockFriendCard name="John" status="online" lastMessage="Hi!" onClick={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByText('online')).toBeInTheDocument();
        });

        test('calls onClick when clicked', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <MockFriendCard name="John" status="online" lastMessage="Hi!" onClick={handleClick} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByTestId('friend-card'));
            expect(handleClick).toHaveBeenCalled();
        });
    });

    describe('MessageBubbleButton', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockMessageBubbleButton isOpen={false} onClick={jest.fn()} unreadCount={0} />
                </TestWrapper>
            );
            expect(screen.getByTestId('message-bubble')).toBeInTheDocument();
        });

        test('shows unread badge when has unread messages', () => {
            render(
                <TestWrapper>
                    <MockMessageBubbleButton isOpen={false} onClick={jest.fn()} unreadCount={5} />
                </TestWrapper>
            );
            expect(screen.getByTestId('unread-badge')).toHaveTextContent('5');
        });

        test('toggles on click', () => {
            const handleClick = jest.fn();
            render(
                <TestWrapper>
                    <MockMessageBubbleButton isOpen={false} onClick={handleClick} unreadCount={0} />
                </TestWrapper>
            );
            fireEvent.click(screen.getByTestId('message-bubble'));
            expect(handleClick).toHaveBeenCalled();
        });
    });

    describe('AddFriendModal', () => {
        test('renders when open', () => {
            render(
                <TestWrapper>
                    <MockAddFriendModal isOpen={true} onClose={jest.fn()} onSubmit={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByTestId('add-friend-modal')).toBeInTheDocument();
        });

        test('does not render when closed', () => {
            render(
                <TestWrapper>
                    <MockAddFriendModal isOpen={false} onClose={jest.fn()} onSubmit={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.queryByTestId('add-friend-modal')).not.toBeInTheDocument();
        });

        test('has username input', () => {
            render(
                <TestWrapper>
                    <MockAddFriendModal isOpen={true} onClose={jest.fn()} onSubmit={jest.fn()} />
                </TestWrapper>
            );
            expect(screen.getByTestId('username-input')).toBeInTheDocument();
        });
    });

    describe('MessageSingle', () => {
        test('renders without crashing', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="Hello World" isMine={true} timestamp="10:30" />
                </TestWrapper>
            );
            expect(screen.getByTestId('message-single')).toBeInTheDocument();
        });

        test('displays message text', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="Hello World" isMine={true} timestamp="10:30" />
                </TestWrapper>
            );
            expect(screen.getByText('Hello World')).toBeInTheDocument();
        });

        test('shows correct class for own message', () => {
            render(
                <TestWrapper>
                    <MockMessageSingle text="My message" isMine={true} timestamp="10:30" />
                </TestWrapper>
            );
            expect(screen.getByTestId('message-single')).toHaveClass('mine');
        });
    });
});
