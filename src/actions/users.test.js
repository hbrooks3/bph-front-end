import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers/index.js';
import {MemoryRouter} from 'react-router-dom';
import * as userActions from './users';


it('dissmisses user error', () =>{
    const expectedAction = {
        type: userActions.USER_DISSMISS_ERROR,
        id: 'id'
    }
    expect(userActions.dissmissUserError('id')).toEqual(expectedAction);
})

it('clears users', () =>{
    const expectedAction = {
        type: userActions.USERS_CLEAR
    }
    expect(userActions.clearUsers()).toEqual(expectedAction);
})