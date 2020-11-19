import React, { useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { Tabs } from 'ui';

import { Url } from 'utils';

import { TemplateCategory } from 'core/api';
import { useAuthProvider } from 'core/auth';

import { TemplatesRouteProps } from '../..';

import csx from './TemplatesCategories.scss';

const TemplatesCategories = () => {
  const { location, push } = useHistory();

  const {
    params: { category },
  } = useRouteMatch<TemplatesRouteProps>();

  const { authorized, pending } = useAuthProvider();

  const handleClick = useCallback(
    (newCategory: TemplateCategory) => {
      const url = Url(location)
        .delete('page')
        .replace(category, newCategory)
        .value();

      push(url);
    },
    [location]
  );

  return (
    <Tabs
      active={category}
      className={csx.templatesCategories}
      onClick={handleClick}
    >
      <>{TemplateCategory.ALL}</>
      <>{TemplateCategory.RECENT}</>
      <>{TemplateCategory.TOP}</>
      {!pending && authorized && <>{TemplateCategory.YOURS}</>}
    </Tabs>
  );
};

export default TemplatesCategories;
