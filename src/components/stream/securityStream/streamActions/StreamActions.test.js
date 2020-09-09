'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import StreamActions from './StreamActions';
import { ReactComponent as ImageShare } from '../../../../assets/common/share_blue_16.svg';

describe('<StreamActions />', () => {
  const title = 'Stream Actions';
  let component;

  beforeEach(() => {
    component = shallow(<StreamActions title={title} components={[<p />, <p />]} />);
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the share Button', () => {
    expect(component.find('.share').exists()).toBe(true);
  });

  it('invokes toggleShareOptions on share button click', () => {
    const toggleShareOptions = jest.spyOn(component.instance(), 'toggleShareOptions');
    component.find('.share').simulate('click');
    expect(toggleShareOptions).toBeCalled();
  });

  it('initializes the collapsed state to true', () => {
    expect(component.state().collapsed).toBe(true);
  });

  it('changes collapsed state to false on click', () => {
    component.find('.share').simulate('click');
    expect(component.state().collapsed).toEqual(false);
  });

  it('assigns \'active\' className if collapsed', () => {
    expect(component.find('.share').prop('className')).not.toEqual(expect.stringContaining('active'));
  });

  it('does not assign \'active\' class if expanded', () => {
    component.find('.share').simulate('click');
    expect(component.find('.share').prop('className')).toEqual(expect.stringContaining('active'));
  });

  it('renders the share svg icon on a button', () => {
    expect(component.find('.share').children().first().type()).toEqual(ImageShare);
  });

  it('renders components given by props', () => {
    component.find('.share').simulate('click');
    expect(component.find('.options [type="button"]')).toHaveLength(2);
  });

  it('collapses the component on child component click', () => {
    component.find('.share').simulate('click');
    component.find('.options [type="button"]').first().simulate('click');
    expect(component.state().collapsed).toEqual(true);
  });
});
