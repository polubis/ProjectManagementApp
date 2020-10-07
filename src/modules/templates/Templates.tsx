import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { TemplatesSearch, TemplatesGrid } from 'shared/components';

import { TemplatesCategories } from './components';
import {
  useRouteValidation,
  useFilters,
  usePayload,
  useTemplatesSearch,
  useSpaceholdersCount
} from './hooks';

import { TemplatesRouteProps } from '.';

import csx from './Templates.scss';

const Templates = () => {
  const history = useHistory();
  const {
    params: { category }
  } = useRouteMatch<TemplatesRouteProps>();

  const filters = useFilters(history, category);
  const payload = usePayload(filters);
  const { pendingRequests, templates } = useTemplatesSearch(history, payload);
  const spaceholdersCount = useSpaceholdersCount(pendingRequests);

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
  const categoryValid = useRouteValidation();

  return categoryValid ? <Templates /> : null;
};
