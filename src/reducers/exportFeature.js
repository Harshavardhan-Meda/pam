import {
  GET_DATA_TO_EXPORT,
  GET_DATA_TO_EXPORT_SUCCESS,
  GET_DATA_TO_EXPORT_FAILED
} from '../actionTypes/exportFeature';

export const initialState = {
  error: '',
  isFetchingExportData: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_TO_EXPORT:
      return { ...state, isFetchingExportData: true };
    case GET_DATA_TO_EXPORT_SUCCESS:
      return { ...state, isFetchingExportData: false };
    case GET_DATA_TO_EXPORT_FAILED:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
