import axios from 'axios';

export const API = {
  CORE: 'https://web-api-c.azurewebsites.net/api/'
};

export const core = axios.create({
  baseURL: API.CORE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});
