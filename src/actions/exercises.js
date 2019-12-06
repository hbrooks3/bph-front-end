import { callApi } from './api';
import { getAccountType } from './users';
import { getComment } from './comments';

// // actions constants
import { WORKOUT_ADD_EXERCISE } from './workouts'

// actions constants
const EXERCISE_GET = 'EXERCISE_GET';
const EXERCISE_EDIT = 'EXERCISE_EDIT';
const EXERCISE_ADD_SET = 'EXERCISE_ADD_SET';
const EXERCISE_ADD_COMMENT = 'EXERCISE_ADD_COMMENT';
const EXERCISE_DELETE_COMMENT = 'EXERCISE_DELETE_COMMENT';
const EXERCISE_DISSMISS_ERROR = 'EXERCISE_DISSMISS_ERROR';
const EXERCISES_CLEAR = 'EXERCISES_CLEAR';
export { 
  EXERCISE_GET, EXERCISE_EDIT, EXERCISE_ADD_SET, EXERCISE_ADD_COMMENT,
  EXERCISE_DISSMISS_ERROR, EXERCISES_CLEAR, EXERCISE_DELETE_COMMENT
}

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const loadExercises = (workoutId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  return callApi(
    `/api/${accountType}/GetExercises?workoutId=${workoutId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        console.log("Failed to load exercises", response.error);
      } else {
        response.forEach(workout => {
          dispatch({
            type: WORKOUT_ADD_EXERCISE,
            flag: SUCCESS,
            id: workoutId,
            payload: { workoutId: workout.workoutId },
          });
          dispatch({
            type: EXERCISE_GET,
            flag: SUCCESS,
            id: workout.workoutId,
            payload: workout,
          });
        });
      }
    }
  );
}

export const getExercise = (exerciseId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: EXERCISE_GET,
    id: exerciseId,
  });

  return callApi(
    `/api/${accountType}/GetExercise?exerciseId=${exerciseId}`,
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
          type: EXERCISE_GET,
          flag: FAILURE,
          id: exerciseId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: EXERCISE_GET,
          flag: SUCCESS,
          id: exerciseId,
          payload: response,
        });
      }
    }
  );
}

export const editExercise = (exercise) => (dispatch) => {
  dispatch({
    type: EXERCISE_EDIT,
    id: exercise.id,
  });

  return callApi(
    '/api/Coach/UpdateExercise',
    {
      method: 'PUT',
      body: JSON.stringify({ ...exercise }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: EXERCISE_EDIT,
          flag: FAILURE,
          id: exercise.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: EXERCISE_EDIT,
          flag: SUCCESS,
          id: exercise.id,
          payload: response,
        });
      }
    }
  );
}

export const addSet = (exerciseId) => (dispatch) => {
  dispatch({
    type: EXERCISE_ADD_SET,
    id: exerciseId
  });

  return callApi(
    '/api/Coach/CreateSet',
    {
      method: 'POST',
      body: JSON.stringify({exerciseId, set: {}}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: EXERCISE_ADD_SET,
          flag: FAILURE,
          id: exerciseId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: EXERCISE_ADD_SET,
          flag: SUCCESS,
          id: exerciseId,
          payload: response,
        });
      }
    }
  );
}

export const addComment = (exerciseId, text) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: EXERCISE_ADD_COMMENT,
    id: exerciseId
  });

  return callApi(
    `/api/${accountType}/CreateComment`,
    {
      method: 'POST',
      body: JSON.stringify({comment: {description: text}, ownerId: exerciseId}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: EXERCISE_ADD_COMMENT,
          flag: FAILURE,
          id: exerciseId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: EXERCISE_ADD_COMMENT,
          flag: SUCCESS,
          id: exerciseId,
          payload: response,
        });
        dispatch(
          getComment(response.commentId)
        );
      }
    }
  );
}

export const deleteComment = (exerciseId) => (commentId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: EXERCISE_DELETE_COMMENT,
    id: exerciseId
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
          type: EXERCISE_DELETE_COMMENT,
          flag: FAILURE,
          id: exerciseId,
          payload: response.error || 'Failed to delete comment',
        });
      } else {
        dispatch({
          type: EXERCISE_DELETE_COMMENT,
          flag: SUCCESS,
          id: exerciseId,
          payload: commentId,
        });
      }
    }
  );
}

export const dissmissExerciseError = (exerciseId) => ({
  type: EXERCISE_DISSMISS_ERROR,
  id: exerciseId,
});

export const clearExercises = () => ({type: EXERCISES_CLEAR});