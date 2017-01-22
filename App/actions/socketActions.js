import * as types from './actionTypes';

export function socketError(error) {
  return {
    type: types.SOCKET_ERROR,
    error: error
  }
}

export function socketConnected() {
  return {
    type: types.SOCKET_CONNECTED
  }
}

export function socketClosed() {
  return {
    type: types.SOCKET_CLOSED
  }
}

export function socketMessage(message) {
  return {
    type: types.SOCKET_MESSAGE,
    message: message
  }
}
