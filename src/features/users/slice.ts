import { createSlice } from '@reduxjs/toolkit';

import { IUserState } from './types';
import { getAllUsers, getUserById } from './actions';

const initialState: IUserState = {
  isLoading: false,
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
