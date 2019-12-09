import reducer from './plans';
import * as actions from '../actions/plans';
import expect from 'expect';

it('should return the initial state', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle PLAN_GET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loaded":false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.PLAN_GET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle PLAN_EDIT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.PLAN_EDIT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle PLAN_DISSMISS_ERROR', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    const startAction = {
      type: actions.PLAN_DISSMISS_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle PLANS_CLEAR', () => {
    const expectedResult = {}
    const startAction = {
      type: actions.PLANS_CLEAR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle PLAN_ADD_WORKOUT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.PLAN_ADD_WORKOUT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });