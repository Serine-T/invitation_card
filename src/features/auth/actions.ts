import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '@utils/helpers';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosResponse } from 'axios';

import {
  ISignInPayload,
  // ISignInResponseType
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

      // TODO: should be returned back
      // const { data } = await http.post<ISignInPayload, AxiosResponse<ISignInResponseType>>(
      //   `${prefix}/login`,
      //   value,
      // );

      const { data } = await http.post<ISignInPayload, AxiosResponse<any>>(
        `${prefix}/login`,
        value,
      );

      // TODO: change typing
      console.log('responseresponse', data);

      const { accessToken, refreshToken } = data?.data as any;

      setLocalStorageData({ accessToken, refreshToken });
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
