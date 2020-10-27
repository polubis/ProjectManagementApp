import React from 'react';

import { AlertsProvider } from "shared/providers/alerts"
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <>
      <AuthProvider>
        <PatternsProvider>
          <TechnologiesProvider>
            <AlertsProvider>
              <ModulesRouter />
            </AlertsProvider>
          </TechnologiesProvider>
        </PatternsProvider>
      </AuthProvider>
    </>
  );
};

export default Modules;
