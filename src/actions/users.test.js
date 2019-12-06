import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as userActions from './users';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(()=>{
        fetchMock.restore();
    })

    // it('gets user', () => {
    //     fetchMock.getOnce(
    //         '/GetCurrentUser',
    //         {
    //             // body:{},
    //             // headers:'testheaders'
    //         })
    //     const expectedActions = [
    //         {   type: userActions.USER_GET,
    //             flag: userActions.FAILURE,
    //             id: 'id',
    //             payload: 'response.error' }
    //     ]

    //     const store = mockStore({ todos: [] });

    //     return store.dispatch(userActions.getUser('id')).then(() => {
    //         expect(store.getActions()).toEqual(expectedActions);
    //     })
    // })
})
describe('account type', () => {

    it('gets account type Trainee', () =>{
        const expectedAction = {auth: { uid: 123}, users: {123: {accountType: 0, loaded: true} }}
        expect(userActions.getAccountType(expectedAction)).toEqual('Trainee')
    })

    it('gets account type Coach', () =>{
        const expectedAction = {auth: { uid: 123}, users: {123: {accountType: 1, loaded: true} }}
        expect(userActions.getAccountType(expectedAction)).toEqual('Coach')
    })

    it('fails to have uid', () =>{
        const expectedAction = {auth: {users: {123: {accountType: 0, loaded: true}} }}
        expect(userActions.getAccountType(expectedAction)).toEqual(null)
    })

    it('fails to have user loaded', () =>{
        const expectedAction = {auth: { uid: 123}, users: {123: {accountType: 1, loaded: false} }}
        expect(userActions.getAccountType(expectedAction)).toEqual(null)
    })

    it('invalid account type', () =>{
        const expectedAction = {auth: { uid: 123}, users: {123: {accountType: 7, loaded: true} }}
        expect(userActions.getAccountType(expectedAction)).toEqual(null)
    })
})

it('dissmisses user error', () =>{
    const expectedAction = {
        type: userActions.USER_DISMISS_ERROR,
        id: 'id'
    }
    expect(userActions.dismissUserError('id')).toEqual(expectedAction);
})

it('clears users', () =>{
    const expectedAction = {
        type: userActions.USERS_CLEAR
    }
    expect(userActions.clearUsers()).toEqual(expectedAction);
})