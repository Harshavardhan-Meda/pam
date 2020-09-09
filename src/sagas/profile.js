import { call, put, takeEvery } from 'redux-saga/effects';
import { getProfileFailure, getProfileSuccess } from '../actions/profile';
import { GET_PROFILE } from '../actionTypes/profile';
import apiClient from '../api/client';
import { initMatomo } from '../utils/matomoUtil';

export const getProfile = async () => (await apiClient).apis.default.getProfile();

export function* getProfileSaga() {
  try {
    const { body: profile } = yield call(getProfile);
    yield call(initMatomo, profile);
    yield put(getProfileSuccess(profile));
  } catch (e) {
    yield put(getProfileFailure(e));
  }
}

export const profileSaga = takeEvery(GET_PROFILE, getProfileSaga);
