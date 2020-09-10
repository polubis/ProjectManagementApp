import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'core/auth';
import { usePatternsProvider } from 'core/patterns';
import { useTechnologiesProvider } from 'core/technologies';

const ForgottenPassword = withLazy(() => import('./forgotten-password'));
const Home = withLazy(() => import('./home'));
const Login = withLazy(() => import('./login'));
const Main = withLazy(() => import('./main'));
const Register = withLazy(() => import('./register'));

const ModulesRouter = () => {
  const { getPatterns } = usePatternsProvider();
  const { getTechnologies } = useTechnologiesProvider();

  useEffect(() => {
    getPatterns('');
    getTechnologies('');
  }, []);

  return (
    <Switch>
      <Guard.UnprotectedRoute exact path="/forgotten-password" redirect="/app" component={ForgottenPassword} />
      <Guard.UnprotectedRoute exact path="/login" redirect="/app" component={Login} />
      <Guard.UnprotectedRoute exact path="/register" redirect="/app" component={Register} />
      <Route path="/app" component={Main} />
      <Route exact path="/" component={Home} />
      <Route path="**" render={() => <div>Not Found Page </div>} />
    </Switch>
  );
};

export default ModulesRouter;
