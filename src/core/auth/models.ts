import { RouteProps, RouteComponentProps } from 'react-router';

import { User, LogInPayload } from 'api';

export interface AuthProviderProps extends RouteComponentProps {
  children: React.ReactNode;
}

export interface AuthProviderPartialState {
  isPending: boolean;
  isAuthorized: boolean;
  error: string;
  user: User | null;
}

export interface AuthProviderState extends AuthProviderPartialState {
  logIn?(credentials: LogInPayload): Promise<void>;
  logOut?(): Promise<void>;
}

export interface GuardInjectedState extends Omit<AuthProviderState, 'isAuthorized' | 'isPending'> {}

export type RenderGuardChildren = (injectedState: GuardInjectedState | null) => JSX.Element;

export interface GuardProps {
  children: JSX.Element | RenderGuardChildren;
}

export interface RouteGuardProps extends Omit<RouteProps, 'render'> {
  component: React.ComponentType;
  redirect: string;
}
