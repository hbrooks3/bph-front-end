import {
  WORKOUT_FETCH_ATTEMPT,
  WORKOUT_FETCH_SUCCESS,
  WORKOUT_FETCH_FAILURE,
  WORKOUT_FETCH_DISMISS_ERROR,
  WORKOUT_CLEAR_ALL,
} from '../actions/workouts';

const initialState = {
  abc: {
    id: 'abc',
    isFetching: false,
    isError: false,
    lastUpdated: 123456789,
  },
  def: {
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

const workout = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_FETCH_ATTEMPT:
      return {
        id: action.payload.id,
        isFetching: true,
        isError: false,
      };
    case WORKOUT_FETCH_SUCCESS:
      return {
        isFetching: false,
        lastUpdated: action.payload.time,
      };
    case WORKOUT_FETCH_FAILURE:
      return {
        isFetching: false,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };
    case WORKOUT_FETCH_DISMISS_ERROR:
      return {
        isError: false,
      };
    default:
      return state;
  };
};

const workouts = (state = initialState, action) => {
  switch (action.type) {
    case WORKOUT_FETCH_ATTEMPT:
      return {
        ...state,
        [action.payload.id]: workout(state[action.payload.id], action),
      };
    case WORKOUT_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.id]: workout(state[action.payload.id], action),
      };
    case WORKOUT_FETCH_FAILURE:
      return {
        ...state,
        [action.payload.id]: workout(state[action.payload.id], action),
      };
    case WORKOUT_FETCH_DISMISS_ERROR:
      return {
        ...state,
        [action.payload.id]: workout(state[action.payload.id], action),
      };
    case WORKOUT_CLEAR_ALL:
      return {};
    default:
      return state;
  };
};

export default workouts;