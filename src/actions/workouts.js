import { callApi } from './api';
import { getAccountType } from './users';

// // actions constants
import { PLAN_ADD_WORKOUT } from './plans'

// actions constants
const WORKOUT_GET = 'WORKOUT_GET';
const WORKOUT_EDIT = 'WORKOUT_EDIT';
const WORKOUT_ADD_EXERCISE = 'WORKOUT_ADD_EXERCISE';
const WORKOUT_DISMISS_ERROR = 'WORKOUT_DISMISS_ERROR';
const WORKOUTS_CLEAR = 'WORKOUTS_CLEAR';
export { WORKOUT_GET, WORKOUT_EDIT, WORKOUT_ADD_EXERCISE, WORKOUT_DISMISS_ERROR, WORKOUTS_CLEAR }

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const loadWorkouts = (planId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  return callApi(
    `/api/${accountType}/GetWorkouts?planId=${planId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        console.log("Failed to load workouts", response.error);
      } else {
        response.forEach(plan => {
          dispatch({
            type: PLAN_ADD_WORKOUT,
            flag: SUCCESS,
            id: planId,
            payload: { planId: plan.planId },
          });
          dispatch({
            type: WORKOUT_GET,
            flag: SUCCESS,
            id: plan.planId,
            payload: plan,
          });
        });
      }
    }
  );
}

export const getWorkout = (workoutId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: WORKOUT_GET,
    id: workoutId,
  });

  return callApi(
    `/api/${accountType}/GetWorkout?workoutId=${workoutId}`,
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
          type: WORKOUT_GET,
          flag: FAILURE,
          id: workoutId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: WORKOUT_GET,
          flag: SUCCESS,
          id: workoutId,
          payload: response,
        });
      }
    }
  );
}

export const editWorkout = (workout) => (dispatch) => {
  dispatch({
    type: WORKOUT_EDIT,
    id: workout.id,
  });

  return callApi(
    '/api/Coach/UpdateWorkout',
    {
      method: 'PUT',
      body: JSON.stringify({ ...workout }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: WORKOUT_EDIT,
          flag: FAILURE,
          id: workout.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: WORKOUT_EDIT,
          flag: SUCCESS,
          id: workout.id,
          payload: response,
        });
      }
    }
  );
}

export const addExercise = (workoutId) => (dispatch) => {
  dispatch({
    type: WORKOUT_ADD_EXERCISE,
    id: workoutId
  });

  return callApi(
    '/api/Coach/CreateExercise',
    {
      method: 'POST',
      body: JSON.stringify({workoutId, exercise: {}}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: WORKOUT_ADD_EXERCISE,
          flag: FAILURE,
          id: workoutId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: WORKOUT_ADD_EXERCISE,
          flag: SUCCESS,
          id: workoutId,
          payload: response,
        });
      }
    }
  );
}

export const dismissWorkoutError = (workoutId) => ({
  type: WORKOUT_DISMISS_ERROR,
  id: workoutId,
});

export const clearWorkouts = () => ({type: WORKOUTS_CLEAR});