import { shallow } from 'enzyme';
import React from 'react';
import FilterButton from './FilterButton';

describe('<FilterButton />', () => {
  const handleClick = jest.fn();
  const preventDefault = jest.fn();
  let component;

  beforeEach(() => {
    component = shallow(
      <FilterButton role="menuitemcheckbox" type="checkbox" isChecked label="label" onClick={handleClick} />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    expect(component.exists()).toBe(true);
  });

  it('toggle checkbox value', () => {
    component.setProps({ isChecked: false });
    expect(component.find({ type: 'checkbox' }).props().checked).toEqual(false);
    component.setProps({ isChecked: true });
    expect(component.find({ type: 'checkbox' }).props().checked).toEqual(true);
  });

  it('has a aria role for accessibility', () => {
    const input = component.find('input');
    expect(input.prop('role')).toBe('menuitemcheckbox');
  });

  it('invokes handleChange and preventDefault on Enter key', () => {
    const label = component.find('label');
    label.simulate('keydown', { key: 'Enter', preventDefault });
    expect(handleClick).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('invokes handleChange and preventDefault on Space key', () => {
    const label = component.find('label');
    label.simulate('keydown', { key: ' ', preventDefault });
    expect(handleClick).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('does not invoke handleChange or preventDefault on irrelevant keys (like tab)', () => {
    const label = component.find('label');
    label.simulate('keydown', { key: 'Tab', preventDefault });
    expect(handleClick).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('invokes handleChange on input click', () => {
    const input = component.find('input');
    input.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
