import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider, { UnprotectedRoute } from 'core/auth';

import { withLazy } from 'shared/utils';

const LoginView = withLazy(() => import('views/login'));
const MainView = withLazy(() => import('views/main'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/app" component={MainView} />
          <UnprotectedRoute path="/login" redirect="/app" component={LoginView} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
