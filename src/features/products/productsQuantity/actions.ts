import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';
import { AxiosResponse } from 'axios';

import { IProductsQuantityInfo, IProductsQuantityPayload, QuantityAttribute } from './types';

const prefix = '/products/product-quantities';

export const addProductsQuantity = createAsyncThunk<void, IProductsQuantityPayload, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IProductsQuantityPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllProductsQuantities = createAsyncThunk<QuantityAttribute[], string, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/all',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<QuantityAttribute[]>>(`${prefix}/${id}`);

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

export const deleteProductsQuantity = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const addProductsQuantityAttributes = createAsyncThunk<void, {body:IProductsQuantityInfo; id: string}, {
  rejectValue: AxiosData;
}>(
  'productsQuantity/addProductsQuantityAttributes',
  async ({ body, id }, thunkAPI) => {
    try {
      await http.put<IProductsQuantityInfo>(`${prefix}/attributes/${id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
