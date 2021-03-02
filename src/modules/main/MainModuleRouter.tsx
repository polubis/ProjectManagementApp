import React from 'react';
import { useRouteMatch, Route, Redirect, Switch } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'shared/guards';
import { TemplateCategory } from 'shared/models';

const AdminModule = withLazy(() => import('./admin'));
const Templates = withLazy(() => import('./templates'));
const TemplateDetails = withLazy(() => import('./template-details'));
const TemplateDocumentation = withLazy(() => import('./template-documentation'));
const TemplateManagement = withLazy(() => import('./template-management'));
const Dashboard = withLazy(() => import('./dashboard'));

const MainModuleRouter = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Guard.AdminRoute
        redirect={`${match.path}/templates`}
        path={`${match.path}/admin`}
        component={AdminModule}
      />

      <Guard.ProtectedRoute
        exact
        redirect={`${match.path}/templates`}
        path={`${match.path}/templates/management/:id?`}
        component={TemplateManagement}
      />

      <Route exact path={`${match.path}/dashboard`} component={Dashboard} />

      <Route
        exact
        path={`${match.path}/templates`}
        render={() => <Redirect to={`${match.path}/templates/${TemplateCategory.ALL}`} />}
      />

      <Route exact path={`${match.path}/templates/:category`} component={Templates} />

      <Route exact path={`${match.path}/templates/:category/:id`} component={TemplateDetails} />

      <Route
        exact
        path={`${match.path}/templates/:category/:id/documentation`}
        component={TemplateDocumentation}
      />

      <Route
        path="*"
        render={() => <Redirect to={`${match.path}/templates/${TemplateCategory.ALL}`} />}
      />
    </Switch>
  );
};

export default MainModuleRouter;
