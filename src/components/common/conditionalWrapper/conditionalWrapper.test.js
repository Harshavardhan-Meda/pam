'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import ConditionalWrapper from './ConditionalWrapper';
import Priority from '../priority/Priority';
import FilterButton from '../../stream/common/filterContainer/filterButton/FilterButton';

describe('<ConditionalWrapper />', () => {
const child = (
  <FilterButton
    key="high"
    type="checkbox"
    isChecked={false}
    label="high"
    handleChange={jest.fn()}
  />
);
const component = shallow(<ConditionalWrapper
  condition
  wrapComponent={() => <Priority priority="high">{child}</Priority>}
/>);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });
  it('not render Priority when condition is false', () => {
    component.setProps({ condition: false });
    component.find('Priority').forEach((priority) => expect(priority).toBeNaN());
  });
  it('render Priority when condition is true', () => {
    component.setProps({ condition: true });
    component.find('Priority').forEach((priority) => expect(priority).toBeDefined());
  });
});
