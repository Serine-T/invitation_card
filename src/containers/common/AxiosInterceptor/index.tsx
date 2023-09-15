import { ReactNode } from 'react';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from '@utils/constants';
import { http } from '@services/RequestService/index';
import useMount from '@customHooks/useMount';
import StorageManager from '@utils/storage-manager';
import { IRefreshTokenPayload, ISignInResponseType } from '@features/auth/types';
import { AxiosResponse } from 'axios';
import { clearLocalStorageData, setLocalStorageData } from '@features/auth/helpers';
import { useAppDispatch } from '@features/app/hooks';
import { logOut } from '@features/auth/slice';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';

interface IAxiosInterceptor {
  children: ReactNode;
}

// TODO: not deleting maybe use in future  for updating refresh or access token
const AxiosInterceptor = ({ children }: IAxiosInterceptor) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useMount(() => {
    const resInterceptor = (response: any) => response;

    const errInterceptor = (error: any) => {
      const accessTokenItem = StorageManager.getItem(ACCESS_TOKEN_KEY);

      if ((accessTokenItem) && error.data.statusCode === 401) {
        const refreshTokenItem = StorageManager.getItem(REFRESH_TOKEN_KEY);

        if (refreshTokenItem) {
          const refreshTokenFetch = async () => {
            try {
              const { data: { data } } = await http.post<IRefreshTokenPayload,
                AxiosResponse<AxiosResponse<ISignInResponseType>>>(
                  'auth/refreshToken',
                  { refreshToken: refreshTokenItem },
                );

              const { accessToken, refreshToken } = data ?? {};

              if (accessToken && refreshToken) {
                setLocalStorageData({ accessToken, refreshToken });
              }
            } catch {
              clearLocalStorageData();
              dispatch(logOut());
              navigate(PAGE_ROUTES.SIGN_IN);
            }
          };

          refreshTokenFetch();
        }

        return Promise.reject(error);
      }

      dispatch(logOut());

      return Promise.reject(error);
    };

    const interceptor = http.initHttp().interceptors.response.use(resInterceptor, errInterceptor);

    return () => http.initHttp().interceptors.response.eject(interceptor);
  });

  return <>{children}</>;
};

export default AxiosInterceptor;
