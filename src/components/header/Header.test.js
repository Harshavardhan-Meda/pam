'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('<Header />', () => {
  const component = shallow(<Header
    firstName="MockFirstName"
    lastName="MockLastName"
    customerContactId="MockCustomerContactId"
    email="MockEmail"
  />);

  it('renders', () => {
    expect(component.find('.header').exists()).toBe(true);
    expect(component.find('.text').text()).toEqual('IBM Security Services');
  });

  it('has role and aria label for accessibility', () => {
    const headerItems = component.find('.header-items');
    expect(headerItems.prop('role')).toBe('navigation');
    expect(headerItems.prop('aria-label')).toBe('Top menu');
  });
});
