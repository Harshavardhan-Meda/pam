'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import Firewall from './Firewall';

describe('<Firewall />', () => {
  const mockLocation = { search: '?type=request' };
  const component = shallow(
    <Firewall
      location={mockLocation}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
});
