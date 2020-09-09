'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { toggleFilters } from '../../../../../actions/filters';

import { ToggleFiltersButton } from './ToggleFiltersButton';

jest.mock('../../../../../actions/filters', () => ({
  toggleFilters: jest.fn().mockImplementation(() => (
    { type: 'test' }))
}));

describe('<ToggleFiltersButton />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ToggleFiltersButton type="test" dispatch={jest.fn()} />);
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('toggle open mobile filter menu on click', () => {
    const toggleBtn = component.find('button');
    toggleBtn.simulate('click');
    expect(toggleFilters).toHaveBeenCalled();
  });
});
