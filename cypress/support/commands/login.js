/* eslint-disable no-shadow */
Cypress.Commands.add('preserveSessionCookies', () => {
  Cypress.log({ name: 'preserve session cookies' });
  Cypress.Cookies.preserveOnce('connect.sid');
});

Cypress.Commands.add('loginBySingleSignOn', () => {
  Cypress.log({ name: 'login by SSO' });

  return cy
    .task('ibmIdLogin', {
      baseUrl: Cypress.config().baseUrl,
      username: Cypress.env('USERNAME'),
      password: Cypress.env('PASSWORD')
    })
    .then((sidCookie) => {
      cy.setCookie(sidCookie.name, sidCookie.value, {
        domain: sidCookie.domain,
        expiry: sidCookie.expires,
        httpOnly: sidCookie.httpOnly,
        path: sidCookie.path,
        secure: sidCookie.secure
      });
    });
});
