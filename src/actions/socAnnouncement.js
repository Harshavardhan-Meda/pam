import * as types from '../actionTypes/socAnnouncement';

export const getSocAnnouncement = () => ({ type: types.GET_SOC_ANNOUNCEMENT });

export const getSocAnnouncementSuccess = (detailedDescription) => ({
  type: types.GET_SOC_ANNOUNCEMENT_SUCCESS,
  detailedDescription
});

export const getSocAnnouncementFailure = (error) => ({
  type: types.GET_SOC_ANNOUNCEMENT_FAILED,
  error
});
