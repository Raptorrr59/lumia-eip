// ***********************************************************
// This file is loaded automatically before your test files.
// ***********************************************************

// Custom commands
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"], input[type="email"]').type(username);
    cy.get('[data-testid="password-input"], input[type="password"]').type(password);
    cy.get('[data-testid="login-btn"], button[type="submit"]').click();
});

Cypress.Commands.add('register', (username, email, password) => {
    cy.visit('/register');
    cy.get('[data-testid="username-input"]').type(username);
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="confirm-password-input"]').type(password);
});

// Suppress uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
