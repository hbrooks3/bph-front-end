import fetch from 'cross-fetch'

export const SET_FETCH_ATTEMPT = 'SET_FETCH_ATTEMPT';
export const SET_FETCH_SUCCESS = 'SET_FETCH_SUCCESS';
export const SET_FETCH_FAILURE = 'SET_FETCH_FAILURE';

export const fetchWorkout = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: SET_FETCH_ATTEMPT,
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
          type: SET_FETCH_SUCCESS,
          payload: {id, time, ...json}
        });
      } else {
        dispatch({
          type: SET_FETCH_FAILURE,
          payload: {id, error: json.error}
        });
      };
    }).catch(
      dispatch({
        type: SET_FETCH_FAILURE,
        payload: {id, error: 'Failed to load workout'}
      })
    )
  );
};

export const SET_FETCH_DISMISS_ERROR = 'SET_FETCH_DISMISS_ERROR';

export const dismissWorkoutFetchError = (id) => ({
  type: SET_FETCH_DISMISS_ERROR,
  payload: {id}
});

export const SET_CLEAR_ALL = 'SET_CLEAR_ALL';

export const logout = () => ({type: SET_CLEAR_ALL});