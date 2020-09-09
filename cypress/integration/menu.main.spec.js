const typeMainMenu = [
  {
    title: 'Security Stream',
    path: '/stream'
  },
  {
    title: 'Investigations',
    path: '/investigations'
  },
  {
    title: 'Your Requests',
    path: '/requests'
  }
];

describe('menu.main', () => {
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
        cy.visit('/stream');
        typeMainMenu.forEach((menuItem) => {
          cy.get('.header-items').contains(menuItem.title).click();
          cy.url().should('includes', menuItem.path);
        });
      });
    });
  });
});
