'use strict';

import { shallow } from 'enzyme';
import moment from 'moment/moment';
import React from 'react';
import SecurityStreamItem from './SecurityStreamItem';
import streamMocks from '../../../../mocks/streamMockData';

const item = streamMocks.items[0];

describe('<SecurityStreamItem />', () => {
  const component = shallow(<SecurityStreamItem item={item} />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the priority', () => {
    expect(component.find('Priority').exists()).toBe(true);
  });

  it('renders the title', () => {
    expect(component.find('h2').text()).toEqual(expect.stringContaining('NEWS'));
  });

  it('renders the time', () => {
    expect(component.find('time').text()).toBe(moment(item.date).fromNow());
  });

  it('renders the ItemContent', () => {
    expect(component.find('ItemContent').exists()).toBe(true);
  });

  it('renders the <StreamActions /> for copy url with child components', () => {
    const streamActions = component.find('StreamActions');
    expect(streamActions.prop('components')).toHaveLength(2);
  });

  it('renders the title in upper case separated by space given camelCase', () => {
    const camelCaseTitleItem = shallow(<SecurityStreamItem item={{ ...item, type: 'camelCase' }} />);
    expect(camelCaseTitleItem.find('h2').text()).toEqual(expect.stringContaining('CAMEL CASE'));
  });
});
