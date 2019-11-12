import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_DISMISS_ERROR, LOGOUT,
} from '../actions/auth';

const initialState = {
  loggedIn: true,
  isFetching: false,
  isError: false,
  id: 123,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        lastUpdated: action.payload.time,
        id: action.payload.id,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload,
      };
    case LOGIN_DISMISS_ERROR:
      return {
        ...state,
        isError: false,
      };
    case LOGOUT:
      return {
        loggedIn: false,
        isFetching: false,
        isError: false,
      };
    default:
      return state;
  };
};

export default auth;