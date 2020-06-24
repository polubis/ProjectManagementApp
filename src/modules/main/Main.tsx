import React from 'react';
import { Route, RouteChildrenProps, Redirect, Switch } from 'react-router';

import { withLazy } from 'utils';

import { Guard } from 'core/auth';

import { Navbar, Sidebar } from '.';

import csx from './Main.scss';

const Templates = withLazy(() => import('src/modules/templates'));

const TemplateDetails = withLazy(() => import('src/modules/template-details'));

const TemplateDocumentation = withLazy(() => import('src/modules/template-documentation'));

const TemplateCreation = withLazy(() => import('src/modules/template-creation'));

interface MainProps extends RouteChildrenProps {}

const Main = ({ match }: MainProps) => {
  return (
    <div className={csx.main}>
      <Navbar basePath={match.path} />

      <Sidebar basePath={match.path} />

      <main>
        <Switch>
          <Route exact path={`${match.path}/dashboard`} render={() => <div>dashboard</div>} />

          <Route exact path={`${match.path}/projects`} render={() => <div>projects</div>} />

          <Guard.ProtectedRoute
            exact
            redirect={`${match.path}/templates`}
            path={`${match.path}/templates/creation`}
            component={TemplateCreation}
          />

          <Route
            exact
            path={`${match.path}/templates`}
            render={() => <Redirect to={`${match.path}/templates/all`} />}
          />

          <Route exact path={`${match.path}/templates/:category`} component={Templates} />

          <Route exact path={`${match.path}/templates/:category/:id`} component={TemplateDetails} />

          <Route
            exact
            path={`${match.path}/templates/:category/:id/documentation`}
            component={TemplateDocumentation}
          />

          <Route path="*" render={() => <Redirect to={`${match.path}/dashboard`} />} />
        </Switch>
      </main>
    </div>
  );
};

export default Main;
