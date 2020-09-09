describe('menu.side', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.server();
    cy.mockProfileRoute();
    cy.mockStreamRoutes();
    cy.visit('/stream');
    cy.wait('@stream');
    cy.wait('@profile');
  });

  ['iphone-6', 'macbook-15'].forEach((viewport) => {
    context(`${viewport}`, () => {
      before(() => {
        cy.viewport(viewport);
      });

      it('opens and closes', () => {
        cy.getSecurityShell().snapshot({ name: 'menu closed' });

        cy.toggleSideMenu('menu');
        cy.getSecurityShell().snapshot({ name: 'main menu open' });

        cy.toggleSideMenu('menu');
        cy.getSecurityShell().snapshot({ name: 'menu closed' });

        cy.toggleSideMenu('settings');
        cy.getSecurityShell().snapshot({ name: 'settings menu open' });

        cy.toggleSideMenu('settings');
        cy.getSecurityShell().snapshot({ name: 'menu closed' });

        cy.toggleSideMenu('support');
        cy.getSecurityShell().snapshot({ name: 'support menu open' });

        cy.toggleSideMenu('support');
        cy.getSecurityShell().snapshot({ name: 'menu closed' });
      });

      it('main menu accordions work', () => {
        cy.toggleSideMenu('menu');
        cy.contains('Requests').click();
        cy.getSecurityShell().snapshot({ name: 'main menu - requests' });

        cy.contains('Requests').click();
        cy.getSecurityShell().snapshot({ name: 'main menu open' });

        cy.contains('Investigations').click();
        cy.getSecurityShell().snapshot({ name: 'main menu - investigations' });

        cy.contains('Investigations').click();
        cy.getSecurityShell().snapshot({ name: 'main menu open' });
      });

      // todo: unskip when HORIZON-3108 fixed
      it.skip('closes profile menu when opened', () => {
        cy.toggleProfileMenu();
        cy.toggleSideMenu('settings');
        cy.getSecurityShell().snapshot({ name: 'only side menu open' });

        cy.toggleSideMenu('settings');
        cy.getSecurityShell().snapshot({ name: 'both menus closed' });
      });
    });
  });
});
