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

function orderAssigned(order) {
  return Object.assign({}, {
    type: types.ORDER_ASSIGNED,
    order: order
  });
}

export function socketMessage(message) {
  
  return (dispatch, getState) => {
    message = JSON.parse(message.data || "{}");
    switch (message.type) {
      case "ORDER_ASSIGNED_TO_YOU":
        dispatch(orderAssigned(message.order));
        break;
      case "DRIVER_ASSIGNED_TO_YOUR_ORDER":
        dispatch({
          type: types.ORDER_ACCEPTED
        });
        break;
      default:
        console.log("Can't handle socket message: ", message.type);

    }
  }
}
