import { shallow } from 'enzyme';
import React from 'react';
import mocks from '../../../../mocks/worklogMockData';
import Worklog from './WorklogItem';

const mock = mocks[0];

describe('<WorklogItem />', () => {
  const component = shallow(<Worklog item={mock} />);
  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('has \'worklog-item\' class', () => {
    expect(component.prop('className')).toBe('worklog-item');
  });

  it('renders author', () => {
    expect(component.find('.worklog-author').text()).toBe(mock.user);
  });

  it('renders last update time', () => {
    expect(component.find('time').text()).toBe(mock.lastUpdate);
  });

  it('renders a preformatted paragraph with text', () => {
    expect(component.find('pre').text()).toBe(mock.text);
  });
});
