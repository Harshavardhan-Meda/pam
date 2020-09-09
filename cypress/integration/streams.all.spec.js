import { streamURL, requestsURL, investigationsURL } from '../utils';

const setupLoadMoreRoutes = () => {
  cy.route(
    'GET',
    streamURL({ offset: 'loadMoreOffset' }),
    'fixture:securityStream/tuesday.december.3.loadMore.json'
  ).as('stream.loadMore');

  cy.route(
    'GET',
    streamURL({ offset: 'loadMoreOffsetEnd' }),
    'fixture:securityStream/tuesday.december.3.loadMore.end.json'
  ).as('stream.loadMore.end');

  ['20', '40'].forEach((offset) => {
    cy.route(
      'GET',
      requestsURL({ offset }),
      offset === '20' ? 'fixture:requestStream/loadMore.json' : 'fixture:requestStream/loadMore.end.json'
    ).as(offset === '20' ? 'requests.loadMore' : 'requests.loadMore.end');

    cy.route(
      'GET',
      investigationsURL({ offset }),
      offset === '20' ? 'fixture:investigationStream/loadMore.json' : 'fixture:investigationStream/loadMore.end.json'
    ).as(offset === '20' ? 'investigations.loadMore' : 'investigations.loadMore.end');
  });
};

describe('streams.all', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.clock(new Date('December 4 2019 14:42:12 GMT').getTime());
    // need this - cypress is broken
    // https://github.com/cypress-io/cypress/issues/4832
    // https://github.com/cypress-io/cypress/issues/687
    cy.tick(1000);
  });

  ['stream', 'investigations', 'requests'].forEach((stream) => {
    it(`${stream} backend data`, () => {
      const url = {
        stream: streamURL(),
        investigations: investigationsURL(),
        requests: requestsURL()
      };
      cy.server();
      cy.route('GET', url[stream]).as(`${stream}`);
      cy.route('GET', 'web/v1/api/profile').as('profile');
      cy.visit(`/${stream}`);
      cy.checkSchema(`@${stream}`, `GET.web.v1.api.${stream}`);
      cy.checkSchema('@profile', 'GET.web.v1.api.profile');
    });

    context(`${stream} stream`, () => {
      beforeEach(() => {
        cy.server();
        cy.mockProfileRoute();
        cy.mockStreamRoutes();
        setupLoadMoreRoutes();
        cy.visit(`/${stream}`);
        cy.wait('@profile');
        cy.wait(`@${stream}`);
        cy.get('[data-cy=spinner]').should('not.be.visible');
        if (stream === 'steam') cy.wait('@interest');
      });

      it('loads more after scrolling down', () => {
        cy.scrollTo('bottom');
        cy.wait(`@${stream}.loadMore`);
        cy.get('[data-cy=spinner]').should('not.be.visible');
        cy.get('[data-cy=streamView]').snapshot({ name: 'load more' });

        cy.scrollTo('bottom');
        cy.wait(`@${stream}.loadMore.end`);
        cy.get('[data-cy=spinner]').should('not.be.visible');
        cy.get('[data-cy=streamView]').snapshot({ name: 'load more end' });
      });
    });
  });
});
