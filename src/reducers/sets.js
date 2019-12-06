// actions constants
import { SET_GET, SET_EDIT, SET_DISMISS_ERROR, SETS_CLEAR } from '../actions/sets';

// flag constants
import { FAILURE, SUCCESS } from '../actions/sets';

const set = (state = {}, action) => {
  switch (action.type) {
    case SET_GET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            ...action.payload,
          }
        case FAILURE:
          return {
            ...state,
            loading: false,
            error: true,
            loaded: false,
            errorMessage: action.payload
          }
        default:
          return {
            ...state,
            id: action.id,
            loading: true,
            error: false,
            loaded: false,
          }
      }
    case SET_EDIT:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            ...action.payload,
          }
        case FAILURE:
          return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.payload
          }
        default:
          return {
            ...state,
            loading: true,
            error: false,
          }
      }
    case SET_DISMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    default:
      return state;
  };
};

const sets = (state = {}, action) => {
  switch (action.type) {
    case SET_EDIT:
    case SET_GET:
    case SET_DISMISS_ERROR:
      return {
        ...state,
        [action.id]: set(state[action.id], action),
      };
    case SETS_CLEAR:
      return {};
    default:
      return state;
  };
};

export default sets;