'use strict';

import { mount } from 'enzyme';
import React from 'react';
import ItemContent from './ItemContent';

/* eslint-disable react/destructuring-assignment */
describe('<ItemContent />', () => {
  const preventDefault = jest.fn();

  const props = {
    title: 'title',
    data: 'data',
    type: 'news',
    author: 'ibm',
    image: 'someUrl',
    video: {
      url: 'someUrl',
      content_type: 'someContentType',
      bitrate: ''
    },
    link: 'someUrl'
  };

  const component = mount(<ItemContent {...props} />);
  component.instance().redirectTo = jest.fn();
  const { redirectTo } = component.instance();

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders the img with url if there is no video', () => {
    const componentWithImg = mount(
      <ItemContent
        title={props.title}
        data={props.data}
        type={props.type}
        image={props.image}
        video={null}
        link={props.link}
      />, { lifecycleExperimental: true });
    const img = componentWithImg.find('img');
    expect(img.exists()).toBe(true);
    expect(img.prop('src')).toBe(props.image);
    expect(img.prop('alt')).toBe('Item');
  });

  it('renders the video with url', () => {
    const video = component.find('video');
    expect(video.exists()).toBe(true);
    expect(video.prop('src')).toBe(props.video.url);
  });

  it('renders the h3 title', () => {
    const title = component.find('h3');
    expect(title.exists()).toBe(true);
    expect(title.prop('className')).toBe('title');
    expect(title.text()).toBe(props.title);
  });

  it('renders empty title if undefined', () => {
    const noTitle = mount(<ItemContent {...{ ...props, title: undefined }} />);
    const title = noTitle.find('h3');
    expect(title.text()).toBe('');
  });

  it('renders the author if present', () => {
    const author = component.find('.author');
    expect(author.exists()).toBe(true);
    expect(author.text()).toBe(props.author);
  });

  it('does not render the author if absent', () => {
    const withoutAuthor = mount(
      <ItemContent
        title={props.title}
        data={props.data}
        type={props.type}
        link={props.link}
      />);
    const author = withoutAuthor.find('.author');
    expect(author.exists()).toBe(false);
  });

  it('renders a paragraph with data', () => {
    const paragraph = component.find('.description');
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.text()).toBe(props.data);
  });

  it('does not render a paragraph with a link', () => {
    const withoutLink = mount(
      <ItemContent
        title={props.title}
        data={props.data}
        type={props.type}
        author={props.author}
      />);
    const link = withoutLink.find('link');
    expect(link.exists()).toBe(false);
  });

  it('parses a link', () => {
    const titleText = 'Lorem ipsum www.test.com';
    const withLink = mount(
      <ItemContent
        title={titleText}
        data={props.data}
        type={props.type}
        author={props.author}
      />);
    const title = withLink.find('.title');
    expect(title.find('a').exists()).toBe(true);
    expect(title.text()).toEqual(titleText);
  });

  it('parses a hashTag', () => {
    const titleText = 'Lorem ipsum #Tag';
    const withHashTag = mount(
      <ItemContent
        title={titleText}
        data={props.data}
        type={props.type}
        author={props.author}
      />);
    const title = withHashTag.find('.title');
    expect(title.find('a').exists()).toBe(true);
    expect(title.text()).toEqual(titleText);
  });

  it('parses a @Tag', () => {
    const titleText = 'Lorem ipsum @Tag';
    const withAtTag = mount(
      <ItemContent
        title={titleText}
        data={props.data}
        type={props.type}
        author={props.author}
      />);
    const title = withAtTag.find('.title');
    expect(title.find('a').exists()).toBe(true);
    expect(title.text()).toEqual(titleText);
  });

  it('has a aria role for accessibility', () => {
    const content = component.find('.content');
    expect(content.prop('role')).toBe('link');
  });

  it('does not invoke handleChange or preventDefault on irrelevant keys (like tab)', () => {
    const content = component.find('.content');
    content.simulate('keydown', { key: 'Tab', preventDefault });
    expect(redirectTo).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('invokes redirectTo and preventDefault on Enter key', () => {
    const content = component.find('.content');
    content.simulate('keydown', { key: 'Enter', preventDefault });
    expect(redirectTo).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('invokes redirectTo and preventDefault on Space key', () => {
    const content = component.find('.content');
    content.simulate('keydown', { key: ' ', preventDefault });
    expect(redirectTo).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('invokes redirectTo on content click', () => {
    const content = component.find('.content');
    content.simulate('click');
    expect(redirectTo).toHaveBeenCalled();
  });
});
