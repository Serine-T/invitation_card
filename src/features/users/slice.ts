import { createSlice } from '@reduxjs/toolkit';

import { IUserState } from './types';
import { addUser, editUser, getAllUsers, getUserById } from './actions';

const initialState: IUserState = {
  isLoading: false,
  data: [],
  actionLoading: false,
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

    builder.addCase(editUser.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addUser.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addUser.rejected, (state) => {
      state.actionLoading = false;
    });
  },
});

export default usersSlice.reducer;
