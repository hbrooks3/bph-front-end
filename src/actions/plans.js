import fetch from 'cross-fetch';

const PLAN_FETCH_ATTEMPT = 'PLAN_FETCH_ATTEMPT';
const PLAN_FETCH_SUCCESS = 'PLAN_FETCH_SUCCESS';
const PLAN_FETCH_FAILURE = 'PLAN_FETCH_FAILURE';

export const fetchUser = (id) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: PLAN_FETCH_ATTEMPT,
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
          type: PLAN_FETCH_SUCCESS,
          payload: {id, time, ...json}
        });
      } else {
        dispatch({
          type: PLAN_FETCH_FAILURE,
          payload: {id, error: json.error}
        });
      };
    }).catch(
      dispatch({
        type: PLAN_FETCH_FAILURE,
        payload: {id, error: 'Failed to load plan'}
      })
    )
  );
};

const PLAN_FETCH_DISMISS_ERROR = 'PLAN_FETCH_DISMISS_ERROR';

export const dismissUserFetchError = () => ({type: PLAN_FETCH_DISMISS_ERROR});

const PLANS_CLEAR_ALL = 'PLANS_CLEAR_ALL';

export const clearUsers = () => ({type: PLANS_CLEAR_ALL});

export {
  PLAN_FETCH_ATTEMPT, PLAN_FETCH_SUCCESS, PLAN_FETCH_FAILURE, PLAN_FETCH_DISMISS_ERROR, PLANS_CLEAR_ALL
};