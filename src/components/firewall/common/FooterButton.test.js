'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import FooterButton from './FooterButton';

const mockData = {
  value: 'mock value',
  margin: { marginLeft: '100px' }

};

describe('<FooterButton />', () => {
  const component = shallow(
    <FooterButton
      value={mockData.value}
      margin={mockData.margin}

    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
});
