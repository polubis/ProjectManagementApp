import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {

  return (
    <>
      <AlertsManager />
      <AuthProvider>
        <PatternsProvider>
          <TechnologiesProvider>
            <ModulesRouter />
          </TechnologiesProvider>
        </PatternsProvider>
      </AuthProvider>
    </>
  );
};

export default Modules;
