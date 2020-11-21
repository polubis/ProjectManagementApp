import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import CookiesProvider from 'core/cookies';
import ErrorBoundary from 'core/error-boundary';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import { CookieConsent } from 'shared/components';

import ModulesRouter from './ModulesRouter';

const Modules = (): JSX.Element => {
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
