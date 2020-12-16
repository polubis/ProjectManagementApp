import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

type Subscriber = (error: string) => void;

type Success<T = any> = (res: AxiosResponse<T>) => any;

type Error<T = any> = (err: AxiosError<T>) => string;

interface Instance extends AxiosInstance {
  get: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
  delete: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
  post: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  put: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  patch: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  subscribe: (subscriber: Subscriber) => void;
  unsubscribe: () => void;
}

export const createInstance = (config: AxiosRequestConfig) => (
  parseSuccess: Success,
  parseError: Error
) => (errorsBlackList: string[]): Instance => {
  let subscriber: Subscriber = null;

  const notify = (err: any) => {
    subscriber(err);
  };

  const cutUrl = (url: string) => {
    const queryIdx = url.indexOf('?');
    return queryIdx > -1 ? url.slice(0, queryIdx) : url;
  };

  const handleParseError = (err: AxiosError) => {
    const parsed = parseError(err);

    const url = cutUrl(err.response.config.url);

    if (!errorsBlackList.includes(url)) {
      notify(parsed);
    }

    return Promise.reject(parsed);
  };

  const subscribe = (newSubscriber: Subscriber) => {
    subscriber = newSubscriber;
  };

  const unsubscribe = () => {
    subscriber = null;
  };

  const instance = Axios.create(config) as Instance;

  instance.interceptors.response.use(
    (res) => parseSuccess(res),
    (err) => handleParseError(err)
  );

  return { ...instance, subscribe, unsubscribe } as Instance;
};
