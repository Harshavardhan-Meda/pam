import {
  getInterest,
  getInterestSuccess,
  setInterest,
  setInterestSuccess,
  getInterestFailed,
  setInterestFailed
} from '../actions/interest';
import reducer, { initialState } from './interest';
import interest from '../mocks/interestMockData';

describe('Interest reducer', () => {
  const error = 'error';
  const isFetching = false;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getInterest for initial load', () => {
    const obj = reducer([], getInterest());
    expect(obj).toHaveProperty('isFetching', true);
  });

  it('should handle getInterestSuccess for initial load', () => {
    const obj = reducer({ items: [] }, getInterestSuccess({ items: [...interest.items] }));
    expect(obj).toHaveProperty('items', interest.items);
    expect(obj).toHaveProperty('isFetching', false);
  });

  it('should handle getInterestFailed', () => {
    expect(reducer([], getInterestFailed(error))).toEqual({ error, isFetching });
  });

  it('should handle setInterest for initial load', () => {
    const obj = reducer([], setInterest());
    expect(obj).toHaveProperty('isFetching', true);
  });

  it('should handle setInterestSuccess for initial load', () => {
    const obj = reducer([], setInterestSuccess());
    expect(obj).toHaveProperty('isFetching', false);
  });

  it('should handle setInterestFailed', () => {
    expect(reducer([], setInterestFailed(error))).toEqual({ error, isFetching });
  });
});
