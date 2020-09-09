import { mount } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Menu from './Menu';

describe('<Menu />', () => {
  const initialState = {
    profile: {
      profile: {
        firstName: 'MockFirstName',
        lastName: 'MockLastName',
        email: 'MockEmail',
        customerContactId: 'MockCustomerContactId'
      }
    },
    preferences: { isBannerVisible: false }
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const shellDiv = document.createElement('div');
  shellDiv.className = 'security--shell';
  document.body.appendChild(shellDiv);

  it('renders', () => {
    const component = mount(<Menu store={store} displayDemoBanner={false} />);
    expect(component.exists()).toBe(true);
  });

  it('adds visible banner class to shell when displayDemoBanner = false', () => {
    mount(<Menu store={store} displayDemoBanner />);
    expect(document.querySelector('.security--shell').classList.contains('security--shell--banner-visible')).toBe(true);
  });

  it('adds visible banner class to shell when banner is visible', () => {
    const bannerVisibleInitialState = JSON.parse(JSON.stringify(initialState));
    bannerVisibleInitialState.preferences.isBannerVisible = true;
    const bannerVisibleStore = mockStore(bannerVisibleInitialState);
    mount(<Menu store={bannerVisibleStore} isBannerVisible />);
    expect(document.querySelector('.security--shell').classList.contains('security--shell--banner-visible')).toBe(true);
  });

  it('doesnt add visible banner class to shell when displayDemoBanner = false', () => {
    mount(<Menu store={store} displayDemoBanner={false} />);
    expect(document.querySelector('.security--shell').classList.contains('security--shell--banner-visible')).toBe(
      false
    );
  });

  it('doesnt add visible banner class to shell when banner is not visible', () => {
    mount(<Menu store={store} />);
    expect(document.querySelector('.security--shell').classList.contains('security--shell--banner-visible')).toBe(
      false
    );
  });
});
