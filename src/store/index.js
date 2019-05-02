import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';
import * as types from './actions/types';
import initialState from './initialState';
import ApiClass from '../services/API';

const API = new ApiClass();

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk.withExtraArgument(API)),
);

AsyncStorage.getItem('user').then((user) => {
  const parsedUser = JSON.parse(user);
  if (parsedUser) {
    store.dispatch({type: types.SET_USER, payload: parsedUser});
    API.UPDATE_TOKEN(parsedUser.token);
  }
  store.dispatch({type: types.AUTHCHECK_COMPLETE});
});
AsyncStorage.getItem('entries').then((entries) => {
  const parsedEntries = JSON.parse(entries);
  if (parsedEntries) {
    store.dispatch({type: types.GET_ENTRIES_SUCCESS, payload: parsedEntries});
  }
});

export default store;
