import fetch from 'cross-fetch'

const USER_FETCH_ATTEMPT = 'USER_FETCH_ATTEMPT';
const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE';

export const fetchUser = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: USER_FETCH_ATTEMPT,
    payload: { id },
  });

  // Make call to backend
  return fetch(
    '/api/getUser', //TODO: Make correct call
    {
      method: 'FETCH',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    credentials: 'include',
    }
  ).then(
    response => {
      if (response.ok) {
        response.json().then(response => {
          const time = Date.now();
          dispatch({
            type: USER_FETCH_SUCCESS,
            payload: { time, response },
          });
        });
      } else {
        dispatch({
          type: USER_FETCH_FAILURE,
          payload: response.statusText,
        });
      };
    },
    error => console.log(error.message)
  );
};

const USER_FETCH_DISMISS_ERROR = 'USER_FETCH_DISMISS_ERROR';

export const dismissUserFetchError = () => ({type: USER_FETCH_DISMISS_ERROR});

const USERS_CLEAR_ALL = 'USERS_CLEAR_ALL';

export const clearUsers = () => ({type: USERS_CLEAR_ALL});

export {
  USER_FETCH_ATTEMPT, USER_FETCH_SUCCESS, USER_FETCH_FAILURE, USER_FETCH_DISMISS_ERROR, USERS_CLEAR_ALL
};