'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import RequestMethod from './RequestMethod';

describe('<RequestMethod />', () => {
  const component = shallow(
    <RequestMethod />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
  const header = <h3>Choose Request Method</h3>;
  expect(component.contains(header)).toEqual(true);

  it('Checks a input exist ', () => {
    expect(component.find('input[type="radio"]').exists());
  });

  it('Checks a radio button with value exist ', () => {
    expect(component.find('input[type="radio"]').at(0).prop('value')).toBe('1');
  });

  it('Checks a radio button with value exist ', () => {
    expect(component.find('input[type="radio"]').at(1).prop('value')).toBe('2');
  });
});
