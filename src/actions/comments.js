import { callApi } from './api';
import { getAccountType } from './users';

// actions constants
const COMMENT_GET = 'COMMENT_GET';
const COMMENT_EDIT = 'COMMENT_EDIT';
const COMMENT_DISMISS_ERROR = 'COMMENT_DISMISS_ERROR';
const COMMENTS_CLEAR = 'COMMENTS_CLEAR';
export { COMMENT_GET, COMMENT_EDIT, COMMENT_DISMISS_ERROR, COMMENTS_CLEAR };

// flag constants
const FAILURE = 'FAILURE';
const SUCCESS = 'SUCCESS';
export { FAILURE, SUCCESS };

export const getComment = (commentId) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: COMMENT_GET,
    id: commentId,
  });

  return callApi(
    `/api/${accountType}/GetComment?commentId=${commentId}`,
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
          type: COMMENT_GET,
          flag: FAILURE,
          id: commentId,
          payload: response.error,
        });
      } else {
        dispatch({
          type: COMMENT_GET,
          flag: SUCCESS,
          id: commentId,
          payload: response,
        });
      }
    }
  );
}

export const editComment = (comment) => (dispatch, getState) => {
  const accountType = getAccountType(getState());

  if (!accountType) {
    return;
  }

  dispatch({
    type: COMMENT_EDIT,
    id: comment.id,
  });

  return callApi(
    `/api/${accountType}/UpdateComment`,
    {
      method: 'PUT',
      body: JSON.stringify({ ...comment }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    },
    response => {
      if (response.error) {
        dispatch({
          type: COMMENT_EDIT,
          flag: FAILURE,
          id: comment.id,
          payload: response.error,
        });
      } else {
        dispatch({
          type: COMMENT_EDIT,
          flag: SUCCESS,
          id: comment.id,
          payload: response,
        });
      }
    }
  );
}

export const dismissCommentError = (commentId) => ({
  type: COMMENT_DISMISS_ERROR,
  id: commentId,
});

export const clearComments = () => ({type: COMMENTS_CLEAR});