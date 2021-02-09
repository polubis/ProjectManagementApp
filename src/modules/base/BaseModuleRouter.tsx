import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

import { OnlyUnauthorizedRoute } from 'shared/guards';

const ForgottenPassword = withLazy(() => import('./forgotten-password'));
const Home = withLazy(() => import('./home'));
const Login = withLazy(() => import('./login'));
const Register = withLazy(() => import('./register'));

const BaseModuleRouter = (): JSX.Element => {
  return (
    <Switch>
      <OnlyUnauthorizedRoute
        exact
        path="/forgotten-password"
        redirect="/app"
        component={ForgottenPassword}
      />
      <OnlyUnauthorizedRoute exact path="/login" redirect="/app" component={Login} />
      <OnlyUnauthorizedRoute exact path="/register" redirect="/app" component={Register} />
      <Route exact path="/" component={Home} />

      <Route path="**" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default BaseModuleRouter;
