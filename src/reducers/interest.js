import {
  GET_INTEREST,
  GET_INTEREST_SUCCESS,
  GET_INTEREST_FAILED,
  SET_INTEREST,
  SET_INTEREST_SUCCESS,
  SET_INTEREST_FAILED
} from '../actionTypes/interest';

export const initialState = { items: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTEREST:
      return {
        ...state,
        isFetching: true
      };
    case GET_INTEREST_SUCCESS:
    return {
      ...state,
      items: action.items,
      isFetching: false
    };
    case GET_INTEREST_FAILED:
    return {
      ...state,
      error: action.error,
      isFetching: false
    };
    case SET_INTEREST:
    return {
      ...state,
      isFetching: true
    };
    case SET_INTEREST_SUCCESS:
    return {
      ...state,
      isFetching: false
    };
    case SET_INTEREST_FAILED:
    return {
      ...state,
      error: action.error,
      isFetching: false
    };
    default:
    return { ...state };
  }
};

export default reducer;
