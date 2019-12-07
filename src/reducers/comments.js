// actions constants
import { 
  COMMENT_GET, COMMENT_EDIT, COMMENT_DISMISS_ERROR, COMMENTS_CLEAR
} from '../actions/comments';

// flag constants
import { FAILURE, SUCCESS } from '../actions/comments';

const comment = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_GET:
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
    case COMMENT_EDIT:
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
    case COMMENT_DISMISS_ERROR:
      return {
        ...state,
        error: false,
      }
    default:
      return state;
  };
};

const comments = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_GET:
    case COMMENT_EDIT:
    case COMMENT_DISMISS_ERROR:
      return {
        ...state,
        [action.id]: comment(state[action.id], action),
      };
    case COMMENTS_CLEAR:
      return {};
    default:
      return state;
  };
};

export default comments;