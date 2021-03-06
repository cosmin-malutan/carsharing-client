import * as types from '../actions/actionTypes';

const initialState = {
  email: '',
  name: '',
  password: '',
  authenticated: false,
  state: '',
  actorType: 'rider'
}

export default function auth(state = initialState, action) {
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
    case types.SIGNUP_SUCCESSFUL:
      return Object.assign({}, state, {
        authenticated: true,
        state: action.type
      });
    case types.LOGOUT:
    case types.LOGIN_FAILED:
    case types.SIGNUP_FAILED:
      return Object.assign({}, state, {
        authenticated: false,
        state: action.type
      });
    case types.ACTOR_TYPE_CHANGE:
      return Object.assign({}, state, {
        actorType: action.actorType
      });
    default:
      return state;
  }
}
