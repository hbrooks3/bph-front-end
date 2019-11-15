import fetch from 'cross-fetch';

const EXERCISE_FETCH_ATTEMPT = 'EXERCISE_FETCH_ATTEMPT';
const EXERCISE_FETCH_SUCCESS = 'EXERCISE_FETCH_SUCCESS';
const EXERCISE_FETCH_FAILURE = 'EXERCISE_FETCH_FAILURE';

export const fetchUser = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: EXERCISE_FETCH_ATTEMPT,
    payload: { id },
  });

  // Make call to backend
  return fetch(
    '/api/Coach/GetPlan',
    {
      method: 'GET',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    credentials: 'include',
    }
  ).then(
    response => response.json().then(json => {
      if (response.ok) {
        const time = Date.now();
        dispatch({
          type: EXERCISE_FETCH_SUCCESS,
          payload: {id, time, ...json}
        });
      } else {
        dispatch({
          type: EXERCISE_FETCH_FAILURE,
          payload: {id, error: json.error}
        });
      };
    }).catch(
      dispatch({
        type: EXERCISE_FETCH_FAILURE,
        payload: {id, error: 'Failed to load plan'}
      })
    )
  );
};

const EXERCISE_FETCH_DISMISS_ERROR = 'EXERCISE_FETCH_DISMISS_ERROR';

export const dismissUserFetchError = () => ({type: EXERCISE_FETCH_DISMISS_ERROR});

const EXERCISES_CLEAR_ALL = 'EXERCISES_CLEAR_ALL';

export const clearUsers = () => ({type: EXERCISES_CLEAR_ALL});

export {
  EXERCISE_FETCH_ATTEMPT, EXERCISE_FETCH_SUCCESS, EXERCISE_FETCH_FAILURE, EXERCISE_FETCH_DISMISS_ERROR, EXERCISES_CLEAR_ALL
};