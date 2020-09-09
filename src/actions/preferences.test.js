import * as types from '../actionTypes/preferences';
import * as actions from './preferences';

describe('preferences action creators', () => {
  it('should create an action to show Banner', () => {
    const expectedAction = { type: types.SHOW_BANNER };
    expect(actions.showBanner()).toEqual(expectedAction);
  });

  it('should create an action to hide Banner', () => {
    const expectedAction = { type: types.HIDE_BANNER };
    expect(actions.hideBanner()).toEqual(expectedAction);
  });
});
