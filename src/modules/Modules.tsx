import React from 'react';

import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <AuthProvider>
      <PatternsProvider>
        <TechnologiesProvider>
          <ModulesRouter />
        </TechnologiesProvider>
      </PatternsProvider>
    </AuthProvider>
  );
};

export default Modules;
