// actions constants
import { WORKOUT_GET, WORKOUT_EDIT, WORKOUT_ADD_EXERCISE, WORKOUT_DISSMISS_ERROR, WORKOUTS_CLEAR } from '../actions/workouts';

// flag constants
import { FAILURE, SUCCESS } from '../actions/workouts';

const workout = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_GET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            ...action.payload,
            exercises: action.payload.exerciseIds,
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
    case WORKOUT_EDIT:
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
    case WORKOUT_ADD_EXERCISE:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            exercises: [...state.exercises, action.payload.exerciseId]
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
    case WORKOUT_DISSMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    default:
      return state;
  };
};

const workouts = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_EDIT:
    case WORKOUT_GET:
    case WORKOUT_ADD_EXERCISE:
    case WORKOUT_DISSMISS_ERROR:
      return {
        ...state,
        [action.id]: workout(state[action.id], action),
      };
    case WORKOUTS_CLEAR:
      return {};
    default:
      return state;
  };
};

export default workouts;