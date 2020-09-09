describe('Ticket Details', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
  });

  ['investigations', 'requests'].forEach((stream) => {
    it(`${stream} backend data`, () => {
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

    context(`${stream}`, () => {
      beforeEach(() => {
        cy.server();
        cy.mockTicketRoutes();

        cy.route('GET', `web/v1/api/${stream}/addComment`, `fixture:${stream}/addComment.before.json`).as(
          `${stream}.addComment.before`
        );
        cy.route('PUT', `/web/v1/api/${stream}/addComment/comments`, `fixture:${stream}/addComment.after.json`).as(
          `put.${stream}.addComment.after`
        );
      });

      context('timeline tab', () => {
        it('renders and works', () => {
          ['0comments', '1comments', '40comments'].forEach((ticket) => {
            cy.visit(`${stream}/${ticket}`);
            cy.wait(`@${stream}.${ticket}`);
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket}` });
          });

          cy.visit(`${stream}/40comments`);
          cy.get('[data-cy=worklog-expandCommentsButton]').click();
          cy.get('[data-cy=ticketDetails]').snapshot({ name: '40comments - expanded' });
        });

        it('adds comments', () => {
          cy.visit(`${stream}/addComment`);

          cy.get('[data-cy=worklogComment-textarea]').type('test');
          cy.get('[data-cy=worklogComment-submitButton]').click();

          cy.wait(`@put.${stream}.addComment.after`);
          cy.get('[data-cy=ticketDetails]').snapshot({
            name: 'after adding test comment'
          });
        });

        it('adds close comment', () => {
          cy.visit(`${stream}/addComment`);

          cy.get('[data-cy=worklogComment-closeButton]').click();
        });

        it('doesnt add comments to closed tickets', () => {
          cy.visit(`${stream}/closed`);

          cy.get('[data-cy=ticketDetails]').snapshot({ name: 'buttons disabled' });
          cy.server();
          cy.route({
            method: 'PUT',
            url: '**/web/v1/api/requests/*/comments',
            onRequest: () => {
              expect(true).to.equal(false);
              throw new Error();
            }
          });
          cy.get('textarea.comment-text').type('test comment{enter}');
        });
      });

      context('details tab', () => {
        it('renders and works', () => {
          ['0comments', '1comments', '40comments'].forEach((ticket) => {
            cy.visit(`${stream}/${ticket}`);
            cy.wait(`@${stream}.${ticket}`);

            cy.get('[data-cy=ticketDetailsHeader-detailsTabButton]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket}` });
          });

          ['40comments', 'noDevices'].forEach((ticket) => {
            cy.visit(`${stream}/${ticket}`);
            cy.get('[data-cy=ticketDetailsHeader-detailsTabButton]').click();
            cy.get('[data-cy=collapsiblePanelTitle-Description]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket} - description folded` });

            cy.get('[data-cy=collapsiblePanelTitle-Description]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket}` });

            cy.get('[data-cy=collapsiblePanelTitle-Devices]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket} - devies expanded` });

            cy.get('[data-cy=collapsiblePanelTitle-Description]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket} - description folded, devies expanded` });

            cy.get('[data-cy=collapsiblePanelTitle-Description]').click();
            cy.get('[data-cy=collapsiblePanelTitle-Devices]').click();
            cy.get('[data-cy=ticketDetails]').snapshot({ name: `${ticket}` });
          });
        });
      });
    });
  });
});
