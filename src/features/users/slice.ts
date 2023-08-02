import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '@utils/types';

import { IUserState } from './types';
import { addUser } from './actions';

const initialState: IUserState = {
  isLoading: false,
  data: [],
  status: null,
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
      state.status = REQUEST_STATUS.SUCCEED;
      state.isLoading = false;
    });

    builder.addCase(addUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
