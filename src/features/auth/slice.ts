import { signIn } from '@features/auth/actions';
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '@utils/types';

import { IAuthState } from './types';
import { clearLocalStorageData, getAccessToken } from './helpers';

const initialState: IAuthState = {
  isLoading: false,
  isAuth: !!getAccessToken(),
  status: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      clearLocalStorageData();
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.isAuth = true;
      state.status = REQUEST_STATUS.SUCCEED;
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
