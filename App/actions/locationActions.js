import uuid from 'react-native-uuid';

import * as types from './actionTypes';
import ApiClass from '../services/api';

function sendOrder(id) {
  return {
    type: types.SEND_ORDER,
    uuid: id
  };
}

export function confirm() {
  return (dispatch, getState) => {
    switch (getState().auth.actorType) {
      case "rider":
        const trip = getState().position.trip;
        const id = uuid.v4();
        dispatch(sendOrder(id));
        ApiClass.sendOrder(trip, id);
        break;
      case "driver":
        var position = getState().position;
        ApiClass.acceptOrder(position.uuid, position.client);
        dispatch({
          type: types.IN_PROGRESS
        });
        break;
      default:
        console.log("Unhandled user type:", getState().auth.actorType);
    }
  }
}

export function cancel(uuid) {
  return (dispatch, getState) => {
    switch (getState().auth.actorType) {
      case "rider":
        dispatch({
          type : types.CANCEL_TRIP
        });
        break;
      case "driver":
        ApiClass.cancelOrder(getState().position.uuid);
        ApiClass.setDriverAvailable(getState().position.coords);
        dispatch({
          type : types.CANCEL_TRIP
        });
        break;
      default:
        console.log("Unhandled user type:", getState().auth.actorType);
    }
  }
}
export function updateLocation(coords) {
  return (dispatch, getState) => {
    debugger;
    dispatch({
      type : types.UPDATE_LOCATION,
      coords: coords
    });

    var isDriver = getState().auth.actorType == 'driver';
    if (isDriver && getState().position.inProgress)
      ApiClass.notifyDriverPosition(coords);
    else if (isDriver)
      ApiClass.setDriverAvailable(coords);

  }
}

function fecthTripStart() {
  return {
    type: types.FETCH_TRIP_START
  };
}

function fecthTripSuccess(trip) {
  return {
    type: types.FETCH_TRIP_SUCCESS,
    trip: trip
  }
}

function fecthTripFail(error) {
  return {
    type: types.FETCH_TRIP_FAIL,
    error: error
  }
}

export function destinationsSelect(destination) {
  return (dispatch, getState) => {
    const coords = getState().position.coords;
    dispatch(fecthTripStart());
    ApiClass.fecthTrip(`${coords.latitude},${coords.longitude}`, `place_id:${destination.place_id}`).then((response) => {
      dispatch(fecthTripSuccess(response));
    }).catch((err) => {
      dispatch(fecthTripFail(err));
    })
  }
}
