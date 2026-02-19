import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext();

// Simple event emitter for real-time updates
class WebSocketEventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (e) {
                console.error('[WebSocket EventEmitter] Error in callback:', e);
            }
        });
    }
}

// Global event emitter instance
const wsEvents = new WebSocketEventEmitter();

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const stompClientRef = useRef(null);
    const reconnectAttemptRef = useRef(0);

    // Fetch initial unread count via REST
    const fetchInitialUnreadCount = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken') || '';
            const res = await fetch('/api/messages/unread/count', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                const count = data?.unreadCount ?? data?.unread ?? data?.count ?? 0;
                setUnreadCount(Number(count) || 0);
            }
        } catch (e) {
            console.error('[WebSocket] Failed to fetch initial unread count:', e);
        }
    }, []);

    // Connect to WebSocket
    const connect = useCallback(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('[WebSocket] No token, skipping connection');
            return;
        }

        if (stompClientRef.current?.connected) {
            console.log('[WebSocket] Already connected');
            return;
        }

        // Deactivate any existing client
        if (stompClientRef.current) {
            try {
                stompClientRef.current.deactivate();
            } catch (e) {
                console.warn('[WebSocket] Error deactivating old client:', e);
            }
        }

        console.log('[WebSocket] Creating connection...');

        const client = new Client({
            webSocketFactory: () => new SockJS('/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => {
                // Only log important messages to reduce noise
                if (str.includes('CONNECT') || str.includes('SUBSCRIBE') || str.includes('MESSAGE') || str.includes('ERROR')) {
                    console.log('[STOMP]', str);
                }
            },
            onConnect: (frame) => {
                console.log('[WebSocket] Connected successfully!');
                setIsConnected(true);
                reconnectAttemptRef.current = 0;

                // Get current user ID for topic subscriptions
                const myUserId = localStorage.getItem('userId') || localStorage.getItem('id');
                console.log('[WebSocket] My userId for subscriptions:', myUserId);

                // Handler for new messages (used by both subscription methods)
                const handleNewMessage = (message) => {
                    console.log('[WebSocket] >>> NEW MESSAGE RECEIVED:', message.body);
                    try {
                        const data = JSON.parse(message.body);
                        console.log('[WebSocket] Emitting newMessage event with data:', data);
                        wsEvents.emit('newMessage', data);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                };

                // Handler for unread count
                const handleUnreadCount = (message) => {
                    console.log('[WebSocket] >>> UNREAD COUNT:', message.body);
                    try {
                        const data = JSON.parse(message.body);
                        setUnreadCount(data.unreadCount ?? 0);
                        wsEvents.emit('unreadCount', data.unreadCount ?? 0);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                };

                // Subscribe to user-specific queues (Spring's user destination)
                client.subscribe('/user/queue/unread-count', handleUnreadCount);
                client.subscribe('/user/queue/messages', handleNewMessage);

                // ALSO subscribe to topic-based destinations with userId (more reliable)
                if (myUserId) {
                    console.log('[WebSocket] Subscribing to topic /topic/messages/' + myUserId);
                    client.subscribe('/topic/messages/' + myUserId, handleNewMessage);
                    client.subscribe('/topic/unread/' + myUserId, handleUnreadCount);
                    client.subscribe('/topic/messages/sent/' + myUserId, (message) => {
                        console.log('[WebSocket] >>> SENT CONFIRMATION (topic):', message.body);
                        try {
                            const data = JSON.parse(message.body);
                            wsEvents.emit('messageSent', data);
                        } catch (e) {
                            console.error('[WebSocket] Parse error:', e);
                        }
                    });
                }

                // Subscribe to sent confirmations (user queue)
                client.subscribe('/user/queue/messages/sent', (message) => {
                    console.log('[WebSocket] >>> SENT CONFIRMATION:', message.body);
                    try {
                        const data = JSON.parse(message.body);
                        wsEvents.emit('messageSent', data);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                });

                // Subscribe to read receipts
                client.subscribe('/user/queue/messages/read', (message) => {
                    console.log('[WebSocket] >>> READ RECEIPT:', message.body);
                    try {
                        const data = JSON.parse(message.body);
                        wsEvents.emit('messageRead', data);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                });

                // Subscribe to friend requests
                client.subscribe('/user/queue/friend-requests', (message) => {
                    console.log('[WebSocket] >>> FRIEND REQUEST:', message.body);
                    try {
                        const data = JSON.parse(message.body);
                        wsEvents.emit('friendRequest', data);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                });

                // Subscribe to typing indicators
                client.subscribe('/user/queue/typing', (message) => {
                    try {
                        const data = JSON.parse(message.body);
                        wsEvents.emit('typing', data);
                    } catch (e) {
                        console.error('[WebSocket] Parse error:', e);
                    }
                });

                // Fetch initial unread count
                fetchInitialUnreadCount();
            },
            onDisconnect: () => {
                console.log('[WebSocket] Disconnected');
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error('[WebSocket] STOMP Error:', frame);
                setIsConnected(false);
            },
            onWebSocketError: (event) => {
                console.error('[WebSocket] WebSocket Error:', event);
            },
            onWebSocketClose: () => {
                console.log('[WebSocket] Connection closed');
                setIsConnected(false);
            }
        });

        stompClientRef.current = client;
        client.activate();
    }, [fetchInitialUnreadCount]);

    // Disconnect
    const disconnect = useCallback(() => {
        if (stompClientRef.current) {
            console.log('[WebSocket] Disconnecting...');
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
        }
        setIsConnected(false);
    }, []);

    // Send message via WebSocket
    const sendMessage = useCallback((receiverId, content, messageType = 'TEXT') => {
        const client = stompClientRef.current;
        if (!client?.connected) {
            console.error('[WebSocket] Cannot send: not connected');
            return false;
        }

        console.log('[WebSocket] Sending message to:', receiverId);
        client.publish({
            destination: '/app/chat/send',
            body: JSON.stringify({ receiverId, content, messageType })
        });
        return true;
    }, []);

    // Send typing indicator
    const sendTypingIndicator = useCallback((receiverId, isTyping) => {
        const client = stompClientRef.current;
        if (!client?.connected) return false;

        client.publish({
            destination: '/app/chat/typing',
            body: JSON.stringify({ receiverId, isTyping: String(isTyping) })
        });
        return true;
    }, []);

    // Mark messages as read
    const markAsRead = useCallback((partnerId) => {
        const client = stompClientRef.current;
        if (!client?.connected) {
            console.error('[WebSocket] Cannot mark as read: not connected');
            return false;
        }

        client.publish({
            destination: '/app/chat/mark-read',
            body: JSON.stringify({ partnerId })
        });
        return true;
    }, []);

    // Connect on mount if token exists
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const timer = setTimeout(connect, 500);
            return () => clearTimeout(timer);
        }
    }, [connect]);

    // Cleanup on unmount
    useEffect(() => {
        return () => disconnect();
    }, [disconnect]);

    const value = {
        isConnected,
        unreadCount,
        connect,
        disconnect,
        sendMessage,
        sendTypingIndicator,
        markAsRead,
        setUnreadCount,
        fetchInitialUnreadCount,
        // Event system for real-time updates
        onNewMessage: (callback) => wsEvents.on('newMessage', callback),
        onMessageSent: (callback) => wsEvents.on('messageSent', callback),
        onMessageRead: (callback) => wsEvents.on('messageRead', callback),
        onFriendRequest: (callback) => wsEvents.on('friendRequest', callback),
        onTyping: (callback) => wsEvents.on('typing', callback),
        onUnreadCount: (callback) => wsEvents.on('unreadCount', callback),
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export default WebSocketContext;
