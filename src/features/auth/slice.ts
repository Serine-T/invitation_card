import { gettingData } from '@features/auth/actions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  isLoading: false,
  data: [],
  errors: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gettingData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(gettingData.fulfilled, (state) => {
      state.data = [5, 2];
    });
  },
});

export const {
  signIn,
} = authSlice.actions;

export default authSlice.reducer;
