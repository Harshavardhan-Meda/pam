'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import StreamFooter from './StreamFooter';

describe('<StreamFooter />', () => {
  const render = (hasItems, streamType) => shallow(
    <StreamFooter hasItems={hasItems} streamType={streamType} />
  );

  it('renders', () => {
    expect(render(true, 'security').exists()).toBe(true);
  });

  it('renders `No more items to display` without button', () => {
    expect(render(true, 'security').find('h3').text()).toEqual('No more items to display');
  });

  it('renders `No more Investigations to display` without button', () => {
    expect(render(true, 'investigation').find('h3').text()).toEqual('No more Investigations to display');
  });

  it('renders `No more Service Requests to display` without button', () => {
    expect(render(true, 'request').find('h3').text()).toEqual('No more Service Requests to display');
  });

  it('renders `No items to display`', () => {
    expect(render(false, 'security').find('h3').text()).toEqual('No items to display');
  });

  it('renders `No Investigations to display`', () => {
    expect(render(false, 'investigation').find('h3').text()).toEqual('No Investigations to display');
  });

  it('renders `No Service Requests to display`', () => {
    expect(render(false, 'request').find('h3').text()).toEqual('No Service Requests to display');
  });

  describe('user has scrolled', () => {
    StreamFooter.hasScrolled = jest.fn().mockImplementation(() => true);
    StreamFooter.returnToTop = jest.fn();

    it('renders a button if user has scrolled', () => {
      expect(render(true, 'security').find('.button').exists()).toBe(true);
    });

    it('invokes returnToTop on button click', () => {
      const component = render(true, 'security');
      const button = component.find('[type="button"]');
      button.simulate('click');
      expect(StreamFooter.returnToTop).toHaveBeenCalled();
    });
  });
});
