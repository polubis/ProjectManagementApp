import React from 'react';
import { useHistory } from 'react-router';

import { TemplatesGrid, TemplatesSearch } from 'shared/components';

import TemplatesCategories from './templates-categories';
import TemplatesProvider, { useTemplatesProvider } from './TemplatesProvider';

import { useTemplatesSearch } from '.';

import csx from './Templates.scss';

const Templates = () => {
  const { location } = useHistory();

  const { templates, loading } = useTemplatesProvider();

  useTemplatesSearch();

  return (
    <div className={csx.templates}>
      <TemplatesCategories />
      <TemplatesSearch pathname={location.pathname} />
      <TemplatesGrid loading={loading} templates={templates} />
    </div>
  );
};

export default () => (
  <TemplatesProvider>
    <Templates />
  </TemplatesProvider>
);
