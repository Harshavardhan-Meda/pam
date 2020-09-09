'use strict';

import { mount, shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { hideBanner, showBanner } from '../../../actions/preferences';
import { ConnectedPortalBanner, PortalBanner } from './PortalBanner';

jest.mock('../../../actions/preferences', () => ({
    hideBanner: jest.fn().mockImplementation(() => ({ type: 'HIDE_BANNER' })),
    showBanner: jest.fn().mockImplementation(() => ({ type: 'SHOW_BANNER' }))
  })
);

describe('<PortalBanner />', () => {
  let component;
  const push = jest.fn();
  const mockLocation = {};
  const mockHistory = { push };
  const dispatch = jest.fn();
  const preferences = {};
  const firstName = 'John';
  const profile = { profile: firstName };
  const initialState = {
    preferences,
    profile
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    component = mount(<ConnectedPortalBanner
      store={store}
      dispatch={dispatch}
      location={mockLocation}
      history={mockHistory}
    />);
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('does not call showBanner if origin != portal', () => {
    expect(showBanner).not.toHaveBeenCalled();
  });

  it('does not call showBanner if origin=portal && isBannerVisible', () => {
    component = mount(<ConnectedPortalBanner
      dispatch={dispatch}
      history={mockHistory}
      store={mockStore({ preferences: { isBannerVisible: true }, profile })}
      location={{ location: { search: '?origin=portal' } }}
    />);
    expect(showBanner).not.toHaveBeenCalled();
  });

  it('calls showBanner if banner not visible and origin=portal', () => {
    component.setProps({ location: { search: '?origin=portal' } });
    expect(showBanner).toHaveBeenCalled();
  });

  it('hides the banner when closeBanner is invoked', () => {
    component = shallow(<PortalBanner
      dispatch={dispatch}
      location={mockLocation}
      history={mockHistory}
      preferences
      profile
    />);
    component.instance().closeBanner();
    expect(hideBanner).toHaveBeenCalledTimes(1);
  });
});
