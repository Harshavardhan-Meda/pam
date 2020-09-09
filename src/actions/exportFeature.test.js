import * as actions from './exportFeature';
import * as types from '../actionTypes/exportFeature';

describe('export action creators', () => {
  it('should create an action to get data to export status with  inputs', () => {
    const expectedAction = {
      type: types.GET_DATA_TO_EXPORT,
      filters: JSON.stringify({}),
      offset: 0,
      limit: 300
    };
    expect(actions.getDataToExport()).toEqual(expectedAction);
  });

  it('should create an action to get data to export status with success', () => {
    const expectedAction = {
      type: types.GET_DATA_TO_EXPORT_SUCCESS
    };
    expect(actions.getDataToExportSuccess()).toEqual(expectedAction);
  });

  it('should create an action to get data to export  with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_DATA_TO_EXPORT_FAILED,
      error
    };
    expect(actions.getDataToExportFailure(error)).toEqual(expectedAction);
  });
});
