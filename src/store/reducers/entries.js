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
    case types.GET_ENTRIES_LOADING:
      return {
        ...state,
        getEntriesLoading: payload,
      };
    case types.GET_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: payload,
        getEntriesLoading: false,
        getEntriesError: '',
      };
    case types.GET_ENTRIES_ERROR:
      return {
        ...state,
        getEntriesError: payload,
      };
    
    default:
      return state;
  }
}
