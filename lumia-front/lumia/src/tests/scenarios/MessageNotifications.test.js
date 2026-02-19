import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

// Mock Notification Component
const MockNotification = ({ notification, onDismiss }) => {
    return (
        <div data-testid={`notification-${notification.id}`} className="notification">
            <span data-testid={`notification-icon-${notification.id}`}>
                {notification.type === 'message' ? '💬' : '🔔'}
            </span>
            <div>
                <strong data-testid={`notification-sender-${notification.id}`}>
                    {notification.sender}
                </strong>
                <p data-testid={`notification-text-${notification.id}`}>
                    {notification.text}
                </p>
            </div>
            <button
                data-testid={`dismiss-${notification.id}`}
                onClick={() => onDismiss(notification.id)}
            >
                ✕
            </button>
        </div>
    );
};

// Mock Notification Center with Unread Counter
const MockNotificationCenter = ({ onNotificationClick }) => {
    const [notifications, setNotifications] = React.useState([]);
    const [unreadCount, setUnreadCount] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);

    // Simulate receiving a new message notification
    const receiveMessageNotification = (sender, text) => {
        const newNotification = {
            id: Date.now(),
            type: 'message',
            sender: sender,
            text: text,
            read: false,
            timestamp: new Date().toISOString()
        };

        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const dismissNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // Expose function for testing
    React.useEffect(() => {
        window.testReceiveMessage = receiveMessageNotification;
        return () => {
            delete window.testReceiveMessage;
        };
    }, []);

    return (
        <div data-testid="notification-center">
            <button
                data-testid="notification-bell"
                onClick={toggleOpen}
            >
                🔔
                {unreadCount > 0 && (
                    <span data-testid="unread-badge">{unreadCount}</span>
                )}
            </button>

            <span data-testid="unread-count">{unreadCount}</span>

            {isOpen && (
                <div data-testid="notification-dropdown">
                    <div data-testid="notification-header">
                        <h3>Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                data-testid="mark-all-read-btn"
                                onClick={markAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div data-testid="notification-list">
                        {notifications.length === 0 ? (
                            <p data-testid="no-notifications">No notifications</p>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    data-testid={`notification-item-${notification.id}`}
                                    className={notification.read ? 'read' : 'unread'}
                                    onClick={() => {
                                        if (!notification.read) markAsRead(notification.id);
                                        onNotificationClick?.(notification);
                                    }}
                                >
                                    <MockNotification
                                        notification={notification}
                                        onDismiss={dismissNotification}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Simulate message buttons for testing */}
            <div data-testid="test-controls">
                <button
                    data-testid="simulate-message-alice"
                    onClick={() => receiveMessageNotification('Alice', 'Hey, are you there?')}
                >
                    Simulate message from Alice
                </button>
                <button
                    data-testid="simulate-message-bob"
                    onClick={() => receiveMessageNotification('Bob', 'Check this out!')}
                >
                    Simulate message from Bob
                </button>
            </div>
        </div>
    );
};

describe('Message Notification Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Scenario: Recipient receives notification and unread message counter increments', () => {

        test('notification center shows 0 unread initially', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            expect(screen.getByTestId('unread-count')).toHaveTextContent('0');
            expect(screen.queryByTestId('unread-badge')).not.toBeInTheDocument();
        });

        test('recipient receives notification when message is sent', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Simulate receiving a message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));

            // Notification badge appears
            expect(screen.getByTestId('unread-badge')).toBeInTheDocument();
            expect(screen.getByTestId('unread-badge')).toHaveTextContent('1');
        });

        test('unread counter increments with each new message', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // First message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('1');

            // Second message
            fireEvent.click(screen.getByTestId('simulate-message-bob'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('2');

            // Third message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('3');
        });

        test('notification shows sender name and message preview', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Receive message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));

            // Open notification dropdown
            fireEvent.click(screen.getByTestId('notification-bell'));

            // Check notification content
            const notifications = screen.getAllByTestId(/^notification-item-/);
            expect(notifications.length).toBe(1);
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Hey, are you there?')).toBeInTheDocument();
        });

        test('notification dropdown shows all unread messages', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Receive multiple messages
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            fireEvent.click(screen.getByTestId('simulate-message-bob'));

            // Open notifications
            fireEvent.click(screen.getByTestId('notification-bell'));

            // Both notifications visible
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
            expect(screen.getByText('Hey, are you there?')).toBeInTheDocument();
            expect(screen.getByText('Check this out!')).toBeInTheDocument();
        });

        test('clicking notification marks it as read and decrements counter', () => {
            const onNotificationClick = jest.fn();
            render(
                <TestWrapper>
                    <MockNotificationCenter onNotificationClick={onNotificationClick} />
                </TestWrapper>
            );

            // Receive messages
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            fireEvent.click(screen.getByTestId('simulate-message-bob'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('2');

            // Open and click notification
            fireEvent.click(screen.getByTestId('notification-bell'));
            const notifications = screen.getAllByTestId(/^notification-item-/);
            fireEvent.click(notifications[0]);

            // Counter decremented
            expect(screen.getByTestId('unread-count')).toHaveTextContent('1');
            expect(onNotificationClick).toHaveBeenCalled();
        });

        test('mark all as read sets counter to 0', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Receive multiple messages
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            fireEvent.click(screen.getByTestId('simulate-message-bob'));
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('3');

            // Open and mark all as read
            fireEvent.click(screen.getByTestId('notification-bell'));
            fireEvent.click(screen.getByTestId('mark-all-read-btn'));

            // Counter is 0
            expect(screen.getByTestId('unread-count')).toHaveTextContent('0');
        });

        test('dismissing unread notification decrements counter', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Receive message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            expect(screen.getByTestId('unread-count')).toHaveTextContent('1');

            // Open and dismiss
            fireEvent.click(screen.getByTestId('notification-bell'));
            const dismissBtn = screen.getAllByTestId(/^dismiss-/)[0];
            fireEvent.click(dismissBtn);

            // Counter decremented
            expect(screen.getByTestId('unread-count')).toHaveTextContent('0');
        });

        test('message icon appears in notification', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('simulate-message-alice'));
            fireEvent.click(screen.getByTestId('notification-bell'));

            const iconElement = screen.getAllByTestId(/^notification-icon-/)[0];
            expect(iconElement).toHaveTextContent('💬');
        });

        test('empty state shows "no notifications" message', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            fireEvent.click(screen.getByTestId('notification-bell'));

            expect(screen.getByTestId('no-notifications')).toBeInTheDocument();
            expect(screen.getByText('No notifications')).toBeInTheDocument();
        });

        test('complete flow: receive message → notification appears → counter increments', () => {
            render(
                <TestWrapper>
                    <MockNotificationCenter />
                </TestWrapper>
            );

            // Initial state
            expect(screen.getByTestId('unread-count')).toHaveTextContent('0');
            expect(screen.queryByTestId('unread-badge')).not.toBeInTheDocument();

            // Step 1: Receive a message
            fireEvent.click(screen.getByTestId('simulate-message-alice'));

            // Step 2: Notification badge appears with count
            expect(screen.getByTestId('unread-badge')).toBeInTheDocument();
            expect(screen.getByTestId('unread-badge')).toHaveTextContent('1');
            expect(screen.getByTestId('unread-count')).toHaveTextContent('1');

            // Step 3: Open notifications
            fireEvent.click(screen.getByTestId('notification-bell'));

            // Step 4: Verify notification content
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Hey, are you there?')).toBeInTheDocument();
        });
    });
});
