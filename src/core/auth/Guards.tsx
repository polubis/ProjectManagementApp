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
  const { isPending, isAuthorized, ...injectedState } = useContext(AuthContext);

  return isPending ? null : isAuthorized ? null : renderChildren(children, injectedState);
};

export const Protected = ({ children }: GuardProps) => {
  const { isPending, isAuthorized, ...injectedState } = useContext(AuthContext);

  return isPending ? null : isAuthorized ? renderChildren(children, injectedState) : null;
};

export const ProtectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { isPending, isAuthorized } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (isPending ? null : isAuthorized ? <Component /> : <Redirect to={redirect} />)}
    />
  );
};

export const UnprotectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { isPending, isAuthorized } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (isPending ? null : isAuthorized ? <Redirect to={redirect} /> : <Component />)}
    />
  );
};
