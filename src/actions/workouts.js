import fetch from 'cross-fetch';

const WORKOUT_FETCH_ATTEMPT = 'WORKOUT_FETCH_ATTEMPT';
const WORKOUT_FETCH_SUCCESS = 'WORKOUT_FETCH_SUCCESS';
const WORKOUT_FETCH_FAILURE = 'WORKOUT_FETCH_FAILURE';

export const fetchUser = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: WORKOUT_FETCH_ATTEMPT,
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
          type: WORKOUT_FETCH_SUCCESS,
          payload: {id, time, ...json}
        });
      } else {
        dispatch({
          type: WORKOUT_FETCH_FAILURE,
          payload: {id, error: json.error}
        });
      };
    }).catch(
      dispatch({
        type: WORKOUT_FETCH_FAILURE,
        payload: {id, error: 'Failed to load plan'}
      })
    )
  );
};

const WORKOUT_FETCH_DISMISS_ERROR = 'WORKOUT_FETCH_DISMISS_ERROR';

export const dismissUserFetchError = () => ({type: WORKOUT_FETCH_DISMISS_ERROR});

const WORKOUTS_CLEAR_ALL = 'WORKOUTS_CLEAR_ALL';

export const clearUsers = () => ({type: WORKOUTS_CLEAR_ALL});

export {
  WORKOUT_FETCH_ATTEMPT, WORKOUT_FETCH_SUCCESS, WORKOUT_FETCH_FAILURE, WORKOUT_FETCH_DISMISS_ERROR, WORKOUTS_CLEAR_ALL
};