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

    xit('gets user', () => {
        fetchMock.getOnce(
            '/GetCurrentUser',
            {
                // body:{},
                // headers:'testheaders'
            })
        const expectedActions = [
            {   type: userActions.USER_GET,
                flag: userActions.FAILURE,
                id: 'id',
                payload: 'response.error' }
        ]

        const store = mockStore({ todos: [] });

        return store.dispatch(userActions.getUser('id')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})

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