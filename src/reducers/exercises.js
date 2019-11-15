import {
  EXERCISE_FETCH_ATTEMPT,
  EXERCISE_FETCH_SUCCESS,
  EXERCISE_FETCH_FAILURE,
  EXERCISE_FETCH_DISMISS_ERROR,
  EXERCISE_CLEAR_ALL,
} from '../actions/exercises';

const initialState = {
  cat: {
    id: 'abc',
    isFetching: false,
    isError: false,
    isLoaded: true,
    lastUpdated: 123456789,
    sets: ['cat', 'dog']
  },
  dog: {
    id: 'def',
    isFetching: true,
    isError: false,
    lastUpdated: 123456789,
  },
  ghi: {
    id: 'ghi',
    isFetching: false,
    isError: true,
    errorMessage: "Didn't Load!",
    lastUpdated: 123456789,
  }
};

const exercise = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_FETCH_ATTEMPT:
      return {
        ...state,
        id: action.payload.id,
        isFetching: true,
        isError: false,
        isLoaded: false,
      };
    case EXERCISE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.payload.time,
        isLoaded: true,
      };
    case EXERCISE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload.error,
      };
    case EXERCISE_FETCH_DISMISS_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  };
};

const exercises = (state = initialState, action) => {
  switch (action.type) {
    case EXERCISE_FETCH_ATTEMPT:
      return {
        ...state,
        [action.payload.id]: exercise(state[action.payload.id], action),
      };
    case EXERCISE_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.id]: exercise(state[action.payload.id], action),
      };
    case EXERCISE_FETCH_FAILURE:
      return {
        ...state,
        [action.payload.id]: exercise(state[action.payload.id], action),
      };
    case EXERCISE_FETCH_DISMISS_ERROR:
      return {
        ...state,
        [action.payload.id]: exercise(state[action.payload.id], action),
      };
    case EXERCISE_CLEAR_ALL:
      return {};
    default:
      return state;
  };
};

export default exercises;