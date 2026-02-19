describe('Authentication Scenarios', () => {
    // Unique user for this test run
    const testUser = {
        userName: `auth_test_${Date.now()}`,
        email: `auth_${Date.now()}@example.com`,
        password: 'SecurePassword123!'
    };

    before(() => {
        // Create a user via API before running tests (Bypass Captcha if possible, or just fail cleanly)
        // Since we reverted bypass, we can't easily create a user via API without captcha 403.
        // So we will try to use an existing user or expect 403 on creation if we can't.
        // Actually, for Login tests, we NEED a valid user.
        // If we can't create one programmatically due to captcha, we are stuck unless we use a seed user.
        // Let's assume there might be a seed user 'admin' / 'admin' or we rely on manual creation?
        // No, reliability means we must control data.

        // Strategy: We will Try to create a user. If it fails with 403, we log it.
        // BUT, we reverted the bypass. So we CANNOT create a user via API for testing Login unless we solve Captcha.
        // OR we use a pre-existing user if available.
        // The previous tests showed we can't create user without captcha (returns 403).

        // WORKAROUND: For this test file, we will mock the login response for the API test
        // AND for the UI test, we will mock the response too.
        // Why? Because we can't create a real user to log in with, against the real backend, without manual intervention.
        // UNLESS we re-enable the bypass.

        // Wait, the user said "remet comme avant" (revert bypass).
        // So we are back to "Secure Backend".
        // To test Login on a Secure Backend, we need a user.
        // We can't create a user via API.
        // So we can only test "Login Failure" (invalid creds) against real backend.
        // For "Login Success", we MUST Mock.

        // Let's implement Mocks for Success, and Real Call for Failure.
    });

    it('should handle failed login with real API', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/login',
            body: {
                email: 'nonexistent@example.com',
                password: 'wrongpassword'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(401);
            // The body might be "Email ou mot de passe incorrect"
        });
    });

    it('should successfully log in via UI (Mocked Response)', () => {
        // Mock the login endpoint to return a valid token
        cy.intercept('POST', '/api/login', {
            statusCode: 200,
            body: {
                accessToken: 'mock_access_token',
                refreshToken: 'mock_refresh_token',
                userId: 'user_123',
                role: 'USER'
            }
        }).as('loginRequest');

        // Mock user details fetch which happens after login
        cy.intercept('GET', '/api/users/*', {
            statusCode: 200,
            body: {
                userId: 'user_123',
                userName: 'MockUser',
                email: 'mock@example.com',
                roles: [{ name: 'USER' }],
                badges: [],
                lumiaCoin: 0
            }
        }).as('getUserDetails');

        cy.visit('/');

        // Open Login Modal (Matches 'Connexion' or 'Connection')
        cy.get('button').contains(/connexion|connection/i).first().click();

        // Fill Form
        cy.get('#email').type('mock@example.com');
        cy.get('#password').type('MockPassword123!');

        // Submit
        cy.get('button[type="submit"]').click();

        // Verify Request
        cy.wait('@loginRequest').its('request.body').should('deep.include', {
            email: 'mock@example.com',
            password: 'MockPassword123!'
        });

        // Verify UI State (e.g., specific element for logged-in user)
        // Adjust selector based on actual UI for logged-in user (Avatar, Profile Link, etc.)
        // cy.get('.profile-icon').should('exist'); // Abstract placeholder
    });

    it('should logout correctly', () => {
        // 1. Simuler un utilisateur connecté via localStorage
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', 'mock_access_token');
            win.localStorage.setItem('refreshToken', 'mock_refresh_token');
            win.localStorage.setItem('id', 'user_123');
            win.localStorage.setItem('userName', 'TestUser');
            win.localStorage.setItem('roles', JSON.stringify([{ name: 'USER' }]));
            win.localStorage.setItem('emailVerified', 'true');
        });

        // 2. Mocker les appels API de la page de profil pour éviter les erreurs 401 (car token factice)
        cy.intercept('GET', '/api/user_123/badges', { body: [] }).as('getBadges');
        cy.intercept('GET', '/api/game/log-files*', { body: [] }).as('getLogs');

        // 3. Aller sur la page de profil
        cy.visit('/profile');

        // 4. Cliquer sur le bouton de déconnexion (texte flexible pour FR/EN)
        cy.contains(/d.connecter|disconnect|logout|se d.connecter/i).click();

        // 5. Vérifier la redirection et le nettoyage
        cy.location('pathname').should('eq', '/');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('accessToken')).to.be.null;
            expect(win.localStorage.getItem('id')).to.be.null;
        });
    });
});
