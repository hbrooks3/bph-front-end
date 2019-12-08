import reducer from './plans';
import * as actions from '../actions/plans';
import expect from 'expect';

it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });