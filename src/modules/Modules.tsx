import React from 'react';

import AuthProvider from 'core/auth';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <AuthProvider>
      <TechnologiesProvider>
        <ModulesRouter />
      </TechnologiesProvider>
    </AuthProvider>
  );
};

export default Modules;
