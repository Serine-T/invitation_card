import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addTemplateCategory,
  editTemplateCategory, getAllTemplateCategories,
  getTemplateCategoryById, searchTemplateCategories,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
  errorMessage: null,
};

const templateCategoriesSlice = createSlice({
  name: 'templateCategories',
  initialState,
  reducers: {
    setTemplateCategories: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTemplateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTemplateCategory.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addTemplateCategory.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editTemplateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editTemplateCategory.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editTemplateCategory.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getAllTemplateCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTemplateCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllTemplateCategories.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getTemplateCategoryById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplateCategoryById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTemplateCategoryById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(searchTemplateCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchTemplateCategories.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchTemplateCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setTemplateCategories,
} = templateCategoriesSlice.actions;

export default templateCategoriesSlice.reducer;
