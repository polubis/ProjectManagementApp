import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

// interface Instance extends AxiosInstance {
//   get: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
//   delete: <R = any>(url: string, config?: AxiosRequestConfig) => Promise<R>;
//   post: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
//   put: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
//   patch: <R = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
//   subscribe: (subscriber: Subscriber) => void;
//   unsubscribe: () => void;
// }

// // createInstance<Model>(config)

// export const createInstance = (config: AxiosRequestConfig) => (
//   parseSuccess: Success,
//   parseError: Error
// ) => (errorsBlackList: string[]): Instance => {
//   let subscriber: Subscriber = null;

//   const notify = (err: any) => {
//     subscriber(err);
//   };

//   const cutUrl = (url: string) => {
//     const queryIdx = url.indexOf('?');
//     return queryIdx > -1 ? url.slice(0, queryIdx) : url;
//   };

//   const handleParseError = (err: AxiosError) => {
//     const parsed = parseError(err);

//     const url = cutUrl(err.response.config.url);

//     if (!errorsBlackList.includes(url)) {
//       notify(parsed);
//     }

//     return Promise.reject(parsed);
//   };

//   const subscribe = (newSubscriber: Subscriber) => {
//     subscriber = newSubscriber;
//   };

//   const unsubscribe = () => {
//     subscriber = null;
//   };

//   const instance = Axios.create(config) as Instance;

//   instance.interceptors.response.use(
//     (res) => parseSuccess(res),
//     (err) => handleParseError(err)
//   );

//   return { ...instance, subscribe, unsubscribe } as Instance;
// };

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

  // let successParser = (res) => res;
  // let errorParser = (res) => res;

  // instance.addSuccessParser = (parser: SuccessParser<T, unknown>): void => {
  //   successParser = parser;
  // };

  // instance.addErrorParser = (parser: ErrorParser<T, unknown>): void => {
  //   errorParser = parser;
  // };

  // instance.interceptors.response.use(
  //   (res) => successParser(res),
  //   (err) => errorParser(err)
  // );

  // instance.addErrorParser = (parser: SuccessParser<R>): void => {
  //   successParser = parser;
  // };
  // instance.addErrorParser();

  return instance;
};
