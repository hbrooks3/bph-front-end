import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as workoutActions from './workouts';

it('dismisses workout error', () =>{
    const expectedAction = {
        type: workoutActions.WORKOUT_DISMISS_ERROR,
        id: 'workoutId'
    }
    expect(workoutActions.dismissWorkoutError('workoutId')).toEqual(expectedAction);
})

it('clears workouts', () =>{
    const expectedAction = {
        type: workoutActions.WORKOUTS_CLEAR
    }
    expect(workoutActions.clearWorkouts()).toEqual(expectedAction);
})