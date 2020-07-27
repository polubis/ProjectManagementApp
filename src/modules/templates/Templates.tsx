import React, { useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

import { TemplatesCategories } from 'core/api';

import { TemplatesGrid } from 'shared/components';

import SearchCategories from './search-categories';
import TemplatesSearch from './template-search';
import TemplatesProvider, { useTemplatesProvider } from './TemplatesProvider';

import { useTemplatesSearch } from '.';

import csx from './Templates.scss';

const removePage = (search: string) => {
  const newSearch = new URLSearchParams(search);

  newSearch.delete('page');

  return newSearch.toString();
};

const swapCategory = (currCategory: TemplatesCategories, newCategory: TemplatesCategories) => (
  pathname: string
) => pathname.replace(currCategory, newCategory);

const Templates = () => {
  const match = useRouteMatch<{ category: TemplatesCategories }>();

  const { location, push } = useHistory();

  const { templates, loading } = useTemplatesProvider();

  useTemplatesSearch();

  const changeCategory = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const currCategory = match.params.category;
      const newCategory = e.currentTarget.getAttribute('data-category') as TemplatesCategories;

      const pathname = swapCategory(currCategory, newCategory)(location.pathname);
      const search = removePage(location.search);

      push(`${pathname}?${search}`);
    },
    [location]
  );

  return (
    <div className={csx.templates}>
      <SearchCategories onClick={changeCategory} />
      <TemplatesSearch path={location.pathname} />
      <TemplatesGrid loading={loading} templates={templates} />
    </div>
  );
};

export default () => (
  <TemplatesProvider>
    <Templates />
  </TemplatesProvider>
);
