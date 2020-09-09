'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { Root } from './Root';
import DemoBanner from '../common/demoAlert/DemoBanner';

describe('<Root />', () => {
  const profile = { profile: { profile: { customerName: 'QA Customer' } } };
  const mockLocation = { pathname: '/stream' };
  const component = shallow(
    <Root
      customerName={profile.profile.profile.customerName}
      location={mockLocation}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders its children', () => {
    expect(component.children()).toHaveLength(1);
  });

  it('hides demo banner if customer name is given and on Security Stream Screen', () => {
    expect(component.find(DemoBanner)).toHaveLength(0);
  });

  it('hides demo banner if customer name is given and on Security Stream Screen', () => {
    expect(component.find(DemoBanner)).toHaveLength(0);
  });

  it('shows demo banner if customer name is NOT given and NOT on Security Stream Screen', () => {
    component.setProps({ location: { pathname: '/notstream' } });
    component.setProps({ customerName: '' });
    expect(component.find(DemoBanner)).toHaveLength(1);
  });
});
