import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addProductsAttributes, getAllAttributesByProductId } from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  errorMessage: null,
  data: [],
};

const productsAttributesSlice = createSlice({
  name: 'productsAttributes',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAttributesByProductId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAttributesByProductId.fulfilled, (state, { payload }) => {
      state.data = payload.attributes;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllAttributesByProductId.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addProductsAttributes.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addProductsAttributes.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addProductsAttributes.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setProducts,
} = productsAttributesSlice.actions;
export default productsAttributesSlice.reducer;
