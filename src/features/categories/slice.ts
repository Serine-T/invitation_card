import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addCategory, getAllCategories, getCategoryById } from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
};

const categoriesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCategories: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getCategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategoryById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getCategoryById.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
