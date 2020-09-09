import { GET_PROFILE_FAILED, GET_PROFILE_SUCCESS } from '../actionTypes/profile';

export const initialState = {
  profile: {
    firstName: ' ',
      lastName: ' ',
      customerName: ' ',
      email: ' ',
      customerContactId: ' '
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, profile: action.profile };
    case GET_PROFILE_FAILED:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
