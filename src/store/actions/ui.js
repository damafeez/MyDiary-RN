import * as types from './types';

export const activateReadModal = (payload = true) => (dispatch) => {
  dispatch({ type: types.READ_MODAL_ACTIVE, payload });
};
