import { PROVIDER_CHANGE, LOCATION_CHANGE, CHANGED_SORT } from '../actions/index';

const INITIAL_STATE = { provider: 'null', location: 'null', sorted: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROVIDER_CHANGE:
      return { ...state, provider: action.payload };
    case LOCATION_CHANGE:
      return { ...state, location: action.payload };
    case CHANGED_SORT:
      return { ...state, sorted: action.payload };
    default:
      return state;
  }
}
