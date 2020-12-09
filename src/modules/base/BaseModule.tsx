import React from 'react';

import BaseModuleRouter from './BaseModuleRouter';
import { MobileNavigation, Navbar, Footer } from './components';

import csx from './BaseModule.scss';

const BaseModule = (): JSX.Element => {
  return (
    <div className={csx.baseModule}>
      <Navbar />
      <MobileNavigation />
      <main>
        <BaseModuleRouter />
      </main>
      <Footer />
    </div>
  );
};

export default BaseModule;
