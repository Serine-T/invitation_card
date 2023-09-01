import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';

import {
  IAddAttributePayload, IAttribute, ISearchAttributes,
} from './types';

const prefix = '/categories';

export const addAttribute = createAsyncThunk<void, IAddAttributePayload, {
  rejectValue: AxiosData;
}>(
  'attributes/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddAttributePayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllAttributes = createAsyncThunk<IAttribute[], void, {
  rejectValue: AxiosData;
}>(
  'attributes/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<IAttribute[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAttributeById = createAsyncThunk<IAttribute, string, {
  rejectValue: AxiosData;
}>(
  'attributes/get-attribute',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IAttribute>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editAttribute = createAsyncThunk<void, IAddAttributePayload, {
  rejectValue: AxiosData;
}>(
  'attributes/edit',
  async (body, thunkAPI) => {
    try {
      await http.patch<IAddAttributePayload>(`${prefix}/${body.id}`, body); // TODO: maybe change patch
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteAttribute = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'attributes/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const reorderAttributes = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'attributes/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const searchAttributes = createAsyncThunk<IAttribute[], ISearchAttributes, {
  rejectValue: AxiosData;
}>(
  'attributes/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm, displayInHeader } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
        displayInHeader,
      });

      const { data } = await http.get<IAttribute[]>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
