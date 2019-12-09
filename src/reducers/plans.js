// actions constants
import { PLAN_GET, PLAN_EDIT, PLAN_ADD_WORKOUT, PLAN_DISMISS_ERROR, PLANS_CLEAR } from '../actions/plans';

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
    case PLAN_DISMISS_ERROR:
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
    case PLAN_DISMISS_ERROR:
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