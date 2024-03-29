// actions constants
import { USER_GET, USER_EDIT, USER_ADD_PLAN, USER_DISMISS_ERROR, USERS_CLEAR, USER_ADD_TRAINEE } from '../actions/users';

// flag constants
import { FAILURE, SUCCESS } from '../actions/users';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_GET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            plans: [],
            trainees: [],
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
    case USER_EDIT:
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
    case USER_ADD_PLAN:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            plans: [action.payload.planId, ...state.plans]
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
    case USER_DISMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    case USER_ADD_TRAINEE:
      return {
        ...state,
        trainees: [...state.trainees, action.payload.traineeId]
      }
    default:
      return state;
  };
};

const users = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT:
    case USER_GET:
    case USER_ADD_PLAN:
    case USER_DISMISS_ERROR:
    case USER_ADD_TRAINEE:
      return {
        ...state,
        [action.id]: user(state[action.id], action),
      };
    case USERS_CLEAR:
      return {};
    default:
      return state;
  };
};

export default users;