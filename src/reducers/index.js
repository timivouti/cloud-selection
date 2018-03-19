import { combineReducers } from 'redux';
import CloudsReducer from './reducer_clouds';
import OptionsReducer from './reducer_options';

const rootReducer = combineReducers({
  clouds: CloudsReducer,
  options: OptionsReducer
});

export default rootReducer;
