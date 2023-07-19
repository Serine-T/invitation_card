// TODO: remove any

import { REQUEST_STATUS } from '@utils/types';

export interface IAuthState {
  isLoading: boolean;
  data: any;
  errors: null;
  isAuth: boolean;
  status: REQUEST_STATUS;
}
