import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';

import {
  IAddCategoryPayload, ICategories,
} from './types';

const prefix = '/categories';

export const addCategory = createAsyncThunk<void, IAddCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'categories/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddCategoryPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllCategories = createAsyncThunk<ICategories[], void, {
  rejectValue: AxiosData;
}>(
  'categories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<ICategories[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getCategoryById = createAsyncThunk<ICategories, string, {
  rejectValue: AxiosData;
}>(
  'categories/get-category',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<ICategories>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editCategory = createAsyncThunk<void, IAddCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'categories/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IAddCategoryPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteCategory = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'categories/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
