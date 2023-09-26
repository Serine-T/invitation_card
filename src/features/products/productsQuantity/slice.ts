import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addProductsQuantity,
  editProductsQuantity, getAllProductsQuantities, getProductsQuantityById,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  errorMessage: null,
  data: [],
};

const productsQuantitiesSlice = createSlice({
  name: 'productsQuantities',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsQuantities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProductsQuantities.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllProductsQuantities.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getProductsQuantityById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsQuantityById.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getProductsQuantityById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editProductsQuantity.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editProductsQuantity.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(editProductsQuantity.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addProductsQuantity.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addProductsQuantity.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addProductsQuantity.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setProducts,
} = productsQuantitiesSlice.actions;
export default productsQuantitiesSlice.reducer;
