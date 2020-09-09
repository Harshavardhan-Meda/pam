'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import CurrentTime from './CurrentTime';

jest.useFakeTimers();

describe('<CurrentTime />', () => {
  it('renders the current time', () => {
    const currentTime = shallow(<CurrentTime />);
    const now = moment(new Date()).format('LT');
    expect(currentTime.find('.time').text()).toEqual(now);
  });

  it('calls component lifecycle methods', () => {
    const componentDidMount = jest.spyOn(CurrentTime.prototype, 'componentDidMount');
    const componentWillUnmount = jest.spyOn(CurrentTime.prototype, 'componentWillUnmount');
    const wrapper = shallow(<CurrentTime />);
    expect(componentDidMount).toHaveBeenCalled();
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });

  /* eslint-disable no-console */
  describe('<CurrentTime /> with negative scenario', () => {
    const thrownError = new Error();
    console.warn = jest.fn();

    // eslint-disable-next-line no-global-assign
    clearTimeout = () => {
      throw thrownError;
    };

    it('logs the error message when clearTimeout fails', () => {
      expect(console.warn).toHaveBeenCalledWith('error cancelling time update', thrownError);
    });
  });
});
