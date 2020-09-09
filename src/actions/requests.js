import * as types from '../actionTypes/requests';

const getRequests = (filters = {}, isInfiniteScroll = false, offset = 0, limit = 20) => ({
  type: types.GET_REQUESTS,
  filters: JSON.stringify(filters),
  isInfiniteScroll,
  offset,
  limit
});
const getRequestById = (id) => ({ type: types.GET_REQUEST_BY_ID, id });

const getRequestsSuccess = (requests) => ({
  type: types.GET_REQUESTS_SUCCESS,
  items: requests.items,
  hasMore: requests.hasMore,
  offset: requests.offset,
  newPosts: requests.newPosts,
  initialOffset: requests.initialOffset
});

const getRequestsFailure = (error) => ({
  type: types.GET_REQUESTS_FAILED,
  error
});

const getRequestByIdSuccess = (request) => ({
  type: types.GET_REQUEST_BY_ID_SUCCESS,
  request
});

const setRequest = (request) => ({
  type: types.SET_REQUEST,
  request
});

const addRequestComment = (id, comment) => ({
  type: types.ADD_REQUESTS_COMMENT,
  id,
  comment
});
const addRequestCommentSuccess = (request) => ({
  type: types.ADD_REQUESTS_COMMENT_SUCCESS,
  request
});
const addRequestCommentFailed = (error) => ({
  type: types.ADD_REQUESTS_COMMENT_FAILED,
  error
});

export {
  getRequests,
  getRequestById,
  getRequestByIdSuccess,
  setRequest,
  getRequestsFailure,
  getRequestsSuccess,
  addRequestComment,
  addRequestCommentSuccess,
  addRequestCommentFailed
};
