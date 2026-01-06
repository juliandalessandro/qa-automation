import { loginPage } from "../pages/LoginPage";
import users from "../fixtures/users.json"

Cypress.Commands.add('loginAs', (role) => {
    const user = users.validUsers.find(u => u.role === role);
    if(!user) throw new Error (`User with role ${role} does not exist.`);
    loginPage.login(user.username, user.password)
});