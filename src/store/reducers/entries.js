import * as types from '../actions/types';
import initialState from '../initialState';

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
    case types.ENTRY_UPDATE_SUCCESS: {
      const entries = Object.assign(state.entries);
      entries[payload.index] = payload.data;
      return {
        ...state,
        entries: [...entries],
        createEntryLoading: false,
        currentEntry: payload.index,
      };
    }
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
    case types.SET_CURRENT_ENTRY:
      return {
        ...state,
        currentEntry: payload,
      };
    case types.SIGN_OUT:
      return initialState.entries;

    default:
      return state;
  }
}
