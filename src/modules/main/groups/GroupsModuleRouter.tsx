import React, { FC } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router';

import { withLazy } from 'utils';

import { GroupCategory } from 'shared/models';

const GroupsModuleRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/:category`} render={() => <div>GroupsSearach</div>} />

      <Route path="*" render={() => <Redirect to={`${match.path}/${GroupCategory.ALL}`} />} />
    </Switch>
  );
};

export default GroupsModuleRouter;
