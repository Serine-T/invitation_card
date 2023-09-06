import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addTemplate,
  editTemplate, getAllTemplates,
  getTemplateById, searchTemplates,
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
    setTemplates: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTemplate.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addTemplate.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addTemplate.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(editTemplate.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editTemplate.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editTemplate.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(getAllTemplates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTemplates.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllTemplates.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getTemplateById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTemplateById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTemplateById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(searchTemplates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchTemplates.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchTemplates.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setTemplates,
} = templateCategoriesSlice.actions;

export default templateCategoriesSlice.reducer;
