import { loginPage } from "../pages/LoginPage";
import users from '../fixtures/users.json';

describe('Login Tests', () => {

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

    /* Invalid Users validations - Data Driven */

    users.invalidUsers.forEach((user) => {
        it(`Login inválido - ${user.case}`, () => {
        loginPage.login(user.username, user.password);

        loginPage.elements.errorMessage()
            .should('be.visible')
            .and('contain.text', user.error);
        });
    });
});