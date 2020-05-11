import { createContext } from 'react';

import { AuthProviderState, AuthProviderPartialState } from '.';

export const INIT_STATE: AuthProviderPartialState = {
  isPending: false,
  isAuthorized: false,
  user: null,
  error: ''
};

export const AuthContext = createContext<AuthProviderState>({
  ...INIT_STATE,
  logIn: () => Promise.resolve()
});
