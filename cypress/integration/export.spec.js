import { investigationsURL } from '../utils';

const dateRegex = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}';

const checkExportMenuOpen = () => {
  cy.get('.bx--overflow-menu-options.bx--overflow-menu--flip.bx--overflow-menu-options--open').then((menu) => {
    expect(menu.children().length).to.equal(2);
    cy.wrap(menu.children()[0].outerHTML).snapshot({ name: 'toCSVOption' });
    cy.wrap(menu.children()[1].outerHTML).snapshot({ name: 'toXSLOption' });
  });
};

describe('Export', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.server();
    cy.mockStreamRoutes(false);
  });

  ['exportXLS', 'exportCSV'].forEach((exportType) => {
    it(exportType, () => {
      cy.route({
        delay: 500,
        url: investigationsURL({
          offset: 0,
          limit: 300,
          timeframe: {
            qs: `"start":"${dateRegex}","type":"LAST_7D"`,
            isRegex: true
          }
        }),
        response: 'fixture:investigationStream/default.json'
      }).as('exportData');

      cy.visit('/investigations');
      cy.get('[data-cy=exportButton]').click();
      cy.get('[data-cy=exportButton]');
      checkExportMenuOpen();
      cy.get(`[data-cy=${exportType}]`).click();
      cy.get('[data-cy=exportButton]').should('not.exist');
      cy.get('.bx--overflow-menu-options.bx--overflow-menu--flip.bx--overflow-menu-options--open').should('not.exist');
      cy.get('[data-cy=exportButtonSpinner]').snapshot({ name: 'exportButtonIsSpinning' });
      cy.wait('@exportData');
      cy.get('[data-cy=exportButton]');
      cy.get('[data-cy=exportButtonSpinner]').should('not.exist');
    });
  });

  it('Unclick the button in header', () => {
    cy.visit('/investigations');
    cy.get('[data-cy=exportButton]').click();
    cy.get('[data-cy=exportButton]');
    checkExportMenuOpen();
    cy.get('[data-cy=streamHeader]').click();
    cy.get('.bx--overflow-menu-options.bx--overflow-menu--flip.bx--overflow-menu-options--open').should('not.exist');
  });

  ['investigations', 'requests'].forEach((stream) => {
    it(`export ${stream} backend data`, () => {
      const nItems = 40;
      cy.request(`/web/v1/api/${stream}?offset=0&limit=${nItems}`).then((response) => {
        const randomIdx = Math.floor(Math.random() * nItems);
        const randomId = response.body.items[randomIdx].id;
        cy.server();
        cy.route('GET', `web/v1/api/${stream}/${randomId}`).as(`${stream}.${randomId}`);
        cy.visit(`/${stream}/${randomId}`);
        cy.checkSchema(`@${stream}.${randomId}`, `GET.web.v1.api.${stream}.[id]`);
      });
    });

    ['exportCSV', 'exportXLS'].forEach((exportType) => {
      it(exportType, () => {
        cy.get('[data-cy=exportButton]').click();
        cy.get('[data-cy=exportButton]');
        checkExportMenuOpen();
        cy.get(`[data-cy=${exportType}]`).click();
        cy.get('.bx--overflow-menu-options.bx--overflow-menu--flip.bx--overflow-menu-options--open').should(
          'not.exist'
        );
      });
    });

    it(`Unclick the button in ${stream} details`, () => {
      cy.get('[data-cy=exportButton]').click();
      cy.get('[data-cy=exportButton]');
      checkExportMenuOpen();
      cy.get('.container').click();
      cy.get('.bx--overflow-menu-options.bx--overflow-menu--flip.bx--overflow-menu-options--open').should('not.exist');
    });
  });
});
