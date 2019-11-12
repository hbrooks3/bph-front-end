import auth from './auth';
import users from './users';
import workouts from './workout';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth, users, workouts,
});

export default reducer;