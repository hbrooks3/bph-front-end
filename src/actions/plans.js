import { callApi } from './api';
import { getAccountType } from './users';
import { getComment } from './comments';

// actions constants
import { USER_ADD_PLAN } from './users'

// actions constants
const PLAN_GET = 'PLAN_GET';
const PLAN_EDIT = 'PLAN_EDIT';
const PLAN_ADD_WORKOUT = 'PLAN_ADD_WORKOUT';
const PLAN_DISSMISS_ERROR = 'PLAN_DISSMISS_ERROR';
const PLANS_CLEAR = 'PLANS_CLEAR';
const PLAN_ADD_COMMENT = 'PLAN_ADD_COMMENT';
const PLAN_DELETE_COMMENT = 'PLAN_DELETE_COMMENT';
export {
  PLAN_GET, PLAN_EDIT, PLAN_ADD_WORKOUT, PLAN_DISSMISS_ERROR, PLANS_CLEAR,
  PLAN_ADD_COMMENT, PLAN_DELETE_COMMENT
}

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

export const addComment = (planId, text) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: PLAN_ADD_COMMENT,
    id: planId
  });

  return callApi(
    `/api/${accountType}/CreateComment`,
    {
      method: 'POST',
      body: JSON.stringify({comment: {description: text}, ownerId: planId}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: PLAN_ADD_COMMENT,
          flag: FAILURE,
          id: planId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: PLAN_ADD_COMMENT,
          flag: SUCCESS,
          id: planId,
          payload: response,
        });
        dispatch(
          getComment(response.commentId)
        );
      }
    }
  );
}

export const deleteComment = (planId) => (commentId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: PLAN_DELETE_COMMENT,
    id: planId
  });

  return callApi(
    `/api/${accountType}/DeleteComment`,
    {
      method: 'DELETE',
      body: JSON.stringify({commentId}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error || !response.deleted) {
        dispatch({
          type: PLAN_DELETE_COMMENT,
          flag: FAILURE,
          id: planId,
          payload: response.error || 'Failed to delete comment',
        });
      } else {
        dispatch({
          type: PLAN_DELETE_COMMENT,
          flag: SUCCESS,
          id: planId,
          payload: commentId,
        });
      }
    }
  );
}

export const dissmissPlanError = (id) => ({
  type: PLAN_DISSMISS_ERROR,
  id
});

export const clearPlans = () => ({type: PLANS_CLEAR});