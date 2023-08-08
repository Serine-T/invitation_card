import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '@utils/helpers';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosResponse } from 'axios';

import {
  IAddUserPayload, IUserInfo,
} from './types';

const prefix = '/users';

export const addUser = createAsyncThunk<void, IAddUserPayload, {
  rejectValue: AxiosResponse['data'];
}>(
  'users/addUser',
  async (value, thunkAPI) => {
    try {
      await sleep(1000);
      await http.post<IAddUserPayload>(prefix, value);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const getAllUsers = createAsyncThunk<IUserInfo[], void, {
  rejectValue: AxiosResponse['data'];
}>(
  'users/all-users',
  async (_, thunkAPI) => {
    try {
      await sleep(1000);

      const { data } = await http.get<IUserInfo[]>(prefix);

      return data;
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
