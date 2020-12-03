import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'shared/guards';

import { PageLoader } from './components';

const ForgottenPassword = withLazy(() => import('./forgotten-password'), PageLoader);
const Home = withLazy(() => import('./home'), PageLoader);
const Login = withLazy(() => import('./login'), PageLoader);
const Register = withLazy(() => import('./register'), PageLoader);

const BaseModuleRouter = (): JSX.Element => {
  return (
    <Switch>
      <Guard.UnprotectedRoute
        exact
        path="/forgotten-password"
        redirect="/app"
        component={ForgottenPassword}
      />
      <Guard.UnprotectedRoute exact path="/login" redirect="/app" component={Login} />
      <Guard.UnprotectedRoute exact path="/register" redirect="/app" component={Register} />
      <Route exact path="/" component={Home} />

      <Route path="**" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default BaseModuleRouter;
