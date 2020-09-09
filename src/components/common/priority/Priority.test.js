'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import Priority from './Priority';

describe('<Priority />', () => {
  const component = shallow(<Priority priority="high" className="bar"><div>foo</div></Priority>);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders \'high\' priority given by props', () => {
    expect(component.prop('className')).toEqual(expect.stringContaining('priority-high'));
  });

  it('defaults to \'none\' priority', () => {
    const nonePriority = shallow(<Priority><div>foo</div></Priority>);
    expect(nonePriority.prop('className')).toEqual(expect.stringContaining('priority-none'));
  });

  it('renders its children', () => {
    expect(component.children().length).toBe(1);
    expect(component.text()).toBe('foo');
  });

  it('assigns a className from props', () => {
    expect(component.prop('className')).toEqual(expect.stringContaining('bar'));
  });
});
