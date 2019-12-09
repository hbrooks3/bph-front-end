import reducer from './exercises';
import * as actions from '../actions/exercises';
import expect from 'expect';

it('should return the initial state', () => {

    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle EXERCISE_GET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loaded":false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.EXERCISE_GET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISE_EDIT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.EXERCISE_EDIT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISE_DISMISS_ERROR', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
        }
    }
    const startAction = {
      type: actions.EXERCISE_DISMISS_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISES_CLEAR', () => {
    const expectedResult = {}
    const startAction = {
      type: actions.EXERCISES_CLEAR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISE_ADD_SET', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.EXERCISE_ADD_SET
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISE_ADD_COMMENT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.EXERCISE_ADD_COMMENT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle EXERCISE_DELETE_COMMENT', () => {
    const expectedResult = {
        "undefined":{
            "error": false,
            "loading":true
        }
    }
    const startAction = {
      type: actions.EXERCISE_DELETE_COMMENT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });