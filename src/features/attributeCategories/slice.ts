import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addAttributeCategory,
  editAttributeCategory, getAllAttributeCategories,
  getAllAttributeCategoriesProducts,
  getAttributeCategoryById, searchAttributeCategories,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
  productAttributeCategories: [],
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
      state.actionLoading = true;
    });
    builder.addCase(addAttributeCategory.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addAttributeCategory.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(editAttributeCategory.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editAttributeCategory.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editAttributeCategory.rejected, (state) => {
      state.actionLoading = false;
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

    builder.addCase(getAllAttributeCategoriesProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAttributeCategoriesProducts.fulfilled, (state, { payload }) => {
      state.productAttributeCategories = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllAttributeCategoriesProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setAttributeCategories,
} = attributeCategoriesSlice.actions;

export default attributeCategoriesSlice.reducer;
