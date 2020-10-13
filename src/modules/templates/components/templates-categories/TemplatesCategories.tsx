import React, { useCallback, useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';

import { Url } from 'utils';

import { TemplateCategory } from 'core/api';
import { useAuthProvider } from 'core/auth';

import { CATEGORIES, TemplatesRouteProps } from '../..';

import csx from './TemplatesCategories.scss';

const getCategoriesByAuthState = (authorized: boolean, pending: boolean) => () => {
  if (pending || !authorized) {
    return CATEGORIES.filter((category) => category !== TemplateCategory.YOURS);
  }

  return CATEGORIES;
};

const TemplatesCategories = () => {
  const { location, push } = useHistory();

  const {
    params: { category: activeCategory }
  } = useRouteMatch<TemplatesRouteProps>();

  const { authorized, pending } = useAuthProvider();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newCategory = e.currentTarget.getAttribute('data-category') as TemplateCategory;

      const url = Url(location).delete('page').replace(activeCategory, newCategory).value();

      push(url);
    },
    [location]
  );

  const categories = useMemo(getCategoriesByAuthState(authorized, pending), [authorized, pending]);

  return (
    <section className={csx.templatesCategories}>
      {categories.map((category) => (
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
