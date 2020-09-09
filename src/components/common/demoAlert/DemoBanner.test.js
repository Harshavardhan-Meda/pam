import React from 'react';
import { shallow } from 'enzyme';
import DemoBanner from './DemoBanner';

describe('<DemoBanner />', () => {
  let component = shallow(<DemoBanner display />);

  it('renders', () => {
    expect(component.children().exists()).toBe(true);
  });

  it('doesn\'t renders when display is false', () => {
    component = shallow(<DemoBanner display={false} />);
    expect(component.children().exists()).toBe(false);
  });
});
