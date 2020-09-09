describe('newTicket', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.server();
    cy.mockStreamRoutes(false);
    cy.mockProfileRoute();
  });

  ['iphone-6', 'macbook-15'].forEach((viewport) => {
    context(`${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      it('changes route', () => {
        cy.visit('/requests');
        cy.get('.create-new-link').click();
        cy.url().should('includes', 'new-ticket?type=request');
      });
    });
  });
});
