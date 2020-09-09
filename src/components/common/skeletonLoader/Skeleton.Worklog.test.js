'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import { SkeletonWorklog } from './Skeleton';

describe('<Skeleton.Worklog />', () => {
  let component = shallow(<SkeletonWorklog />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  component = shallow(<SkeletonWorklog loading />);
  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
});
