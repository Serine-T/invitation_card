import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';

import {
  IAddTemplateCategoryPayload, ITemplateCategory, ISearchTemplateCategories,
} from './types';

const prefix = '/template-categories';

export const addTemplateCategory = createAsyncThunk<void, IAddTemplateCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'templateCategories/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddTemplateCategoryPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllTemplateCategories = createAsyncThunk<ITemplateCategory[], void, {
  rejectValue: AxiosData;
}>(
  'templateCategories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<ITemplateCategory[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getTemplateCategoryById = createAsyncThunk<ITemplateCategory, string, {
  rejectValue: AxiosData;
}>(
  'templateCategories/get-templateCategories',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<ITemplateCategory>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editTemplateCategory = createAsyncThunk<void, IAddTemplateCategoryPayload, {
  rejectValue: AxiosData;
}>(
  'templateCategories/edit',
  async (body, thunkAPI) => {
    try {
      await http.patch<IAddTemplateCategoryPayload>(`${prefix}/${body.id}`, body); // TODO: maybe change patch
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteTemplateCategory = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'templateCategories/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const reorderTemplateCategories = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'templateCategories/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const searchTemplateCategories = createAsyncThunk<ITemplateCategory[], ISearchTemplateCategories, {
  rejectValue: AxiosData;
}>(
  'templateCategories/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
      });

      const { data } = await http.get<ITemplateCategory[]>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
