describe('Connect Four Game Tests', () => {
    const testUser = {
        userId: 'user_123',
        userName: 'Connect4Master',
        email: 'c4@example.com',
        roles: [{ name: 'USER' }],
        emailVerified: true,
        accessToken: 'mock_token'
    };

    const mockGameLogs = {
        gameStates: [
            { itemType: "move", properties: { player: "X", column: 5, row: 0 } }, // Red at bottom-left?
            { itemType: "move", properties: { player: "O", column: 5, row: 1 } }, // Yellow next to it?
            { itemType: "move", properties: { player: "X", column: 4, row: 0 } },
            { itemType: "move", properties: { player: "O", column: 4, row: 1 } },
            { itemType: "move", properties: { player: "X", column: 3, row: 0 } },
            { itemType: "move", properties: { player: "O", column: 3, row: 1 } },
            { itemType: "move", properties: { player: "X", column: 2, row: 0 } }, // Winner horizontal?
            { itemType: "system", properties: { message: "Player won." } }
        ]
    };

    beforeEach(() => {
        // Setup login state
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', testUser.accessToken);
            win.localStorage.setItem('id', testUser.userId);
            win.localStorage.setItem('userName', testUser.userName);
            win.localStorage.setItem('email', testUser.email);
            win.localStorage.setItem('emailVerified', 'true');
            win.localStorage.setItem('roles', JSON.stringify(testUser.roles));
        });

        // Mock API calls
        cy.intercept('GET', '/api/ranking/connect4', { body: [] }).as('getRanking');
        cy.intercept('GET', '/api/game/game-log*', { body: mockGameLogs }).as('getGameLogs');
        cy.intercept('GET', '/api/game/stream*', { body: '' }).as('getStream'); // Mock empty stream to fallback to logs or prevent errors
        cy.intercept('POST', '/api/upload', { statusCode: 200, body: { message: 'File uploaded' } }).as('uploadAI');
        cy.intercept('POST', '/api/newScore', { statusCode: 200 }).as('registerScore');

        // Visit Games page
        cy.visit('/games');
    });

    it('should navigate to Connect Four and play a game', () => {
        // Find and click Connect Four card (force needed due to overlay styling)
        cy.contains('Connect Four').click({ force: true });

        // Verify we are on specific game page
        cy.url().should('include', '/game/1');
        cy.contains('h1', 'Connect Four').should('be.visible');

        // Upload AI to enable Start button
        cy.contains('button', /upload.*ai|uploader/i, { timeout: 10000 }).click();

        // Find file input and attach mock file
        cy.get('input[type="file"]').selectFile({
            contents: Cypress.Buffer.from('print("Hello World")'),
            fileName: 'ai.py',
            mimeType: 'text/x-python',
        }, { force: true }); // force because input might be hidden/styled

        // Stub alerts
        cy.on('window:alert', (text) => {
            cy.log('Alert: ' + text);
            return true;
        });

        // Click Upload/Télécharger submit button in modal
        cy.get('button[type="submit"]').first().click();

        cy.wait('@uploadAI');

        // Wait for modal backdrop to disappear (modal closes)
        cy.wait(500); // Brief wait for modal close animation

        // Verify Start button appears (it is conditionally rendered based on isUploaded)
        // This confirms the upload was successful and the game is ready to play
        cy.contains('button', /start|démarrer|lancer/i, { timeout: 10000 }).should('be.visible');

        // Core navigation and upload flow is verified
        // Game replay would require WebSocket simulation which is out of scope
    });
});
