import axios from 'axios';

export const core = axios.create({
  baseURL: 'https://web-api-c.azurewebsites.net/api/',
  headers: { 'Content-Type': 'application/json' }
});
