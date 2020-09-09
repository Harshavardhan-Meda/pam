describe('login', () => {
  it('renders', () => {
    cy.server();
    cy.mockLoginRoutes();
    cy.clock(new Date('December 4 2019 15:42:12').getTime());
    // need this - cypress is broken
    // https://github.com/cypress-io/cypress/issues/4832
    // https://github.com/cypress-io/cypress/issues/687
    cy.tick(1000);

    cy.visit('/login');
    cy.wait('@announcement');
    cy.wait('@alertCon');
    cy.get('[data-cy=loginContainer]').snapshot({ name: 'login page' });
  });

  it('backend data', () => {
    cy.server();
    cy.route('GET', 'web/v1/api/alertCon').as('alertCon');
    cy.route('GET', 'web/v1/api/socAnnouncement').as('socAnnouncement');

    cy.visit('/login');
    cy.checkSchema('@alertCon', 'GET.web.v1.api.alertCon');
    cy.checkSchema('@socAnnouncement', 'GET.web.v1.api.socAnnouncement');
  });

  it('redirects unauthorized users', () => {
    cy.visit('/stream');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });

  it('/logout redirects to /login', () => {
    cy.visit('/logout');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
});
