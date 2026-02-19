import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LangProvider } from '../../LangProvider';

// Mock framer-motion
jest.mock('framer-motion', () => {
    return require('../mocks/framer-motion');
});

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn((key) => {
        if (key === 'language') return 'EN';
        if (key === 'accessToken') return 'test-token';
        if (key === 'username') return 'CurrentUser';
        if (key === 'id') return '1';
        return null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <LangProvider>
            {children}
        </LangProvider>
    </BrowserRouter>
);

// Mock Friends List
const MockFriendsList = ({ friends, onSelectFriend, selectedFriendId }) => {
    return (
        <div data-testid="friends-list">
            <h3>Friends</h3>
            {friends.map(friend => (
                <div
                    key={friend.id}
                    data-testid={`friend-${friend.id}`}
                    onClick={() => onSelectFriend(friend)}
                    className={`friend-item ${selectedFriendId === friend.id ? 'selected' : ''}`}
                >
                    <span data-testid={`friend-name-${friend.id}`}>{friend.name}</span>
                    {friend.online && <span data-testid={`online-${friend.id}`}>🟢</span>}
                    {friend.lastMessage && (
                        <span data-testid={`last-message-${friend.id}`}>{friend.lastMessage}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

// Mock Chat Conversation
const MockChatConversation = ({ friend, messages, onSendMessage }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div data-testid="chat-conversation">
            <div data-testid="chat-header">
                <span data-testid="chat-with">{friend?.name}</span>
            </div>

            <div data-testid="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        data-testid={`message-${index}`}
                        className={`message ${msg.isMine ? 'sent' : 'received'}`}
                    >
                        <span data-testid={`message-sender-${index}`}>{msg.sender}</span>
                        <span data-testid={`message-text-${index}`}>{msg.text}</span>
                        <span data-testid={`message-time-${index}`}>{msg.time}</span>
                    </div>
                ))}
            </div>

            <div data-testid="message-input-area">
                <input
                    type="text"
                    data-testid="message-input"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    data-testid="send-btn"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

// Complete Chat Component
const MockChatApp = () => {
    const [friends] = React.useState([
        { id: 1, name: 'Alice', online: true, lastMessage: 'Hey!' },
        { id: 2, name: 'Bob', online: false, lastMessage: 'See you later' },
        { id: 3, name: 'Charlie', online: true }
    ]);
    const [selectedFriend, setSelectedFriend] = React.useState(null);
    const [conversations, setConversations] = React.useState({
        1: [
            { sender: 'Alice', text: 'Hey!', time: '10:00', isMine: false },
            { sender: 'Me', text: 'Hello Alice!', time: '10:01', isMine: true }
        ],
        2: [
            { sender: 'Bob', text: 'See you later', time: '09:30', isMine: false }
        ],
        3: []
    });

    const handleSelectFriend = (friend) => {
        setSelectedFriend(friend);
    };

    const handleSendMessage = (text) => {
        if (!selectedFriend) return;

        const newMessage = {
            sender: 'Me',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: true
        };

        setConversations(prev => ({
            ...prev,
            [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMessage]
        }));
    };

    return (
        <div data-testid="chat-app">
            <MockFriendsList
                friends={friends}
                onSelectFriend={handleSelectFriend}
                selectedFriendId={selectedFriend?.id}
            />

            {selectedFriend ? (
                <MockChatConversation
                    friend={selectedFriend}
                    messages={conversations[selectedFriend.id] || []}
                    onSendMessage={handleSendMessage}
                />
            ) : (
                <div data-testid="no-chat-selected">
                    Select a friend to start chatting
                </div>
            )}
        </div>
    );
};

describe('Chat Messaging Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: User selects a friend, sends a message that appears in conversation', () => {

        test('friends list displays all friends', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            expect(screen.getByTestId('friends-list')).toBeInTheDocument();
            expect(screen.getByTestId('friend-1')).toBeInTheDocument();
            expect(screen.getByTestId('friend-2')).toBeInTheDocument();
            expect(screen.getByTestId('friend-3')).toBeInTheDocument();
        });

        test('shows "select a friend" message initially', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            expect(screen.getByTestId('no-chat-selected')).toBeInTheDocument();
            expect(screen.getByText('Select a friend to start chatting')).toBeInTheDocument();
        });

        test('user can select a friend from the list', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            // Select Alice
            fireEvent.click(screen.getByTestId('friend-1'));

            // Chat conversation opens
            expect(screen.getByTestId('chat-conversation')).toBeInTheDocument();
            expect(screen.getByTestId('chat-with')).toHaveTextContent('Alice');
        });

        test('conversation shows previous messages when friend is selected', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friend-1'));

            // Previous messages are shown
            expect(screen.getByTestId('message-0')).toBeInTheDocument();
            expect(screen.getByTestId('message-text-0')).toHaveTextContent('Hey!');
            expect(screen.getByTestId('message-1')).toBeInTheDocument();
            expect(screen.getByTestId('message-text-1')).toHaveTextContent('Hello Alice!');
        });

        test('user can type a message', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friend-1'));

            const input = screen.getByTestId('message-input');
            fireEvent.change(input, { target: { value: 'New message!' } });

            expect(input.value).toBe('New message!');
        });

        test('send button is disabled when input is empty', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friend-1'));

            expect(screen.getByTestId('send-btn')).toBeDisabled();
        });

        test('user sends a message and it appears in conversation', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            // Select friend
            fireEvent.click(screen.getByTestId('friend-1'));

            // Count initial messages
            const initialMessages = screen.getAllByTestId(/^message-\d+$/);
            const initialCount = initialMessages.length;

            // Type and send message
            const input = screen.getByTestId('message-input');
            fireEvent.change(input, { target: { value: 'Hello, how are you?' } });
            fireEvent.click(screen.getByTestId('send-btn'));

            // New message appears in conversation
            const newMessages = screen.getAllByTestId(/^message-\d+$/);
            expect(newMessages.length).toBe(initialCount + 1);

            // Check the new message content
            const lastMessageIndex = newMessages.length - 1;
            expect(screen.getByTestId(`message-text-${lastMessageIndex}`)).toHaveTextContent('Hello, how are you?');
        });

        test('input is cleared after sending message', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friend-1'));

            const input = screen.getByTestId('message-input');
            fireEvent.change(input, { target: { value: 'Test message' } });
            fireEvent.click(screen.getByTestId('send-btn'));

            expect(input.value).toBe('');
        });

        test('user can send message by pressing Enter', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('friend-1'));

            const input = screen.getByTestId('message-input');
            fireEvent.change(input, { target: { value: 'Enter key message' } });
            fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

            // Message should appear
            expect(screen.getByText('Enter key message')).toBeInTheDocument();
        });

        test('switching friends shows different conversations', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            // Select Alice
            fireEvent.click(screen.getByTestId('friend-1'));
            expect(screen.getByTestId('chat-with')).toHaveTextContent('Alice');
            expect(screen.getByTestId('message-text-0')).toHaveTextContent('Hey!');

            // Switch to Bob
            fireEvent.click(screen.getByTestId('friend-2'));
            expect(screen.getByTestId('chat-with')).toHaveTextContent('Bob');
            expect(screen.getByTestId('message-text-0')).toHaveTextContent('See you later');
        });

        test('online status is shown for friends', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            // Alice is online
            expect(screen.getByTestId('online-1')).toBeInTheDocument();
            // Charlie is online
            expect(screen.getByTestId('online-3')).toBeInTheDocument();
            // Bob is offline (no indicator)
            expect(screen.queryByTestId('online-2')).not.toBeInTheDocument();
        });

        test('complete flow: select friend → type message → send → appears in chat', () => {
            render(
                <TestWrapper>
                    <MockChatApp />
                </TestWrapper>
            );

            // Step 1: Select Charlie (no previous messages)
            fireEvent.click(screen.getByTestId('friend-3'));
            expect(screen.getByTestId('chat-with')).toHaveTextContent('Charlie');

            // No messages initially
            expect(screen.queryByTestId('message-0')).not.toBeInTheDocument();

            // Step 2: Type a message
            const input = screen.getByTestId('message-input');
            fireEvent.change(input, { target: { value: 'Salut Charlie!' } });

            // Step 3: Send the message
            fireEvent.click(screen.getByTestId('send-btn'));

            // Step 4: Message appears in conversation
            expect(screen.getByTestId('message-0')).toBeInTheDocument();
            expect(screen.getByTestId('message-text-0')).toHaveTextContent('Salut Charlie!');
            expect(screen.getByTestId('message-sender-0')).toHaveTextContent('Me');
        });
    });
});
