import * as types from './actionTypes';
import ApiClass from '../services/api';

function loginStart(email, password) {
  return {
    type: types.LOGIN_START,
    email: email,
    password: password
  };
}

function loginSuccess() {
    return {
      type: types.LOGIN_SUCCESSFUL
    };
}

function loginFail() {
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
      dispatch(loginFail());
    })
  }
}

function signupStart(email, name, password) {
  return {
    type: types.SIGNUP_START,
    email: email,
    name: name,
    password: password
  };
}

function signupSuccess() {
  return {
    type : types.SIGNUP_SUCCESSFUL
  };
}

function signupFail() {
  return {
    type : types.SIGNUP_FAILED
  };
}

export function signup(email, name, password) {
  return (dispatch, getState) => {
    dispatch(signupStart(email, name, password));
    ApiClass.signup(email, name, password).then((response) => {
      dispatch(signupSuccess());
    }).catch((err) => {
      dispatch(signupFail());
    })
  }
}