import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getInterestSuccess,
  getInterestFailed,
  setInterestFailed
} from '../actions/interest';
import { GET_INTEREST, SET_INTEREST } from '../actionTypes/interest';
import apiClient from '../api/client';

export const getInterest = async (opts) => (await apiClient).apis.default.getInterest(opts);

export function* getInterestSaga(action) {
  const { leafId } = action;
  try {
    const { body: interest } = yield call(getInterest, { leafId });
    yield put(getInterestSuccess(interest));
  } catch (e) {
    yield put(getInterestFailed(e));
  }
}

export const setInterest = async (opts) => (await apiClient).apis.default.setInterest(null, { requestBody: opts });

export function* setInterestSaga(action) {
  const { interestObj } = action;
  try {
    yield call(setInterest, interestObj);
    const { body: interest } = yield call(getInterest);
    yield put(getInterestSuccess(interest));
  } catch (e) {
    yield put(setInterestFailed(e));
  }
}

export const getInterestsSaga = takeLatest(GET_INTEREST, getInterestSaga);
export const setInterestsSaga = takeEvery(SET_INTEREST, setInterestSaga);
