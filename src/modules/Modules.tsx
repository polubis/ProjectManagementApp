import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import CookiesProvider from 'core/cookies';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import { CookieConsent } from 'shared/components';
import ErrorBoundary from 'shared/error-boundary';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <ErrorBoundary>
      <AlertsManager />
      <CookiesProvider>
        <CookieConsent />
        <AuthProvider>
          <PatternsProvider>
            <TechnologiesProvider>
              <ModulesRouter />
            </TechnologiesProvider>
          </PatternsProvider>
        </AuthProvider>
      </CookiesProvider>
    </ErrorBoundary>
  );
};

export default Modules;
