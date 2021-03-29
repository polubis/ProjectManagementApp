import React, { FC } from 'react';

import { GithubConnect, AddSurvey } from 'shared/components';
import NotificationsProvider from 'shared/providers/notifications';
import TemplatesHistoryProvider from 'shared/providers/templates-history';
import FavouriteTemplatesProvider from 'shared/providers/favourite-templates';

import { MobileNavigation, Navbar, Sidebar } from './components';
import MainModuleRouter from './MainModuleRouter';

import csx from './MainModule.scss';

const MainModule: FC = () => {
  return (
    <NotificationsProvider>
      <TemplatesHistoryProvider>
        <FavouriteTemplatesProvider>
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
        </FavouriteTemplatesProvider>
      </TemplatesHistoryProvider>
    </NotificationsProvider>
  );
};

export default MainModule;
