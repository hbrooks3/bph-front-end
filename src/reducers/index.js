import auth from './auth';
import users from './users';
import workouts from './workouts';
import plans from './plans';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  auth, users, workouts, plans,
});

export default reducer;