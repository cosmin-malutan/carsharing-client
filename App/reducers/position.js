import * as types from '../actions/actionTypes';

const initialState = {
  coords: {
    latitude: 46,
    longitude: 23
  },
  inProgress: false,
  client: null,
  driver: null,
  order: null,
  trip: null,
  tripRequestState: ''
}

export default function position (state = initialState, action) {
  switch (action.type) {
    case types.CANCEL_TRIP:
      return Object.assign({}, state, {
        trip: null
      });
    case types.SEND_ORDER:
      return Object.assign({}, state, {
        order: action.uuid,
      });
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
    case types.ORDER_ASSIGNED:
      return Object.assign({}, state, {
        trip: action.order.trip,
        uuid: action.order.uuid,
        client: action.order.rider
      });
    case types.ORDER_ACCEPTED:
      return Object.assign({}, state, {
        inProgress: true,
        driver: action.coords
      });
    case types.IN_PROGRESS:
      return Object.assign({}, state, {
        inProgress: true
      });
    case types.DRIVER_POSITION:
      return Object.assign({}, state, {
        driver: action.coords
      });
    default:
      return state;
  }
}