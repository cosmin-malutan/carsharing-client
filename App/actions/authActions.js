import { AsyncStorage } from 'react-native';

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
      AsyncStorage.setItem('creditentials', JSON.stringify({
        email: email,
        password: password
      }));
      ApiClass.connectWebSocket(dispatch);
    }).catch((err) => {
      dispatch(loginFail(err));
      AsyncStorage.removeItem('creditentials');
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
      AsyncStorage.setItem('creditentials', JSON.stringify({
        email: email,
        password: password
      }));
      ApiClass.connectWebSocket(dispatch);
    }).catch((err) => {
      dispatch(signupFail(err));
      AsyncStorage.removeItem('creditentials');
    })
  }
}

export function checkUser() {
  return (dispatch, getState) => {
    // Check user and try to login
    AsyncStorage.getItem('creditentials').then((data) => {
      if (data) {
        var creditentials = JSON.parse(data);
        dispatch(login(creditentials.email, creditentials.password));
      }
    }).catch((err) => {
      AsyncStorage.removeItem('creditentials');
    })
  }
}

export function actorTypeChange(type) {
  return {
    type: types.ACTOR_TYPE_CHANGE,
    actorType: type
  }
}
