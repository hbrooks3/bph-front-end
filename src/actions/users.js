// other actions
import { loadPlans } from './plans';
import { callApi } from './api';

// actions constants
const USER_GET = 'USER_GET';
const USER_EDIT = 'USER_EDIT';
const USER_ADD_PLAN = 'USER_ADD_PLAN';
const USER_DISMISS_ERROR = 'USER_DISMISS_ERROR';
const USERS_CLEAR = 'USERS_CLEAR';
const USER_ADD_TRAINEE = 'USER_ADD_TRAINEE';
export { USER_GET, USER_EDIT, USER_ADD_PLAN, USER_DISMISS_ERROR, USERS_CLEAR, USER_ADD_TRAINEE }

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

// user constants
const TRAINEE = 0;
const COACH = 1;
export { TRAINEE, COACH }

export const getAccountType = (state) => {
  const uid = state.auth.uid;

  if (!uid) {
    return null;
  }

  const user = state.users[uid];

  if (!(user && user.loaded)) {
    return null;
  }

  if (user.accountType === TRAINEE) {
    return 'Trainee';
  }

  if (user.accountType === COACH) {
    return 'Coach';
  }

  return null;
}

export const getUser = (id) => (dispatch, getState) => {
  dispatch({
    type: USER_GET,
    id: id,
  });

  const currUserId = getState().auth.uid;

  let callPath;

  if (id === currUserId) {
    callPath = '/api/User/GetCurrentUser';
  } else {
    const type = getState().users[currUserId].accountType;
    switch (type) {
      case TRAINEE:
        callPath = '/api/Trainee/GetCoach?coachId=' + id;
        break;
      case COACH:
        callPath = '/api/Coach/GetTrainee?traineeId=' + id;
        break;
      default:
        callPath = '/api/User/GetCurrentUser';
        break;
    }
  }

  return callApi(
    callPath,
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
        if (id === currUserId) {
          dispatch(loadPlans(id));
          dispatch(loadTrainees(id));
        }
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

export const loadTrainees = (id) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (accountType !== 'Coach') {
    return;
  }

  return callApi(
    `/api/Coach/GetTrainees`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        console.log("Failed to load trainees", response.error);
      } else {
        response.forEach(trainee => {
          dispatch({
            type: USER_ADD_TRAINEE,
            id: id,
            payload: { traineeId: trainee.userId },
          });
          dispatch({
            type: USER_GET,
            flag: SUCCESS,
            id: trainee.userId,
            payload: trainee,
          });
        });
      }
    }
  );
}

export const dismissUserError = (id) => ({
  type: USER_DISMISS_ERROR,
  id
});

export const clearUsers = () => ({type: USERS_CLEAR});