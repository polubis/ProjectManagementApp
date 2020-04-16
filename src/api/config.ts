import axios from 'axios';

import { API } from 'consts';

export const coreInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});