describe('menu.profile', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
  });

  ['iphone-6', 'macbook-15'].forEach((viewport) => {
    context(`${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      it('renders', () => {
        cy.server();
        cy.mockStreamRoutes();
        cy.mockProfileRoute();

        cy.visit('/requests');
        cy.wait('@profile');

        cy.getSecurityShell().snapshot({ name: 'Profile menu closed' });

        cy.toggleProfileMenu();
        cy.getSecurityShell().snapshot({ name: 'Profile menu open' });

        cy.toggleProfileMenu();
        cy.getSecurityShell().snapshot({ name: 'Profile menu closed' });
      });
    });
  });
});
