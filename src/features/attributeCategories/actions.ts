import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';

import {
  IAddAttributeCategoryPayload, IAttributeCategory, ISearchAttributeCategories,
} from './types';

const prefix = '/attributeCategory';

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

export const getAllAttributeCategories = createAsyncThunk<IAttributeCategory[], void, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<IAttributeCategory[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAttributeCategoryById = createAsyncThunk<IAttributeCategory, string, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/get-attributeCategories',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IAttributeCategory>(`${prefix}/${id}`);

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
      await http.put<IAddAttributeCategoryPayload>(`${prefix}/${body.id}`, body); // TODO: maybe change patch
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

export const searchAttributeCategories = createAsyncThunk<IAttributeCategory[], ISearchAttributeCategories, {
  rejectValue: AxiosData;
}>(
  'attributeCategories/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
      });

      const { data } = await http.get<IAttributeCategory[]>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
