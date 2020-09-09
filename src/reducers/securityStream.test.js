import { getSecurityStreamFailure, getSecurityStreamSuccess } from '../actions/securityStream';
import streamMocks from '../mocks/streamMockData';
import reducer, { initialState } from './securityStream';

describe('securityStream reducer', () => {
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getSecurityStreamSuccess', () => {
    const expectedData = {
      items: streamMocks.items,
      hasMore: streamMocks.hasMore,
      isFetching: false,
      isInfiniteScroll: false,
      newPosts: streamMocks.newPosts,
      initialOffset: streamMocks.initialOffset,
      offset: streamMocks.offset
    };
    expect(reducer({ items: [] }, getSecurityStreamSuccess(streamMocks))).toEqual(expectedData);
  });

  it('should handle getSecurityStreamSuccess for initial load', () => {
    const obj = reducer({ items: [] }, getSecurityStreamSuccess({
      items: streamMocks.items,
      newPosts: false,
      initialOffset: '',
      offset: 'def'
    }));
    expect(obj).toHaveProperty('items', streamMocks.items);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', '');
    expect(obj).toHaveProperty('offset', 'def');
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getSecurityStreamSuccess with concatenation', () => {
    const additionalItem = { test: 'test' };
    const obj = reducer({ items: [additionalItem] }, getSecurityStreamSuccess({
      items: streamMocks.items,
      newPosts: false,
      initialOffset: 'abc',
      offset: 'def'
    }));
    expect(obj).toHaveProperty('items', [additionalItem, ...streamMocks.items]);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', 'abc');
    expect(obj).toHaveProperty('offset', 'def');
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getSecurityStreamFailed', () => {
    const expectedData = { error: 'error', isFetching: false, hasMore: false, isInfiniteScroll: false };
    expect(reducer([], getSecurityStreamFailure(error))).toEqual(expectedData);
  });
});
