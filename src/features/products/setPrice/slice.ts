import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addProductsPrices, getAllPricesByProductId } from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  errorMessage: null,
  data: { quantities: [] },
};

const productsSetPriceSlice = createSlice({
  name: 'productsSetPrice',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getAllPricesByProductId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPricesByProductId.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllPricesByProductId.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addProductsPrices.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addProductsPrices.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addProductsPrices.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export default productsSetPriceSlice.reducer;
