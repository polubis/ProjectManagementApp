import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';
import AddTemplateIcon from '@material-ui/icons/Queue';

import { Button } from 'ui';

import { Protected } from 'core/auth';

import csx from './TemplatesHeader.scss';

interface TemplatesHeaderProps {
  activeCategory: string;
  categories: string[];
  onCategoryClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const TemplatesHeader = ({
  activeCategory,
  categories,
  onCategoryClick
}: TemplatesHeaderProps) => {
  return (
    <section className={csx.templatesHeader}>
      {categories.map((category) => (
        <MuiButton
          key={category}
          data-category={category}
          className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
          onClick={onCategoryClick}
        >
          {category}
        </MuiButton>
      ))}

      <Protected>
        <NavLink to="/app/templates/creation">
          <Button>
            <AddTemplateIcon />
            CREATE TEMPLATE
          </Button>
        </NavLink>
      </Protected>
    </section>
  );
};
