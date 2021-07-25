import React, { FC } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router';

import { withLazy } from 'utils';

import { GroupCategory } from 'shared/models';

const GroupManagement = withLazy(() => import('./group-management'));
const Groups = withLazy(() => import('./groups'));

const GroupsModuleRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/management/:id?`} component={GroupManagement} />

      <Route exact path={`${match.path}/:category/:id`} render={() => <div>Details</div>} />

      <Route exact path={`${match.path}/:category`} component={Groups} />

      <Route path="*" render={() => <Redirect to={`${match.path}/${GroupCategory.ALL}`} />} />
    </Switch>
  );
};

export default GroupsModuleRouter;
