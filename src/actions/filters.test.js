import * as types from '../actionTypes/filters';
import * as actions from './filters';

describe('filters action creators', () => {
  const streamType = 'foo';
  const key = 'bar';
  const value = 'baz';
  const multiselect = 'tru';

  it('should create an action to toggle filter value', () => {
    expect(actions.toggleFilterValue(streamType, key, value, multiselect)).toEqual({
      type: types.TOGGLE_FILTER_VALUE,
      streamType,
      key,
      value,
      multiselect
    });
  });

  it('should create an action to reset all filter values to initial state', () => {
    expect(actions.resetFilters(streamType)).toEqual({ type: types.RESET_FILTERS, streamType });
  });

  it('should create an action to toggle the display of filters', () => {
    expect(actions.toggleFilters(streamType)).toEqual({ type: types.TOGGLE_FILTERS, streamType });
  });
});
