import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';
import ForkTemplateInfoProvider from 'shared/providers/fork-template-info'

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <>
      <AlertsManager />
      <AuthProvider>
        <PatternsProvider>
          <TechnologiesProvider>
            <ForkTemplateInfoProvider>
              <ModulesRouter />
            </ForkTemplateInfoProvider>
          </TechnologiesProvider>
        </PatternsProvider>
      </AuthProvider>
    </>
  );
};

export default Modules;
