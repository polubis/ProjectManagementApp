import React, { useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';

import { Url } from 'utils';

import { Category, CATEGORIES } from '..';

import csx from './Categories.scss';

const Categories = () => {
  const { location, push } = useHistory();

  const {
    params: { category: activeCategory }
  } = useRouteMatch<{ category: Category }>();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newCategory = e.currentTarget.getAttribute('data-category') as Category;
      const url = Url({ ...location, search: '' })
        .replace(activeCategory, newCategory)
        .value();

      push(url);
    },
    [location]
  );

  return (
    <section className={csx.categories}>
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

export default Categories;
