import * as types from '../actions/types';
import initialState from '../initialState';

export default (state = {}, {type, payload}) => {
  switch(type) {
    case types.AUTHCHECK_COMPLETE:
      return {
        ...state,
        authCheckComplete: true,
      }
    case types.SET_USER:
      return {
        ...state,
        user: payload,
        signupLoading: false,
      };
    case types.SIGNUP_LOADING:
      return {
        ...state,
        signupLoading: payload,
      };
    case types.LOGIN_LOADING:
      return {
        ...state,
        loginLoading: payload,
      };
    case types.SIGN_OUT:
      return initialState.auth;
    default:
      return state;
  }
}
