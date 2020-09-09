import { getProfileFailure, getProfileSuccess } from '../actions/profile';
import reducer, { initialState } from './profile';
import { profile } from '../mocks/profile.mocks';

describe('profile reducer', () => {
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getProfileSuccess', () => {
    expect(reducer([], getProfileSuccess(profile))).toEqual({ profile });
  });

  it('should handle getProfileFailed', () => {
    expect(reducer([], getProfileFailure(error))).toEqual({ error });
  });
});
