import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

export const loadingIsShowSlice = createSlice({
  name: 'loadingIsShow',
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

export const { show, hide } = loadingIsShowSlice.actions;
export default loadingIsShowSlice.reducer;
