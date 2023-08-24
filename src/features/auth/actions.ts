import { createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '@services/RequestService';
import { customErrorHandling } from '@utils/errorHandler';
import { AxiosResponse } from 'axios';
import { AxiosData } from '@utils/types';

import {
  IForgetPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignInResponseType,
} from './types';
import { setLocalStorageData } from './helpers';

const prefix = '/auth';

export const signIn = createAsyncThunk<void, ISignInPayload, {
  rejectValue:AxiosData;
}>(
  'auth/signIn',
  async (body, thunkAPI) => {
    try {
      const { data } = await http.post<ISignInPayload, AxiosResponse<ISignInResponseType>>(
        `${prefix}/login`,
        body,
      );

      const { accessToken, refreshToken } = data;

      setLocalStorageData({ accessToken, refreshToken });
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

// TODO: check calls
export const forgetPassword = createAsyncThunk<void, IForgetPasswordPayload, {
  rejectValue:AxiosData;
}>(
  'auth/forgetPassword',
  async (body, thunkAPI) => {
    try {
      await http.post<IForgetPasswordPayload>(
        `${prefix}/forgot-password`,
        body,
      );
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const resetPassword = createAsyncThunk<void, IResetPasswordPayload, {
  rejectValue:AxiosData;
}>(
  'auth/resetPassword',
  async ({ token, body }, thunkAPI) => {
    try {
      await http.post<IResetPasswordPayload['body']>(
        `${prefix}/reset-password/${token}`,
        body,
      );
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);

export const confirmEmail = createAsyncThunk<void, string, {
  rejectValue:AxiosData;
}>(
  'auth/confirmEmail',
  async (token, thunkAPI) => {
    try {
      const { data } = await http.get<ISignInResponseType>(
        `${prefix}/confirm-email/${token}`,
      );

      const { accessToken, refreshToken } = data;

      setLocalStorageData({ accessToken, refreshToken });
    } catch (error) {
      const errorInfo = customErrorHandling(error);

      return thunkAPI.rejectWithValue(errorInfo);
    }
  },
);
