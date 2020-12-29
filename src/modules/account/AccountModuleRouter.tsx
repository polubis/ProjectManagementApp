import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

const ChangePassword = withLazy(() => import('./change-password'));
const General = withLazy(() => import('./general'));

const AcountModuleRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/account/general/change-password" component={ChangePassword} />

      <Route exact path="/account/general" component={General} />

      <Route path="*" render={() => <Redirect to="/account/general" />} />
    </Switch>
  );
};

export default AcountModuleRouter;
