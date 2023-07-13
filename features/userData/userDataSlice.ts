import { createSlice } from '@reduxjs/toolkit';
import { InitialUser } from '../../types/user/InitialUser';
import { ResponseUser } from '../../types/user/ResponseUser';

const initialState: ResponseUser | InitialUser = {
  id: undefined,
  email: undefined,
  username: undefined,
  iconImage: undefined,
  createdAt: null,
  friends: [],
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (
      state: ResponseUser | InitialUser,
      action: { payload: ResponseUser }
    ): ResponseUser => {
      const newState = { ...state, ...action.payload };
      sessionStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
    logout: (state: ResponseUser | InitialUser): InitialUser => {
      const newState = {
        id: undefined,
        email: undefined,
        username: undefined,
        iconImage: undefined,
        friends: [],
        createdAt: null,
      };
      sessionStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { login, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
