import React from 'react';
import { Route, RouteChildrenProps, Redirect } from 'react-router';

import { withLazy } from 'shared/utils';

import { Navbar, Sidebar } from '.';

import csx from './MainView.scss';

const TemplatesView = withLazy(() => import('views/templates'));
const TemplateDetailsView = withLazy(() => import('views/template-details'));
const TemplateDocumentationView = withLazy(() => import('views/template-documentation'));

interface MainViewProps extends RouteChildrenProps {}

const MainView = ({ match }: MainViewProps) => {
  return (
    <div className={csx.mainView}>
      <Navbar basePath={match.path} />

      <Sidebar basePath={match.path} />

      <main>
        <Route exact path={match.path} render={() => <Redirect to={`${match.path}/dashboard`} />} />

        <Route exact path={`${match.path}/dashboard`} render={() => <div>dashboard</div>} />

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

        <Route
          exact
          path={`${match.path}/templates`}
          render={() => <Redirect to={`${match.path}/templates/all`} />}
        />
      </main>
    </div>
  );
};

export default MainView;
