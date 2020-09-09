import { shallow } from 'enzyme';
import React from 'react';
import { ConditionalStreamRender } from './ConditionalStreamRender';

describe('<ConditionalStreamRender />', () => {
  let component;
  const first = <div className="first" />;
  const second = <div className="second" />;
  const render = (lessThanMedium, condition) => (
    shallow(<ConditionalStreamRender
      firstChild={first}
      secondChild={second}
      condition={condition}
      browser={{ lessThan: { medium: lessThanMedium } }}
    />)
  );

  it('renders only the second component when lessThan.medium && condition', () => {
    component = render(true, true);
    expect(component.find('.first').exists()).toBeFalsy();
    expect(component.find('.second').exists()).toBeTruthy();
  });

  it('renders only the first component when lessThan.medium && !condition ', () => {
    component = render(true, false);
    expect(component.find('.first').exists()).toBeTruthy();
    expect(component.find('.second').exists()).toBeFalsy();
  });

  it('renders both components when !lessThan.medium', () => {
    component = render(false, false);
    expect(component.find('.first').exists()).toBeTruthy();
    expect(component.find('.second').exists()).toBeTruthy();
  });
});
