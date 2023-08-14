import { confirmEmail, forgetPassword, resetPassword, signIn } from '@features/auth/actions';
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '@utils/types';

import { IAuthState } from './types';
import { clearLocalStorageData, getAccessToken } from './helpers';

const initialState: IAuthState = {
  isLoading: false,
  isAuth: !!getAccessToken(),
  status: null,
  errorMessage: '',
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

    builder.addCase(forgetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgetPassword.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(confirmEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(confirmEmail.fulfilled, (state) => {
      state.isAuth = true;
      state.status = REQUEST_STATUS.SUCCEED;
      state.isLoading = false;
    });
    builder.addCase(confirmEmail.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
      state.isLoading = false;
    });
  },
});

export const {
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
