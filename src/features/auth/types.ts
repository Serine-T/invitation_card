import { REQUEST_STATUS } from '@utils/types';

export interface IAuthState {
  isLoading: boolean;
  isAuth: boolean;
  status: REQUEST_STATUS | null;
  accessToken: string | null;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponseType {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenPayload {
  refreshToken: string;
}
