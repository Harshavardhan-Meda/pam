import * as types from '../actionTypes/profile';
import * as actions from './profile';
import { profile } from '../mocks/profile.mocks';

describe('profile action creators', () => {
  it('should create an action to get Profile status', () => {
    const expectedAction = { type: types.GET_PROFILE };
    expect(actions.getProfile()).toEqual(expectedAction);
  });

  it('should create an action to get Profile with success', () => {
    const expectedAction = {
      type: types.GET_PROFILE_SUCCESS,
      profile
    };
    expect(actions.getProfileSuccess(profile)).toEqual(expectedAction);
  });

  it('should create an action to get Profile with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_PROFILE_FAILED,
      error
    };
    expect(actions.getProfileFailure(error)).toEqual(expectedAction);
  });
});
