import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig,
} from 'axios';
import { ACCESS_TOKEN_KEY } from '@utils/constants';
import StorageManager from '@utils/storage-manager';
import { API_URL } from '@config/index';

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

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
  try {
    const token = StorageManager.getItem(ACCESS_TOKEN_KEY);

    if (token != null) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
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

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL,
      responseType: 'json' as const,
      withCredentials: false,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        return RequestService.handleError(response);
      },
    );

    this.instance = http;

    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private static handleError = (error: any) => {
    // const { status = null } = error;
    const status = error?.status;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }

      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }

      case StatusCode.Unauthorized: {
        StorageManager.clearItems();
        break;
      }

      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }

      default:
        null;
    }

    return Promise.reject(error);
  };
}

export const http = new RequestService();
