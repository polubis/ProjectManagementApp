import { AxiosError, AxiosResponse } from 'axios';

import { ApiResponse } from '.';

export const parseError = ({ response: { statusText, data } }: AxiosError) => {
  if (data) {
    return Promise.reject(data.errors[0]);
  }

  return Promise.reject(statusText);
};

export const call = <R>(promise: Promise<AxiosResponse<ApiResponse<R>>>): Promise<R> => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve((await promise).data.data);
    } catch (err) {
      reject(err);
    }
  });
};
