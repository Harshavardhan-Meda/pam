import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getInvestigationByIdSuccess,
  getInvestigationsFailure,
  getInvestigationsSuccess,
  addInvestigationCommentSuccess,
  addInvestigationCommentFailed
} from '../actions/investigations';
import { GET_INVESTIGATION_BY_ID, GET_INVESTIGATIONS, ADD_INVESTIGATIONS_COMMENT } from '../actionTypes/investigations';
import apiClient from '../api/client';

export const getInvestigations = async (opts) => (await apiClient).apis.default.getInvestigations(opts);

export function* getInvestigationSaga(action) {
  const { offset, limit, filters } = action;
  try {
    const { body: investigations } = yield call(getInvestigations, { offset, limit, filters });
    yield put(getInvestigationsSuccess({ ...investigations, initialOffset: offset }));
  } catch (e) {
    yield put(getInvestigationsFailure(e));
  }
}

export const getInvestigationById = async (id) =>
  (await apiClient).apis.default.getInvestigationById({ investigationId: id });

export function* getInvestigationByIdSaga(action) {
  const { id } = action;
  try {
    const { body: investigations } = yield call(getInvestigationById, id);
    yield put(getInvestigationByIdSuccess(investigations));
  } catch (e) {
    yield put(getInvestigationsFailure(e));
  }
}

export const addCommentById = async (id, comment) =>
  (await apiClient).apis.default.addInvestigationComment({ id }, { requestBody: { text: comment } });

export function* addInvestigationCommentByIdSaga(action) {
  const { id, comment } = action;
  try {
    const { body: investigation } = yield call(addCommentById, id, comment);
    yield put(addInvestigationCommentSuccess(investigation));
  } catch (e) {
    yield put(addInvestigationCommentFailed(e));
  }
}

export const investigationsSaga = takeLatest(GET_INVESTIGATIONS, getInvestigationSaga);
export const investigationByIdSaga = takeEvery(GET_INVESTIGATION_BY_ID, getInvestigationByIdSaga);
export const addInvestigationCommentSaga = takeEvery(ADD_INVESTIGATIONS_COMMENT, addInvestigationCommentByIdSaga);
