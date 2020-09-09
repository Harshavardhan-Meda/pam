'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import Type from './Type';

const mockData = {
  title: 'mock title',
  description: 'mock description',
  url: 'www.some-mock-url.com'
};

describe('<Type />', () => {
  const component = shallow(
    <Type
      title={mockData.title}
      description={mockData.description}
      url={mockData.url}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('assigns \'title\' prop to header', () => {
    expect(component.find('h3').text()).toEqual(mockData.title);
  });

  it('assigns \'description\' prop to span', () => {
    expect(component.find('.type-description').text()).toEqual(mockData.description);
  });

  it('assigns \'url\' prop to link', () => {
    expect(component.find('.type').at(0).props().href).toEqual(mockData.url);
  });
});
