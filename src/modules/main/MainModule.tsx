import React from 'react';

import { GithubConnect, AddSurvey } from 'shared/components';
import NotificationsProvider from 'shared/providers/notifications';

import { MobileNavigation, Navbar, Sidebar } from './components';
import MainModuleRouter from './MainModuleRouter';

import csx from './MainModule.scss';

const MainModule = () => {
  return (
    <NotificationsProvider>
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
    </NotificationsProvider>
  );
};

export default MainModule;
