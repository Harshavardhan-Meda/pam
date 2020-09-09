'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import SideBar from './SideBar';

describe('<SideBar />', () => {
  const component = shallow(
    <SideBar
      setPage={() => {}}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
  const header = <h3>Request Step</h3>;
  expect(component.contains(header)).toEqual(true);

  it('should a input exist ', () => {
    expect(component.find('input[type="radio"]').exists());
  });

  it('Checks a radio button with value exist ', () => {
    expect(component.find('input[type="radio"]').at(0).prop('value')).toBe('isFirst');
  });

  it('Checks a radio button with value exist ', () => {
    expect(component.find('input[type="radio"]').at(1).prop('value')).toBe('isNext');
  });

  it('Check onchange function', () => {
   const newValue = 1;
   const input = component.find('input[type="radio"]').at(0);
   input.simulate('change', { target: { value: newValue } });
  });
});
