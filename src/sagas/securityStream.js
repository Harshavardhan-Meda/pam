import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getSecurityStreamFailure,
  getSecurityStreamSuccess
} from '../actions/securityStream';
import { GET_SECURITY_STREAM } from '../actionTypes/securityStream';
import apiClient from '../api/client';

export const getStream = async (opts) => (await apiClient).apis.default.getStream(opts);

export function* getSecurityStream(action) {
  const { offset, limit, filters } = action;
  try {
    const { body: stream } = yield call(getStream, { offset, limit, filters });
    yield put(getSecurityStreamSuccess({ ...stream, initialOffset: offset }));
  } catch (e) {
    yield put(getSecurityStreamFailure(e));
  }
}

export const securityStreamSaga = takeLatest(GET_SECURITY_STREAM, getSecurityStream);
