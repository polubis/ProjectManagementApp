import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';
import AddTemplateIcon from '@material-ui/icons/Queue';

import { Button } from 'ui';

import { Guard } from 'core/auth';

import { CATEGORIES } from '..';

import csx from './SearchCategories.scss';

namespace SearchCategories {
  export interface Props {
    onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  }
}

const SearchCategories = ({ onClick }: SearchCategories.Props) => {
  const match = useRouteMatch<{ category: string }>();

  return (
    <section className={csx.searchCategories}>
      {CATEGORIES.map((category) => (
        <MuiButton
          key={category}
          data-category={category}
          className={`${csx.category} ${category === match.params.category ? csx.active : ''}`}
          onClick={onClick}
        >
          {category}
        </MuiButton>
      ))}

      <Guard.Protected>
        <NavLink to="/app/templates/management">
          <Button>
            <AddTemplateIcon />
            CREATE TEMPLATE
          </Button>
        </NavLink>
      </Guard.Protected>
    </section>
  );
};

export default SearchCategories;
