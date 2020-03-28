import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Login from 'pages/login';

import { withLazy } from 'shared/utils';

const Register = withLazy(() => import('pages/register'));
const MainView = withLazy(() => import('views/main'));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/app" component={MainView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
