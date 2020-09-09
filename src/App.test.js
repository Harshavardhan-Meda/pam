import { shallow } from 'enzyme';
import React from 'react';
import App from './App';

describe('App', () => {
  let component;

  it('renders', () => {
    component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });

  it('renders in development NODE_ENV', () => {
    /*
    piwik looks for it's <script> tag in the DOM as it will inject another element,
    so our test environment needs to fake this script element in the jsdom

    https://github.com/joernroeder/piwik-react-router/issues/48
    */
    const elem = global.document.createElement('script');
    global.document.body.appendChild(elem);

    process.env.NODE_ENV = 'development';
    component = shallow(<App />, { attachTo: elem });
    expect(component.exists()).toBe(true);
  });

  it('renders investigation details route', () => {
    expect(component.find('Details').exists()).toEqual(false);
    const routes = component.find('Route');
    routes.forEach((route) => {
      if (route.getElement().props === '/investigations/:id') {
        expect(route.getElement().props.render()).toBeCalled();
        expect(component.find('Details').exists()).toEqual(true);
      }
    });
  });
});
