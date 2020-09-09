'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import DetailedHeader from './DetailedHeader';

const mockStore = configureMockStore();
const initialState = {
  investigations: {
    isFetchingExportData: false,
    filters: {
      investigation: {}
    }
  }
};
const store = mockStore(initialState);

describe('<DetailedHeader />', () => {
  const props = {
    priority: 'medium',
    status: 'Pending',
    lastUpdate: '2018-06-21T14:22:46.000Z',
    title: 'Commented Security Investigation - Authorized Scan',
    subtitle: 'subtitle',
    id: 'SOCP00700648446',
    streamType: 'request',
    displayDemoBanner: false,
    leaf: []
  };
  let component;

  beforeEach(() => {
    component = shallow(<DetailedHeader {...props} />);
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
    expect(component.find('Status').exists()).toBe(true);
  });

  it('has element with detailed-header class', () => {
    expect(component.find('.detailed-header').exists()).toBe(true);
  });

  it('assigns priority className based on props', () => {
    expect(component.find('.priority').prop('className')).toEqual(expect.stringContaining('priority-medium'));
  });

  it('renders the priority from props in uppercase', () => {
    expect(component.find('.priority').text()).toBe('MEDIUM');
  });

  it('renders the default streamType', () => {
    // mock console error because this test verifies a bad prop
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const missingTypeProps = { ...props };
    missingTypeProps.streamType = 'fake';
    const withMissingType = shallow(<DetailedHeader {...missingTypeProps} />);
    expect(withMissingType.find('.back').text()).toBe('');
  });

  it('renders a div with button role', () => {
    expect(component.find('.back').prop('role')).toBe('button');
  });

  it('renders investigation header on back button', () => {
    component = shallow(<DetailedHeader {...props} streamType="investigation" />);
    expect(component.find('.back').text()).toBe('Investigations');
  });

  it('renders request header on back button', () => {
    component = shallow(<DetailedHeader {...props} streamType="request" />);
    expect(component.find('.back').text()).toBe('Service Requests');
  });

  it('renders the title in h3', () => {
    expect(component.find('h3').text()).toBe(`${props.title} - ${props.subtitle}`);
  });

  it('does not render subtitle with hyphen if it is missing', () => {
    component = shallow(<DetailedHeader {...props} subtitle={undefined} />);
    expect(component.find('h3').text()).toBe(props.title);
  });

  it('renders the subtitle in h4', () => {
    expect(component.find('h4').text()).toBe(props.id);
  });

  it('renders when priority in missing', () => {
    const missingPriorityProps = props;
    delete missingPriorityProps.priority;
    const header = shallow(<DetailedHeader {...missingPriorityProps} />);
    expect(header.find('.priority').text()).toBe('');
  });

  it('back button link has correct href', () => {
    const header = shallow(<DetailedHeader {...props} store={store} />);
    const linkDestination = header.find(Link).at(0).props().to;

    expect(linkDestination).toBe('/requests');
  });

  it('renders ExportMenu ', () => {
    expect(component.find('.export-content').exists()).toBe(true);
  });
});
