import reducer from './auth';
import * as actions from '../actions/auth';
import expect from 'expect';

it('should return the initial state', () => {
    const expectedResult = {
            "error": false,
            "loading": false,
            "loggedIn": false
    }
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle LOGOUT', () => {
    const expectedResult = {
        "error": false,
        "loading": false,
        "loggedIn": false
    }
    const startAction = {
      type: actions.LOGOUT
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle CHECK_SESSION', () => {
    const expectedResult = {
        "error": false,
        "loading": true
    }
    const startAction = {
      type: actions.CHECK_SESSION
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  xit('should handle SESSION_VALID', () => {
    const expectedResult = {
        "error": false,
        "loading": true
    }
    const startAction = {
      type: actions.SESSION_VALID
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle SESSION_INVALID', () => {
    const expectedResult = {
        "error": false,
        "loading": false,
        "loggedIn": false
    }
    const startAction = {
      type: actions.SESSION_INVALID
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle LOGIN', () => {
    const expectedResult = {
        loading: true,
        error: false,
    }
    const startAction = {
      type: actions.LOGIN
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle REGISTER', () => {
    const expectedResult = {
        loading: true,
        error: false,
    }
    const startAction = {
      type: actions.REGISTER
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });

  it('should handle DISSMISS_AUTH_ERROR', () => {
    const expectedResult = {
        error: false,
    }
    const startAction = {
      type: actions.DISSMISS_AUTH_ERROR
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual(expectedResult);
  });