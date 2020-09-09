'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { SecurityAnnouncement } from './SecurityAnnouncement';

describe('<SecurityAnnouncement />', () => {
  const message = 'test-msg';
  const detailedDescription = 'test-detailed-description';

  const component = shallow(
    <SecurityAnnouncement
      message={message}
      detailedDescription={detailedDescription}
      dispatch={jest.fn()}
    />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
    expect(component.prop('className')).toEqual('security-announcement');
  });

  it('renders the title', () => {
    expect(component.text()).toEqual('Security Announcement');
  });

  it('renders the description span ', () => {
    expect(component.find('span').exists()).toBe(true);
    expect(component.find('span').prop('className')).toBe('description');
  });

  it('renders the detailedDescription if its present', () => {
    expect(component.find('span').render().text()).toBe(detailedDescription);
  });

  it('renders the message if detailedDescription is not present', () => {
    const componentWithoutDetailedDescription = shallow(
      <SecurityAnnouncement
        message={message}
        dispatch={jest.fn()}
      />);
    expect(componentWithoutDetailedDescription.find('span').render().text()).toBe(message);
  });
});
