import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

import { Category } from './models';

const AdminRouter = () => {
  const { location } = useHistory();
  return (
    <Switch>
      <Route
        exact
        path={`${location.pathname}`}
        render={() => <Redirect to={`${location.pathname}/dictionaries/${Category.TECHNOLOGIES}`} />}
      />
    </Switch>
  );
};

export default AdminRouter;
