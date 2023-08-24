import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addSubcategory, editSubcategory, getAllSubcategories,
  getSubcategoryById, reorderSubcategories,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  errorMessage: null,
  data: null,
};

const subcategoriesSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getAllSubcategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubcategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllSubcategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getSubcategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubcategoryById.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getSubcategoryById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editSubcategory.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editSubcategory.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(editSubcategory.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addSubcategory.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addSubcategory.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addSubcategory.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(reorderSubcategories.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(reorderSubcategories.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(reorderSubcategories.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export default subcategoriesSlice.reducer;
