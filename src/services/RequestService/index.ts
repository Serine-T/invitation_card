import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,
} from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@utils/constants';
import StorageManager from '@utils/storage-manager';
import { API_URL } from '@config/index';
import { IRefreshTokenPayload, ISignInResponseType } from '@features/auth/types';
import { setLocalStorageData } from '@features/auth/helpers';
import { store } from '@features/app/store';
import { logOut } from '@features/auth/slice';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

const injectToken = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  try {
    const token = StorageManager.getItem(ACCESS_TOKEN_KEY);

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    throw error;
  }
};

const baseURL = `${API_URL}`;

class RequestService {
  private instance: AxiosInstance | null = null;

  private retryCount: Map<string, number> = new Map();

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL,
      responseType: 'json',
      withCredentials: false,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => {
        this.retryCount.delete(response.config.url!);

        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const { response } = error;
        const status = response?.status;
        const refreshTokenItem = StorageManager.getItem(REFRESH_TOKEN_KEY);

        if (refreshTokenItem && status === StatusCode.Unauthorized && !originalRequest.retry) {
          originalRequest.retry = true;

          if (refreshTokenItem) {
            try {
              const { data } = await http.post<IRefreshTokenPayload, AxiosResponse<ISignInResponseType>>(
                'auth/refreshToken',
                { refreshToken: refreshTokenItem },
              );

              const { accessToken } = data;

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;

              if (accessToken) {
                setLocalStorageData({ accessToken, refreshToken: data.refreshToken });

                return http.request(originalRequest);
              }
            } catch {
              store.dispatch(logOut());
              window.location.pathname = '/sign-in';
            }
          }
        }

        return RequestService.handleError(response);
      },
    );

    this.instance = http;

    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private static handleError = (error: any) => {
    const status = error?.status;

    switch (status) {
      case StatusCode.InternalServerError:
        // Handle InternalServerError
        break;
      case StatusCode.Forbidden:
        // Handle Forbidden
        break;
      case StatusCode.Unauthorized:
        // Handle Unauthorized (like redirect to login or show a message)
        break;
      case StatusCode.TooManyRequests:
        // Handle TooManyRequests (maybe show a cooldown message)
        break;
      default:
        break;
    }

    return Promise.reject(error);
  };
}

export const http = new RequestService();
