import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

interface Config<T, ER> extends AxiosRequestConfig {
  parseSuccess?(res: AxiosResponse<T>): any;
  parseError?(res: AxiosError<T>): ER;
}

interface Instance extends AxiosInstance {
  get<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<R>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
  put<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
  patch<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R>;
}

export const createInstance = <T extends Record<keyof T, T[keyof T]>, ER>({
  parseError,
  parseSuccess,
  ...config
}: Config<T, ER>): Instance => {
  const instance = Axios.create(config) as Instance;

  // as any - because invalid type definition in Axios
  const onSuccess = (res: AxiosResponse<T>): any => {
    return parseSuccess ? parseSuccess(res) : res;
  };

  const onError = (res: AxiosError<T>): Promise<ER> => {
    return Promise.reject(parseError ? parseError(res) : res);
  };

  instance.interceptors.response.use(onSuccess, onError);

  return instance;
};
