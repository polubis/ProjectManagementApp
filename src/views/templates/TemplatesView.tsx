import React, { useEffect, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import TemplatesProvider, { TemplatesContext } from 'core/templates';

import { useScroll } from 'shared/utils';

import {
  TemplatesHeader,
  TemplatesSearch,
  TemplateTiles,
  TemplatesViewProps,
  ConnectedTemplatesViewProps
} from '.';

import csx from './TemplatesView.scss';

const categories = ['all', 'recommended', 'top', 'recent', 'yours'];

const TemplatesView = ({ activeCategory, history }: TemplatesViewProps) => {
  const { getTemplates } = useContext(TemplatesContext);

  const [usedFilters, setUsedFilters] = useState({
    page: 1,
    query: '',
    technologies: [],
    category: activeCategory
  });

  const changeCategory = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    history.push(e.currentTarget.getAttribute('data-category'));
  }, []);

  useEffect(() => {
    getTemplates(usedFilters.page, usedFilters.query);
  }, [usedFilters]);

  useScroll(() => {
    setUsedFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1
    }));
  }, 1000);

  return (
    <div className={csx.templatesView}>
      <TemplatesHeader
        activeCategory={activeCategory}
        categories={categories}
        onCategoryClick={changeCategory}
      />
      <TemplatesSearch />
      <TemplateTiles />
    </div>
  );
};

export default ({
  match: {
    params: { category }
  }
}: ConnectedTemplatesViewProps) => {
  const history = useHistory();

  useEffect(() => {
    if (!categories.includes(category)) {
      history.push(categories[0]);
    }
  }, []);

  return (
    <TemplatesProvider>
      <TemplatesView activeCategory={category} history={history} />
    </TemplatesProvider>
  );
};
