'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { AlertCon } from './AlertCon';

describe('<AlertCon />', () => {
  const component = shallow(
    <AlertCon
      level="LEVEL_1"
      dispatch={jest.fn()}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the level as child of span', () => {
    expect(component.find('.level').text()).toBe('1');
  });

  it('renders the label text', () => {
    expect(component.find('.alertcon__label').text()).toBe('AlertCon');
  });

  it('assigns a className based on level prop', () => {
    expect(component.find('.level').prop('className')).toEqual(expect.stringContaining('level1'));
  });
});
