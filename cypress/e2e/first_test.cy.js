describe('First Cypress Test', () => {
  it('Visit a page', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="login-button"]').should('be.visible');
  });
});