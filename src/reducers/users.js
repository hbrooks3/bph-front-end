import {
  USER_FETCH_ATTEMPT, USER_FETCH_SUCCESS, USER_FETCH_FAILURE, USER_FETCH_DISMISS_ERROR, USERS_CLEAR_ALL
} from '../actions/users';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCH_ATTEMPT:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isLoaded: false,
        ...action.payload,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        ...action.payload,
      };
    case USER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload.error,
      };
    case USER_FETCH_DISMISS_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  };
};

// const initialState = {
//   123: {
//     id: '123',
//     isLoading: false,
//     firstName: "Hunter",
//     plans: [123,456],
//   },
// };

const initialState = {};

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