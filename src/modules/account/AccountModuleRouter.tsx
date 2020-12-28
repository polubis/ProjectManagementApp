import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { withLazy } from 'utils';

const General = withLazy(() => import('./general'));

const AcountModuleRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/account/general" component={General} />
      {/* <Route path="/app" component={MainModule} />
      <Route path="/account" component={AccountModule} />
      <Route path="/" component={BaseModule} /> */}

      <Route path="*" render={() => <Redirect to="/account/general" />} />
    </Switch>
  );
};

export default AcountModuleRouter;
