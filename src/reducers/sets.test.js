import reducer from './sets';
import * as actions from '../actions/sets';
import expect from 'expect';

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle SET_GET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loaded":false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.SET_GET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle SET_EDIT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.SET_EDIT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle SET_DISMISS_ERROR', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    const startAction = {
      type: actions.SET_DISMISS_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle SETS_CLEAR', () => {
    const expectedResult = {}
    const startAction = {
      type: actions.SETS_CLEAR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });