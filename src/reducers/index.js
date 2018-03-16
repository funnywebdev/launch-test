import { combineReducers } from 'redux-immutablejs';
import userReducer from './user';
import globalReducer from './global';
/**
 * The application's main reducer
 */
export default combineReducers({
  global: globalReducer,
  user: userReducer
});
