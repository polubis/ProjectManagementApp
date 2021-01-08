import React from 'react';

import { Layout, Navigation, MobileNavigation } from './components';

import AccountModuleRouter from './AccountModuleRouter';

const AccountModule = (): JSX.Element => {
  return (
    <>
      <Layout>
        <Navigation />
        <AccountModuleRouter />
      </Layout>
      <MobileNavigation />
    </>
  );
};

export default AccountModule;
