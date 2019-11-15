import fetch from 'cross-fetch'

export const EXERCISE_FETCH_ATTEMPT = 'EXERCISE_FETCH_ATTEMPT';
export const EXERCISE_FETCH_SUCCESS = 'EXERCISE_FETCH_SUCCESS';
export const EXERCISE_FETCH_FAILURE = 'EXERCISE_FETCH_FAILURE';

export const fetchWorkout = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: EXERCISE_FETCH_ATTEMPT,
    payload: { id },
  });

  // Make call to backend
  return fetch(
    '/api/Trainee/getWorkout', //TODO: Make correct call
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
        payload: {id, error: 'Failed to load workout'}
      })
    )
  );
};

export const EXERCISE_FETCH_DISMISS_ERROR = 'EXERCISE_FETCH_DISMISS_ERROR';

export const dismissWorkoutFetchError = (id) => ({
  type: EXERCISE_FETCH_DISMISS_ERROR,
  payload: {id}
});

export const EXERCISE_CLEAR_ALL = 'EXERCISE_CLEAR_ALL';

export const logout = () => ({type: EXERCISE_CLEAR_ALL});