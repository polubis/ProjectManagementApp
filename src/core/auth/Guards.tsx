import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';

import { Auth, GuardProps, RouteGuardProps, RenderGuardChildren, GuardInjectedState } from '.';

const renderChildren = (
  children: JSX.Element | RenderGuardChildren,
  injectedState: GuardInjectedState
) => {
  return typeof children === 'function' ? children(injectedState) : children;
};

export const Unprotected = ({ children }: GuardProps) => {
  const { pending, authorized, ...injectedState } = useContext(Auth.Context);

  return pending ? null : authorized ? null : renderChildren(children, injectedState);
};

export const Protected = ({ children }: GuardProps) => {
  const { pending, authorized, ...injectedState } = useContext(Auth.Context);

  return pending ? null : authorized ? renderChildren(children, injectedState) : null;
};

export const ProtectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { pending, authorized } = useContext(Auth.Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Component {...(props as any)} /> : <Redirect to={redirect} />
      }
    />
  );
};

export const UnprotectedRoute = ({ component: Component, redirect, ...rest }: RouteGuardProps) => {
  const { pending, authorized } = useContext(Auth.Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Redirect to={redirect} /> : <Component {...(props as any)} />
      }
    />
  );
};
