import * as types from './actionTypes';


export function updateLocation(coords) {
  return {
    type : types.UPDATE_LOCATION,
    coords: coords
  };
}