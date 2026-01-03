import { loginPage } from "../pages/LoginPage"

Cypress.Commands.add('login', (username, password) => {
    loginPage.typeUsername(username);
    loginPage.typePassword(password);

    loginPage.clickLogin();
})