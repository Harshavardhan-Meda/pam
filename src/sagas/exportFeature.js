import { call, put, takeLatest } from 'redux-saga/effects';
import exportFromJSON from 'export-from-json';
import moment from 'moment';
import { getDataToExportSuccess, getDataToExportFailure } from '../actions/exportFeature';
import { GET_DATA_TO_EXPORT } from '../actionTypes/exportFeature';
import apiClient from '../api/client';

export const getInvestigations = async (opts) => (await apiClient).apis.default.getInvestigations(opts);
export const getRequests = async (opts) => (await apiClient).apis.default.getRequests(opts);
export const exportData = async ({ exportType, displayDefaultExportDataHeader, exportStream, ...streamData }) => {
  const data = [];
  const dataExportedDate = moment().format('DD-MM-YYYY HH:mm');
  let exportDataHeader = {};
  if (displayDefaultExportDataHeader) {
    exportDataHeader =
      exportStream === 'investigation'
        ? { 'Investigation List': `Past week , exported ${dataExportedDate} GMT` }
        : { 'Request List': `Past week , exported ${dataExportedDate} GMT` };
  }
  const dataToExport = streamData.items.map((item) => ({
    Issue: `${item.title} - ${item.subtitle}`,
    Description: item.description,
    Id: item.id,
    Status: item.status,
    ...(item.priority && { Priority: item.priority }),
    Last_Update: item.lastUpdate
  }));
  data.push(exportDataHeader, ...dataToExport);
  const filenameFormat = dataExportedDate;
  const fileName = `${exportStream}-list ${filenameFormat}`;
  exportFromJSON({ data, fileName, exportType });
};

export function* getDataToExportSaga(action) {
  const { offset, limit, filters, exportType, displayDefaultExportDataHeader, exportStream } = action;
  try {
    if (exportStream === 'request') {
      const { body: requests } = yield call(getRequests, { offset, limit, filters });
      yield put(getDataToExportSuccess({ ...requests }));
      yield put(exportData({ exportType, displayDefaultExportDataHeader, exportStream, ...requests }));
    } else {
      const { body: investigations } = yield call(getInvestigations, { offset, limit, filters });
      yield put(getDataToExportSuccess({ ...investigations }));
      yield put(exportData({ exportType, displayDefaultExportDataHeader, exportStream, ...investigations }));
    }
  } catch (e) {
    yield put(getDataToExportFailure(e));
  }
}
export const DataExportSaga = takeLatest(GET_DATA_TO_EXPORT, getDataToExportSaga);
