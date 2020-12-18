import React from 'react';

import PatternsProvider from 'shared/providers/patterns';
import TechnologiesProvider from 'shared/providers/technologies';
import { CookieConsent, ErrorBoundary } from 'shared/components';
import AlertsProvider from 'shared/providers/alerts';
import AuthProvider from 'shared/providers/auth';
import CookiesProvider from 'shared/providers/cookies';

import ModulesRouter from './ModulesRouter';

const Modules = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <AlertsProvider>
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
      </AlertsProvider>
    </ErrorBoundary>
  );
};

export default Modules;
