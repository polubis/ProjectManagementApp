import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import SearchCategories from './search-categories';
import TemplatesSearch from './template-search';
import TemplateTiles from './template-tiles';
import TemplatesProvider from './TemplatesProvider';

import { useTemplatesSearch } from '.';

import csx from './Templates.scss';

const Templates = () => {
  const history = useHistory();

  useTemplatesSearch();

  const changeCategory = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    history.push(e.currentTarget.getAttribute('data-category'));
  }, []);

  return (
    <div className={csx.templates}>
      <SearchCategories onClick={changeCategory} />
      <TemplatesSearch />
      <TemplateTiles />
    </div>
  );
};

export default () => (
  <TemplatesProvider>
    <Templates />
  </TemplatesProvider>
);
