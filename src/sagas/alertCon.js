import { call, put, takeEvery } from 'redux-saga/effects';
import { getAlertConFailure, getAlertConSuccess } from '../actions/alertCon';
import { GET_ALERTCON } from '../actionTypes/alertCon';
import apiClient from '../api/client';

export const getAlertCon = async () => (await apiClient).apis.default.getAlertCon();

export function* getAlertConStatus() {
  try {
    const { body: { level } } = yield call(getAlertCon);
    yield put(getAlertConSuccess(level));
  } catch (e) {
    yield put(getAlertConFailure(e));
  }
}

export const alertConSaga = takeEvery(GET_ALERTCON, getAlertConStatus);
