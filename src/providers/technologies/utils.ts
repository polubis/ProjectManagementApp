import { createContext } from 'react';

import { TechnologiesProviderState } from '.';

export const INIT_STATE: TechnologiesProviderState = {
  isLoading: true,
  error: '',
  technologies: []
};

export const TechnologiesContext = createContext(INIT_STATE);
