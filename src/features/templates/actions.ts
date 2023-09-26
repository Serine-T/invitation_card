import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { Filters, constructQueryString } from '@utils/helpers';
import { AxiosResponse } from 'axios';

import {
  IAddTemplatePayload, ITemplate, ISearchTemplates,
} from './types';

const prefix = '/templates';

export const addTemplate = createAsyncThunk<void, IAddTemplatePayload, {
  rejectValue: AxiosData;
}>(
  'templates/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddTemplatePayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllTemplates = createAsyncThunk<ITemplate[], void, {
  rejectValue: AxiosData;
}>(
  'templates/all',
  async (_, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<ITemplate[]>>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getTemplateById = createAsyncThunk<IAddTemplatePayload, string, {
  rejectValue: AxiosData;
}>(
  'templates/get-templates',
  async (id, thunkAPI) => {
    try {
      const { data: { data } } = await http.get<AxiosResponse<IAddTemplatePayload>>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editTemplate = createAsyncThunk<void, IAddTemplatePayload, {
  rejectValue: AxiosData;
}>(
  'templates/edit',
  async (body, thunkAPI) => {
    try {
      await http.patch<IAddTemplatePayload>(`${prefix}/${body.id}`, body); // TODO: maybe change patch
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteTemplate = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'templates/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const reorderTemplates = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'templates/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const searchTemplates = createAsyncThunk<ITemplate[], ISearchTemplates, {
  rejectValue: AxiosData;
}>(
  'templates/search',
  async (searchingData, thunkAPI) => {
    try {
      const queryParams = constructQueryString(searchingData as Filters);

      const { data: { data } } = await http.get<AxiosResponse<ITemplate[]>>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
