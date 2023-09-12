import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addProduct, editProduct, getAllProducts,
  getProductById, reorderProducts, searchProducts,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  errorMessage: null,
  data: [],
};

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {
    setSubcategories: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getProductById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editProduct.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(editProduct.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addProduct.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addProduct.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(reorderProducts.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(reorderProducts.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(reorderProducts.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(searchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setSubcategories,
} = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;
