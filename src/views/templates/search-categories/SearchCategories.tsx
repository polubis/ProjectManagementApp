import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';

import { useQuery } from 'shared/utils';

import csx from './SearchCategories.scss';

const categories = ['all', 'recommended', 'top', 'recent', 'yours'];

export const SearchCategories = () => {
  const history = useHistory();

  const activeCategory = useQuery().get('category');

  const setCategoryParam = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const category = e.currentTarget.getAttribute('data-category');
    history.push({ search: `category=${category}` });
  }, []);

  useEffect(() => {
    if (!activeCategory) {
      history.replace({ search: `category=${categories[0]}` });
    }
  }, []);

  return (
    <section className={csx.searchCategories}>
      {categories.map(category => (
        <Button
          key={category}
          data-category={category}
          className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
          onClick={setCategoryParam}
        >
          {category}
        </Button>
      ))}
    </section>
  );
};
