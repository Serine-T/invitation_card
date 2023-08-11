import { ReactNode } from 'react';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from '@utils/constants';
import { http } from '@services/RequestService/index';
import useMount from '@customHooks/useMount';
import StorageManager from '@utils/storage-manager';
import { IRefreshTokenPayload, ISignInResponseType } from '@features/auth/types';
import { AxiosResponse } from 'axios';
import { setLocalStorageData } from '@features/auth/helpers';
import { useAppDispatch } from '@features/app/hooks';
import { logOut, setToken } from '@features/auth/slice';

interface IAxiosInterceptor {
  children: ReactNode;
}

const AxiosInterceptor = ({ children }: IAxiosInterceptor) => {
  const dispatch = useAppDispatch();

  useMount(() => {
    const resInterceptor = (response: any) => response;

    const errInterceptor = (error: any) => {
      const accessTokenItem = StorageManager.getItem(ACCESS_TOKEN_KEY);

      if ((accessTokenItem) && error.data.statusCode === 401) {
        const refreshTokenItem = StorageManager.getItem(REFRESH_TOKEN_KEY);

        if (refreshTokenItem) {
          const refreshTokenFetch = async () => {
            try {
              const { data } = await http.post<IRefreshTokenPayload, AxiosResponse<ISignInResponseType>>(
                'auth/refreshToken',
                { refreshToken: refreshTokenItem },
              );

              const { accessToken, refreshToken } = data ?? {};

              if (accessToken && refreshToken) {
                setLocalStorageData({ accessToken, refreshToken });
                dispatch(setToken(accessToken));
              }
            } catch {
              dispatch(logOut());
            }
          };

          refreshTokenFetch();
        }

        return Promise.reject(error);
      }

      return Promise.reject(error);
    };

    const interceptor = http.initHttp().interceptors.response.use(resInterceptor, errInterceptor);

    return () => http.initHttp().interceptors.response.eject(interceptor);
  });

  return <>{children}</>;
};

export default AxiosInterceptor;
