import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getRequestByIdSuccess,
  getRequestsFailure,
  getRequestsSuccess,
  addRequestCommentFailed,
  addRequestCommentSuccess
} from '../actions/requests';
import { GET_REQUEST_BY_ID, GET_REQUESTS, ADD_REQUESTS_COMMENT } from '../actionTypes/requests';
import apiClient from '../api/client';

export const getRequests = async (opts) => (await apiClient).apis.default.getRequests(opts);

export function* getRequestSaga(action) {
  const { offset, limit, filters } = action;
  try {
    const { body: requests } = yield call(getRequests, { offset, limit, filters });
    yield put(getRequestsSuccess({ ...requests, initialOffset: offset }));
  } catch (e) {
    yield put(getRequestsFailure(e));
  }
}

export const getRequestById = async (id) => (await apiClient).apis.default.getRequestById({ requestId: id });

export function* getRequestByIdSaga(action) {
  const { id } = action;
  try {
    const { body: request } = yield call(getRequestById, id);
    yield put(getRequestByIdSuccess(request));
  } catch (e) {
    yield put(getRequestsFailure(e));
  }
}

export const addCommentById = async (id, comment) => (await apiClient).apis.default.addRequestComment(
  { id }, { requestBody: { text: comment } });

export function* addRequestCommentByIdSaga(action) {
  const { id, comment } = action;
  try {
    const { body: request } = yield call(addCommentById, id, comment);
    yield put(addRequestCommentSuccess(request));
  } catch (e) {
    yield put(addRequestCommentFailed(e));
  }
}

export const requestsSaga = takeLatest(GET_REQUESTS, getRequestSaga);
export const requestByIdSaga = takeEvery(GET_REQUEST_BY_ID, getRequestByIdSaga);
export const addRequestCommentSaga = takeEvery(ADD_REQUESTS_COMMENT, addRequestCommentByIdSaga);
