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
      case "driver":
      default:
        console.log("Unhandled user type:", getState().auth.actorType);
    }
  }
}

export function cancel() {
  return {
    type : types.CANCEL_TRIP
  };
}
export function updateLocation(coords) {
  return {
    type : types.UPDATE_LOCATION,
    coords: coords
  };
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