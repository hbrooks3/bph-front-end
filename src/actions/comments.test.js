import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as commentsActions from './comments';

it('dismisses comment error', () =>{
    const expectedAction = {
        type: commentsActions.COMMENT_DISMISS_ERROR,
        id: 'commentId'
    }
    expect(commentsActions.dismissCommentError('commentId')).toEqual(expectedAction);
})

it('clears comments', () =>{
    const expectedAction = {
        type: commentsActions.COMMENTS_CLEAR
    }
    expect(commentsActions.clearComments()).toEqual(expectedAction);
})