import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { getProfile } from './actions/profile';
import AuthenticatedApp from './AuthenticatedApp';

jest.mock('./actions/profile', () => ({ getProfile: jest.fn().mockImplementation(() => ({ type: 'FAKE_TYPE' })) }));

describe('<AuthenticatedApp />', () => {
  const mockStore = configureStore();
  const store = mockStore({});

  const component = shallow(
    <AuthenticatedApp
      store={store}
      dispatch={jest.fn()}
    />).dive();

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('dispatches getProfile method on mount', () => {
    expect(getProfile).toHaveBeenCalledTimes(1);
  });
});
