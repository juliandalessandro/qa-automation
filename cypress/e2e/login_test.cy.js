describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com');
    });
    
    it('Login Successful', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="title"]').should('have.text', 'Products');
        cy.url().should('include', '/inventory.html');                
    });

    it('Login with invalid user', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('secret_sauce');

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service');           
    });

    it('Login with empty password', () => {
        cy.get('[data-test="username"]').type('standard_user');

        cy.get('[data-test="login-button"]').click();

        cy.get('[data-test="error"]').should('be.visible')
        .and('have.text', 'Epic sadface: Password is required');
    });    
})