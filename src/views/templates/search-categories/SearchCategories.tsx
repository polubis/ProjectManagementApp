import React from 'react';

import { Button } from '@material-ui/core';

import csx from './SearchCategories.scss';

export interface SearchCategoriesProps {
  activeCategory: string;
  categories: string[];
  onCategoryClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const SearchCategories = ({ activeCategory, categories, onCategoryClick }: SearchCategoriesProps) => {
  return (
    <section className={csx.searchCategories}>
      {categories.map((category) => (
        <Button
          key={category}
          data-category={category}
          className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
          onClick={onCategoryClick}
        >
          {category}
        </Button>
      ))}
    </section>
  );
};
