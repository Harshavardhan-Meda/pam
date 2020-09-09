import * as types from '../actionTypes/securityStream';
import stream from '../mocks/streamMockData';
import * as actions from './securityStream';

describe('securityStream action creators', () => {
  describe('getSecurityStream', () => {
    it('with empty filters by default', () => {
      const expectedAction = {
        type: types.GET_SECURITY_STREAM,
        offset: stream.offset,
        limit: 20,
        isInfiniteScroll: false,
        filters: JSON.stringify({})
      };
      expect(actions.getSecurityStream(undefined, undefined, stream.offset)).toEqual(expectedAction);
    });

    it('JSON.stringifying the given filters', () => {
      const expectedAction = {
        type: types.GET_SECURITY_STREAM,
        offset: stream.offset,
        limit: 20,
        isInfiniteScroll: false,
        filters: JSON.stringify({ type: 'test' })
      };
      expect(actions.getSecurityStream({ type: 'test' }, undefined, stream.offset)).toEqual(expectedAction);
    });

    it('with default offset', () => {
      const expectedAction = {
        type: types.GET_SECURITY_STREAM,
        offset: '',
        filters: JSON.stringify({}),
        limit: 20,
        isInfiniteScroll: false
      };
      expect(actions.getSecurityStream({})).toEqual(expectedAction);
    });
  });

  it('should create an action to get SecurityStream with success', () => {
    const expectedAction = {
      type: types.GET_SECURITY_STREAM_SUCCESS,
      items: stream.items,
      hasMore: stream.hasMore,
      offset: stream.offset,
      newPosts: stream.newPosts,
      initialOffset: stream.initialOffset
    };
    expect(actions.getSecurityStreamSuccess(stream)).toEqual(expectedAction);
  });

  it('should create an action to get SecurityStream with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_SECURITY_STREAM_FAILED,
      error
    };
    expect(actions.getSecurityStreamFailure(error)).toEqual(expectedAction);
  });
});
