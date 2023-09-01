import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addAttributeCategory, getAllAttributeCategories, getAttributeCategoryById, searchAttributeCategories,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
  errorMessage: null,
};

const attributeCategoriesSlice = createSlice({
  name: 'attributeCategories',
  initialState,
  reducers: {
    setAttributeCategories: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAttributeCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAttributeCategory.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addAttributeCategory.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getAllAttributeCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAttributeCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllAttributeCategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getAttributeCategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAttributeCategoryById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAttributeCategoryById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(searchAttributeCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchAttributeCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchAttributeCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setAttributeCategories,
} = attributeCategoriesSlice.actions;

export default attributeCategoriesSlice.reducer;
