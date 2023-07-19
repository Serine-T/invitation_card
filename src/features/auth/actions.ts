import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { sleep } from '@utils/helpers';
import { http } from '@services/RequestService';

const prefix = '';

export const gettingData = createAsyncThunk(
  'auth/signIn',
  async (_, thunkAPI) => {
    try {
      await sleep();

      const response = await http.get<AxiosResponse<any>>(`${prefix}`);

      console.log('response', response);
    } catch (e: any) {
      // console.log(e, e.message, e.response.status);
      return thunkAPI.rejectWithValue({ message: e.message, status: e.response.status });
    }
  },
);
