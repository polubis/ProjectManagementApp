import React from 'react';
import { Route, Switch } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'core/auth';

const Home = withLazy(() => import('./home'));
const Login = withLazy(() => import('./login'));
const Main = withLazy(() => import('./main'));
const Register = withLazy(() => import('./register'));
const Admin = withLazy(() => import('./admin'));

const ModulesRouter = () => {
  return (
    <Switch>
      <Guard.UnprotectedRoute exact path="/login" redirect="/app" component={Login} />
      <Guard.UnprotectedRoute exact path="/register" redirect="/app" component={Register} />
      <Route path="/app" component={Main} />
      <Route path="/admin" component={Admin} />
      <Route exact path="/" component={Home} />
      <Route path="**" render={() => <div>Not Found Page </div>} />
    </Switch>
  );
};

export default ModulesRouter;
