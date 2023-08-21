import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/response/UserResponse';
import { InitialType } from '../../types/redux/userData/InitialType';

const initialState: UserResponse | InitialType = {
  id: undefined,
  email: undefined,
  name: undefined,
  bookMarks: [],
  orderHistories: [],
  cart: undefined,
  createdAt: undefined,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (
      state: UserResponse | InitialType,
      action: { payload: UserResponse }
    ): UserResponse => {
      const newState = { ...state, ...action.payload };
      sessionStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
    logout: (state: UserResponse | InitialType): InitialType => {
      const newState = {
        id: undefined,
        email: undefined,
        name: undefined,
        bookMarks: [],
        orderHistories: [],
        cart: undefined,
        createdAt: undefined,
      };
      sessionStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { login, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
