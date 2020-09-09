'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { getSecurityStream } from '../../../actions/securityStream';
import filtersMocks from '../../../mocks/filtersMockData';
import mocks from '../../../mocks/streamMockData';
import { SecurityStream } from './SecurityStream';

jest.mock('../../../actions/securityStream', () => (
  { getSecurityStream: jest.fn().mockImplementation(() => ({ type: 'test' })) })
);

describe('<SecurityStream />', () => {
  const component = shallow(
    <SecurityStream
      items={mocks.items}
      hasMore={mocks.hasMore}
      newPost={mocks.newPosts}
      offset={mocks.offset}
      filters={{ filtersMocks }}
      filtersOpen
      isFetching={false}
      isInfiniteScroll={false}
      dispatch={jest.fn()}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('calls getSecurityStream action upon calling fetchMoreData', () => {
    component.instance().fetchMoreData(filtersMocks, true, 5);
    expect(getSecurityStream).toHaveBeenCalledWith(filtersMocks, true, 5);
  });

  it('has a role and aria label for accessibility', () => {
    expect(component.find('.security-stream').prop('role')).toBe('main');
  });
});
