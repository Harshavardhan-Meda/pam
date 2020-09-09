import { shallow } from 'enzyme';
import React from 'react';
import { LoginForm } from './LoginForm';

describe('<LoginForm />', () => {
  const level = 'LEVEL_1';
  const ibmIdLink = 'https://www.ibm.com/account/us-en/signup/register.html?a=ZGNlNzQwZmQtYTI3My00';

  const component = shallow(<LoginForm level={level} />);

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the title', () => {
    expect(component.find('.title').exists()).toBe(true);
    expect(component.find('.title').text()).toBe('IBM Security Services');
  });

  it('renders a link without PUBLIC_URL', () => {
    expect(component.find('a').exists()).toBe(true);
    expect(component.find('a').prop('href')).toBe('/api/login');
  });

  it('renders a link with PUBLIC_URL', () => {
    process.env.PUBLIC_URL = '/test';
    const withUrl = shallow(<LoginForm level={level} />);
    expect(withUrl.find('a').prop('href')).toBe('/test/api/login');
  });

  it('renders a button with className ', () => {
    expect(component.find('[type="button"]').prop('className')).toBe('button');
  });

  it('renders the link to IBM ID registration ', () => {
    expect(component.find('Link').exists()).toBe(true);
    expect(component.find('Link').prop('href')).toBe(ibmIdLink);
  });

  it('disables login button after clicking ', () => {
    expect(component.find('[type="button"]').prop('disabled')).toBe(false);
    expect(component.find('[type="button"]').simulate('click'));
    expect(component.find('[type="button"]').prop('disabled')).toBe(true);
  });
});
