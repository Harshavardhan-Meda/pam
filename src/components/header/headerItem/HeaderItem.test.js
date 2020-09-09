'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import HeaderItem from './HeaderItem';

describe('<HeaderItem />', () => {
  const component = shallow(<HeaderItem text="foobar" to="/foobar" />);

  it('renders', () => {
    expect(component.find('.header-item').exists()).toBe(true);
    expect(component.find(NavLink)).toHaveLength(1);
  });

  it('assigns \'to\' prop to NavLink', () => {
    expect(component.find(NavLink).prop('to')).toEqual('/foobar');
  });
});
