import React from 'react';
import { Route, Switch } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'core/auth';

const HomeView = withLazy(() => import('views/home'));
const LoginView = withLazy(() => import('views/login'));
const MainView = withLazy(() => import('views/main'));
const RegisterView = withLazy(() => import('views/register'));

const ModulesRouter = () => {
  return (
    <Switch>
      <Guard.UnprotectedRoute exact path="/login" redirect="/app" component={LoginView} />
      <Guard.UnprotectedRoute exact path="/register" redirect="/app" component={RegisterView} />
      <Route path="/app" component={MainView} />
      <Route exact path="/" component={HomeView} />
      <Route path="**" render={() => <div>Not Found Page </div>} />
      {/* {TODO LATER IMPROVE NOT FOUND PAGE} */}
    </Switch>
  );
};

export default ModulesRouter;
