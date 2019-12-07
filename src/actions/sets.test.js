import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as setsActions from './sets';

it('dismisses set error', () =>{
    const expectedAction = {
        type: setsActions.SET_DISMISS_ERROR,
        id: 'setId'
    }
    expect(setsActions.dismissSetError('setId')).toEqual(expectedAction);
})

it('clears sets', () =>{
    const expectedAction = {
        type: setsActions.SETS_CLEAR
    }
    expect(setsActions.clearSets()).toEqual(expectedAction);
})