import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';
import { AxiosResponse } from 'axios';

import { IProductsSetPricePayload } from './types';

const prefix = '/products';

export const addProductsPrices = createAsyncThunk<void, {body: IProductsSetPricePayload; id: string}, {
  rejectValue: AxiosData;
}>(
  'productsSetPrices/add',
  async ({ body, id }, thunkAPI) => {
    try {
      await http.put<IProductsSetPricePayload>(`${prefix}/${id}/quantities/attributes`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllPricesByProductId = createAsyncThunk<IProductsSetPricePayload, string, {
  rejectValue: AxiosData;
}>(
  'productsSetPrices/all',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<
        AxiosResponse<IProductsSetPricePayload>>(`${prefix}/${id}/quantities/attributes`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
