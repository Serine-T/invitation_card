import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';
import { AxiosResponse } from 'axios';

import {
  IProductsPayload, ISearchProducts, IProductsInfo, IProductsSearchInfo,
} from './types';

const prefix = '/products';

export const addProduct = createAsyncThunk<void, IProductsPayload, {
  rejectValue: AxiosData;
}>(
  'products/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IProductsPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllProducts = createAsyncThunk<IProductsInfo[], void, {
  rejectValue: AxiosData;
}>(
  'products/all',
  async (_, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsInfo[]>>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getProductById = createAsyncThunk<IProductsPayload, string, {
  rejectValue: AxiosData;
}>(
  'products/getProduct',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IProductsPayload>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editProduct = createAsyncThunk<void, IProductsPayload, {
  rejectValue: AxiosData;
}>(
  'products/edit',
  async (body, thunkAPI) => {
    try {
      await http.put<IProductsPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteProduct = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const reorderProducts = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'products/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const searchProducts = createAsyncThunk<IProductsSearchInfo[], ISearchProducts, {
  rejectValue: AxiosData;
}>(
  'products/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm, visibleOnSite, subCategoryId, showInSpotlight } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
        visibleOnSite,
        subCategoryId,
        showInSpotlight });

      const { data: { data } } = await http.get<AxiosResponse<IProductsSearchInfo[]>>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
