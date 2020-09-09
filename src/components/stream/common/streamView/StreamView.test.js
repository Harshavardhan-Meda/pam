'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import StreamView from './StreamView';
import StreamFooter from '../streamFooter/StreamFooter';

describe('<StreamView />', () => {
  const render = (title, hasMore, displayTime, isFetching) => shallow(
    <StreamView
      title={title}
      hasMore={hasMore}
      displayTime={displayTime}
      isFetching={isFetching}
    />
  );

  it('renders', () => {
    expect(render('test', true, false, false).find('.stream-view').exists()).toEqual(true);
  });

  it('doesnt render the time if displayTime prop not passed', () => {
    expect(render('test', true, false, false).find('time').exists()).toEqual(false);
  });

  it('renders child', () => {
    expect(render('test', true, false, false).find('.stream-view').children()).toHaveLength(1);
  });

  it('renders Stream Footer component', () => {
    expect(render('test', false, false, false).find(StreamFooter).exists()).toEqual(true);
  });

  it('doesnt render Stream Footer component', () => {
    expect(render('test', true, false, false).find(StreamFooter).exists()).toEqual(false);
  });
});
