import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as plansActions from './plans';

it('dismisses plan error', () =>{
    const expectedAction = {
        type: plansActions.PLAN_DISMISS_ERROR,
        id: 'planId'
    }
    expect(plansActions.dismissPlanError('planId')).toEqual(expectedAction);
})

it('clears plans', () =>{
    const expectedAction = {
        type: plansActions.PLANS_CLEAR
    }
    expect(plansActions.clearPlans()).toEqual(expectedAction);
})