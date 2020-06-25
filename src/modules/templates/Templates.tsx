import React, { useEffect, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import { GetTemplatesPayload } from 'api';

import { useScroll, useQueryParams } from 'utils';

import { TemplatesContext } from 'core/templates';

import { TemplatesHeader, TemplatesSearch, TemplateTiles, TemplatesProps } from '.';

import csx from './Templates.scss';

const categories = ['all', 'recommended', 'top', 'recent', 'yours'];

const Templates = ({
  match: {
    params: { category }
  }
}: TemplatesProps) => {
  const history = useHistory();

  const [query] = useQueryParams('query');

  const [usedFilters, setUsedFilters] = useState<GetTemplatesPayload>({
    page: 1,
    limit: 25,
    query
  });

  const { getTemplates } = useContext(TemplatesContext);

  const handleCategoryChange = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    history.push(e.currentTarget.getAttribute('data-category'));
  }, []);

  useEffect(() => {
    if (!categories.includes(category)) {
      history.push(categories[0]);
    }
  }, []);

  useEffect(() => {
    getTemplates(usedFilters);
  }, [usedFilters]);

  useScroll(() => {
    setUsedFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1
    }));
  }, 1000);

  return (
    <div className={csx.templates}>
      <TemplatesHeader
        activeCategory={category}
        categories={categories}
        onCategoryClick={handleCategoryChange}
      />
      <TemplatesSearch />
      <TemplateTiles />
    </div>
  );
};

export default Templates;
