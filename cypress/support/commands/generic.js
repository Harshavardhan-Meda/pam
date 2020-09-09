import { checkSchema } from '../../utils';

Cypress.Commands.add('toggleProfileMenu', () => {
  Cypress.log({ name: 'toggle profile menu' });
  cy.get(".header [aria-label='Toggle profile']").click();

  cy.get('.security--header__transition--enter').should('not.exist');
  cy.get('.security--header__transition--leave').should('not.exist');
});

Cypress.Commands.add('toggleSideMenu', (menuName) => {
  Cypress.log({ name: 'toggle side menu: ' });
  cy.get(`[aria-label='Toggle ${menuName}']`).click();

  cy.get('.security--toolbar__transition--enter').should('not.exist');
  cy.get('.security--toolbar__transition--leave').should('not.exist');
});

Cypress.Commands.add('getSecurityShell', () => {
  Cypress.log({ name: 'get security shell' });
  cy.get('.security--shell');
});

Cypress.Commands.add('getRoot', () => {
  Cypress.log({ name: 'get root' });
  cy.get('#root');
});

Cypress.Commands.add('checkSchema', (requestName, schemaName, cb) => {
  Cypress.log({ name: 'check schema: ', requestName, schemaName });
  return cy
    .wait(requestName)
    .then((response) => {
      return Cypress.Blob.blobToBase64String(response.response.body).then((blobString) => JSON.parse(atob(blobString)));
    })
    .should((responseBody) => {
      checkSchema(schemaName, responseBody);
      if (cb) return cb(responseBody);
    });
});
