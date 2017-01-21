import * as types from './actionTypes';
import ApiClass from '../services/api';


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