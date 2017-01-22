import config from '../config';

import {socketConnected, socketClosed, socketMessage, socketError} from '../actions/socketActions';

const default_options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}
const DIRECTIONS_API = "https://maps.googleapis.com/maps/api/directions/json";

let socket;

class ApiClass {
  static call(url, options = {}) {
    var options = Object.assign({}, default_options, options);

    return new Promise((resolve, reject) => fetch(url, options)
      .then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      }));
  }

  static login(email, password) {
    return ApiClass.call(`${config.SERVER_PROTO}://${config.SERVER_HOST}:${config.SERVER_PORT}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }

  static signup(email, name, password) {
    return ApiClass.call(`${config.SERVER_PROTO}://${config.SERVER_HOST}:${config.SERVER_PORT}/signup`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          username: name,
          password: password
        })
    });
  }

  static fecthTrip(origin, destination) {
    return ApiClass.call(`${DIRECTIONS_API}?origin=${origin}&destination=${destination}&key=${config.GOOGLE_API_KEY}`);
  }

  static connectWebSocket(dispatch) {

    try {
      socket = new WebSocket(`ws://${config.SERVER_HOST}:${config.SERVER_PORT}`);
      socket.onerror = function(error) {
        console.error('socket error:', error.message);
        dispatch(socketError(error.message))
      };
      socket.onopen = function() {
        dispatch(socketConnected());
      };
      socket.onclose = function() {
        dispatch(socketClosed());
      };
      socket.onmessage = function(message) {
        dispatch(socketMessage(message));
      };
    } catch (err) {
      console.error('Failed to initialize websoket', err);
    }
  }
}

export default ApiClass;