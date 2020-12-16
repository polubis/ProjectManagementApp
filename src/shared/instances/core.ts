import { CORE_API_PATH } from 'consts';

import { createInstance } from 'utils';

export const core = createInstance({
  baseURL: CORE_API_PATH,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})(
  ({ data: { data } }) => data,
  ({ response: { data, statusText } }) => (data && data.hasErrors ? data.errors[0] : statusText)
)(['Account/GetCurrentUserData', 'Templates/Fork']);
