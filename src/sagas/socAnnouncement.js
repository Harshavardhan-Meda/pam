import { call, put, takeEvery } from 'redux-saga/effects';
import { getSocAnnouncementFailure, getSocAnnouncementSuccess } from '../actions/socAnnouncement';
import { GET_SOC_ANNOUNCEMENT } from '../actionTypes/socAnnouncement';
import apiClient from '../api/client';

export const getSocAnnouncement = async () => (await apiClient).apis.default.getSocAnnouncement();

export function* getSecurityAnnouncement() {
  try {
    const { body: { detailedDescription } } = yield call(getSocAnnouncement);
    yield put(getSocAnnouncementSuccess(detailedDescription));
  } catch (e) {
    yield put(getSocAnnouncementFailure(e));
  }
}

export const socAnnouncementSaga = takeEvery(GET_SOC_ANNOUNCEMENT, getSecurityAnnouncement);
