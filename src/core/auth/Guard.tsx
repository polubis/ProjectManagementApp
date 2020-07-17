import React, { ComponentType, Component } from 'react';
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
    author: string,
    redirect?: string
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

const OnlyAuthor = ({children, author, redirect}: Guard.AuthorProps) => {
  const { pending, authorized, user, ...state } = useAuthProvider();
  
  return !user
  ? null
  : pending
  ? null
  : authorized && author === user.username
  ? typeof children === 'function'
    ? children({user, ...state})
    : children
  : redirect
  ? <Redirect to={redirect} />
  : null;
}



const Guard = {
  Protected,
  Unprotected,
  ProtectedRoute,
  UnprotectedRoute,
  OnlyAuthor
};

export default Guard;
