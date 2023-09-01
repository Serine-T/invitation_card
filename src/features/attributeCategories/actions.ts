import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';

import {
  IAddAttributeCategoryPayload, IAttributeCategories, ISearchCategories,
} from './types';

const prefix = '/categories';

export const addAttributeCategory = createAsyncThunk<void, IAddAttributeCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddAttributeCategoryPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllAttributeCategories = createAsyncThunk<IAttributeCategories[], void, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<IAttributeCategories[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAttributeCategoryById = createAsyncThunk<IAttributeCategories, string, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/get-attributeCategories',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IAttributeCategories>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editAttributeCategory = createAsyncThunk<void, IAddAttributeCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/edit',
  async (body, thunkAPI) => {
    try {
      await http.patch<IAddAttributeCategoryPayload>(`${prefix}/${body.id}`, body); // TODO: maybe change patch
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteAttributeCategory = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const reorderAttributeCategories = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const searchAttributeCategories = createAsyncThunk<IAttributeCategories[], ISearchCategories, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm, displayInHeader } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
        displayInHeader,
      });

      const { data } = await http.get<IAttributeCategories[]>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
