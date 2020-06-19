import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { withLazy } from 'utils';

import { Auth, UnprotectedRoute } from 'core/auth';
import TechnologiesProvider from 'core/technologies';

const HomeView = withLazy(() => import('views/home'));
const LoginView = withLazy(() => import('views/login'));
const MainView = withLazy(() => import('views/main'));
const RegisterView = withLazy(() => import('views/register'));

const App = () => {
  return (
    <BrowserRouter>
      <Auth.Provider>
        <TechnologiesProvider>
          <Switch>
            <UnprotectedRoute exact path="/login" redirect="/app" component={LoginView} />
            <UnprotectedRoute exact path="/register" redirect="/app" component={RegisterView} />
            <Route path="/app" component={MainView} />
            <Route exact path="/" component={HomeView} />
            <Route path="**" render={() => <div>Not Found Page </div>} />
            {/* {TODO LATER IMPROVE NOT FOUND PAGE} */}
          </Switch>
        </TechnologiesProvider>
      </Auth.Provider>
    </BrowserRouter>
  );
};

export default App;
