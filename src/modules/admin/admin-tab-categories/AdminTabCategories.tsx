import React, { useCallback } from 'react';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';

import { Button as MuiButton } from '@material-ui/core';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { Button } from 'ui';

import { Url } from 'utils';

import csx from './AdminTabCategories.scss';

export enum AdminTabCategory {
  TECHNOLOGIES = 'technologies',
  PATTERNS = 'patterns'
}

const ADMIN_TAB_CATEGORIES: AdminTabCategory[] = [
  AdminTabCategory.TECHNOLOGIES,
  AdminTabCategory.PATTERNS
];

const AdminTabCategories = () => {
	const { location, push } = useHistory();
	
	const {
		params: { category: activeCategory }
	} = useRouteMatch<{ category: AdminTabCategory }>();

	const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newCategory = e.currentTarget.getAttribute('data-category') as AdminTabCategory;

      const url = Url(location)
        .replace(activeCategory, newCategory)
				.value();
				
      push(url);
    },
    [location]
  );

  return (
    <section className={csx.adminTabCategories}>
      <div className={csx.tabs}>
      {ADMIN_TAB_CATEGORIES.map((category) => (
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

export default AdminTabCategories;
