'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import mocks from '../../../mocks/requestsMocksData';
import Evidence from './Evidence';

const mock = mocks[0];

describe('<Evidence />', () => {
  let component;

  beforeEach(() => { component = shallow(<Evidence leaf={mock} />); });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders two CollapsiblePanels', () => {
    expect(component.find('CollapsiblePanel')).toHaveLength(2);
  });

  it('renders a CollapsiblePanel with Description label', () => {
    expect(component.find('CollapsiblePanel').first().prop('label')).toBe('Description');
  });

  it('initializes Description panel collapsed state to false', () => {
    expect(component.find('CollapsiblePanel').first().prop('collapsed')).toBe(false);
  });

  it('renders a CollapsiblePanel with Devices label', () => {
    expect(component.find('CollapsiblePanel').at(1).prop('label')).toBe('Devices');
  });

  it('renders device count on Devices panel', () => {
    expect(component.find('CollapsiblePanel').at(1).prop('itemCount')).toBe(1);
  });

  it('renders 0 as item count if there are no devices', () => {
    const leaf = { description: 'testing' };
    component = shallow(<Evidence leaf={leaf} />);
    expect(component.find('CollapsiblePanel').at(1).prop('itemCount')).toBe(0);
  });

  it('renders device name', () => {
    expect(component.find('CollapsiblePanel').at(1).children().text()).toBe(mock.devices[0].name);
  });

  it('renders with devices being an empty array', () => {
    const leaf = { description: 'testing', devices: [] };
    component = shallow(<Evidence leaf={leaf} />);
    expect(component.exists()).toBe(true);
  });

  it('renders with devices being undefined', () => {
    const leaf = { description: 'testing' };
    component = shallow(<Evidence leaf={leaf} />);
    expect(component.find('CollapsiblePanel').at(1).prop('itemCount')).toBe(0);
  });
});
