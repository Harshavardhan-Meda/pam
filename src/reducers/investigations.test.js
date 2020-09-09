import {
  getInvestigationByIdSuccess,
  getInvestigationsFailure,
  getInvestigationsSuccess,
  addInvestigationCommentSuccess,
  setInvestigation
} from '../actions/investigations';
import investigations from '../mocks/investigationsMockData';
import reducer, { initialState } from './investigations';

describe('investigations reducer', () => {
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getInvestigationsSuccess for initial load', () => {
    const obj = reducer({ items: [] }, getInvestigationsSuccess({
      items: investigations,
      newPosts: false,
      initialOffset: 0,
      offset: 5
    }));
    expect(obj).toHaveProperty('items', investigations);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', 0);
    expect(obj).toHaveProperty('offset', 5);
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getInvestigationsSuccess with concatenation', () => {
    const additionalItem = { test: 'test' };
    const obj = reducer({ items: [additionalItem] }, getInvestigationsSuccess({
      items: investigations,
      newPosts: false,
      initialOffset: 5,
      offset: 10
    }));
    expect(obj).toHaveProperty('items', [additionalItem, ...investigations]);
    expect(obj).toHaveProperty('isFetching', false);
    expect(obj).toHaveProperty('newPosts', false);
    expect(obj).toHaveProperty('initialOffset', 5);
    expect(obj).toHaveProperty('offset', 10);
    expect(obj).toHaveProperty('hasMore');
  });

  it('should handle getInvestigationsFailed', () => {
    const obj = reducer([], getInvestigationsFailure(error));
    expect(obj).toHaveProperty('error', error);
    expect(obj).toHaveProperty('isFetching', false);
  });

  it('should handle getInvestigationsById', () => {
    const investigation = investigations[0];
    const state = reducer(initialState, getInvestigationByIdSuccess(investigation));
    expect(state).toHaveProperty('investigation', investigation);
    expect(state).toHaveProperty('isFetching', false);
  });

  it('should handle addInvestigationCommentSuccess', () => {
    const investigation = investigations[0];
    const state = reducer(initialState, addInvestigationCommentSuccess(investigation));
    expect(state).toHaveProperty('investigation', investigation);
  });

  it('should handle setInvestigation', () => {
    const investigation = investigations[0];
    const state = reducer(initialState, setInvestigation(investigation));
    expect(state).toHaveProperty('investigation', investigation);
  });
});
