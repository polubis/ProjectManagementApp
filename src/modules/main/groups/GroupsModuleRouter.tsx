import React, { FC } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router';

import { withLazy } from 'utils';

import { GroupCategory } from 'shared/models';
import { GroupTile } from 'shared/components';

const GroupManagement = withLazy(() => import('./group-management'));

const GroupsModuleRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/management/:id?`} component={GroupManagement} />

      <Route exact path={`${match.path}/:category/:id`} render={() => <div>Details</div>} />

      <Route
        exact
        path={`${match.path}/:category`}
        render={() => (
          <div>
            <GroupTile />
          </div>
        )}
      />

      <Route path="*" render={() => <Redirect to={`${match.path}/${GroupCategory.ALL}`} />} />
    </Switch>
  );
};

export default GroupsModuleRouter;
