import { all } from 'redux-saga/effects';
import { alertConSaga } from './alertCon';
import { investigationByIdSaga, investigationsSaga, addInvestigationCommentSaga } from './investigations';
import { DataExportSaga } from './exportFeature';
import { profileSaga } from './profile';
import { requestByIdSaga, requestsSaga, addRequestCommentSaga } from './requests';
import { securityStreamSaga } from './securityStream';
import { socAnnouncementSaga } from './socAnnouncement';
import { getInterestsSaga, setInterestsSaga } from './interest';

export default function* rootSaga() {
  yield all([
    alertConSaga,
    investigationByIdSaga,
    investigationsSaga,
    addInvestigationCommentSaga,
    requestByIdSaga,
    requestsSaga,
    addRequestCommentSaga,
    socAnnouncementSaga,
    securityStreamSaga,
    profileSaga,
    getInterestsSaga,
    setInterestsSaga,
    DataExportSaga
  ]);
}
