import { getAlertConFailure, getAlertConSuccess } from '../actions/alertCon';
import reducer, { initialState } from './alertCon';

describe('alertCon reducer', () => {
  const level = 'LEVEL_1';
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getAlertConSuccess', () => {
    expect(reducer([], getAlertConSuccess(level))).toEqual({ level });
  });

  it('should handle getAlertConFailed', () => {
    expect(reducer([], getAlertConFailure(error))).toEqual({ error });
  });
});
