import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addCategory, getAllCategories, getCategoryById, reorderCategories, searchCategories } from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
  errorMessage: null,
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

    builder.addCase(reorderCategories.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(reorderCategories.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(reorderCategories.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(searchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
