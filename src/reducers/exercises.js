// actions constants
import {
  EXERCISE_GET, EXERCISE_EDIT, EXERCISE_ADD_SET, EXERCISE_ADD_COMMENT, EXERCISE_DISSMISS_ERROR, 
  EXERCISES_CLEAR, EXERCISE_DELETE_COMMENT
} from '../actions/exercises';

// flag constants
import { FAILURE, SUCCESS } from '../actions/exercises';

const exercise = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_GET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            ...action.payload,
            sets: action.payload.setIds,
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
    case EXERCISE_EDIT:
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
    case EXERCISE_ADD_SET:
      switch (action.flag) {
        case SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            sets: [...state.sets, action.payload.setId]
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
    case EXERCISE_ADD_COMMENT:
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
    case EXERCISE_DELETE_COMMENT:
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
    case EXERCISE_DISSMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    default:
      return state;
  };
};

const exercises = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_EDIT:
    case EXERCISE_GET:
    case EXERCISE_ADD_SET:
    case EXERCISE_ADD_COMMENT:
    case EXERCISE_DISSMISS_ERROR:
    case EXERCISE_DELETE_COMMENT:
      return {
        ...state,
        [action.id]: exercise(state[action.id], action),
      };
    case EXERCISES_CLEAR:
      return {};
    default:
      return state;
  };
};

export default exercises;