// actions constants
import {
  PLAN_GET, PLAN_EDIT, PLAN_ADD_WORKOUT, PLAN_DISSMISS_ERROR, PLANS_CLEAR,
  PLAN_ADD_COMMENT, PLAN_DELETE_COMMENT
} from '../actions/plans';

// flag constants
import { FAILURE, SUCCESS } from '../actions/plans';

const plan = (state = {}, action) => {
  switch (action.type) {
    case PLAN_GET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            ...action.payload,
            workouts: action.payload.workoutIds,
            comments: action.payload.commentIds,
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
    case PLAN_EDIT:
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
    case PLAN_ADD_WORKOUT:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            workouts: [...state.workouts, action.payload.workoutId]
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
    case PLAN_ADD_COMMENT:
        switch (action.flag) {
          case SUCCESS:
            return {
              ...state,
              loading: false,
              error: false,
              comments: [...state.comments, action.payload.commentId]
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
    case PLAN_DELETE_COMMENT:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            comments: state.comments.filter(id => id !== action.payload)
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
    case PLAN_DISSMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    default:
      return state;
  };
};

const plans = (state = {}, action) => {
  switch (action.type) {
    case PLAN_EDIT:
    case PLAN_GET:
    case PLAN_ADD_WORKOUT:
    case PLAN_DISSMISS_ERROR:
    case PLAN_ADD_COMMENT:
    case PLAN_DELETE_COMMENT:
      return {
        ...state,
        [action.id]: plan(state[action.id], action),
      };
    case PLANS_CLEAR:
      return {};
    default:
      return state;
  };
};

export default plans;