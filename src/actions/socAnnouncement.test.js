import * as actions from './socAnnouncement';
import * as types from '../actionTypes/socAnnouncement';

describe('socAnnouncement action creators', () => {
  it('should create an action to get SocAnnouncement status', () => {
    const expectedAction = { type: types.GET_SOC_ANNOUNCEMENT };
    expect(actions.getSocAnnouncement()).toEqual(expectedAction);
  });

  it('should create an action to get SocAnnouncement status with success', () => {
    const detailedDescription = 'detailedDescription';
    const expectedAction = {
      type: types.GET_SOC_ANNOUNCEMENT_SUCCESS,
      detailedDescription
    };
    expect(actions.getSocAnnouncementSuccess(detailedDescription)).toEqual(expectedAction);
  });

  it('should create an action to get SocAnnouncement status with failure', () => {
    const error = jest.fn();
    const expectedAction = {
      type: types.GET_SOC_ANNOUNCEMENT_FAILED,
      error
    };
    expect(actions.getSocAnnouncementFailure(error)).toEqual(expectedAction);
  });
});
