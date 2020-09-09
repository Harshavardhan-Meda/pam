import { getSocAnnouncementFailure, getSocAnnouncementSuccess } from '../actions/socAnnouncement';
import reducer, { initialState } from './socAnnouncement';

describe('SOC Announcement reducer', () => {
  const detailedDescription = 'message';
  const error = 'error';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle getSocAnnouncementSuccess', () => {
    expect(reducer([], getSocAnnouncementSuccess(detailedDescription))).toEqual(
      { detailedDescription });
  });

  it('should handle getImportantSecurityAnnouncementFailed', () => {
    expect(reducer([], getSocAnnouncementFailure(error))).toEqual({ error });
  });
});
