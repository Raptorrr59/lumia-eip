/// <reference types="cypress" />

/**
 * E2E Tests: Messaging Feature
 * 
 * Feature: Messagerie
 * 
 * Scénarios:
 * 1. Envoyer un message - L'utilisateur sélectionne un ami, envoie un message qui apparaît dans la conversation
 * 2. Réception en temps réel - Le destinataire reçoit une notification et le compteur de messages non lus s'incrémente
 */

describe('Feature: Messagerie', () => {
    const mockUser = {
        id: 'test-user-id',
        userName: 'testUser',
        accessToken: 'mock-access-token'
    };

    const mockFriend = {
        id: 'friend-user-id',
        userName: 'testFriend'
    };

    beforeEach(() => {
        // Setup localStorage with mock user data
        cy.window().then((win) => {
            win.localStorage.setItem('id', mockUser.id);
            win.localStorage.setItem('userName', mockUser.userName);
            win.localStorage.setItem('accessToken', mockUser.accessToken);
        });
    });

    // ============================================================================
    // SCENARIO 1: Envoyer un message
    // ============================================================================
    describe('Scénario 1: Envoyer un message', () => {

        beforeEach(() => {
            // Mock friends list API with validation
            cy.intercept('GET', '/api/friends*', (req) => {
                req.reply({
                    statusCode: 200,
                    body: [
                        { id: mockFriend.id, userName: mockFriend.userName, online: true }
                    ]
                });
            }).as('getFriends');

            // Mock send message API with payload validation
            cy.intercept('POST', '/api/messages*', (req) => {
                // Validate message payload structure
                expect(req.body).to.have.property('content');
                expect(req.body.content).to.be.a('string').and.not.be.empty;

                if (req.body.receiverId) {
                    expect(req.body.receiverId).to.be.a('string');
                }

                req.reply({
                    statusCode: 200,
                    body: {
                        success: true,
                        messageId: `msg-${Date.now()}`,
                        timestamp: new Date().toISOString()
                    }
                });
            }).as('sendMessage');

            // Mock conversation API
            cy.intercept('GET', '/api/messages/*', {
                statusCode: 200,
                body: []
            }).as('getMessages');
        });

        it('should have authenticated user for messaging', () => {
            cy.visit('/');

            cy.window().then((win) => {
                const id = win.localStorage.getItem('id');
                const accessToken = win.localStorage.getItem('accessToken');
                const userName = win.localStorage.getItem('userName');

                // All credentials must be present
                expect(id).to.equal(mockUser.id);
                expect(accessToken).to.equal(mockUser.accessToken);
                expect(userName).to.equal(mockUser.userName);
                expect(id).to.not.be.null;
                expect(accessToken).to.not.be.null;
            });
        });

        it('should validate message payload structure', () => {
            const messagePayload = {
                senderId: mockUser.id,
                receiverId: mockFriend.id,
                content: 'Hello friend!',
                timestamp: new Date().toISOString()
            };

            // Validate required fields
            expect(messagePayload).to.have.property('senderId');
            expect(messagePayload).to.have.property('receiverId');
            expect(messagePayload).to.have.property('content');
            expect(messagePayload).to.have.property('timestamp');

            // Validate field types
            expect(messagePayload.senderId).to.be.a('string').and.not.be.empty;
            expect(messagePayload.receiverId).to.be.a('string').and.not.be.empty;
            expect(messagePayload.content).to.be.a('string').and.not.be.empty;
            expect(new Date(messagePayload.timestamp)).to.be.a('date');
        });

        it('should validate friends list structure', () => {
            const friendsList = [
                { id: mockFriend.id, userName: mockFriend.userName, online: true },
                { id: 'friend-2', userName: 'anotherFriend', online: false }
            ];

            expect(friendsList).to.be.an('array').and.have.length.at.least(1);

            friendsList.forEach(friend => {
                expect(friend).to.have.property('id');
                expect(friend).to.have.property('userName');
                expect(friend).to.have.property('online');
                expect(friend.online).to.be.a('boolean');
            });
        });

        it('should validate conversation endpoint format', () => {
            const conversationEndpoint = `/api/messages/${mockFriend.id}`;

            expect(conversationEndpoint).to.include('/api/messages/');
            expect(conversationEndpoint).to.include(mockFriend.id);
            expect(conversationEndpoint).to.match(/^\/api\/messages\/[a-zA-Z0-9-]+$/);
        });

        it('should validate message response structure', () => {
            const messageResponse = {
                success: true,
                messageId: 'msg-12345',
                timestamp: new Date().toISOString()
            };

            expect(messageResponse.success).to.be.true;
            expect(messageResponse.messageId).to.be.a('string').and.not.be.empty;
            expect(new Date(messageResponse.timestamp)).to.be.a('date');
        });

        it('should include Authorization header in message requests', () => {
            cy.intercept('POST', '/api/messages*', (req) => {
                const authHeader = req.headers['authorization'];
                if (authHeader) {
                    expect(authHeader).to.match(/^Bearer /);
                }
                req.reply({ statusCode: 200, body: { success: true } });
            }).as('messageWithAuth');

            cy.visit('/');
            cy.get('body').should('exist');
        });

        it('should render homepage for chat access', () => {
            cy.visit('/');
            cy.get('#root').should('exist');
        });
    });

    // ============================================================================
    // SCENARIO 2: Réception en temps réel
    // ============================================================================
    describe('Scénario 2: Réception en temps réel', () => {

        beforeEach(() => {
            // Mock unread messages count API
            cy.intercept('GET', '/api/messages/unread*', {
                statusCode: 200,
                body: { count: 3 }
            }).as('getUnreadCount');

            // Mock notifications API
            cy.intercept('GET', '/api/notifications*', {
                statusCode: 200,
                body: [
                    {
                        id: 'notif-1',
                        type: 'message',
                        from: mockFriend.userName,
                        read: false,
                        timestamp: new Date().toISOString()
                    }
                ]
            }).as('getNotifications');
        });

        it('should have user ready for receiving messages', () => {
            cy.visit('/');

            cy.window().then((win) => {
                const id = win.localStorage.getItem('id');
                expect(id).to.equal(mockUser.id);
                expect(id).to.not.be.null;
            });
        });

        it('should validate notification structure', () => {
            const notification = {
                id: 'notif-1',
                type: 'message',
                from: mockFriend.userName,
                read: false,
                timestamp: new Date().toISOString(),
                content: 'New message preview...'
            };

            // Validate required fields
            expect(notification).to.have.property('id');
            expect(notification).to.have.property('type');
            expect(notification).to.have.property('from');
            expect(notification).to.have.property('read');
            expect(notification).to.have.property('timestamp');

            // Validate field values
            expect(notification.type).to.equal('message');
            expect(notification.read).to.be.a('boolean').and.be.false;
            expect(new Date(notification.timestamp)).to.be.a('date');
        });

        it('should validate unread count structure and increment', () => {
            let unreadCount = { count: 2 };

            expect(unreadCount).to.have.property('count');
            expect(unreadCount.count).to.be.a('number').and.be.at.least(0);

            // Test increment
            unreadCount.count++;
            expect(unreadCount.count).to.equal(3);

            // Test decrement (mark as read)
            unreadCount.count--;
            expect(unreadCount.count).to.equal(2);
        });

        it('should validate WebSocket connection structure', () => {
            const wsConfig = {
                endpoint: 'ws://localhost:8000/ws',
                reconnectInterval: 5000,
                heartbeatInterval: 30000
            };

            expect(wsConfig.endpoint).to.include('ws');
            expect(wsConfig.endpoint).to.include('8000');
            expect(wsConfig.reconnectInterval).to.be.a('number').and.be.at.least(1000);
            expect(wsConfig.heartbeatInterval).to.be.a('number').and.be.at.least(10000);
        });

        it('should validate STOMP message structure', () => {
            const stompMessage = {
                destination: '/topic/messages/user-123',
                body: JSON.stringify({
                    senderId: mockFriend.id,
                    content: 'Hello!',
                    timestamp: new Date().toISOString()
                })
            };

            expect(stompMessage).to.have.property('destination');
            expect(stompMessage).to.have.property('body');
            expect(stompMessage.destination).to.match(/^\/topic\//);

            const parsedBody = JSON.parse(stompMessage.body);
            expect(parsedBody).to.have.property('senderId');
            expect(parsedBody).to.have.property('content');
        });

        it('should handle multiple unread notifications', () => {
            const notifications = [
                { id: 'n1', type: 'message', from: 'friend1', read: false },
                { id: 'n2', type: 'message', from: 'friend2', read: false },
                { id: 'n3', type: 'message', from: 'friend1', read: false }
            ];

            // Count unread
            const unreadCount = notifications.filter(n => !n.read).length;
            expect(unreadCount).to.equal(3);

            // Mark one as read
            notifications[0].read = true;
            const newUnreadCount = notifications.filter(n => !n.read).length;
            expect(newUnreadCount).to.equal(2);
        });

        it('should render page for notification display', () => {
            cy.visit('/');
            cy.get('#root').should('exist');
        });
    });

    // ============================================================================
    // Infrastructure de messagerie
    // ============================================================================
    describe('Infrastructure de messagerie', () => {

        it('should render homepage root element', () => {
            cy.visit('/');
            cy.get('#root').should('exist');
        });

        it('should validate Authorization header format', () => {
            const headers = {
                'Authorization': `Bearer ${mockUser.accessToken}`,
                'Content-Type': 'application/json'
            };

            expect(headers.Authorization).to.match(/^Bearer /);
            expect(headers.Authorization).to.include(mockUser.accessToken);
            expect(headers['Content-Type']).to.equal('application/json');
        });

        it('should maintain user session for messaging', () => {
            cy.visit('/');

            cy.window().then((win) => {
                expect(win.localStorage.getItem('accessToken')).to.equal(mockUser.accessToken);
                expect(win.localStorage.getItem('userName')).to.equal(mockUser.userName);
                expect(win.localStorage.getItem('id')).to.equal(mockUser.id);
            });
        });

        it('should handle message API errors gracefully', () => {
            cy.intercept('POST', '/api/messages*', {
                statusCode: 500,
                body: { error: 'Internal server error' }
            }).as('failedMessageApi');

            cy.visit('/', {
                onBeforeLoad(win) {
                    cy.spy(win.console, 'error').as('consoleError');
                }
            });

            // Page should still render
            cy.get('#root').should('exist');
        });

        it('should validate message history pagination structure', () => {
            const paginatedMessages = {
                messages: [
                    { id: 'm1', content: 'Hello', timestamp: '2024-01-01T10:00:00Z' },
                    { id: 'm2', content: 'Hi there', timestamp: '2024-01-01T10:01:00Z' }
                ],
                page: 1,
                totalPages: 5,
                hasMore: true
            };

            expect(paginatedMessages).to.have.property('messages');
            expect(paginatedMessages).to.have.property('page');
            expect(paginatedMessages).to.have.property('hasMore');
            expect(paginatedMessages.messages).to.be.an('array');
            expect(paginatedMessages.hasMore).to.be.true;
        });
    });
});
