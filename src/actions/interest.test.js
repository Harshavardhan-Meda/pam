import * as types from '../actionTypes/interest';
import * as actions from './interest';
import interest from '../mocks/interestMockData';

describe('interest action creators', () => {
  it('should create an action to get interest status', () => {
    const expectedAction = { type: types.GET_INTEREST };
    expect(actions.getInterest()).toEqual(expectedAction);
  });

  it('should create an action to get interest with success', () => {
    const expectedAction = {
      type: types.GET_INTEREST_SUCCESS,
      items: interest.items
    };
    expect(actions.getInterestSuccess(interest)).toEqual(expectedAction);
  });

  it('should create an action to get interest with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_INTEREST_FAILED,
      error
    };
    expect(actions.getInterestFailed(error)).toEqual(expectedAction);
  });

  // SET
  it('should create an action to set interest status', () => {
    const expectedAction = { type: types.SET_INTEREST };
    expect(actions.setInterest()).toEqual(expectedAction);
  });

  it('should create an action to set interests with success', () => {
    const expectedAction = { type: types.SET_INTEREST_SUCCESS };
    expect(actions.setInterestSuccess(interest.items[0])).toEqual(expectedAction);
  });

  it('should create an action to set interest with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.SET_INTEREST_FAILED,
      error
    };
    expect(actions.setInterestFailed(error)).toEqual(expectedAction);
  });
});
