import { loginPage } from "../pages/LoginPage";

describe('Login Tests', () => {
    beforeEach(() => {
        loginPage.visit();
    });
    
    it('Login Successful', () => {
        loginPage.login('standard_user', 'secret_sauce');

        loginPage.elements.productsTitle()
        .should('be.visible')
        .and('have.text', 'Products')
    });

    it('Login with invalid user', () => {
        loginPage.typeUsername('invalid_user');
        loginPage.typePassword('secret_sauce');

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service');           
    });

    it('Login with wrong password', () => {
        loginPage.typeUsername('standard_user');
        loginPage.typePassword('wrongpassword');

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with empty username', () => {
        loginPage.typePassword('secret_sauce');

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username is required');
    });    

    it('Login with empty password', () => {
        loginPage.typeUsername('standard_user');

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Password is required');
    });

    it('Login with empty username and password', () => {
        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username is required');
    });

    it('Login with locked out user', () => {
        loginPage.typeUsername('locked_out_user');
        loginPage.typePassword('secret_sauce');

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });
})