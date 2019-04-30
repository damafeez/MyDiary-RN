import {combineReducers} from 'redux';
import auth from './auth';
import entries from './entries';
import ui from './ui';

export default combineReducers({
  auth,
  entries,
  ui,
});
