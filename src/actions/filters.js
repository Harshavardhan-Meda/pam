import * as types from '../actionTypes/filters';

export const toggleFilterValue = (streamType, key, value, multiselect) => ({
  type: types.TOGGLE_FILTER_VALUE,
  streamType,
  key,
  value,
  multiselect
});

export const resetFilters = (streamType) => ({
  type: types.RESET_FILTERS,
  streamType
});

export const setFilters = (streamType, values) => ({
  type: types.SET_FILTERS,
  streamType,
  values
});

export const toggleFilters = (streamType) => ({
  type: types.TOGGLE_FILTERS,
  streamType
});
