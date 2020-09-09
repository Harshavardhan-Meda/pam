import {
  getRequestByIdSuccess,
  getRequestsFailure,
  getRequestsSuccess,
  addRequestCommentSuccess,
  setRequest
} from '../actions/requests';
import requests from '../mocks/requestsMocksData';
import reducer, { initialState } from './requests';

describe('requests reducer', () => {
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getRequestsSuccess for initial load', () => {
    const obj = reducer({ items: [] }, getRequestsSuccess({
      items: requests,
      newPosts: false,
      initialOffset: 0,
      offset: 5
    }));
    expect(obj).toHaveProperty('items', requests);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', 0);
    expect(obj).toHaveProperty('offset', 5);
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getRequestsSuccess with concatenation', () => {
    const additionalItem = { test: 'test' };
    const obj = reducer({ items: [additionalItem] }, getRequestsSuccess({
      items: requests,
      newPosts: false,
      initialOffset: 5,
      offset: 10
    }));
    expect(obj).toHaveProperty('items', [additionalItem, ...requests]);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', 5);
    expect(obj).toHaveProperty('offset', 10);
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getRequestsFailed', () => {
    const obj = reducer([], getRequestsFailure(error));
    expect(obj).toHaveProperty('error', error);
    expect(obj).toHaveProperty('isFetching', false);
  });

  it('should handle getRequestsById', () => {
    const request = requests[0];
    const state = reducer(initialState, getRequestByIdSuccess(request));
    expect(state).toHaveProperty('request', request);
    expect(state).toHaveProperty('isFetching', false);
  });

  it('should handle addRequestCommentSuccess', () => {
    const request = requests[0];
    const state = reducer(initialState, addRequestCommentSuccess(request));
    expect(state).toHaveProperty('request', request);
  });

  it('should handle setReuest', () => {
    const request = requests[0];
    const state = reducer(initialState, setRequest(request));
    expect(state).toHaveProperty('request', request);
  });
});
