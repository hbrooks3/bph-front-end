import { getUser, clearUsers } from './users';

import { callApi } from './api';

// action constants
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOGOUT = 'LOGOUT';
const DISSMISS_AUTH_ERROR = 'DISSMISS_AUTH_ERROR';
const CHECK_SESSION = 'CHECK_SESSION';
const SESSION_VALID = 'SESSION_VALID';
const SESSION_INVALID= 'SESSION_INVALID';
export {
  LOGOUT,
  CHECK_SESSION, SESSION_VALID, SESSION_INVALID,
  LOGIN, REGISTER, DISSMISS_AUTH_ERROR
}

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const login = (email, password) => (dispatch) => {
  // Update app state to loading
  dispatch({
    type: LOGIN,
    payload: {email, password},
  });

  return callApi(
    '/api/User/LoginUser',
    {
      method: 'POST',
      body: JSON.stringify({
        Email: email ? email : '', Password: password ? password : '',
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: LOGIN,
          flag: FAILURE,
          payload: response.error,
        });
      } else if (response.userId) {
        const time = Date.now();
        dispatch({
          type: LOGIN,
          flag: SUCCESS,
          payload: {time, uid: response.userId},
        });
        dispatch( getUser(response.userId) );
      }
    }
  );
};

export const logout = () => (dispatch) => {
  // Update app state to loading
  dispatch({type: LOGOUT,});
  dispatch(clearUsers());

  return callApi(
    '/api/User/LogoutUser',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    error => console.log(error.error)
  );
}

export const register = (email, password) => (dispatch) => {
  dispatch({
    type: REGISTER,
    payload: {email, password},
  });

  return callApi(
    '/api/User/CreateUser',
    {
      method: 'POST',
      body: JSON.stringify({Email: email || '', Password: password || ''}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: REGISTER,
          flag: FAILURE,
          payload: response.error || "Failed to create account",
        });
      } else if (response.userId) {
        const time = Date.now();
        dispatch({
          type: REGISTER,
          flag: SUCCESS,
          payload: {time},
        });
        console.log('Account created, running login');
        dispatch(login(email,password));
      }
    }
  );
};

export const checkSession = () => (dispatch) => {
  dispatch({type: CHECK_SESSION});

  return callApi(
    '/api/User/CheckSessionStatus',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.validSession) {
        dispatch({
          type: SESSION_VALID,
          payload: {uid: response.userId},
        });
        dispatch( getUser(response.userId) );
      } else {
        dispatch({type: SESSION_INVALID})
      }
    }
  );
}

export const dissmissAuthError = () => ({type: DISSMISS_AUTH_ERROR});