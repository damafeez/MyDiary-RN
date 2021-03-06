import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

const entryCreateLoading = (payload = true) => ({ type: types.ENTRY_CREATE_LOADING, payload });
const getEntriesLoading = (payload = true) => ({ type: types.GET_ENTRIES_LOADING, payload });

export const createEntry = (payload) => async (dispatch, getState, API) => {
  try {
    dispatch(entryCreateLoading());
    const request = await API.createEntry(payload);
    const { data } = request.data;
    dispatch({ type: types.ENTRY_CREATE_SUCCESS, payload: data });
    setTimeout(() => AsyncStorage.setItem('entries', JSON.stringify(getState().entries.entries)), 1000);
    return { success: 'Entry created successfully', data };
  } catch (e) {
    dispatch(entryCreateLoading(false));
    const error = e.response.data.error ? e.response.data.error[0] : 'Error creating entry, please try again';
    return { error };
  }
};

export const updateEntry = ({id, index, ...payload} = {}) => async (dispatch, getState, API) => {
  try {
    dispatch(entryCreateLoading());
    const request = await API.updateEntry(id, payload);
    const { data } = request.data;
    dispatch({ type: types.ENTRY_UPDATE_SUCCESS, payload: { data, index } });
    setTimeout(() => AsyncStorage.setItem('entries', JSON.stringify(getState().entries.entries)), 1000);
    return { success: 'Entry updated successfully', data };
  } catch (e) {
    dispatch(entryCreateLoading(false));
    const error = e.response.data.error ? e.response.data.error[0] : 'Error updating entry, please try again';
    return { error };
  }
};

export const deleteEntry = (id, index) => async (dispatch, getState, API) => {
  try {
    dispatch({ type: types.ENTRY_DELETE, payload: index });
    await API.deleteEntry(id);
    setTimeout(() => AsyncStorage.setItem('entries', JSON.stringify(getState().entries.entries)), 1000);
  } catch (e) {
    const error = e.response.data.error ? e.response.data.error[0] : 'Error deleting entry, please try again';
    return { error };
  }
};
export const getEntries = (payload) => async (dispatch, getState, API) => {
  try {
    dispatch(getEntriesLoading());
    const request = await API.getEntries(payload);
    const { data: entries } = request.data;
    dispatch({ type: types.GET_ENTRIES_SUCCESS, payload: entries });
    setTimeout(() => AsyncStorage.setItem('entries', JSON.stringify(getState().entries.entries)), 1000);
    return { success: 'Entries fetched successfully' };
  } catch (e) {
    dispatch(getEntriesLoading(false));
    const error = e.response.data.error ? e.response.data.error[0] : 'Error fetching entries, please refresh';
    dispatch({ type: types.GET_ENTRIES_ERROR, payload: error })
    return { error };
  }
};

export const setCurrentEntry = (payload = 0) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_ENTRY, payload });
};
