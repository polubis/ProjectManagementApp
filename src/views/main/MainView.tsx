import React from 'react';
import { Route, RouteChildrenProps } from 'react-router';

import { Sidebar } from 'shared/ui';

import csx from './MainView.scss';

interface MainViewProps extends RouteChildrenProps {}

const MainView = ({ match }: MainViewProps) => {
  return (
    <div className={csx.mainView}>
      <nav></nav>

      <Sidebar basePath={match.path} />

      <main>
        <Route exact path={match.path} render={() => <div>dashboard</div>} />
        <Route exact path={`${match.path}/templates`} render={() => <div>Templates list</div>} />
      </main>
    </div>
  );
};

export default MainView;
