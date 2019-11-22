import { callApi } from './api';

// actions constants
const USER_GET = 'USER_GET';
const USER_EDIT = 'USER_EDIT';
const USER_ADD_PLAN = 'USER_ADD_PLAN';
const USER_DISSMISS_ERROR = 'USER_DISSMISS_ERROR';
const USERS_CLEAR = 'USERS_CLEAR';
export { USER_GET, USER_EDIT, USER_ADD_PLAN, USER_DISSMISS_ERROR, USERS_CLEAR }

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const getUser = (id) => (dispatch) => {
  dispatch({
    type: USER_GET,
    id: id,
  });

  return callApi(
    '/api/User/GetCurrentUser',
    {
      method: 'GET',
      // body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: USER_GET,
          flag: FAILURE,
          id: id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: USER_GET,
          flag: SUCCESS,
          id: id,
          payload: response,
        });
      }
    }
  );
}

export const editUser = (user) => (dispatch) => {
  dispatch({
    type: USER_EDIT,
    id: user.id,
  });

  return callApi(
    '/api/User/UpdateUser',
    {
      method: 'PUT',
      body: JSON.stringify({ ...user }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: USER_EDIT,
          flag: FAILURE,
          id: user.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: USER_EDIT,
          flag: SUCCESS,
          id: user.id,
          payload: response,
        });
      }
    }
  );
}

export const addPlan = (id) => (dispatch) => {
  dispatch({
    type: USER_ADD_PLAN,
    id
  });

  return callApi(
    '/api/Coach/CreatePlan',
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: USER_ADD_PLAN,
          flag: FAILURE,
          id: id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: USER_ADD_PLAN,
          flag: SUCCESS,
          id: id,
          payload: response,
        });
      }
    }
  );
}

export const dissmissUserError = (id) => ({
  type: USER_DISSMISS_ERROR,
  id
});

export const clearUsers = () => ({type: USERS_CLEAR});