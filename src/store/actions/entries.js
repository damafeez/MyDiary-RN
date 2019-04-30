import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

const entryCreateLoading = (payload = true) => ({ type: types.ENTRY_CREATE_LOADING, payload });

export const createEntry = (payload) => async (dispatch, getState, API) => {
  try {
    dispatch(entryCreateLoading());
    const request = await API.createEntry(payload);
    dispatch({ type: types.ENTRY_CREATE_SUCCESS, payload: request.data.data });
    setTimeout(() => AsyncStorage.setItem('entries', JSON.stringify(getState().entries.entries)), 1000);
    return { success: 'Entry created successfully' };
  } catch (e) {
    const error = e.response.data.error ? e.response.data.error[0] : 'Error creating entry, please try again';
    dispatch(entryCreateLoading(false));
    return { error };
  }
};
