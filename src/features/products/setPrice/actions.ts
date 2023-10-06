import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';
import { AxiosResponse } from 'axios';

import { IProductsSetPrice } from './types';

const prefix = '/products/attribute-prices';

export const addProductsPrices = createAsyncThunk<void, {body: IProductsSetPrice[]; id: string}, {
  rejectValue: AxiosData;
}>(
  'productsSetPrices/add',
  async ({ body, id }, thunkAPI) => {
    try {
      await http.put<IProductsSetPrice[]>(`${prefix}/${id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllPricesByProductId = createAsyncThunk<IProductsSetPrice[], string, {
  rejectValue: AxiosData;
}>(
  'productsSetPrices/all',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsSetPrice[]>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
