import * as types from '../actions/actionTypes';

const initialState = {
  email: '',
  name: '',
  password: '',
  state: ''
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return Object.assign({}, state, {
        email: action.email,
        password: action.password,
        state: action.type
      });
    case types.SIGNUP_START:
      return Object.assign({}, state, {
        email: action.email,
        name: action.name,
        password: action.password,
        state: action.type
      });
    case types.LOGIN_SUCCESSFUL:
    case types.LOGIN_FAILED:
    case types.SIGNUP_SUCCESSFUL:
    case types.SIGNUP_FAILED:
      return Object.assign({}, state, {
        state: action.type
      });
    default:
      return state;
  }
}
