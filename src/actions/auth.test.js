import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as authActions from './auth';

it('dissmisses auth error', () =>{
    const expectedAction = {
        type: authActions.DISSMISS_AUTH_ERROR
    }
    expect(authActions.dissmissAuthError()).toEqual(expectedAction);
})

xit('check session returns correctly', () =>{
    const expectedResult = dispatch({
        type: SESSION_VALID,
        payload: {uid: response.userId},
      });
    expect(authActions.checkSession(()=>{})).toEqual(expectedResult);
})