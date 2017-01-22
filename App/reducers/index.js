import { combineReducers } from 'redux';
import auth from './auth';
import position from './position';

// TODO: ADD REDUCER FOR SOCKET MESSAGES
export default combineReducers({
  auth,
  position
});
