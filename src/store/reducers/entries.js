import * as types from '../actions/types';

export default (state = {}, {type, payload}) => {
  switch (type) {
    case types.ENTRY_CREATE_LOADING:
      return {
        ...state,
        createEntryLoading: payload
      }
    case types.ENTRY_CREATE_SUCCESS:
      return {
        ...state,
        entries: [payload, ...state.entries],
        createEntryLoading: false,
        currentEntry: 0,
      };
    
    default:
      return state;
  }
}
