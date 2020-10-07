import { useEffect, useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { TemplateCategory } from 'core/api';

import { Url } from 'utils';

import { CATEGORIES, TemplatesRouteProps } from '..';

export const useRouteValidation = (): boolean => {
  const { location, replace } = useHistory();

  const {
    params: { category }
  } = useRouteMatch<TemplatesRouteProps>();

  const categoryValid = useMemo(() => CATEGORIES.includes(category), [category]);

  useEffect(() => {
    if (!categoryValid) {
      const url = Url(location).replace(category, TemplateCategory.ALL).value();

      replace(url);
    }
  }, [categoryValid]);

  return categoryValid;
};
