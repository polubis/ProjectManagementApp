import React, { useMemo } from 'react';
import { useHistory } from 'react-router';

import { TemplatesGrid, TemplatesSearch } from 'shared/components';

import TemplatesProvider, { useTemplatesProvider } from './TemplatesProvider';
import { TemplatesCategories } from './components';
import { useSearch, useRouteValidation } from './hooks';

import { LIMIT } from '.';

import csx from './Templates.scss';

const calcSpaceholdersCount = (pendingRequests: number) => () => pendingRequests * LIMIT;

const Templates = () => {
  const { location } = useHistory();

  const { pendingRequests, templates } = useTemplatesProvider();

  useSearch();

  const spaceholdersCount = useMemo(calcSpaceholdersCount(pendingRequests), [pendingRequests]);

  return (
    <div className={csx.templates}>
      <TemplatesCategories />
      <TemplatesSearch className={csx.templatesSearch} pathname={location.pathname} />
      <TemplatesGrid
        className={csx.templatesGrid}
        loading={!!pendingRequests}
        spaceholdersCount={spaceholdersCount}
        templates={templates}
      />
    </div>
  );
};

export default () => {
  useRouteValidation();

  return (
    <TemplatesProvider>
      <Templates />
    </TemplatesProvider>
  );
};
