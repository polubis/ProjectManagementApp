import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { withLazy } from 'shared/utils';

const LoginView = withLazy(() => import('views/login'));
const MainView = withLazy(() => import('views/main'));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/app" component={MainView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
