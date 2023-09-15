import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { AxiosResponse } from 'axios';

import {
  IAddBestSellerPayload, IBestSellerInfo,
} from './types';

const prefix = '/bestSellers';

export const addBestSeller = createAsyncThunk<void, IAddBestSellerPayload, {
  rejectValue: AxiosData;
}>(
  'bestSellers/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddBestSellerPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllBestSellers = createAsyncThunk<IBestSellerInfo[], void, {
  rejectValue: AxiosData;
}>(
  'bestSellers/all',
  async (_, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IBestSellerInfo[]>>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getBestSellerById = createAsyncThunk<IBestSellerInfo, string, {
  rejectValue: AxiosData;
}>(
  'bestSellers/get-bestSeller',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IBestSellerInfo>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editBestSeller = createAsyncThunk<void, IAddBestSellerPayload, {
  rejectValue: AxiosData;
}>(
  'bestSellers/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IAddBestSellerPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteBestSeller = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'bestSellers/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const reorderBestSellers = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'bestSellers/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
