import { showBanner, hideBanner } from '../actions/preferences';
import reducer, { initialState } from './preferences';

describe('Preferences reducer', () => {
  const preferences = { isBannerVisible: false };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle hideBanner', () => {
    const obj = reducer(preferences, showBanner());
    expect(obj).toMatchObject({ isBannerVisible: true });
  });

  it('should handle showBanner', () => {
    const obj = reducer(preferences, hideBanner());
    expect(obj).toMatchObject({ isBannerVisible: false });
  });
});
