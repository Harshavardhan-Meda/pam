import { GET_ALERTCON_FAILED, GET_ALERTCON_SUCCESS } from '../actionTypes/alertCon';

export const initialState = {
  level: '',
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTCON_SUCCESS:
      return { ...state, level: action.level };
    case GET_ALERTCON_FAILED:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
