'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import mocks from '../../../mocks/requestsMocksData';
import { LeafDetails } from './LeafDetails';

const mock = mocks[0];

describe('<LeafDetails />', () => {
  const mockfunc = jest.fn();
  const component = shallow(
    <LeafDetails
      history={{}}
      leaf={mock}
      getItemById={mockfunc}
      match={{ params: { id: '1' } }}
      dispatch={jest.fn()}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('render a DetailedHeader', () => {
    expect(component.find('DetailedHeader').exists()).toBe(true);
  });

  it('renders the first tab with title', () => {
    expect(component.find('Tab').first().prop('label')).toBe(`Timeline (${mock.worklog.length})`);
  });

  it('renders the second tab with title', () => {
    expect(component.find('Tab').at(1).prop('label')).toBe('Details (2)');
  });
});
