import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

import { usePatternsProvider } from 'shared/providers/patterns';
import { useTechnologiesProvider } from 'shared/providers/technologies';

const BaseModule = withLazy(() => import('./base'));
const MainModule = withLazy(() => import('./main'));

const ModulesRouter = (): JSX.Element => {
  const { getPatterns } = usePatternsProvider();
  const { getTechnologies } = useTechnologiesProvider();

  useEffect(() => {
    getPatterns();
    getTechnologies();
  }, []);

  return (
    <Switch>
      <Route path="/app" component={MainModule} />
      <Route path="/" component={BaseModule} />
      <Route path="**" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default ModulesRouter;
