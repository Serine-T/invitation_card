import { signIn } from '@features/auth/actions';
import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '@utils/types';

import { IAuthState } from './types';
import { clearLocalStorageData, getAccessToken } from './helpers';

const initialState: IAuthState = {
  isLoading: false,
  isAuth: !!getAccessToken(),
  status: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      clearLocalStorageData();
      state.isAuth = false;
    },
    setToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.status = REQUEST_STATUS.SUCCEED;
      state.accessToken = payload.accessToken;
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  logOut,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
