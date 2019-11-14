import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_DISMISS_ERROR, LOGOUT,
  REGISTER_ATTEMPT, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_DISSMISS_ERROR,
} from '../actions/auth';

// const initialState = {
//   loggedIn: true,
//   isFetching: false,
//   isError: false,
//   id: 123,
// };

const initialState = {
  loggedIn: false,
  isFetching: false,
  isError: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
    case REGISTER_ATTEMPT:
      return {
        ...state,
        isFetching: true,
        isError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        lastUpdated: action.payload.time,
        id: action.payload.id,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload,
      };
    case LOGIN_DISMISS_ERROR:
    case REGISTER_DISSMISS_ERROR:
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