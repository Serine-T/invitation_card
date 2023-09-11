import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData, IReorderPayload } from '@utils/types';
import { constructQueryString } from '@utils/helpers';

import {
  IAddSubcategoriesPayload, ISearchSubcategories, ISubcategoriesInfo, ISubcategoriesSearchInfo,
} from './types';

const prefix = '/sub-categories';

export const addSubcategory = createAsyncThunk<void, IAddSubcategoriesPayload, {
  rejectValue: AxiosData;
}>(
  'subcategories/add',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddSubcategoriesPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllSubcategories = createAsyncThunk<ISubcategoriesInfo[], void, {
  rejectValue: AxiosData;
}>(
  'subcategories/all',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<ISubcategoriesInfo[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getSubcategoryById = createAsyncThunk<ISubcategoriesInfo, string, {
  rejectValue: AxiosData;
}>(
  'subcategories/get-subcategory',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<ISubcategoriesInfo>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editSubcategory = createAsyncThunk<void, IAddSubcategoriesPayload, {
  rejectValue: AxiosData;
}>(
  'subcategories/edit',
  async (body, thunkAPI) => {
    try {
      await http.patch<IAddSubcategoriesPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteSubcategory = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'subcategories/delete',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const reorderSubcategories = createAsyncThunk<void, IReorderPayload, {
  rejectValue: AxiosData;
}>(
  'subcategories/reorder',
  async (body, thunkAPI) => {
    try {
      await http.patch<IReorderPayload>(`${prefix}/reorder`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
export const searchSubcategories = createAsyncThunk<ISubcategoriesSearchInfo[], ISearchSubcategories, {
  rejectValue: AxiosData;
}>(
  'subcategories/search',
  async (searchingData, thunkAPI) => {
    try {
      const { searchTerm, visibleOnSite, category } = searchingData;
      const queryParams = constructQueryString({
        searchTerm,
        visibleOnSite,
        category,
      });

      const { data } = await http.get<ISubcategoriesSearchInfo[]>(
        `${prefix}/search?${queryParams}`,
      );

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
