import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as workoutActions from './workouts';

xit('dissmisses user fetch error', () =>{
    const expectedAction = {
        type: workoutActions.WORKOUT_FETCH_DISMISS_ERROR
    }
    expect(workoutActions.dismissUserFetchError()).toEqual(expectedAction);
})

xit('clears users', () =>{
    const expectedAction = {
        type: workoutActions.WORKOUTS_CLEAR_ALL
    }
    expect(workoutActions.clearUsers()).toEqual(expectedAction);
})