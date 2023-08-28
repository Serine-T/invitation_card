import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addBestSeller, editBestSeller, getAllBestSellers, getBestSellerById, reorderBestSellers } from './actions';

const initialState: IState = {
  isLoading: true,
  data: [],

  actionLoading: false,
  errorMessage: null,
};

const bestSellersSlice = createSlice({
  name: 'bestSllers',
  initialState,
  reducers: {
    setBestSellers: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBestSellers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBestSellers.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllBestSellers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getBestSellerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBestSellerById.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getBestSellerById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editBestSeller.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editBestSeller.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(editBestSeller.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addBestSeller.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addBestSeller.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addBestSeller.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(reorderBestSellers.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(reorderBestSellers.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(reorderBestSellers.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setBestSellers,
} = bestSellersSlice.actions;

export default bestSellersSlice.reducer;
