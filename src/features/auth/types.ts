// TODO: remove any

import { REQUEST_STATUS } from '@utils/types';

export interface IAuthState {
  isLoading: boolean;
  data: any;
  errorMessage: string;
  isAuth: boolean;
  status: REQUEST_STATUS | null;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponseType {
  accessToken: string;
  refreshToken: string;
}
