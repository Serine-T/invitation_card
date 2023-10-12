import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';
import { AxiosResponse } from 'axios';

import { IProductsQuantityInfo, IProductsQuantityPayload } from './types';

const prefix = '/products';

export const addProductsQuantity = createAsyncThunk<void, {id: string; body: IProductsQuantityPayload}, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/add',
  async ({ id, body }, thunkAPI) => {
    try {
      await http.post<IProductsQuantityPayload>(`${prefix}/${id}/quantities`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllProductsQuantities = createAsyncThunk<IProductsQuantityPayload[], string, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/all',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsQuantityPayload[]>>(
        `${prefix}/${id}/quantities`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getProductsQuantityById = createAsyncThunk<IProductsQuantityPayload, string, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/getProduct',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsQuantityPayload>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteProductsQuantity = createAsyncThunk<void, {productId: string; quantityId: string}, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/delete',
  async ({ productId, quantityId }, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${productId}/quantities/${quantityId}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const editProductsQuantities = createAsyncThunk<void, { body: IProductsQuantityInfo; id: string}, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/editProductsQuantities',
  async ({ body, id }, thunkAPI) => {
    try {
      await http.put<IProductsQuantityInfo>(`${prefix}/${id}/quantities`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
