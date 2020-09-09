'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import StreamHeader from './StreamHeader';

describe('<StreamHeader />', () => {
  const render = (title, streamType, displayTime, items) =>
    shallow(<StreamHeader title={title} streamType={streamType} displayTime={displayTime} items={items} />);
  it('renders', () => {
    expect(render('test', 'testType', false).find('.stream-header').exists()).toEqual(true);
  });

  it('renders the title', () => {
    expect(render('test', 'testType', false).find('h1').text()).toEqual('test');
  });

  it('renders the time if displayTime prop passed', () => {
    expect(render('test', 'testType', true).find('.stream-time').exists()).toEqual(true);
  });

  it("doesn't render the time if displayTime prop is not passed", () => {
    expect(render('test', 'testType', false).find('.stream-time').exists()).toEqual(false);
  });

  it('renders ExportMenu when items exists', () => {
    expect(render('test', 'testType', false, ['test']).find('.export').exists()).toEqual(true);
  });

  it('does not render ExportMenu when items are empty', () => {
    expect(render('test', 'testType', false, []).find('.export').exists()).toEqual(false);
  });
});
