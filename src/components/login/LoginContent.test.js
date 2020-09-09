import React from 'react';
import { shallow } from 'enzyme';
import LoginContent from './LoginContent';

describe('<LoginContent />', () => {
  const component = shallow(<LoginContent />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders correct class', () => {
    expect(component.find('.login-content').exists()).toBe(true);
  });

  it('renders CurrentTime', () => {
    expect(component.find('CurrentTime').exists()).toBe(true);
  });

  it('renders SecurityAnnouncement', () => {
    expect(component.find('CurrentTime').exists()).toBe(true);
  });
});
