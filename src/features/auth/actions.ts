import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '@utils/helpers';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosResponse } from 'axios';

import {
  ISignInPayload,
  ISignInResponseType,
} from './types';
import { setLocalStorageData } from './helpers';

const prefix = '/auth';

export const signIn = createAsyncThunk<void, ISignInPayload, {
  rejectValue: AxiosResponse['data'];
}>(
  'auth/signIn',
  async (value, thunkAPI) => {
    try {
      await sleep(1000);

      const { data } = await http.post<ISignInPayload, AxiosResponse<ISignInResponseType>>(
        `${prefix}/login`,
        value,
      );

      const { accessToken, refreshToken } = data;

      setLocalStorageData({ accessToken, refreshToken });
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
