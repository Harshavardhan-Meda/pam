import investigations from '../mocks/investigationsMockData';
import * as actions from './investigations';
import * as types from '../actionTypes/investigations';

describe('investigations action creators', () => {
  it('should create an action to get Investigations status with default inputs', () => {
    const expectedAction = {
      type: types.GET_INVESTIGATIONS,
      isInfiniteScroll: false,
      offset: 0,
      limit: 20,
      filters: JSON.stringify({})
    };
    expect(actions.getInvestigations()).toEqual(expectedAction);
  });

  it('should create an action to get Investigations status with inputs', () => {
    const expectedAction = {
      type: types.GET_INVESTIGATIONS,
      isInfiniteScroll: false,
      offset: 20,
      limit: 20,
      filters: JSON.stringify({})
    };
    expect(actions.getInvestigations({}, false, 20)).toEqual(expectedAction);
  });

  it('should create an action to get Investigations with success', () => {
    const expectedAction = {
      type: types.GET_INVESTIGATIONS_SUCCESS,
      items: investigations.items,
      hasMore: investigations.hasMore
    };
    expect(actions.getInvestigationsSuccess(investigations)).toEqual(expectedAction);
  });

  it('should create an action to get Investigations with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_INVESTIGATIONS_FAILED,
      error
    };
    expect(actions.getInvestigationsFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to add comment by id to Investigation', () => {
    const id = 'SOC123456';
    const comment = 'investigation comment';
    const expectedAction = {
      type: types.ADD_INVESTIGATIONS_COMMENT,
      id,
      comment
    };
    expect(actions.addInvestigationComment(id, comment)).toEqual(expectedAction);
  });

  it('success add comment to Investigation worklog', () => {
    const expectedAction = {
      type: types.ADD_INVESTIGATIONS_COMMENT_SUCCESS,
      investigation: investigations[0]
    };
    expect(actions.addInvestigationCommentSuccess(investigations[0])).toEqual(expectedAction);
  });

  it('failed add comment to Investigation worklog', () => {
    const error = 'Failed add comment';
    const expectedAction = {
      type: types.ADD_INVESTIGATIONS_COMMENT_FAILED,
      error
    };
    expect(actions.addInvestigationCommentFailed(error)).toEqual(expectedAction);
  });
});
