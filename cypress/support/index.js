/* eslint-disable import/no-extraneous-dependencies */
import './commands/generic';
import './commands/login';
import './commands/routes';

require('@cypress/snapshot').register();

// Cypress doesn't supprot fetch api
// https://github.com/cypress-io/cypress/issues/1619
// https://github.com/cypress-io/cypress/issues/687
Cypress.on('window:before:load', (win) => {
  win.fetch = null;
});
