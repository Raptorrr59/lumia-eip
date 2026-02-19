describe('Profile Management Tests', () => {
    const testUser = {
        userId: 'user_123',
        userName: 'TestProfileUser',
        email: 'testprofile@example.com',
        roles: [{ name: 'USER' }],
        lumiaCoin: 100,
        place: 'Paris, France',
        newsletter: true,
        tutoAsk: true,
        xp: 0.5,
        level: 5,
        successLength: 10,
        eventsLength: 2,
        iaFightingLength: 5,
        emailVerified: true
    };

    beforeEach(() => {
        // Setup login state
        cy.window().then((win) => {
            win.localStorage.setItem('accessToken', 'mock_access_token');
            win.localStorage.setItem('id', testUser.userId);
            win.localStorage.setItem('userName', testUser.userName);
            win.localStorage.setItem('email', testUser.email);
            win.localStorage.setItem('roles', JSON.stringify(testUser.roles));
            win.localStorage.setItem('lumiaCoin', testUser.lumiaCoin);
            win.localStorage.setItem('place', testUser.place);
            win.localStorage.setItem('newsletter', testUser.newsletter);
            win.localStorage.setItem('tutoAsk', testUser.tutoAsk);
            win.localStorage.setItem('xp', testUser.xp);
            win.localStorage.setItem('level', testUser.level);
            win.localStorage.setItem('successLength', testUser.successLength);
            win.localStorage.setItem('eventsLength', testUser.eventsLength);
            win.localStorage.setItem('iaFightingLength', testUser.iaFightingLength);
            win.localStorage.setItem('emailVerified', testUser.emailVerified);
        });

        // Mock API calls
        cy.intercept('GET', `/api/${testUser.userId}/badges`, { body: [] }).as('getBadges');
        cy.intercept('GET', `/api/game/log-files*`, { body: [] }).as('getLogs');
        cy.visit('/profile');
    });

    it('should display correct user information', () => {
        cy.get('h2').contains(testUser.userName).should('be.visible');
        cy.get('p').contains(testUser.place).should('be.visible');
        cy.contains(`Niveau ${testUser.level}`).should('exist');
    });

    it('should open modify modal and show disabled fields', () => {
        // Open Modal
        cy.get('button').contains(/modifier le profil|modify profile/i).click();

        // Check Username Field
        cy.get('input[value="' + testUser.userName + '"]').should('be.disabled');
        // Check Email Field
        cy.get('input[value="' + testUser.email + '"]').should('be.disabled');
    });

    it('should toggle newsletter subscription', () => {
        // Open Modal
        cy.get('button').contains(/modifier le profil|modify profile/i).click();

        // Mock the PATCH request
        cy.intercept('PATCH', '/api/set-news-letter*', { statusCode: 200 }).as('setNewsletter');

        // Find toggle button for newsletter
        // The modal text says "Newsletter". The button is next to it.
        // We can target the button with role or class structure.
        // In ProfileModify.js, the button has `onClick={handleNewsletterToggle}`.
        // It has a span inside that moves.
        // Let's rely on the text "Newsletter" and find the button sibling.

        cy.contains('p', /newsletter/i).parent().find('button').click();

        cy.wait('@setNewsletter').its('response.statusCode').should('eq', 200);
    });

    it('should handle password change flow', () => {
        // Open Modal
        cy.get('button').contains(/modifier le profil|modify profile/i).click();

        // Mock PUT request
        cy.intercept('PUT', `/api/${testUser.userId}/password`, { statusCode: 200 }).as('updatePassword');

        // Fill Password Fields
        cy.get('input[placeholder*="••••••••"]').eq(0).type('OldPass123!'); // Current
        cy.get('input[placeholder*="••••••••"]').eq(1).type('NewPass123!'); // New
        cy.get('input[placeholder*="••••••••"]').eq(2).type('NewPass123!'); // Confirm

        // Submit
        // Button text "Terminer" or "Finish"
        cy.contains('button', /terminer|finish/i).click();

        cy.wait('@updatePassword').its('request.body').should('deep.equal', {
            oldPassword: 'OldPass123!',
            newPassword: 'NewPass123!'
        });

        // Verify success message
        cy.contains(/succès|success|updated/i).should('be.visible');
    });
});
