import React, { FC } from 'react';

import { GithubConnect, AddSurvey } from 'shared/components';
import NotificationsProvider from 'shared/providers/notifications';
import TemplatesHistoryProvider from 'shared/providers/templates-history';

import { MobileNavigation, Navbar, Sidebar } from './components';
import MainModuleRouter from './MainModuleRouter';

import csx from './MainModule.scss';

const MainModule: FC = () => {
  return (
    <NotificationsProvider>
      <TemplatesHistoryProvider>
        <div className={csx.mainModule}>
          <Navbar />

          <Sidebar />

          <MobileNavigation />

          <GithubConnect />

          <AddSurvey />

          <main>
            <MainModuleRouter />
          </main>
        </div>
      </TemplatesHistoryProvider>
    </NotificationsProvider>
  );
};

export default MainModule;
