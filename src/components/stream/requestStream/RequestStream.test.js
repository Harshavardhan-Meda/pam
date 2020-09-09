/* eslint-disable react/forbid-prop-types */

'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { getRequests } from '../../../actions/requests';
import filtersMocks from '../../../mocks/filtersMockData';
import requestsMocks from '../../../mocks/requestsMocksData';
import { RequestStream } from './RequestStream';

jest.mock('../../../actions/requests', () => (
  { getRequests: jest.fn().mockImplementation(() => ({ type: 'test' })) })
);

describe('<RequestStream />', () => {
  const component = shallow(
    <RequestStream
      items={requestsMocks}
      hasMore
      newPost={false}
      offset={requestsMocks.length}
      filters={{ filtersMocks }}
      dispatch={jest.fn()}
      filtersOpen
      isFetching={false}
      isInfiniteScroll={false}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls getRequests action upon calling fetchMoreData', () => {
    component.instance().fetchMoreData(filtersMocks, true, 5);
    expect(getRequests).toHaveBeenCalledWith(filtersMocks, true, 5);
  });

  it('has a role and aria label for accessibility', () => {
    expect(component.find('.request-stream').prop('role')).toBe('main');
  });
});
