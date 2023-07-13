import { createSlice } from '@reduxjs/toolkit';

const initialState: { openPopup: number | null } = {
  openPopup: null,
};

export const openPopupSlice = createSlice({
  name: 'openPopup',
  initialState,
  reducers: {
    set: (
      state: { openPopup: number | null },
      action: { payload: { openPopup: number } }
    ): { openPopup: number } => {
      console.log('set');
      const newState = { ...state, ...action.payload };
      //   sessionStorage.setItem('openPopup', JSON.stringify(newState));
      return newState;
    },
    reset: (state: {
      openPopup: number | null;
    }): { openPopup: number | null } => {
      console.log('reset');
      state.openPopup = null;
      //   sessionStorage.removeItem('openPopup');

      return state;
    },
  },
});

export const { set, reset } = openPopupSlice.actions;
export default openPopupSlice.reducer;
