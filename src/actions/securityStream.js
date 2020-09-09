import * as types from '../actionTypes/securityStream';

export const getSecurityStream = (filters = {}, isInfiniteScroll = false, offset = '', limit = 20) => ({
  type: types.GET_SECURITY_STREAM,
  filters: JSON.stringify(filters),
  isInfiniteScroll,
  offset,
  limit
});

export const getSecurityStreamSuccess = (stream) => ({
  type: types.GET_SECURITY_STREAM_SUCCESS,
  items: stream.items,
  hasMore: stream.hasMore,
  offset: stream.offset,
  newPosts: stream.newPosts,
  initialOffset: stream.initialOffset
});

export const getSecurityStreamFailure = (error) => ({
  type: types.GET_SECURITY_STREAM_FAILED,
  error
});
