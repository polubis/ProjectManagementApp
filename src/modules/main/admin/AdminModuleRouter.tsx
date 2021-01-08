import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router';

import { withLazy } from 'utils';

const Dictionaries = withLazy(() => import('./dictionaries'));
const PatternManagement = withLazy(() => import('./pattern-management'));
const Surveys = withLazy(() => import('./surveys'));
const TechnologyManagement = withLazy(() => import('./technology-management'));
const Users = withLazy(() => import('./users'));

const AdminModuleRouter = (): JSX.Element => {
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

      <Route exact path={`${match.path}/users/:role?`} component={Users} />

      <Route exact path={`${match.path}/surveys`} component={Surveys} />

      <Route path="*" render={() => <Redirect to={`${match.path}/dictionaries`} />} />
    </Switch>
  );
};

export default AdminModuleRouter;
