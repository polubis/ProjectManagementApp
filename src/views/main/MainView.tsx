import React from 'react';
import { Route, RouteChildrenProps, Redirect, Switch } from 'react-router';

import { ProtectedRoute } from 'core/auth';

import { withLazy } from 'shared/utils';

import { Navbar, Sidebar } from '.';

import csx from './MainView.scss';

const TemplatesView = withLazy(() => import('views/templates'));

const TemplateDetailsView = withLazy(() => import('views/template-details'));

const TemplateDocumentationView = withLazy(() => import('views/template-documentation'));

const TemplateCreationView = withLazy(() => import('views/template-creation'));

interface MainViewProps extends RouteChildrenProps {}

const MainView = ({ match }: MainViewProps) => {
  return (
    <div className={csx.mainView}>
      <Navbar basePath={match.path} />

      <Sidebar basePath={match.path} />

      <main>
        <Switch>
          <Route exact path={`${match.path}/dashboard`} render={() => <div>dashboard</div>} />

          <Route exact path={`${match.path}/projects`} render={() => <div>projects</div>} />

          <ProtectedRoute
            exact
            redirect={`${match.path}/templates`}
            path={`${match.path}/templates/creation`}
            component={TemplateCreationView}
          />

          <Route
            exact
            path={`${match.path}/templates`}
            render={() => <Redirect to={`${match.path}/templates/all`} />}
          />

          <Route exact path={`${match.path}/templates/:category`} component={TemplatesView} />

          <Route
            exact
            path={`${match.path}/templates/:category/:id`}
            component={TemplateDetailsView}
          />

          <Route
            exact
            path={`${match.path}/templates/:category/:id/documentation`}
            component={TemplateDocumentationView}
          />

          <Route path="*" render={() => <Redirect to={`${match.path}/dashboard`} />} />
        </Switch>
      </main>
    </div>
  );
};

export default MainView;
