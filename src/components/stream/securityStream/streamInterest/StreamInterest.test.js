'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { StreamInterest } from './StreamInterest';
import mocks from '../../../../mocks/interestMockData';
import { ReactComponent as Star } from '../../../../assets/securityStream/securityStreamItem/securityInterest/star.svg';

jest.mock('../../../../actions/interest', () => (
  {
    getInterest: jest.fn().mockImplementation(() => ({ type: 'test' })),
    setInterest: jest.fn().mockImplementation(() => ({ type: 'test' }))
  })
);

describe('<StreamInterest />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <StreamInterest
        items={mocks.items}
        leafId="testtest"
        dispatch={jest.fn()}
      />);
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the star Button', () => {
    expect(component.find('[type="button"]').exists()).toBe(true);
  });

  it('renders the star svg icon on a button', () => {
    expect(component.find('[type="button"]').children().first().type()).toEqual(Star);
  });

  it('invokes toggleInterestState on star button click', () => {
    const toggleInterestState = jest.spyOn(component.instance(), 'toggleInterestState');
    component.find('[type="button"]').simulate('click');
    expect(toggleInterestState).toHaveBeenCalled();
  });

  it('checks class name after star button click', () => {
    expect(component.state('interest')).toEqual(false);
    component.find('.not-interest').simulate('click');
    expect(component.state('interest')).toEqual(true);
  });
});
