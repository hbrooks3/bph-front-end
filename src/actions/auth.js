import fetch from 'cross-fetch'

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, password) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: LOGIN_ATTEMPT,
    payload: {email, password},
  });

  // Make call to backend
  return fetch(
    '/api/User/LoginUser',
    {
      method: 'POST',
      body: JSON.stringify({Email: email, Password: password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    credentials: 'include',
    }
  ).then(
    response => response.json().then(response => dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    })),
    error => dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    }),
  )
};

export const LOGIN_DISMISS_ERROR = 'LOGIN_DISMISS_ERROR';

export const dismissLoginError = () => ({type: LOGIN_DISMISS_ERROR});