import axios from 'axios';

import { API } from 'consts';

import { parseError } from '.';

export const coreInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

coreInstance.interceptors.response.use(
  (response) => response,
  (error) => parseError(error)
);
