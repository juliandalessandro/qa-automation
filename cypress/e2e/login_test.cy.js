import { loginPage } from "../pages/LoginPage";

describe('Login Tests', () => {

    let users;

    before(() => {
        cy.fixture('users').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        loginPage.visit();
    });
    
    it('Login Successful', () => {
        loginPage.login(users.successfulLoginUser.username, users.successfulLoginUser.password);

        //Usando Custom Commands
        // cy.login(users.successfulLoginUser.username, users.successfulLoginUser.password);

        loginPage.elements.productsTitle()
        .should('be.visible')
        .and('have.text', 'Products')
    });

    it('Login with invalid user', () => {
        loginPage.login(users.invalidUser.username, users.invalidUser.password);

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service');           
    });

    it('Login with wrong password', () => {
        loginPage.login(users.wrongPasswordLoginUser.username, users.wrongPasswordLoginUser.password);

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Login with empty username', () => {
        loginPage.typePassword(users.emptyUsernameLoginUser.password);

        loginPage.clickLogin();

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Username is required');
    });    

    it('Login with empty password', () => {
        loginPage.typeUsername(users.emptyPasswordLoginUser.username);

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
        loginPage.login(users.lockedOutUserLogin.username, users.lockedOutUserLogin.password);

        loginPage.elements.errorMessage()
        .should('be.visible')
        .and('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    });
})