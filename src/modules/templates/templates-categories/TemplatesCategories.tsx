import React, { useCallback } from 'react';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';
import AddTemplateIcon from '@material-ui/icons/Queue';

import { Button } from 'ui';

import { Url } from 'utils';

import { TemplateCategory, TEMPLATES_CATEGORIES } from 'core/api';
import { Guard } from 'core/auth';

import csx from './TemplatesCategories.scss';

const TemplatesCategories = () => {
  const { location, push } = useHistory();

  const {
    params: { category: activeCategory }
  } = useRouteMatch<{ category: TemplateCategory }>();

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
      {TEMPLATES_CATEGORIES.map(category => (
        <MuiButton
          key={category}
          data-category={category}
          className={`${csx.category} ${category === activeCategory ? csx.active : ''}`}
          onClick={handleClick}
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

export default TemplatesCategories;
