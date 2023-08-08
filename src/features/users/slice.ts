import { createSlice } from '@reduxjs/toolkit';

import { IUserState } from './types';
import { addUser, getAllUsers } from './actions';

const initialState: IUserState = {
  isLoading: false,
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
    });
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
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
