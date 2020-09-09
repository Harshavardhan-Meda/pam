describe('streams.security', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.server();
    cy.mockStreamRoutes();
    cy.mockProfileRoute();
    cy.clock(new Date('December 4 2019 14:42:12 GMT').getTime());
    // need this - cypress is broken
    // https://github.com/cypress-io/cypress/issues/4832
    // https://github.com/cypress-io/cypress/issues/687
    cy.tick(1000);
    cy.visit('/stream');
    cy.wait('@profile');
    cy.wait('@stream');
    cy.get('[data-cy=spinner]').should('not.be.visible');
  });

  it('renders', () => {
    cy.get('[data-cy=streamHeader]').snapshot({ name: 'header' });
    cy.get('[data-cy=streamTime]').snapshot({ name: 'header time' });
    cy.get('[data-cy=securityStream]').within(() => {
      cy.get('[data-cy=streamView]').snapshot({ name: 'view' });
      cy.get('[data-cy=filterContainer]').should('be.visible');
    });
  });

  it('star button works', () => {
    cy.get('[data-cy=streamItem-interestButton]')
      .first()
      .click();
    cy.get('[data-cy=streamView]').snapshot({ name: 'First item interested' });

    cy.get('[data-cy=streamItem-interestButton]')
      .first()
      .click();
    cy.get('[data-cy=streamView]').snapshot({ name: 'First item not interested' });
  });

  it('link menu works', () => {
    cy.get('[data-cy=streamItem-actionButton]')
      .first()
      .click();
    cy.get('[data-cy=streamView]').snapshot({ name: 'First item share menu open' });

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('[data-cy=securityItemContent]')
      .first()
      .click();
    cy.get('@windowOpen').should('be.calledWith', Cypress.sinon.match(/^http[\S]*/), '_blank');

    cy.get('[data-cy=streamItem-actionButton]')
      .first()
      .click();
    cy.get('[data-cy=streamView]').snapshot({ name: 'First item share menu closed' });
  });
});
