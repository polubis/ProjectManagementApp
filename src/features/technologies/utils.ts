import { createContext } from 'react';

import { TechnologiesProviderState } from '.';

export const INIT_STATE: TechnologiesProviderState = {
  isLoading: false,
  error: '',
  technologies: [],
};

export const TechnologiesContext = createContext<TechnologiesProviderState>(INIT_STATE);
