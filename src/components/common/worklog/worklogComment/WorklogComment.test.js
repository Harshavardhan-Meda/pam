'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import mocks from '../../../../mocks/worklogMockData';
import WorklogComment from './WorklogComment';

const mock = mocks[0];

describe('<WorklogComment />', () => {
  const preventDefault = jest.fn();
  const addComment = jest.fn().mockImplementation(() => ({ type: 'test' }));

  let handleSubmit;
  let onEnterPress;

  const initialState = {
    user: {},
    status: ''
  };
  const user = 'abc';
  const status = 'abc';
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let component;

  beforeEach(() => {
    component = shallow(
      <WorklogComment
        id={mock.id}
        item={mock}
        store={store}
        user={user}
        status={status}
        addComment={addComment}
        dispatch={jest.fn()}
      />
    ).dive();
    handleSubmit = jest.spyOn(component.instance(), 'handleSubmit');
    onEnterPress = jest.spyOn(component.instance(), 'onEnterPress');
    store.clearActions();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('does not render comment header initially', () => {
    expect(component.find('.comment-header').exists()).toBeFalsy();
  });

  it('renders comment header when status is Pending', () => {
    component.setProps({ status: 'Pending' });
    expect(component.find('.comment-header').exists()).toBeTruthy();
  });

  it('disabled submit button when textarea is empty', () => {
    expect(component.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it("doesn't disabled submit button when textarea is not empty", () => {
    component.find('textarea').simulate('change', { target: { value: 'My new value' } });
    expect(component.find('button[type="submit"]').props().disabled).toBe(false);
  });

  it('resets textarea value on handleSubmit', () => {
    component.find('textarea').simulate('change', { preventDefault, target: { value: 'My new value' } });
    expect(component.state().value).toEqual('My new value');
    component.find('form').simulate('submit', { preventDefault });
    expect(component.state().value).toEqual('');
  });

  it('disables submit button when status is closed', () => {
    component.find('textarea').simulate('change', { preventDefault, target: { value: 'My new value' } });
    component.setProps({ status: 'Closed' });
    expect(component.find('button[type="submit"]').props().disabled).toBe(true);
  });

  it('doesnt allow for adding comments to closed ticket', () => {
    component.setProps({ status: 'Closed' });
    component.find('textarea').simulate('change', { preventDefault, target: { value: 'My new value' } });
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13 });
    expect(onEnterPress).toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });

  it('does not disable submit button when status is different than closed', () => {
    component.find('textarea').simulate('change', { preventDefault, target: { value: 'My new value' } });
    component.setProps({ status: 'NOT close' });
    expect(component.find('button[type="submit"]').props().disabled).toBe(false);
  });

  it('disables close button when status is closed', () => {
    component.setProps({ status: 'Closed' });
    expect(component.find('button[type="button"]').props().disabled).toBe(true);
  });

  it('does not disable close button when status is different than closed', () => {
    component.setProps({ status: 'NOT close' });
    expect(component.find('button[type="button"]').props().disabled).toBe(false);
  });

  /**
   * Children components are immutable in Enzyme v3, we need to find() again to see changes reflected
   * @see https://github.com/airbnb/enzyme/issues/1221#issuecomment-334953909
   */
  it('disabled close button after clicking on it', () => {
    const closeButton = component.find('button[type="button"]');
    expect(closeButton.props().disabled).toBe(false);
    closeButton.simulate('click');
    expect(component.find('button[type="button"]').props().disabled).toBe(true);
  });

  it('calls handleTicketClose on button click', () => {
    const button = component.find('button[type="button"]');
    button.simulate('click');
    expect(addComment).toBeCalledWith(mock.id, 'Please close this ticket.');
  });

  it('calls handleSubmit with entered comment', () => {
    component.find('textarea').simulate('change', { target: { value: 'test comment' } });
    component.find('form').simulate('submit', { preventDefault });
    expect(handleSubmit).toHaveBeenCalled();
    expect(addComment).toHaveBeenCalled();
  });

  it('does not call handleSubmit when there is no value', () => {
    component.find('button[type="submit"]').simulate('click');
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });

  it('calls onEnterPress when pressing enter with entered comment', () => {
    component.find('textarea').simulate('change', { target: { value: 'test comment' } });
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13 });
    expect(onEnterPress).toHaveBeenCalled();
    expect(addComment).toHaveBeenCalled();
  });

  it('does not call onEnterPress when pressing enter without entered comment', () => {
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13 });
    expect(onEnterPress).not.toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });

  it('calls handleSubmit when pressing enter with entered comment without shift', () => {
    component.find('textarea').simulate('change', { target: { value: 'test comment' } });
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13, shiftKey: false });
    expect(handleSubmit).toHaveBeenCalled();
    expect(addComment).toHaveBeenCalled();
  });

  it('does not call handleSubmit when pressing key different then enter with entered comment', () => {
    component.find('textarea').simulate('change', { target: { value: 'test comment' } });
    component.find('textarea').simulate('keydown', { keyCode: 10 });
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });

  it('does not invoke handleSubmit and preventDefault on Enter key with Shift', () => {
    component.find('textarea').simulate('change', { target: { value: 'test comment' } });
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13, shiftKey: true });
    expect(preventDefault).not.toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });

  it('does not add blank comments', () => {
    component.find('textarea').simulate('change', { target: { value: '   \n \n  ' } });
    component.find('button[type="submit"]').simulate('click');
    component.find('textarea').simulate('keydown', { preventDefault, keyCode: 13 });
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(addComment).not.toHaveBeenCalled();
  });
});
