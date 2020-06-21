import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

import { Auth } from '.';

namespace Guard {
  export namespace Route {
    export interface Props extends Omit<RouteProps, 'render'> {
      component: ComponentType;
      redirect: string;
    }
  }

  export namespace Children {
    export interface InjectedState extends Omit<Auth.Provider.State, 'authorized' | 'pending'> {}

    export type RenderProp = (state: InjectedState) => JSX.Element;
  }

  export interface Props {
    children: JSX.Element | Children.RenderProp;
  }
}

const Protected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = Auth.useProvider();

  return pending
    ? null
    : authorized
    ? typeof children === 'function'
      ? children(state)
      : children
    : null;
};

const Unprotected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = Auth.useProvider();

  return pending
    ? null
    : authorized
    ? null
    : typeof children === 'function'
    ? children(state)
    : children;
};

const ProtectedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized } = Auth.useProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Component {...(props as any)} /> : <Redirect to={redirect} />
      }
    />
  );
};

const UnprotectedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized } = Auth.useProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Redirect to={redirect} /> : <Component {...(props as any)} />
      }
    />
  );
};

const Guard = {
  Protected,
  Unprotected,
  ProtectedRoute,
  UnprotectedRoute
};

export default Guard;
