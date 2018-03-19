import { FETCH_CLOUDS, CLOUDS_UPDATED } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CLOUDS:
      return action.payload.data.clouds;
    case CLOUDS_UPDATED:
      return action.payload;
    default:
      return state;
  }
}
