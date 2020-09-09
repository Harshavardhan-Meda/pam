import * as types from '../actionTypes/alertCon';

export const getAlertCon = () => ({ type: types.GET_ALERTCON });

export const getAlertConSuccess = (level) => ({
  type: types.GET_ALERTCON_SUCCESS,
  level
});

export const getAlertConFailure = (error) => ({
  type: types.GET_ALERTCON_FAILED,
  error
});
