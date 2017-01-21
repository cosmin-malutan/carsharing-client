import * as types from '../actions/actionTypes';

const initialState = {
  coords: {
    latitude: 46,
    longitude: 23
  },
  trip: null,
  tripRequestState: ''
}

export default function position (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return Object.assign({}, state, {
        coords: action.coords
      });
    case types.FETCH_TRIP_START:
      return Object.assign({}, state, {
        tripRequestState: action.type
      });
    case types.FETCH_TRIP_SUCCESS:
      return Object.assign({}, state, {
        tripRequestState: action.type,
        trip: action.trip
      });
    case types.FETCH_TRIP_FAIL:
      return Object.assign({}, state, {
        tripRequestState: action.type,
        trip: null
      });
    default:
      return state;
  }
}