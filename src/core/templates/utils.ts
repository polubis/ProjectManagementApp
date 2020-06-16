import { createContext } from 'react';

import { TemplatesProviderState } from '.';

export const INIT_STATE: TemplatesProviderState = {
  loading: true,
  allLoaded: false,
  error: '',
  templates: []
};

export const TemplatesContext = createContext(INIT_STATE);
