'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { Text } from './Skeleton';

describe('<Skeleton.Text />', () => {
  let component = shallow(<Text />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  component = shallow(<Text loading />);
  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
});
