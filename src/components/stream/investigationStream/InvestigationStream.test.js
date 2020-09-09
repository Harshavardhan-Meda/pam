'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { getInvestigations } from '../../../actions/investigations';
import filtersMocks from '../../../mocks/filtersMockData';
import investigationMocks from '../../../mocks/investigationsMockData';
import { InvestigationStream } from './InvestigationStream';

jest.mock('../../../actions/investigations', () => ({
  getInvestigations: jest.fn().mockImplementation(() => ({ type: 'test' }))
}));
describe('<InvestigationStream />', () => {
  const component = shallow(
    <InvestigationStream
      items={investigationMocks}
      hasMore
      newPost={false}
      offset={investigationMocks.length}
      filters={{ filtersMocks }}
      dispatch={jest.fn()}
      filtersOpen
      isFetching={false}
      isInfiniteScroll={false}
    />
  );

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls getInvestigations action upon calling fetchMoreData', () => {
    component.instance().fetchMoreData(filtersMocks, true, 5);
    expect(getInvestigations).toHaveBeenCalledWith(filtersMocks, true, 5);
  });

  it('has a role and aria label for accessibility', () => {
    expect(component.find('.investigation-stream').prop('role')).toBe('main');
  });
});
