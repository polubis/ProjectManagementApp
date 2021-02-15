import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'shared/guards';
import { usePatternsProvider } from 'shared/providers/patterns';
import { useTechnologiesProvider } from 'shared/providers/technologies';
import Test from 'src/test/Test';

const BaseModule = withLazy(() => import('./base'));
const MainModule = withLazy(() => import('./main'));
const AccountModule = withLazy(() => import('./account'));

const ModulesRouter = (): JSX.Element => {
  const { getPatterns } = usePatternsProvider();
  const { getTechnologies } = useTechnologiesProvider();

  useEffect(() => {
    getPatterns();
    getTechnologies();
  }, []);

  return (
    <Switch>
      <Guard.ProtectedRoute path="/account" redirect="/app" component={AccountModule} />
      <Route path="/app" component={MainModule} />
      <Route path="/test" component={Test} />
      <Route path="/" component={BaseModule} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default ModulesRouter;
