import {
  ADD_INVESTIGATIONS_COMMENT_FAILED,
  ADD_INVESTIGATIONS_COMMENT_SUCCESS,
  GET_INVESTIGATION_BY_ID,
  GET_INVESTIGATIONS,
  GET_INVESTIGATIONS_BY_ID_SUCCESS,
  GET_INVESTIGATIONS_FAILED,
  GET_INVESTIGATIONS_SUCCESS,
  SET_INVESTIGATION
} from '../actionTypes/investigations';
import mapItems from '../utils/mapItems';

export const initialState = {
  investigation: { worklog: [] },
  items: [],
  isFetching: false,
  isInfiniteScroll: false,
  error: '',
  hasMore: true,
  newPosts: false,
  offset: 0,
  initialOffset: 0,
  isFetchingExportData: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTIGATION_BY_ID:
      return { ...state, isFetching: true };
    case GET_INVESTIGATIONS_BY_ID_SUCCESS:
      return {
        ...state,
        items: mapItems(state.items, action.investigation),
        investigation: action.investigation,
        isFetching: false
      };
    case GET_INVESTIGATIONS:
      return { ...state, isFetching: true, isInfiniteScroll: action.isInfiniteScroll };
    case GET_INVESTIGATIONS_SUCCESS:
      return {
        ...state,
        // IF call was invoked with offset=0: this means the first page has been returned by the API
        items: action.initialOffset === 0 ? action.items : [...state.items, ...action.items],
        isFetching: false,
        isInfiniteScroll: false,
        hasMore: action.hasMore,
        offset: action.offset,
        newPosts: action.newPosts,
        initialOffset: action.initialOffset
      };
    case GET_INVESTIGATIONS_FAILED:
      return { ...state, error: action.error, isFetching: false, hasMore: false, isInfiniteScroll: false };
    case ADD_INVESTIGATIONS_COMMENT_SUCCESS:
      return {
        ...state,
        items: mapItems(state.items, action.investigation),
        investigation: action.investigation
      };
    case ADD_INVESTIGATIONS_COMMENT_FAILED:
      return { ...state, error: action.error, isFetching: false };
    case SET_INVESTIGATION:
      return {
        ...state,
        investigation: action.investigation
      };
    default:
      return { ...state };
  }
};

export default reducer;
