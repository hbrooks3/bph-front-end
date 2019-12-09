import reducer from './workouts';
import * as actions from '../actions/workouts';
import expect from 'expect';

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle WORKOUT_GET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loaded":false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.WORKOUT_GET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUT_EDIT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.WORKOUT_EDIT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUT_DISMISS_ERROR', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    const startAction = {
      type: actions.WORKOUT_DISMISS_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUTS_CLEAR', () => {
    const expectedResult = {}
    const startAction = {
      type: actions.WORKOUTS_CLEAR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUT_ADD_EXERCISE', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.WORKOUT_ADD_EXERCISE
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUT_ADD_COMMENT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.WORKOUT_ADD_COMMENT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle WORKOUT_DELETE_COMMENT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.WORKOUT_DELETE_COMMENT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });