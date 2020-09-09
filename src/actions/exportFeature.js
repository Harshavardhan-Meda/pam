import * as types from '../actionTypes/exportFeature';

const getDataToExport = (
  filters = {},
  exportType,
  displayDefaultExportDataHeader,
  exportStream,
  offset = 0,
  limit = 300
) => ({
  type: types.GET_DATA_TO_EXPORT,
  filters: JSON.stringify(filters),
  offset,
  limit,
  exportType,
  displayDefaultExportDataHeader,
  exportStream
});

const getDataToExportSuccess = () => ({
  type: types.GET_DATA_TO_EXPORT_SUCCESS
});

const getDataToExportFailure = (error) => ({
  type: types.GET_DATA_TO_EXPORT_FAILED,
  error
});

export { getDataToExport, getDataToExportSuccess, getDataToExportFailure };
