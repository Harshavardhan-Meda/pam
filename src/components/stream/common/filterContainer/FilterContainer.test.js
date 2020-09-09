import { shallow } from 'enzyme';
import React from 'react';
import { resetFilters, toggleFilterValue } from '../../../../actions/filters';
import Priority from '../../../common/priority/Priority';
import investigationFilterSchema from '../../investigationStream/filterSchema';
import { FilterContainer } from './FilterContainer';

jest.mock('react-piwik');
jest.mock('../../../../actions/filters', () => ({
  resetFilters: jest.fn(),
  toggleFilters: jest.fn(),
  toggleFilterValue: jest.fn().mockImplementation((x, y, z, m) => [x, y, z, m]),
  setFilters: jest.fn().mockImplementation((x, y) => ({ type: 'fake', x, y }))
}));

describe('<FilterContainer />', () => {
  const initialState = {
    filters: {
      investigation: {
        priority: [],
        status: [],
        timeframe: {}
      }
    },
    browser: { greaterThan: { medium: true } }
  };

  const filteredState = {
    filters: {
      investigation: {
        priority: ['medium'],
        status: ['new'],
        timeframe: { start: '2018-05-14T23:06:44+02:00', type: 'LAST_3M' }
      }
    },
    browser: { greaterThan: { medium: true } }
  };

  const mockLocation = { search: '?type=investigation' };
  const mockHistory = { push: jest.fn() };
  const mockBrowser = { greaterThan: { small: false } };
  const callback = jest.fn().mockImplementation(() => ({ offset: 0, limit: 20, type: 'fake' }));
  let dispatch;
  let filterContainer;

  beforeEach(() => {
    dispatch = jest.fn();
    filterContainer = shallow(
      <FilterContainer
        streamType="investigation"
        filterSchema={investigationFilterSchema}
        filters={initialState.filters.investigation}
        dispatch={dispatch}
        callback={callback}
        location={mockLocation}
        history={mockHistory}
        browser={mockBrowser}
      />
    );
  });

  it('renders', () => {
    expect(filterContainer.exists()).toBe(true);
  });

  it('does not render reset button initially', () => {
    expect(filterContainer.find('.reset').exists()).toBeFalsy();
  });

  it('dispatches a callback action when props have changed in desktop view', () => {
    filterContainer.instance().filtersChanged = jest.fn().mockReturnValue(true);
    filterContainer.setProps({ browser: { greaterThan: { small: true } } });
    expect(dispatch).toHaveBeenCalledWith({ limit: 20, offset: 0, type: 'fake' });
  });

  it('calls dispatch on handleReset', () => {
    filterContainer.instance().handleReset();
    expect(resetFilters).toHaveBeenCalledWith('investigation');
  });

  it('calls submitFilters on OK button click', () => {
    const submitFilters = jest.spyOn(filterContainer.instance(), 'submitFilters');
    filterContainer.find('.filters-confirm-button').simulate('click');
    expect(submitFilters).toHaveBeenCalled();
  });

  it('renders Reset button after filter change', () => {
    filterContainer.setProps({ filters: filteredState.filters.investigation });
    expect(filterContainer.find('.reset').exists()).toBeTruthy();
  });

  it('renders child components', () => {
    let childrenAmount = 0;
    investigationFilterSchema.forEach((key) => {
      childrenAmount += Object.keys(key.values).length;
    });
    expect(filterContainer.find('FilterButton')).toHaveLength(childrenAmount);
  });

  it('has role and aria label for accessibility', () => {
    const buttonContainer = filterContainer.find('.filter-buttons').at(0);
    expect(buttonContainer.prop('role')).toBe('menu');
    expect(buttonContainer.prop('aria-label')).toBeDefined();
  });

  it('does not dispatch a callback action when props have changed in mobile view', () => {
    filterContainer.instance().filtersChanged = jest.fn().mockReturnValue(true);
    filterContainer.setProps({ browser: { greaterThan: { small: false } } });
    filterContainer.setProps({ location: { search: false } });
    expect(dispatch).not.toHaveBeenCalledWith({ limit: 20, offset: 0, type: 'fake' });
  });

  it('calls handleReset on reset button click', () => {
    filterContainer.instance().handleReset = jest.fn();
    const { handleReset } = filterContainer.instance();
    filterContainer.setProps({ filters: filteredState.filters.investigation });
    filterContainer.find('.reset').simulate('click');
    expect(handleReset).toHaveBeenCalled();
  });

  it('wraps a component with Priority', () => {
    const child = <div>foo</div>;
    expect(filterContainer.instance().wrapPriority('high')(child)).toEqual(
      <Priority priority="high">{child}</Priority>
    );
  });

  describe('getChangeHandler', () => {
    describe('multiSelect === true', () => {
      it('returns a function that calls toggleFilterValue and dispatch with correct data', () => {
        const returnedFn = filterContainer.instance().getChangeHandler(investigationFilterSchema[0], 'priority');
        returnedFn();
        expect(toggleFilterValue).toHaveBeenCalledWith('investigation', 'priority', 'priority', true);
        expect(dispatch).toHaveBeenCalledWith(['investigation', 'priority', 'priority', true]);
      });
    });

    describe('multiSelect === false', () => {
      it('returns a function that calls toggleFilterValue and dispatch with correct data', () => {
        const returnedFn = filterContainer.instance().getChangeHandler(investigationFilterSchema[2], 'timeframe');
        returnedFn();
        expect(toggleFilterValue).toHaveBeenCalledWith('investigation', 'timeframe', 'timeframe', false);
        expect(dispatch).toHaveBeenCalledWith(['investigation', 'timeframe', 'timeframe', false]);
      });
    });
  });
});
