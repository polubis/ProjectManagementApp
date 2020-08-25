import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';
import { useLocation } from 'react-router-dom';
import { shouldLoadPatterns, shouldLoadTechnologies } from './shouldLoadDataOnInit';

const Modules = () => {
  const { pathname, search } = useLocation();

  return (
    <>
      <AlertsManager />
      <AuthProvider>
        <PatternsProvider getOnMount={shouldLoadPatterns(pathname, search)}>
          <TechnologiesProvider getOnMount={shouldLoadTechnologies(pathname, search)}>
            <ModulesRouter />
          </TechnologiesProvider>
        </PatternsProvider>
      </AuthProvider>
    </>
  );
};

export default Modules;
