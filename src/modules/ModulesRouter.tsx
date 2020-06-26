import React from 'react';
import { Route, Switch } from 'react-router';

import { Guard } from 'core/auth';

import { withLazy } from 'utils';

const Home = withLazy(() => import('./home'));
const Login = withLazy(() => import('./login'));
const Main = withLazy(() => import('./main'));
const Register = withLazy(() => import('./register'));

const ModulesRouter = () => {
  return (
    <Switch>
      <Guard.UnprotectedRoute exact path="/login" redirect="/app" component={Login} />
      <Guard.UnprotectedRoute exact path="/register" redirect="/app" component={Register} />
      <Route path="/app" component={Main} />
      <Route exact path="/" component={Home} />
      <Route path="**" render={() => <div>Not Found Page </div>} />
    </Switch>
  );
};

export default ModulesRouter;
