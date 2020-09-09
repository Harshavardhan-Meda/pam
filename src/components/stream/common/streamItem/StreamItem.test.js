'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import mocks from '../../../../mocks/investigationsMockData';
import StreamItem from './StreamItem';

const leaf = mocks[0];

describe('<StreamItem />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<StreamItem redirectTo={`investigations/${leaf.id}`} item={leaf} />);
  });
  it('renders item by given prop', () => {
    expect(component.find('h2').text()).toEqual(`${leaf.title} - ${leaf.subtitle}`);
    expect(component.find('Status').exists()).toBe(true);
  });

  it('renders the full first worklog', () => {
    const worklog = leaf.worklog[0];
    const expected = `${leaf.worklog.length} Comments, last by ${worklog.user}: ${worklog.text}`;
    expect(component.find('MediaQuery').render().text()).toEqual(expected);
  });

  it('renders the mobile sized worklog', () => {
    window.testMediaQueryValues = { width: 500 };
    const worklog = leaf.worklog[0];
    component = shallow(<StreamItem redirectTo={`investigations/${leaf.id}`} item={leaf} />);
    const expected = `${leaf.worklog.length} Comments, last by ${worklog.user}: ${worklog.text}`;
    expect(component.find('MediaQuery').render().text()).toEqual(expected);
  });
});
