import * as types from '../actions/types';
import initialState from '../initialState';

export default (state = {}, {type, payload}) => {
  switch (type) {
    case types.READ_MODAL_ACTIVE:
      return {
        ...state,
        readModalActive: payload
      }
    case types.SIGN_OUT:
      return initialState.ui;

    default:
      return state;
  }
}
