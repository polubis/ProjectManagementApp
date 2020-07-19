import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

import AuthProvider, { useAuthProvider } from './AuthProvider';

namespace Guard {
  export namespace Route {
    export interface Props extends Omit<RouteProps, 'render'> {
      component: ComponentType;
      redirect: string;
    }
  }

  export namespace Children {
    export interface InjectedState extends Omit<AuthProvider.State, 'authorized' | 'pending'> {}

    export type RenderProp = (state: InjectedState) => JSX.Element;
  }

  export interface Props {
    children: JSX.Element | Children.RenderProp;
  }

  export interface AuthorProps extends Props {
    children: JSX.Element | null;
    author: string  
  }
}

const Protected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? typeof children === 'function'
      ? children(state)
      : children
    : null;
};

const Unprotected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? null
    : typeof children === 'function'
    ? children(state)
    : children;
};

const ProtectedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized } = useAuthProvider();

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
  const { pending, authorized } = useAuthProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Redirect to={redirect} /> : <Component {...(props as any)} />
      }
    />
  );
};

const OnlyAuthor = ({ children, author }: Guard.AuthorProps) => {
  const { user } = useAuthProvider();

  return user && user.username === author
  ? children
  : null
}

const Guard = {
  Protected,
  Unprotected,
  ProtectedRoute,
  UnprotectedRoute,
  OnlyAuthor
};

export default Guard;
