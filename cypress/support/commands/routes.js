import { streamURL, investigationsURL, requestsURL } from '../../utils';

Cypress.Commands.add('mockTicketRoutes', () => {
  Cypress.log({ name: 'mock ticket routes' });
  ['investigations', 'requests'].forEach((stream) => {
    ['0comments', '1comments', '40comments', 'closed', 'noDevices', 'SOCP0000'].forEach((ticket) => {
      cy.route('GET', `web/v1/api/${stream}/${ticket}`, `fixture:${stream}/${ticket}.json`).as(`${stream}.${ticket}`);
    });
  });
});

Cypress.Commands.add('mockStreamRoutes', (mockSecurityStreamInterest = true) => {
  Cypress.log({ name: 'mock stream routes' });
  cy.route('GET', streamURL(), 'fixture:securityStream/tuesday.december.3.json').as('stream');
  cy.route('GET', requestsURL(), 'fixture:requestStream/default.json').as('requests');
  cy.route('GET', investigationsURL(), 'fixture:investigationStream/default.json').as('investigations');
  if (mockSecurityStreamInterest) cy.route('GET', 'web/v1/api/interest', 'fixture:securityStream/interest.json');
});

Cypress.Commands.add('mockProfileRoute', () => {
  Cypress.log({ name: 'mock profile routes' });
  cy.route('GET', '/web/v1/api/profile', 'fixture:profile/default.json').as('profile');
});

Cypress.Commands.add('mockLoginRoutes', () => {
  Cypress.log({ name: 'mock profile routes' });
  cy.route('GET', 'web/v1/api/socAnnouncement', 'fixture:login/announcement.json').as('announcement');
  cy.route('GET', 'web/v1/api/alertCon', 'fixture:login/alertCon.json').as('alertCon');
});
