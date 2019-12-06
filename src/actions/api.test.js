import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import * as apiActions from './api';

xit('calls API', () =>{

    expect(apiActions.callApi("url", "body","callback")).toEqual({error: "Unable to connect to Badger Powerlifting Hub"})
    //dismissUserError('id')).toEqual(expectedAction);
})