import { CORE_API_PATH } from 'consts';

import { createInstance } from 'utils';

interface Core<T> {
  data: T;
  hasErrors: boolean;
  errors: string[];
}

export const core = createInstance<Core<unknown>, string>({
  baseURL: CORE_API_PATH,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  parseSuccess: (res) => res.data.data,
  parseError: ({ response: { data, statusText } }) =>
    data && data.hasErrors ? data.errors[0] : statusText,
});
