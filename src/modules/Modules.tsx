import React from 'react';

import { AlertsProvider } from "shared/providers/alerts"
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <>
      <AlertsProvider>
        <AuthProvider>
          <PatternsProvider>
            <TechnologiesProvider>
              <ModulesRouter />
            </TechnologiesProvider>
          </PatternsProvider>
        </AuthProvider>
      </AlertsProvider>
    </>
  );
};

export default Modules;
