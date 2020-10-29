import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import CookiesProvider from 'core/cookies';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import { CookieConsent } from 'shared/components';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <>
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
    </>
  );
};

export default Modules;
