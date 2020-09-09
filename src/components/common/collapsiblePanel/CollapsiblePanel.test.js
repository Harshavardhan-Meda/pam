'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import ReactPiwik from 'react-piwik';
import { ReactComponent as DownArrow } from '../../../assets/common/down_arrow_16.svg';
import { ReactComponent as UpArrow } from '../../../assets/common/up_arrow_16.svg';
import CollapsiblePanel from './CollapsiblePanel';

jest.mock('react-piwik');

describe('<CollapsiblePanel />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <CollapsiblePanel label="Description" itemCount={3}>
        <div className="foo" />
      </CollapsiblePanel>
    );
  });

  it('renders the title given by props', () => {
    expect(component.find('span').first().text()).toEqual('Description');
  });

  it('renders the amount amount of items in the title', () => {
    expect(component.find('span').last(1).text()).toEqual(expect.stringContaining('(3)'));
  });

  it('initializes the collapsed state to true', () => {
    expect(component.state('collapsed')).toEqual(true);
  });

  it('does not render children if collapsed', () => {
    expect(component.find('.foo').exists()).toBe(false);
  });

  it('changes the collapsed state to false on title click', () => {
    component.find('.title').simulate('click');
    expect(component.state('collapsed')).toEqual(false);
  });

  it('does not render items div with children when collapsed', () => {
    expect(component.find('.items').exists()).toBe(false);
  });

  it('render items div with children when expanded', () => {
    component.find('.title').simulate('click');
    expect(component.find('.items').exists()).toBe(true);
  });

  it('renders its children on title click', () => {
    component.find('.title').simulate('click');
    expect(component.find('.foo').exists()).toBe(true);
  });

  it('initializes collapsed state with a prop', () => {
    component = shallow(<CollapsiblePanel label="Description" collapsed={false} />);
    expect(component.state('collapsed')).toEqual(false);
  });

  it('invokes handleCollapse on title click', () => {
    const handleCollapse = jest.spyOn(component.instance(), 'handleCollapse');
    component.find('.title').simulate('click');
    expect(handleCollapse).toBeCalled();
  });

  it('has aria label on collapse title', () => {
    expect(component.find('.title').prop('aria-expanded')).toBeDefined();
  });

  it('assigns false property to aria-expanded when collapsed', () => {
    expect(component.find('.title').prop('aria-expanded')).toBe(false);
  });

  it('assigns true property to aria-expanded when collapsed', () => {
    component.find('.title').simulate('click');
    expect(component.find('.title').prop('aria-expanded')).toBe(true);
  });

  it('renders DownArrow when collapsed', () => {
    expect(component.find('.collapse-arrow').childAt(0).type()).toBe(DownArrow);
  });

  it('renders UpArrow when expanded', () => {
    component.find('.title').simulate('click');
    expect(component.find('.collapse-arrow').childAt(0).type()).toBe(UpArrow);
  });

  it('tracks Piwik events', () => {
    component = shallow(<CollapsiblePanel label="Description" piwikCategory="Foo" />);

    component.find('.title').simulate('click');
    expect(ReactPiwik.push).toHaveBeenNthCalledWith(1,
      ['trackEvent', 'Foo', 'expanded', 'Description section was expanded']);

    component.find('.title').simulate('click');
    expect(ReactPiwik.push).toHaveBeenNthCalledWith(2,
      ['trackEvent', 'Foo', 'collapsed', 'Description section was collapsed']);
  });
});
