import React from 'react';
import { shallow } from 'enzyme';
import LoginApp from './LoginApp';

describe('<LoginApp />', () => {
  const component = shallow(<LoginApp />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders correct class', () => {
    expect(component.find('.login-container').exists()).toBe(true);
  });

  it('renders LoginContent', () => {
    expect(component.find('LoginContent').exists()).toBe(true);
  });
});
