import React from 'react';

import { Layout, Navigation } from './components';

import AccountModuleRouter from './AccountModuleRouter';

const AccountModule = (): JSX.Element => {
  return (
    <Layout>
      <Navigation />
      <AccountModuleRouter />
    </Layout>
  );
};

export default AccountModule;
