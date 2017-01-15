import * as types from '../actions/actionTypes';

const initialState = {
  coords: {
    latitude: 46,
    longitude: 23
  }
}

export default function position (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return Object.assign({}, state, {
        coords: action.coords
      });
    default:
      return state;
  }
}