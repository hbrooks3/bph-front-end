import fetch from 'cross-fetch'

export const WORKOUT_FETCH_ATTEMPT = 'WORKOUT_FETCH_ATTEMPT';
export const WORKOUT_FETCH_SUCCESS = 'WORKOUT_FETCH_SUCCESS';
export const WORKOUT_FETCH_FAILURE = 'WORKOUT_FETCH_FAILURE';

export const fetchWorkout = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: WORKOUT_FETCH_ATTEMPT,
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
        payload: {id, error: 'Failed to load workout'}
      })
    )
  );
};

export const WORKOUT_FETCH_DISMISS_ERROR = 'WORKOUT_FETCH_DISMISS_ERROR';

export const dismissWorkoutFetchError = (id) => ({
  type: WORKOUT_FETCH_DISMISS_ERROR,
  payload: {id}
});

export const WORKOUT_CLEAR_ALL = 'WORKOUT_CLEAR_ALL';

export const logout = () => ({type: WORKOUT_CLEAR_ALL});