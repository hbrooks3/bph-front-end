// actions constants
import {
  WORKOUT_GET, WORKOUT_EDIT, WORKOUT_ADD_EXERCISE, WORKOUT_DISMISS_ERROR, WORKOUTS_CLEAR,
  WORKOUT_ADD_COMMENT, WORKOUT_DELETE_COMMENT,
} from '../actions/workouts';

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
    case WORKOUT_DISMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    case WORKOUT_ADD_COMMENT:
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
    case WORKOUT_DELETE_COMMENT:
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
    default:
      return state;
  };
};

const workouts = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_EDIT:
    case WORKOUT_GET:
    case WORKOUT_ADD_EXERCISE:
    case WORKOUT_DISMISS_ERROR:
    case WORKOUT_ADD_COMMENT:
    case WORKOUT_DELETE_COMMENT:
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