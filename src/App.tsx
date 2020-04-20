import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { withLazy } from 'shared/utils';
import { withAlertsManagement } from 'shared/alerts-management';

import { coreInstance } from 'api';

const LoginView = withLazy(() => import('views/login'));
const MainView = withLazy(() => import('views/main'));
const MainPageView = withLazy(() => import('views/main-page'));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Route path="/app" component={MainView} />
        <Route path="" component={MainPageView} />
      </Switch>
    </BrowserRouter>
  );
};

export default withAlertsManagement(App)(coreInstance);
