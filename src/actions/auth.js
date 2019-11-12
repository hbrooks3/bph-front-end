import fetch from 'cross-fetch';

import { clearUsers } from './users';

const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
    response => {
      if (response.ok) {
        response.json().then(response => {
          const time = Date.now();
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {time, id: response.id},
          });
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: response.statusText,
        });
      };
    },
    error => console.log(error.message)
  );
};

const LOGIN_DISMISS_ERROR = 'LOGIN_DISMISS_ERROR';

export const dismissLoginError = () => ({type: LOGIN_DISMISS_ERROR});

const LOGOUT = 'LOGOUT';

export const logout = () => (dispatch) => {
  // Update app state to loading
  dispatch({type: LOGOUT,});
  dispatch(clearUsers());

  return fetch('/api/User/LogoutUser');
}

export {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_DISMISS_ERROR, LOGOUT,
}