import * as types from '../actionTypes/profile';

export const getProfile = () => ({ type: types.GET_PROFILE });

export const getProfileSuccess = (profile) => ({
  type: types.GET_PROFILE_SUCCESS,
  profile
});

export const getProfileFailure = (error) => ({
  type: types.GET_PROFILE_FAILED,
  error
});
