import { mount } from 'enzyme';
import React from 'react';
import mocks from '../../../mocks/worklogMockData';
import Worklog from './Worklog';

jest.mock('./worklogComment/WorklogComment', () => () => <div />);

describe('<Worklog />', () => {
  // noinspection JSUnusedGlobalSymbols
  /**
   * scrollIntoView is not implemented in jsdom
   * @see https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
   */
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  let component;
  beforeEach(() => {
    component = mount(<Worklog items={mocks} />, { lifecycleExperimental: true });
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders n amount of WorklogItems', () => {
    expect(component.find('WorklogItem')).toHaveLength(mocks.length);
  });

  it('has element with worklog class', () => {
    expect(component.find('.worklog')).toBeDefined();
  });

  it('changes the isCollapsed state to false on "previous items" click', () => {
    component.find('.prev').simulate('click');
    expect(component.state().isCollapsed).toEqual(false);
  });

  it('changes the isCollapsed state to false on enter click', () => {
    component.find('.prev').simulate('keydown', { keyCode: 13 });
    expect(component.state().isCollapsed).toEqual(false);
  });

  it('changes the isCollapsed state to false on space click', () => {
    component.find('.prev').simulate('keydown', { keyCode: 32 });
    expect(component.state().isCollapsed).toEqual(false);
  });

  it('does not change the isCollapsed state to false when click different key than space or enter', () => {
    component.setState({ isCollapsed: true });
    component.find('.prev').simulate('keydown', { keyCode: 10 });
    expect(component.state().isCollapsed).toEqual(true);
  });

  it('renders when worklog items not provided', () => {
    const withoutItems = mount(<Worklog />);
    expect(withoutItems.find('.worklog').children()).toHaveLength(0);
  });

  it('calls scrollToBottom on ComponentDidMount', () => {
    component.instance().scrollToBottom = jest.fn();
    const { scrollToBottom } = component.instance();
    component.instance().componentDidMount();
    expect(scrollToBottom).toHaveBeenCalled();
  });

  it('calls scrollToBottomm when updating the component - ComponentDidUpdate', () => {
    component.instance().scrollToBottom = jest.fn();
    const { scrollToBottom } = component.instance();
    component.setProps({
      items: [{
        user: 'qatest',
        lastUpdate: '15 days ago',
        text: 'Automation - 06/28/2018 - PLEASE DO NOT CLOSE THIS TICKET.'
      }]
    });
    expect(scrollToBottom).toHaveBeenCalled();
  });
});
