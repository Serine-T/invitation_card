import { REQUEST_STATUS } from '@utils/types';

export interface IUserState {
  isLoading: boolean;
  data: any;
  status: REQUEST_STATUS | null;
}

export enum Permissions {
  PRODUCTION = 'production',
  SOCIAL = 'social',
  USER_MANAGEMENT = 'user_management'
}

export interface IAddUserPayload {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  permissions: Permissions[];
}
