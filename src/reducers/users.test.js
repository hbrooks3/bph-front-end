import reducer from './users';
import * as actions from '../actions/users';
import expect from 'expect';

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

 it('should handle USER_GET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loaded":false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.USER_GET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle USER_EDIT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.USER_EDIT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle USER_ADD_PLAN', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.USER_ADD_PLAN
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle USER_DISMISS_ERROR', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    const startAction = {
      type: actions.USER_DISMISS_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle USERS_CLEAR', () => {
    const expectedResult = {}
    const startAction = {
      type: actions.USERS_CLEAR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  xit('should handle USER_ADD_TRAINEE', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.USER_ADD_TRAINEE
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });