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

import { Mapper, Events, Source } from 'rest-source';

const Kaltura = Events(
  Mapper<null, string>(
    Source<{ data: null }>({ config }),
    () => {},
    () => {}
  ),
  () => {},
  () => {}
);

// Kaltura.headers = {
//   ...newHeaders,
//   url: newUrl
// }

Kaltura.get('/users').on(
  () => {},
  () => {},
  () => {}
);

Kaltura.post('/', {}).on(
  () => {},
  () => {},
  () => {}
);

// Kaltura.post<MyResponse, MyPayload>()
