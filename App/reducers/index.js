import { combineReducers } from 'redux';
import auth from './auth';
import position from './position';

export default combineReducers({
  auth,
  position
});
