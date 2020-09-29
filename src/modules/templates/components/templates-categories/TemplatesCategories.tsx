import React, { useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';

import { Url } from 'utils';

import { TemplateCategory } from 'core/api';

import { CATEGORIES, TemplatesRouteProps } from '../..';

import csx from './TemplatesCategories.scss';

const TemplatesCategories = () => {
  const { location, push } = useHistory();

  const {
    params: { category: activeCategory }
  } = useRouteMatch<TemplatesRouteProps>();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newCategory = e.currentTarget.getAttribute('data-category') as TemplateCategory;

      const url = Url(location)
        .delete('page')
        .replace(activeCategory, newCategory)
        .value();

      push(url);
    },
    [location]
  );

  return (
    <section className={csx.templatesCategories}>
      {CATEGORIES.map(category => (
        <MuiButton
          key={category}
          data-category={category}
          className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
          onClick={handleClick}
        >
          {category}
        </MuiButton>
      ))}
    </section>
  );
};

export default TemplatesCategories;
