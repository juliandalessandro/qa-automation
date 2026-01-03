class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        productsTitle: () => cy.get('.title')
    }

    visit() {
        cy.visit('https://www.saucedemo.com');
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

export const loginPage = new LoginPage();