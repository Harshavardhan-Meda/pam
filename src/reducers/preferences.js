import { SHOW_BANNER, HIDE_BANNER } from '../actionTypes/preferences';

export const initialState = { isBannerVisible: false };

const reducer = (state = initialState, action = null) => {
  switch (action.type) {
    case SHOW_BANNER:
      return {
        ...state,
        isBannerVisible: true
      };
    case HIDE_BANNER:
      return {
        ...state,
        isBannerVisible: false
      };
    default:
      return { ...state };
  }
};

export default reducer;
