import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import RegisterPage from 'pages/register/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
