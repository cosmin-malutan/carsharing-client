import * as types from './actionTypes';
import ApiClass from '../services/api';

function loginStart(email, password) {
    return {
      type: types.LOGIN_START,
      email: email,
      password: password
    };
}

function loginSuccess(email, password) {
    return {
      type: types.LOGIN_SUCCESSFUL
    };
}

function loginFail(email, password) {
    return {
      type: types.LOGIN_FAILED
    };
}

export function login(email, password) {
  return (dispatch, getState) => {
    dispatch(loginStart(email, password));
    ApiClass.login(email, password).then((response) => {
      dispatch(loginSuccess());
    }).catch((err) => {
      debugger;
    })
  }
}