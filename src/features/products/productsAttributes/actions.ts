import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';
import { AxiosResponse } from 'axios';

import { IProductsAttribues } from './types';

const prefix = '/products/attributes';

export const addProductsAttributes = createAsyncThunk<void, {body: IProductsAttribues; id: string}, {
  rejectValue: AxiosData;
}>(
  'productsAttributes/add',
  async ({ body, id }, thunkAPI) => {
    try {
      await http.put<IProductsAttribues>(`${prefix}/${id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllAttributesByProductId = createAsyncThunk<IProductsAttribues, string, {
  rejectValue: AxiosData;
}>(
  'productsAttributes/all',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsAttribues>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
