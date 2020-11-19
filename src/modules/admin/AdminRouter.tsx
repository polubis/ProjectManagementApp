import React from 'react';
import {
  Route, Switch, Redirect, useRouteMatch,
} from 'react-router';

import { withLazy } from 'utils';

const Dictionaries = withLazy(() => import('./dictionaries'));
const PatternManagement = withLazy(() => import('./pattern-management'));
const TechnologyManagement = withLazy(() => import('./technology-management'));

const AdminRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/dictionaries/technologies/management/:id?`}
        component={TechnologyManagement}
      />

      <Route
        exact
        path={`${match.path}/dictionaries/patterns/management/:id?`}
        component={PatternManagement}
      />

      <Route exact path={`${match.path}/dictionaries/:kind?`} component={Dictionaries} />

      <Route path="*" render={() => <Redirect to={`${match.path}/dictionaries`} />} />
    </Switch>
  );
};

export default AdminRouter;
