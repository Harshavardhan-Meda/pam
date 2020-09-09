import * as actions from './alertCon';
import * as types from '../actionTypes/alertCon';

describe('alertCon action creators', () => {
  it('should create an action to get AlertCon status', () => {
    const expectedAction = { type: types.GET_ALERTCON };
    expect(actions.getAlertCon()).toEqual(expectedAction);
  });

  it('should create an action to get AlertCon status with success', () => {
    const level = 'level';
    const expectedAction = {
      type: types.GET_ALERTCON_SUCCESS,
      level
    };
    expect(actions.getAlertConSuccess(level)).toEqual(expectedAction);
  });

  it('should create an action to get AlertCon status with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_ALERTCON_FAILED,
      error
    };
    expect(actions.getAlertConFailure(error)).toEqual(expectedAction);
  });
});
