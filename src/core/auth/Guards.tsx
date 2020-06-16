import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';

import {
  AuthContext,
  GuardProps,
  RouteGuardProps,
  RenderGuardChildren,
  GuardInjectedState
} from '.';

const renderChildren = (
  children: JSX.Element | RenderGuardChildren,
  injectedState: GuardInjectedState
) => {
  return typeof children === 'function' ? children(injectedState) : children;
};

export const Unprotected = ({ children }: GuardProps) => {
  const { pending, authorized, ...injectedState } = useContext(AuthContext);

  return pending ? null : authorized ? null : renderChildren(children, injectedState);
};

export const Protected = ({ children }: GuardProps) => {
  const { pending, authorized, ...injectedState } = useContext(AuthContext);

  return pending ? null : authorized ? renderChildren(children, injectedState) : null;
};

export const ProtectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { pending, authorized } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (pending ? null : authorized ? <Component /> : <Redirect to={redirect} />)}
    />
  );
};

export const UnprotectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { pending, authorized } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (pending ? null : authorized ? <Redirect to={redirect} /> : <Component />)}
    />
  );
};
