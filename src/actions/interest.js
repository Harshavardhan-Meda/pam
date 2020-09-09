import * as types from '../actionTypes/interest';

export const getInterest = (leafId) => ({
  type: types.GET_INTEREST,
  leafId
});

export const getInterestSuccess = (interest) => ({
  type: types.GET_INTEREST_SUCCESS,
  items: interest.items
});

export const getInterestFailed = (error) => ({
  type: types.GET_INTEREST_FAILED,
  error
});

export const setInterest = (interestObj) => ({
  type: types.SET_INTEREST,
  interestObj
});

export const setInterestSuccess = () => ({ type: types.SET_INTEREST_SUCCESS });

export const setInterestFailed = (error) => ({
  type: types.SET_INTEREST_FAILED,
  error
});
