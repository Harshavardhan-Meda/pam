'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import Status from './Status';

describe('<Status />', () => {
  const lastUpdateProp = 'Updated 3 days ago';
  let component = shallow(<Status status="Pending" lastUpdate={lastUpdateProp} />);

  it('renders the status with a flag icon if status is Pending', () => {
    expect(component.find('.flag').exists()).toBe(true);
  });

  it('renders \'Your action Required\' if status is pending', () => {
    expect(component.find('.status').text()).toEqual('Your Action Required');
  });

  it('renders the status without a flag icon if status is not \'Pending\'', () => {
    component = shallow(<Status status="New" lastUpdate={lastUpdateProp} />);
    expect(component.find('.flag').exists()).toBe(false);
  });

  it('renders the status if status is not \'Pending\'', () => {
    expect(component.find('.status').text()).toEqual('New');
  });

  it('renders the lastUpdate time', () => {
    expect(component.find('.lastUpdate').text()).toEqual(lastUpdateProp);
  });

  it('assigns a className to container div based on props', () => {
    component = shallow(<Status status="New" lastUpdate={lastUpdateProp} className="test" />);
    expect(component.find('.statusContainer').prop('className')).toEqual(expect.stringContaining('test'));
  });
});
