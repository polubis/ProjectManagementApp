import { createContext } from 'react';

import { AuthProviderState } from '.';

export const INIT_STATE: AuthProviderState = {
  isPending: false,
  isAuthorized: false,
  user: null,
  error: ''
};

export const AuthContext = createContext(INIT_STATE);
