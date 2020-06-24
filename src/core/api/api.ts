import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

import { CORE_API_PATH } from 'consts';

namespace Api {
  export interface Response<T> {
    data: T;
    errors: string[];
    hasErrors: boolean;
    success: boolean;
  }

  export namespace Parser {
    export type Success = (res: AxiosResponse<any>) => AxiosResponse<any>;

    export type Error = (err: AxiosError) => Promise<never>;
  }

  export interface Instance extends AxiosInstance {
    get: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
    delete: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
    post: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    put: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    patch: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  }
}

const parseError = ({ response: { statusText } }: AxiosError) => {
  return Promise.reject(statusText);
};

const parseSuccess = (response: AxiosResponse<Api.Response<any>>) => response.data.data;

const makeInstance = (config: AxiosRequestConfig) => (
  onSuccess: Api.Parser.Success,
  onError: Api.Parser.Error
): Api.Instance => {
  const instance = Axios.create(config);

  instance.interceptors.response.use(
    (res) => onSuccess(res),
    (err) => onError(err)
  );

  return instance;
};

export const core = makeInstance({
  baseURL: CORE_API_PATH,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})(parseSuccess, parseError);
