import auth from './auth';
import users from './users';
import workouts from './workouts';
import plans from './plans';
import exercises from './exercises'
import sets from './sets'
import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth, users, workouts, plans, exercises, sets
});

export default reducer;