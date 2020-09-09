import {
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILED,
  GET_REQUEST_BY_ID,
  GET_REQUEST_BY_ID_SUCCESS,
  ADD_REQUESTS_COMMENT_SUCCESS,
  ADD_REQUESTS_COMMENT_FAILED,
  SET_REQUEST
} from '../actionTypes/requests';
import mapItems from '../utils/mapItems';

export const initialState = {
  request: { worklog: [] },
  items: [],
  isFetching: false,
  isInfiniteScroll: false,
  error: '',
  hasMore: true,
  newPosts: false,
  offset: 0,
  initialOffset: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_BY_ID:
      return { ...state, isFetching: true };
    case GET_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        items: mapItems(state.items, action.request),
        request: action.request,
        isFetching: false
      };
    case GET_REQUESTS:
      return { ...state, isFetching: true, isInfiniteScroll: action.isInfiniteScroll };
    case GET_REQUESTS_SUCCESS:
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
    case GET_REQUESTS_FAILED:
      return { ...state, error: action.error, isFetching: false, hasMore: false, isInfiniteScroll: false };
    case ADD_REQUESTS_COMMENT_SUCCESS:
      return {
        ...state,
        items: mapItems(state.items, action.request),
        request: action.request
        };
    case ADD_REQUESTS_COMMENT_FAILED:
      return { ...state, error: action.error, isFetching: false };
    case SET_REQUEST:
      return {
        ...state,
        request: action.request
      };
    default:
      return { ...state };
  }
};

export default reducer;
