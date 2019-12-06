import { callApi } from './api';
import { getAccountType } from './users';

// // actions constants
import { EXERCISE_ADD_SET } from './exercises'

// actions constants
const SET_GET = 'SET_GET';
const SET_EDIT = 'SET_EDIT';
const SET_DISMISS_ERROR = 'SET_DISMISS_ERROR';
const SETS_CLEAR = 'SETS_CLEAR';
export { SET_GET, SET_EDIT, SET_DISMISS_ERROR, SETS_CLEAR }

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const loadSets = (exerciseId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  return callApi(
    `/api/${accountType}/GetSets?exerciseId=${exerciseId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        console.log("Failed to load sets", response.error);
      } else {
        response.forEach(exercise => {
          dispatch({
            type: EXERCISE_ADD_SET,
            flag: SUCCESS,
            id: exerciseId,
            payload: { exerciseId: exercise.exerciseId },
          });
          dispatch({
            type: SET_GET,
            flag: SUCCESS,
            id: exercise.exerciseId,
            payload: exercise,
          });
        });
      }
    }
  );
}

export const getSet = (setId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: SET_GET,
    id: setId,
  });

  return callApi(
    `/api/${accountType}/GetSet?setId=${setId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: SET_GET,
          flag: FAILURE,
          id: setId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: SET_GET,
          flag: SUCCESS,
          id: setId,
          payload: response,
        });
      }
    }
  );
}

export const editSet = (set) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: SET_EDIT,
    id: set.id,
  });

  return callApi(
    `/api/${accountType}/UpdateSet`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...set }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: SET_EDIT,
          flag: FAILURE,
          id: set.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: SET_EDIT,
          flag: SUCCESS,
          id: set.id,
          payload: response,
        });
      }
    }
  );
}

export const dismissSetError = (setId) => ({
  type: SET_DISMISS_ERROR,
  id: setId,
});

export const clearSets = () => ({type: SETS_CLEAR});