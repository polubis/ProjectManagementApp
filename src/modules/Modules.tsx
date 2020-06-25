import React from 'react';

import { Auth } from 'core/auth';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <Auth.Provider>
      <TechnologiesProvider>
        <ModulesRouter />
      </TechnologiesProvider>
    </Auth.Provider>
  );
};

export default Modules;
