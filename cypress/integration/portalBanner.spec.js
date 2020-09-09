describe('Portal Banner', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
  });

  it('renders on stream', () => {
    cy.server();
    cy.mockStreamRoutes();
    cy.mockProfileRoute();
    cy.clock(new Date('December 4 2019 14:42:12 GMT').getTime());
    // need this - cypress is broken
    // https://github.com/cypress-io/cypress/issues/4832
    // https://github.com/cypress-io/cypress/issues/687
    cy.tick(1000);

    cy.visit('/stream?origin=portal');
    cy.wait('@stream');
    cy.wait('@profile');
    cy.getRoot().snapshot({ name: 'banner visible' });
    cy.get('[data-cy=portalBanner-closeButton]').click();
    cy.getRoot().snapshot({ name: 'banner closed' });
  });
});
