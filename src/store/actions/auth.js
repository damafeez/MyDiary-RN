import AsyncStorage from '@react-native-community/async-storage';
import * as types from './types';

const signupLoading = (payload = true) => ({
  type: types.SIGNUP_LOADING,
  payload
});
const loginLoading = (payload = true) => ({
  type: types.LOGIN_LOADING,
  payload
});
const setUser = (user, dispatch, API) => {
  AsyncStorage.setItem('user', JSON.stringify(user))
  API.UPDATE_TOKEN(user.token);
  dispatch({type: types.SET_USER, payload: user});
};

export const signup = (payload) => async (dispatch, getState, API) => {
  try {
    dispatch(signupLoading());
    const request = await API.signup(payload);
    const {data: user} = request.data;
    setUser(user, dispatch, API);
    return {succes: true}
  } catch (e) {
    const error = e.response.data.error ? e.response.data.error[0] : 'An Error Occoured';
    dispatch(signupLoading(false));
    return {error}
  }
};

export const login = (payload) => async (dispatch, getState, API) => {
  try {
    dispatch(loginLoading());
    const request = await API.login(payload);
    const { data: user } = request.data;
    setUser(user, dispatch, API);
    return {succes: true}
  } catch (e) {
    const error = e.response.data.error ? e.response.data.error[0] : 'An Error Occoured';
    dispatch(loginLoading(false));
    return {error}
  }
};

export const signout = () => (dispatch, getState, API) => {
  AsyncStorage.clear();
  API.UPDATE_TOKEN(null);
  dispatch({ type: types.SIGN_OUT });
};
