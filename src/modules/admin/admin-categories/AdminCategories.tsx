import React, { useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { Button } from 'ui';

import { Url } from 'utils';

import { Category } from '../models';

import csx from './AdminCategories.scss';

const ADMIN_CATEGORIES: Category[] = [
  Category.TECHNOLOGIES,
  Category.PATTERNS
];

const AdminCategories = () => {
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
    <section className={csx.adminCategories}>
      <div className={csx.tabs}>
        {ADMIN_CATEGORIES.map((category) => (
          <MuiButton
            key={category}
            data-category={category}
            className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
            onClick={handleClick}
          >
            {category}
          </MuiButton>
        ))}
      </div>
      <div className={csx.addButton}>
        <Button>
          <UnfoldMoreIcon className={csx.unfoldIcon} />
        ADD TECHNOLOGY
      </Button>
      </div>
    </section>
  );
};

export default AdminCategories;
