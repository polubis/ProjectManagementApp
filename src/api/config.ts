import axios from 'axios';

import { parseError } from '.';

import { API } from 'consts';

export const coreInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

coreInstance.interceptors.response.use(
  (response) => response,
  (error) => parseError(error)
);
