import { AxiosError, AxiosResponse } from 'axios';

import { CORE_API_PATH } from 'consts';

import { makeInstance, Api } from '.';

const parseError = ({ response: { statusText } }: AxiosError) => Promise.reject(statusText);

const parseSuccess = (response: AxiosResponse<Api.Response<any>>) => response.data.data;

export const core = makeInstance({
  baseURL: CORE_API_PATH,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})(parseSuccess, parseError);
