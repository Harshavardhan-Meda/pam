'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import TicketCreation from './TicketCreation';

describe('<TicketCreation />', () => {
  const mockLocation = { search: '?type=request' };
  const component = shallow(
    <TicketCreation
      location={mockLocation}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
});
