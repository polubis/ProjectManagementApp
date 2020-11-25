import React from 'react';

import { ErrorBoundary } from 'utils';

import PatternsProvider from 'shared/providers/patterns';
import TechnologiesProvider from 'shared/providers/technologies';
import { AlertsManager, CookieConsent } from 'shared/components';
import AuthProvider from 'shared/providers/auth';
import CookiesProvider from 'shared/providers/cookies';

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
