import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosData } from '@utils/types';

import {
  IAddUserPayload, IUserInfo,
} from './types';

const prefix = '/users';

export const addUser = createAsyncThunk<void, IAddUserPayload, {
  rejectValue: AxiosData;
}>(
  'users/add-user',
  async (body, thunkAPI) => {
    try {
      await http.post<IAddUserPayload>(prefix, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllUsers = createAsyncThunk<IUserInfo[], void, {
  rejectValue: AxiosData;
}>(
  'users/all-users',
  async (_, thunkAPI) => {
    try {
      const { data } = await http.get<IUserInfo[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getUserById = createAsyncThunk<IUserInfo, string, {
  rejectValue: AxiosData;
}>(
  'users/get-user',
  async (id, thunkAPI) => {
    try {
      const { data } = await http.get<IUserInfo>(`${prefix}/${id}`);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const editUser = createAsyncThunk<void, IAddUserPayload, {
  rejectValue: AxiosData;
}>(
  'users/edit-user',
  async (body, thunkAPI) => {
    try {
      await http.put<IAddUserPayload>(`${prefix}/${body.id}`, body);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const deleteUser = createAsyncThunk<void, string, {
  rejectValue: AxiosData;
}>(
  'users/delete-user',
  async (id, thunkAPI) => {
    try {
      await http.delete(`${prefix}/${id}`);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
