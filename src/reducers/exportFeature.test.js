import reducer, { initialState } from './exportFeature';
import { getDataToExportSuccess, getDataToExport } from '../actions/exportFeature';
import * as actions from '../actions/exportFeature';

describe('investigations reducer', () => {
  const error = 'error';
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getDataToExport for initial load', () => {
    const obj = reducer({}, getDataToExport({}));
    expect(obj).toHaveProperty('isFetchingExportData', true);
  });

  it('should handle getDataToExportSuccess after response load', () => {
    const obj = reducer({}, getDataToExportSuccess({}));
    expect(obj).toHaveProperty('isFetchingExportData', false);
  });

  it('should handle getDataToExportFailure for error', () => {
    const obj = reducer({}, actions.getDataToExportFailure(error));
    expect(obj).toHaveProperty('error', error);
  });
});
