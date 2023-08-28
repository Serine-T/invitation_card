import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';

import {
  IAddBannerPayload, IBannerInfo, IBanners,
} from './types';

const prefix = '/banners';

export const addBanner = createAsyncThunk<void, IAddBannerPayload, {
  rejectValue: AxiosData;
}>(
  'banners/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddBannerPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllBanners = createAsyncThunk<IBanners, void, {
  rejectValue: AxiosData;
}>(
  'banners/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<IBanners>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getBannerById = createAsyncThunk<IBannerInfo, string, {
  rejectValue: AxiosData;
}>(
  'banners/get-banner',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IBannerInfo>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editBanner = createAsyncThunk<void, IAddBannerPayload, {
  rejectValue: AxiosData;
}>(
  'banners/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IAddBannerPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteBanner = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'banners/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const reorderBanners = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'banners/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
