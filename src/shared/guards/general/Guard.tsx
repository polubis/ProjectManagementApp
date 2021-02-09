import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

import { AccountRole } from 'shared/models';
import AuthProvider, { useAuthProvider } from 'shared/providers/auth';

namespace Guard {
  export namespace Route {
    export interface Props extends Omit<RouteProps, 'render'> {
      component: ComponentType;
      redirect: string;
    }
  }

  export namespace Children {
    export type InjectedState = Omit<AuthProvider.State, 'authorized' | 'pending'>;

    export type RenderProp = (state: InjectedState) => JSX.Element;
  }

  export interface Props {
    children: React.ReactNode | Children.RenderProp;
  }
}

const OnlyAdmin = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? state.user.roles.includes(AccountRole.Admin)
      ? typeof children === 'function'
        ? children(state)
        : children
      : null
    : null;
};

const OnlyAdminRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized, user } = useAuthProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? (
          user.roles.includes(AccountRole.Admin) ? (
            <Component {...(props as any)} />
          ) : (
            <Redirect to={redirect} />
          )
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
};

const OnlyAuthorized = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? typeof children === 'function'
      ? children(state)
      : children
    : null;
};

const OnlyUnauthorized = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? null
    : typeof children === 'function'
    ? children(state)
    : children;
};

const OnlyAuthorizedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
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

const OnlyUnauthorizedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
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

export { OnlyAdmin, 
  OnlyAdminRoute, 
  OnlyAuthorized, 
  OnlyUnauthorized, 
  OnlyAuthorizedRoute, 
  OnlyUnauthorizedRoute 
};

