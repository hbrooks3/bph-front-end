import {
  USER_FETCH_ATTEMPT, USER_FETCH_SUCCESS, USER_FETCH_FAILURE, USER_FETCH_DISMISS_ERROR, USERS_CLEAR_ALL
} from '../actions/users';

const initialState = {
  123: {
    id: 123,
    isFetching: false,
    isError: false,
    lastUpdated: 123456789,
    email: "lifter1@gmail.com",
    firstName: "Phil",
    lastName: "Myez",
    height: "6'4\"",
    weight: "800lbs",
    plans: [123, 456],
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCH_ATTEMPT:
      return {
        id: action.payload.id,
        isFetching: true,
        isError: false,
      };
    case USER_FETCH_SUCCESS:
      return {
        isFetching: false,
        lastUpdated: action.payload.time,
        ...action.payload,
      };
    case USER_FETCH_FAILURE:
      return {
        isFetching: false,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };
    case USER_FETCH_DISMISS_ERROR:
      return {
        isError: false,
      };
    default:
      return state;
  };
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH_ATTEMPT:
      return {
        ...state,
        [action.payload.id]: user(state[action.payload.id], action),
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.id]: user(state[action.payload.id], action),
      };
    case USER_FETCH_FAILURE:
      return {
        ...state,
        [action.payload.id]: user(state[action.payload.id], action),
      };
    case USER_FETCH_DISMISS_ERROR:
      return {
        ...state,
        [action.payload.id]: user(state[action.payload.id], action),
      };
    case USERS_CLEAR_ALL:
      return {};
    default:
      return state;
  };
};

export default users;