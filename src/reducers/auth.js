// action constants
import {
  LOGOUT,
  CHECK_SESSION, SESSION_VALID, SESSION_INVALID,
  LOGIN, REGISTER, DISSMISS_AUTH_ERROR
} from '../actions/auth';

// flag constants
import { FAILURE, SUCCESS } from '../actions/auth';

const initialState = {
  loggedIn: false,
  loading: false,
  error: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            loggedIn: true,
            uid: action.payload.uid,
          }
        case FAILURE:
          return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.payload,
          };
        default:
          return {
            ...state,
            loading: true,
            error: false,
          };
      }
    case REGISTER:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
          }
        case FAILURE:
          return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.payload,
          };
        default:
          return {
            ...state,
            loading: true,
            error: false,
          };
      }
    case CHECK_SESSION:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SESSION_VALID:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        uid: action.payload.uid,
      };
    case DISSMISS_AUTH_ERROR:
      return {
        ...state,
        error: false,
      };
    case LOGOUT:
    case SESSION_INVALID:
      return {
        loggedIn: false,
        loading: false,
        error: false,
      };
    default:
      return state;
  };
};

export default auth;