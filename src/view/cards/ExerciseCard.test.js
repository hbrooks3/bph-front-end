import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseCard from './ExerciseCard.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';


it('clears users', () =>{
  const expectedAction = {
      type: userActions.USERS_CLEAR
  }
  expect(userActions.clearUsers()).toEqual(expectedAction);
})