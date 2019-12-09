import { callApi } from './api';
import { getAccountType } from './users';

// actions constants
import { USER_ADD_PLAN } from './users'

// actions constants
const PLAN_GET = 'PLAN_GET';
const PLAN_EDIT = 'PLAN_EDIT';
const PLAN_ADD_WORKOUT = 'PLAN_ADD_WORKOUT';
const PLAN_DISMISS_ERROR = 'PLAN_DISMISS_ERROR';
const PLANS_CLEAR = 'PLANS_CLEAR';
export { PLAN_GET, PLAN_EDIT, PLAN_ADD_WORKOUT, PLAN_DISMISS_ERROR, PLANS_CLEAR }

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const loadPlans = (id) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  return callApi(
    `/api/${accountType}/GetPlans`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        console.log("Failed to load plans", response.error);
      } else {
        response.forEach(plan => {
          dispatch({
            type: USER_ADD_PLAN,
            flag: SUCCESS,
            id: id,
            payload: { planId: plan.planId },
          });
          dispatch({
            type: PLAN_GET,
            flag: SUCCESS,
            id: plan.planId,
            payload: plan,
          });
        });
      }
    }
  );
}

export const getPlan = (id) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }
  
  dispatch({
    type: PLAN_GET,
    id: id,
  });

  return callApi(
    `/api/${accountType}/GetPlan?planId=${id}`,
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
          type: PLAN_GET,
          flag: FAILURE,
          id: id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: PLAN_GET,
          flag: SUCCESS,
          id: id,
          payload: response,
        });
      }
    }
  );
}

export const editPlan = (plan) => (dispatch) => {
  dispatch({
    type: PLAN_EDIT,
    id: plan.id,
  });

  return callApi(
    '/api/Coach/UpdatePlan',
    {
      method: 'PUT',
      body: JSON.stringify({ ...plan }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: PLAN_EDIT,
          flag: FAILURE,
          id: plan.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: PLAN_EDIT,
          flag: SUCCESS,
          id: plan.id,
          payload: response,
        });
      }
    }
  );
}

export const addWorkout = (id) => (dispatch) => {
  dispatch({
    type: PLAN_ADD_WORKOUT,
    id
  });

  return callApi(
    '/api/Coach/CreateWorkout',
    {
      method: 'POST',
      body: JSON.stringify({planId: id, workout: {}}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: PLAN_ADD_WORKOUT,
          flag: FAILURE,
          id: id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: PLAN_ADD_WORKOUT,
          flag: SUCCESS,
          id: id,
          payload: response,
        });
      }
    }
  );
}

export const dismissPlanError = (id) => ({
  type: PLAN_DISMISS_ERROR,
  id
});

export const clearPlans = () => ({type: PLANS_CLEAR});