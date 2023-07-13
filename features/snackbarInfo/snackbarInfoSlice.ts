import { createSlice } from '@reduxjs/toolkit';

type SnackbarInfoType = {
  text: string;
  severity: 'success' | 'info' | 'warning' | 'error';
};

const initialState: SnackbarInfoType = { text: '', severity: 'success' };

export const snackbarInfoSlice = createSlice({
  name: 'snackbarInfo',
  initialState,
  reducers: {
    setInfo: (
      state,
      action: { payload: SnackbarInfoType }
    ): SnackbarInfoType => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

export const { setInfo } = snackbarInfoSlice.actions;
export default snackbarInfoSlice.reducer;
