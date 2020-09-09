describe('streams.ticket', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
  });

  ['investigations', 'requests'].forEach((stream) => {
    context(`${stream} stream`, () => {
      beforeEach(() => {
        cy.server();
        cy.mockProfileRoute();
        cy.mockStreamRoutes();
        cy.visit(`/${stream}`);
        cy.wait('@profile');
        cy.wait(`@${stream}`);
        cy.get('[data-cy=spinner]').should('not.be.visible');
      });

      it('renders', () => {
        cy.get('[data-cy=streamHeader]').snapshot({ name: 'header' });
        cy.get('[data-cy=streamTime]').should('not.exist');

        cy.get(`[data-cy=${stream}Stream]`).within(() => {
          cy.get('[data-cy=streamView]').snapshot({ name: 'view' });
          cy.get('[data-cy=filterContainer]').should('be.visible');
        });
      });
    });
  });
});
