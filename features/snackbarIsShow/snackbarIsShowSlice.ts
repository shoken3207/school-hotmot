import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

export const snackbarIsShowSlice = createSlice({
  name: 'snackbarIsShow',
  initialState,
  reducers: {
    show: (state: { value: boolean }) => {
      state.value = true;
      return state;
    },
    hide: (state: { value: boolean }) => {
      state.value = false;
      return state;
    },
  },
});

export const { show, hide } = snackbarIsShowSlice.actions;
export default snackbarIsShowSlice.reducer;
