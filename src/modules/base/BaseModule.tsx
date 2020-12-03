import React from 'react';

import BaseModuleRouter from './BaseModuleRouter';
import { MobileNavigation, Navbar, Footer } from './components';

const BaseModule = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <MobileNavigation />
      <BaseModuleRouter />
      <Footer />
    </>
  );
};

export default BaseModule;
