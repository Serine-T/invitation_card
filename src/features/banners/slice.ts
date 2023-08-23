import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import { addBanner, editBanner, getAllBanners, getBannerById, reorderBanners } from './actions';

const initialState: IState = {
  isLoading: true,
  banners: [],
  sliders: [],
  actionLoading: false,
  errorMessage: null,
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setBanners: (state, { payload }) => {
      state.banners = payload;
    },

    setSilders: (state, { payload }) => {
      state.sliders = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBanners.fulfilled, (state, { payload }) => {
      const { banners, sliders } = payload;

      state.banners = banners;
      state.sliders = sliders;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAllBanners.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getBannerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBannerById.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getBannerById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editBanner.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editBanner.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(editBanner.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(addBanner.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addBanner.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addBanner.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(reorderBanners.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(reorderBanners.fulfilled, (state) => {
      state.actionLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(reorderBanners.rejected, (state, { payload }) => {
      state.actionLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setBanners,
  setSilders,
} = bannersSlice.actions;

export default bannersSlice.reducer;
