import {
  GET_SECURITY_STREAM,
  GET_SECURITY_STREAM_SUCCESS,
  GET_SECURITY_STREAM_FAILED
} from '../actionTypes/securityStream';

export const initialState = {
  items: [],
  error: '',
  hasMore: true,
  newPosts: false,
  offset: '',
  initialOffset: '',
  isFetching: false,
  isInfiniteScroll: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SECURITY_STREAM:
      return { ...state, isFetching: true, isInfiniteScroll: action.isInfiniteScroll };
    case GET_SECURITY_STREAM_SUCCESS:
      return {
        ...state,
        // IF call was invoked with offset=0: this means the first page has been returned by the API
        items: action.initialOffset === '' ? action.items : [...state.items, ...action.items],
        hasMore: action.hasMore,
        newPosts: action.newPosts,
        offset: action.offset,
        initialOffset: action.initialOffset,
        isFetching: false,
        isInfiniteScroll: false
      };
    case GET_SECURITY_STREAM_FAILED:
      return { ...state, error: action.error, isFetching: false, hasMore: false, isInfiniteScroll: false };
    default:
      return { ...state };
  }
};

export default reducer;
