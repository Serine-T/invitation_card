import { createSlice } from '@reduxjs/toolkit';

import { IState } from './types';
import {
  addAttribute, editAttribute, getAllAttributes, getAttributeByCategoryName, getAttributeById, searchAttributes,
} from './actions';

const initialState: IState = {
  isLoading: true,
  actionLoading: false,
  data: [],
  errorMessage: null,
  inksAttributes: [],
  turnAroundsAttributes: [],
};

const attributesSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {
    setAttributes: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAttributes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAttributes.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllAttributes.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addAttribute.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(addAttribute.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(addAttribute.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(editAttribute.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(editAttribute.fulfilled, (state) => {
      state.actionLoading = false;
    });
    builder.addCase(editAttribute.rejected, (state) => {
      state.actionLoading = false;
    });

    builder.addCase(getAttributeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAttributeById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAttributeById.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(searchAttributes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchAttributes.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(searchAttributes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(getAttributeByCategoryName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAttributeByCategoryName.fulfilled, (state, { payload }) => {
      const { name, data } = payload;

      if (name === 'Turn Around') {
        state.turnAroundsAttributes = data;
      } else {
        state.inksAttributes = data;
      }

      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(getAttributeByCategoryName.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload.message;
    });
  },
});

export const {
  setAttributes,
} = attributesSlice.actions;

export default attributesSlice.reducer;
