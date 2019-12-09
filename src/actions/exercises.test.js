import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as exercisesActions from './exercises';

it('dismisses exercise error', () =>{
    const expectedAction = {
        type: exercisesActions.EXERCISE_DISMISS_ERROR,
        id: 'exerciseId'
    }
    expect(exercisesActions.dismissExerciseError('exerciseId')).toEqual(expectedAction);
})

it('clears exercises', () =>{
    const expectedAction = {
        type: exercisesActions.EXERCISES_CLEAR
    }
    expect(exercisesActions.clearExercises()).toEqual(expectedAction);
})