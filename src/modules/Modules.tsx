import React from 'react';

import { AlertsManager } from 'core/api';
import AuthProvider from 'core/auth';
import PatternsProvider from 'core/patterns';
import TechnologiesProvider from 'core/technologies';

import ModulesRouter from './ModulesRouter';
import { useLocation } from 'react-router-dom';

import { AdminTabCategory } from './admin/admin-tab-categories/AdminTabCategories';

const shouldLoadTechnologies = (pathname: string, search: string): boolean =>
  search.length === 0 &&
  !pathname.includes(`/${AdminTabCategory.TECHNOLOGIES}`)
  && pathname.split('/').pop() !== 'admin';
// because of redirect from '/admin/' to 'admin/technolgies'
// because of redirect from '/templates/' to 'templates/all'

const shouldLoadPatterns = (pathname: string, search: string): boolean =>
  search.length === 0 && !pathname.includes(`/${AdminTabCategory.PATTERNS}`);

const Modules = () => {
  const { pathname, search } = useLocation();

  console.log({ pathname, search });

  return (
    <>
      <AlertsManager />
      <AuthProvider>
        <PatternsProvider getOnInit={shouldLoadPatterns(pathname, search)}>
          <TechnologiesProvider getOnInit={shouldLoadTechnologies(pathname, search)}>
            <ModulesRouter />
          </TechnologiesProvider>
        </PatternsProvider>
      </AuthProvider>
    </>
  );
};

export default Modules;
