import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '@utils/helpers';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosResponse } from 'axios';

import {
  IAddUserPayload,
} from './types';

// TODO: check if auth needed
const prefix = '/users';

export const addUser = createAsyncThunk<void, IAddUserPayload, {
  rejectValue: AxiosResponse['data'];
}>(
  'users/addUser',
  async (value, thunkAPI) => {
    try {
      await sleep(1000);

      console.log('sleep');

      // TODO: delete any and data
      const { data } = await http.post<IAddUserPayload, AxiosResponse<any>>(prefix, value);

      console.log('data', data);
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
