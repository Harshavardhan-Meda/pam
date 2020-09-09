import moment from 'moment';
import { streamURL, investigationsURL, requestsURL } from '../utils';

const timeframeFilters = [
  {
    queryParameter: 'LAST_24H',
    buttonName: 'Past 24 Hours',
    noItemsBefore: moment().subtract(24, 'hours')
  },
  {
    queryParameter: 'LAST_7D',
    buttonName: 'Past Week',
    noItemsBefore: moment().subtract(7, 'days')
  },
  {
    queryParameter: 'LAST_3M',
    buttonName: 'Past 3 Months',
    noItemsBefore: moment().subtract(3, 'months')
  }
];

const priorityFilters = [
  {
    queryParameter: 'high',
    buttonName: 'High',
    expectedItemProp: 'high'
  },
  {
    queryParameter: 'medium',
    buttonName: 'Medium',
    expectedItemProp: 'medium'
  },
  {
    queryParameter: 'low',
    buttonName: 'Low',
    expectedItemProp: 'low'
  }
];

const statusFilters = [
  {
    queryParameter: 'pending',
    buttonName: 'Your Action Required',
    expectedItemProp: 'Pending'
  },
  {
    queryParameter: 'new',
    buttonName: 'New',
    expectedItemProp: 'New'
  },
  {
    queryParameter: 'assigned',
    buttonName: 'Assigned',
    expectedItemProp: 'Assigned'
  },
  {
    queryParameter: 'workInProgress',
    buttonName: 'Work In Progress',
    expectedItemProp: 'Work In Progress'
  },
  {
    queryParameter: 'resolved',
    buttonName: 'Resolved',
    expectedItemProp: 'Resolved'
  },
  {
    queryParameter: 'closed',
    buttonName: 'Closed',
    expectedItemProp: 'Closed'
  }
];

const typeFilters = [
  {
    queryParameter: 'news',
    buttonName: 'News',
    expectedItemProp: 'news'
  },
  {
    queryParameter: 'investigation',
    buttonName: 'Investigation',
    expectedItemProp: 'investigation'
  },
  {
    queryParameter: 'serviceRequest',
    buttonName: 'Service Request',
    expectedItemProp: 'serviceRequest'
  },
  {
    queryParameter: 'alert',
    buttonName: 'Alert',
    expectedItemProp: 'alert'
  },
  {
    queryParameter: 'assessment',
    buttonName: 'Assessment',
    expectedItemProp: 'assessment'
  }
];

const checkItems = (items, itemPropName, expectedItemProp) => {
  const itemsFiltered = items.every((x) => x[itemPropName] === expectedItemProp);
  expect(itemsFiltered, `recived items all have ${itemPropName} eq to ${expectedItemProp}`).to.equal(true);
};

const dateRegex = '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}';

describe('Filters', () => {
  before(() => {
    cy.loginBySingleSignOn();
  });

  beforeEach(() => {
    cy.preserveSessionCookies();
    cy.server();
    cy.mockStreamRoutes(false);
    cy.mockProfileRoute();
  });

  context('Stream', () => {
    it('type filters', () => {
      typeFilters.forEach((filter) => {
        cy.route(streamURL({ type: filter.queryParameter })).as(filter.buttonName);
        cy.visit('/stream');
        cy.get('[data-cy=filterContainer]')
          .contains(filter.buttonName)
          .click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.stream', (filteredStream) => {
          checkItems(filteredStream.items, 'type', filter.expectedItemProp);
        });
        cy.get('[data-cy=filterContainer]')
          .contains(filter.buttonName)
          .click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    it('intrest filters', () => {
      cy.route(streamURL({ interest: true })).as('filteredStream');
      cy.route('web/v1/api/interest').as('interest');

      cy.visit('/stream');
      cy.checkSchema('@interest', 'GET.web.v1.api.interest', (intrests) => {
        cy.contains('Starred Items').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'interest filter selected' });
        cy.checkSchema('@filteredStream', 'GET.web.v1.api.stream', (filteredStream) => {
          const allItemsInterested = filteredStream.items.every(
            (x) => intrests.items.find((y) => y.leafId === x.id).interest
          );
          expect(allItemsInterested, 'recived items all have interested = true').to.equal(true);
        });
      });

      cy.contains('Starred Items').click();
      cy.get('[data-cy=filterContainer]').snapshot({
        name: 'no filter selected'
      });
    });

    it('filter via query params', () => {
      cy.route(streamURL({ type: ['news', 'alert'], interest: true })).as('filteredStream');
      cy.route('web/v1/api/interest').as('interest');

      cy.visit('/stream?type=news&type=alert&interest=starred');
      cy.get('[data-cy=filterContainer]').snapshot({ name: 'correct filters selected' });
      cy.checkSchema('@interest', 'GET.web.v1.api.interest', (intrests) => {
        cy.checkSchema('@filteredStream', 'GET.web.v1.api.stream', (filteredStream) => {
          const allItemsInterested = filteredStream.items.every(
            (x) => intrests.items.find((y) => y.leafId === x.id).interest
          );
          const itemsFiltered = filteredStream.items.every((x) => x.type === 'news' || x.type === 'alert');
          expect(allItemsInterested && itemsFiltered, 'recived items to be (news or alert) and interested').to.equal(
            true
          );
        });
      });
    });

    it('all filters at once', () => {
      cy.route(
        streamURL({
          type: typeFilters.map((x) => x.queryParameter),
          interest: true
        }),
        'fixture:securityStream/tuesday.december.3.json'
      ).as('allFilters');

      cy.visit(`/stream?type=${typeFilters.map((x) => x.queryParameter).join('&type=')}&interest=starred`);

      cy.get('[data-cy=filterContainer]').snapshot({ name: 'all filter selected' });
      cy.wait('@allFilters');
    });

    context('Mobile', () => {
      beforeEach(() => {
        cy.viewport('iphone-6');
      });

      it('filter menu', () => {
        cy.visit('/stream');
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
        cy.get('[data-cy=toggleFiltersButton]').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'filter menu open' });
        cy.contains('OK').click();
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
      });

      it('type filters', () => {
        typeFilters.forEach((filter) => {
          cy.route(streamURL({ type: filter.queryParameter }), 'fixture:securityStream/tuesday.december.3.json').as(
            filter.buttonName
          );
          cy.visit('/stream');
          cy.wait('@stream');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.get('[data-cy=filterContainer]')
            .contains(filter.buttonName)
            .click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.get('[data-cy=filterContainer]')
            .contains(filter.buttonName)
            .click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} no filter selected` });
          cy.contains('OK').click();
          cy.wait('@stream');
        });
      });

      it('intrest filters', () => {
        cy.route(streamURL({ interest: true }), 'fixture:securityStream/tuesday.december.3.json').as('filteredStream');

        cy.visit('/stream');
        cy.wait('@stream');

        cy.get('[data-cy=toggleFiltersButton]').click();
        cy.contains('Starred Items').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'interest filter selected' });
        cy.contains('OK').click();
        cy.wait('@filteredStream');
        cy.get('[data-cy=toggleFiltersButton]').click();
        cy.contains('Starred Items').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'no filter selected' });
        cy.contains('OK').click();
        cy.wait('@stream');
      });
    });
  });

  context('Requests', () => {
    it('status filters', () => {
      statusFilters.forEach((filter) => {
        cy.route(requestsURL({ status: filter.queryParameter })).as(filter.buttonName);

        cy.visit('/requests');
        cy.get('[data-cy=filterContainer]')
          .contains(filter.buttonName)
          .click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.requests', (filteredStream) => {
          checkItems(filteredStream.items, 'status', filter.expectedItemProp);
        });
        cy.get('[data-cy=filterContainer]')
          .contains(filter.buttonName)
          .click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    it('timeframe filters', () => {
      timeframeFilters.forEach((filter) => {
        cy.route(
          requestsURL({
            timeframe: { qs: `"start":"${dateRegex}","type":"${filter.queryParameter}"`, isRegex: true }
          })
        ).as(filter.buttonName);

        cy.visit('/requests');
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.requests', (filteredStream) => {
          const now = moment();
          const itemsFiltered = filteredStream.items.every((item) => {
            const timeOfUpdate = moment(item.timeOfUpdate);
            return timeOfUpdate.isBefore(now) && timeOfUpdate.isAfter(filter.noItemsBefore);
          });
          expect(itemsFiltered, `recived items all have timeOfUpdate in the ${filter.queryParameter}`).to.equal(true);
        });

        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    // todo: change after fixing HORIZON-3118
    it('filter via query params', () => {
      cy.route(
        requestsURL({
          status: ['assigned', 'closed'],
          timeframe: '"start":"2019-11-06","type":"LAST_24H"'
        })
      ).as('filteredStream');

      cy.visit('/requests?status=assigned&status=closed&timeframe[start]=2019-11-06&timeframe[type]=LAST_24H');
      cy.get('[data-cy=filterContainer]').snapshot({ name: 'correct filters selected' });
      cy.checkSchema('@filteredStream', 'GET.web.v1.api.requests', (filteredStream) => {
        const now = moment();
        const correctTimeframe = filteredStream.items.every((item) => {
          const timeOfUpdate = moment(item.timeOfUpdate);
          return timeOfUpdate.isBefore(now) && timeOfUpdate.isAfter(moment('2019-11-06').subtract(24, 'hours'));
        });
        const itemsFiltered = filteredStream.items.every(
          (item) => item.status === 'Assigned' || item.status === 'Closed'
        );
        expect(
          correctTimeframe && itemsFiltered,
          'recived items are (closed or assigned) and updated in the last24H'
        ).to.equal(true);
      });
    });

    it('all filters at once', () => {
      cy.route(
        requestsURL({
          status: statusFilters.map((x) => x.queryParameter),
          timeframe: '"start":"2019-11-06","type":"LAST_24H"'
        }),
        'fixture:requestStream/default.json'
      ).as('allFilters');

      cy.visit(
        `/requests?status=${statusFilters
          .map((x) => x.queryParameter)
          .join('&status=')}&timeframe[start]=2019-11-06&timeframe[type]=LAST_24H`
      );

      cy.get('[data-cy=filterContainer]').snapshot({ name: 'all filter selected' });
      cy.wait('@allFilters');
    });

    it('only one timeframe filter can be seleced', () => {
      cy.route(
        requestsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_24H"`, isRegex: true } }),
        'fixture:requestStream/default.json'
      );
      cy.route(
        requestsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_7D"`, isRegex: true } }),
        'fixture:requestStream/default.json'
      );
      cy.route(
        requestsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_3M"`, isRegex: true } }),
        'fixture:requestStream/default.json'
      ).as('LAST_3M');

      cy.visit('/requests');
      timeframeFilters.forEach((filter) => {
        cy.contains(filter.buttonName).click();
      });

      cy.get('[data-cy=filterContainer]').snapshot({ name: 'only last timeframe filter selected' });
      cy.wait('@LAST_3M');
    });

    context('Mobile', () => {
      beforeEach(() => {
        cy.viewport('iphone-6');
      });

      it('filter menu', () => {
        cy.visit('/requests');
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
        cy.get('[data-cy=toggleFiltersButton]').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'filter menu open' });
        cy.contains('OK').click();
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
      });

      it('status filters', () => {
        statusFilters.forEach((filter) => {
          cy.route(requestsURL({ status: filter.queryParameter }), 'fixture:requestStream/default.json').as(
            filter.buttonName
          );
          cy.visit('/requests');
          cy.wait('@requests');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.get('[data-cy=filterContainer]')
            .contains(filter.buttonName)
            .click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.get('[data-cy=filterContainer]')
            .contains(filter.buttonName)
            .click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} no filter selected` });
          cy.contains('OK').click();
          cy.wait('@requests');
        });
      });

      it('timeframe filters', () => {
        timeframeFilters.forEach((filter) => {
          cy.route(
            requestsURL({
              timeframe: { qs: `"start":"${dateRegex}","type":"${filter.queryParameter}"`, isRegex: true }
            }),
            'fixture:requestStream/default.json'
          ).as(filter.buttonName);
          cy.visit('/requests');
          cy.wait('@requests');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter un-selected` });
          cy.contains('OK').click();
          cy.wait('@requests');
        });
      });
    });
  });

  context('Investigations', () => {
    it('status filters', () => {
      statusFilters.forEach((filter) => {
        cy.route(investigationsURL({ status: filter.queryParameter })).as(filter.buttonName);

        cy.visit('/investigations');
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.investigations', (filteredStream) => {
          checkItems(filteredStream.items, 'status', filter.expectedItemProp);
        });
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    it('priority filters', () => {
      priorityFilters.forEach((filter) => {
        cy.route(investigationsURL({ priority: filter.queryParameter })).as(filter.buttonName);

        cy.visit('/investigations');
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.investigations', (filteredStream) => {
          checkItems(filteredStream.items, 'priority', filter.expectedItemProp);
        });
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    it('timeframe filters', () => {
      timeframeFilters.forEach((filter) => {
        cy.route(
          investigationsURL({
            timeframe: { qs: `"start":"${dateRegex}","type":"${filter.queryParameter}"`, isRegex: true }
          })
        ).as(filter.buttonName);

        cy.visit('/investigations');
        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
        cy.checkSchema(`@${filter.buttonName}`, 'GET.web.v1.api.investigations', (filteredStream) => {
          const now = moment();
          const itemsFiltered = filteredStream.items.every((item) => {
            const timeOfUpdate = moment(item.timeOfUpdate);
            return timeOfUpdate.isBefore(now) && timeOfUpdate.isAfter(filter.noItemsBefore);
          });
          expect(itemsFiltered, `recived items all have timeOfUpdate in the ${filter.queryParameter}`).to.equal(true);
        });

        cy.contains(filter.buttonName).click();
        cy.get('[data-cy=filterContainer]').snapshot({
          name: 'no filter selected'
        });
      });
    });

    // todo: change after fixing HORIZON-3118
    it('filter via query params', () => {
      cy.route(
        investigationsURL({
          priority: 'low',
          status: ['new', 'workInProgress'],
          timeframe: '"start":"2019-11-06","type":"LAST_24H"'
        })
      ).as('filteredStream');

      cy.visit(
        '/investigations?priority=low&status=new&status=workInProgress' +
          '&timeframe[start]=2019-11-06&timeframe[type]=LAST_24H'
      );
      cy.get('[data-cy=filterContainer]').snapshot({ name: 'correct filters selected' });
      cy.checkSchema('@filteredStream', 'GET.web.v1.api.investigations', (filteredStream) => {
        const now = moment();
        const correctTimeframe = filteredStream.items.every((item) => {
          const timeOfUpdate = moment(item.timeOfUpdate);
          return timeOfUpdate.isBefore(now) && timeOfUpdate.isAfter(moment('2019-11-06').subtract(24, 'hours'));
        });
        const correctStatus = filteredStream.items.every(
          (item) => item.status === 'New' || item.status === 'Work In Progress'
        );
        const correctPriority = filteredStream.items.every((item) => item.priority === 'low');
        expect(
          correctTimeframe && correctPriority && correctStatus,
          'recived items are (New or Work In Progress) and low priority and updated in the last24H'
        ).to.equal(true);
      });
    });

    it('all filters at once', () => {
      cy.route(
        investigationsURL({
          priority: priorityFilters.map((x) => x.queryParameter),
          status: statusFilters.map((x) => x.queryParameter),
          timeframe: '"start":"2019-11-06","type":"LAST_24H"'
        }),
        'fixture:investigationStream/default.json'
      ).as('allFilters');

      cy.visit(
        `/investigations?priority=${priorityFilters
          .map((x) => x.queryParameter)
          .join('&priority=')}&status=${statusFilters
          .map((x) => x.queryParameter)
          .join('&status=')}&timeframe[start]=2019-11-06&timeframe[type]=LAST_24H`
      );

      cy.get('[data-cy=filterContainer]').snapshot({ name: 'all filter selected' });
      cy.wait('@allFilters');
    });

    it('only one timeframe filter can be seleced', () => {
      cy.route(
        investigationsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_24H"`, isRegex: true } }),
        'fixture:investigationStream/default.json'
      );
      cy.route(
        investigationsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_7D"`, isRegex: true } }),
        'fixture:investigationStream/default.json'
      );
      cy.route(
        investigationsURL({ timeframe: { qs: `"start":"${dateRegex}","type":"LAST_3M"`, isRegex: true } }),
        'fixture:investigationStream/default.json'
      ).as('LAST_3M');

      cy.visit('/investigations');
      timeframeFilters.forEach((filter) => {
        cy.contains(filter.buttonName).click();
      });

      cy.get('[data-cy=filterContainer]').snapshot({ name: 'only last timeframe filter selected' });
      cy.wait('@LAST_3M');
    });

    context('Mobile', () => {
      beforeEach(() => {
        cy.viewport('iphone-6');
      });

      it('filter menu', () => {
        cy.visit('/investigations');
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
        cy.get('[data-cy=toggleFiltersButton]').click();
        cy.get('[data-cy=filterContainer]').snapshot({ name: 'filter menu open' });
        cy.contains('OK').click();
        cy.get('[data-cy=filterContainer]').should('not.be.visible');
      });

      it('priority filters', () => {
        priorityFilters.forEach((filter) => {
          cy.route(
            investigationsURL({ priority: filter.queryParameter }),
            'fixture:investigationStream/default.json'
          ).as(filter.buttonName);
          cy.visit('/investigations');
          cy.wait('@investigations');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} no filter selected` });
          cy.contains('OK').click();
          cy.wait('@investigations');
        });
      });

      it('status filters', () => {
        statusFilters.forEach((filter) => {
          cy.route(investigationsURL({ status: filter.queryParameter }), 'fixture:investigationStream/default.json').as(
            filter.buttonName
          );
          cy.visit('/investigations');
          cy.wait('@investigations');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} no filter selected` });
          cy.contains('OK').click();
          cy.wait('@investigations');
        });
      });

      it('timeframe filters', () => {
        timeframeFilters.forEach((filter) => {
          cy.route(
            investigationsURL({
              timeframe: { qs: `"start":"${dateRegex}","type":"${filter.queryParameter}"`, isRegex: true }
            }),
            'fixture:investigationStream/default.json'
          ).as(filter.buttonName);
          cy.visit('/investigations');
          cy.wait('@investigations');
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter selected` });
          cy.contains('OK').click();
          cy.wait(`@${filter.buttonName}`);
          cy.get('[data-cy=toggleFiltersButton]').click();
          cy.contains(filter.buttonName).click();
          cy.get('[data-cy=filterContainer]').snapshot({ name: `${filter.buttonName} filter un-selected` });
          cy.contains('OK').click();
          cy.wait('@investigations');
        });
      });
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('enter and space keys', () => {
      ['stream', 'investigations', 'requests'].forEach((stream) => {
        cy.visit(`/${stream}`);

        cy.get('[data-cy=toggleFiltersButton]').type('{enter}');
        cy.get('[data-cy=filterContainer]').should('be.visible');

        cy.contains('OK').type('{enter}', { force: true });
        cy.get('[data-cy=filterContainer]').should('not.be.visible');

        cy.get('[data-cy=toggleFiltersButton]').type(' ');
        cy.get('[data-cy=filterContainer]').should('be.visible');
      });
    });
  });
});
