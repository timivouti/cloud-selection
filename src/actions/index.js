import axios from 'axios';
import geolib from 'geolib';

const ROOT_URL = 'https://api.aiven.io/v1beta/clouds';

export const FETCH_CLOUDS = 'fetch_clouds';
export const PROVIDER_CHANGE = 'provider_change';
export const LOCATION_CHANGE = 'location_change';
export const SORTED_LOCATION = 'sorted_location';
export const CLOUDS_UPDATED = 'clouds_updated';
export const CHANGED_SORT = 'changed_sort';

export function fetchClouds() {
  const request = axios.get(ROOT_URL);

  return {
    type: FETCH_CLOUDS,
    payload: request
  };
}

export function changeProvider(event) {
  return {
    type: PROVIDER_CHANGE,
    payload: event.target.value
  };
}

export function changeLocation(event) {
  return {
    type: LOCATION_CHANGE,
    payload: event.target.value
  };
}

export function sortByLocation(coords, clouds) {
  const sorted = geolib.orderByDistance({latitude: coords.latitude, longitude: coords.longitude}, clouds);

  return {
    type: SORTED_LOCATION,
    payload: sorted
  };
}

export function updateClouds(clouds) {
  return {
    type: CLOUDS_UPDATED,
    payload: clouds
  };
}

export function sortChange(value) {
  return {
    type: CHANGED_SORT,
    payload: value
  };
}
