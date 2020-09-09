import requests from '../mocks/requestsMocksData';
import * as actions from './requests';
import * as types from '../actionTypes/requests';

describe('requests action creators', () => {
  it('should create an action to get Request status with default inputs', () => {
    const expectedAction = {
      type: types.GET_REQUESTS,
      isInfiniteScroll: false,
      offset: 0,
      limit: 20,
      filters: JSON.stringify({})
    };
    expect(actions.getRequests()).toEqual(expectedAction);
  });

  it('should create an action to get Request status with inputs', () => {
    const expectedAction = {
      type: types.GET_REQUESTS,
      isInfiniteScroll: false,
      offset: 20,
      limit: 20,
      filters: JSON.stringify({})
    };
    expect(actions.getRequests({}, undefined, 20)).toEqual(expectedAction);
  });


  it('should create an action to get Requests with success', () => {
    const expectedAction = {
      type: types.GET_REQUESTS_SUCCESS,
      requests: requests.items,
      hasMore: requests.hasMore
    };
    expect(actions.getRequestsSuccess(requests)).toEqual(expectedAction);
  });

  it('should create an action to get Requests with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_REQUESTS_FAILED,
      error
    };
    expect(actions.getRequestsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to add comment by id to Request', () => {
    const id = 'SOC123456';
    const comment = 'request comment';
    const expectedAction = {
      type: types.ADD_REQUESTS_COMMENT,
      id,
      comment
    };
    expect(actions.addRequestComment(id, comment)).toEqual(expectedAction);
  });

  it('success add comment to Request worklog', () => {
    const expectedAction = {
      type: types.ADD_REQUESTS_COMMENT_SUCCESS,
      request: requests[0]
    };
    expect(actions.addRequestCommentSuccess(requests[0])).toEqual(expectedAction);
  });

  it('failed add comment to Request worklog', () => {
    const error = 'Failed add comment';
    const expectedAction = {
      type: types.ADD_REQUESTS_COMMENT_FAILED,
      error
    };
    expect(actions.addRequestCommentFailed(error)).toEqual(expectedAction);
  });
});
