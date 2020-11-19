import Axios, {
  AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance,
} from 'axios';

export namespace Api {
  export type Subscriber = (error: string) => void;

  export namespace Parser {
    export type Success<T = any> = (res: AxiosResponse<T>) => any;

    export type Error<T = any> = (err: AxiosError<T>) => string;
  }

  export interface Instance extends AxiosInstance {
    get: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
    delete: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
    post: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    put: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    patch: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
    subscribe: (subscriber: Subscriber) => void;
    unsubscribe: () => void;
  }
}

export const makePaths = (controller: string) => (...paths: string[]) => paths.map((p) => `${controller}/${p}`);

export const makeInstance = (config: AxiosRequestConfig) => (
  parseSuccess: Api.Parser.Success,
  parseError: Api.Parser.Error,
) => (errorsBlackList: string[]): Api.Instance => {
  let subscriber: Api.Subscriber = null;

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

  const subscribe = (newSubscriber: Api.Subscriber) => {
    subscriber = newSubscriber;
  };

  const unsubscribe = () => {
    subscriber = null;
  };

  const instance = Axios.create(config) as Api.Instance;

  instance.interceptors.response.use(
    (res) => parseSuccess(res),
    (err) => handleParseError(err),
  );

  return { ...instance, subscribe, unsubscribe } as Api.Instance;
};

export const toFormData = <T>(payload: T): FormData => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    formData.append(key, payload[key]);
  });

  return formData;
};
