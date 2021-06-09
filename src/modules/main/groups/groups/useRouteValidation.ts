import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Url } from 'utils';

import { GroupCategory } from 'shared/models';

import { RouteParams } from './models';

const CATEGORIES = Object.values(GroupCategory.ALL).map((category) => category.toLowerCase());

const isValidCategory = (category: string): boolean => CATEGORIES.includes(category.toLowerCase());

export const useRouteValidation = (): void => {
  const match = useRouteMatch<RouteParams>();

  const { category } = match.params;

  const { location, replace } = useHistory();

  useEffect(() => {
    if (!isValidCategory(category)) {
      const url = Url(location).replace(category, GroupCategory.ALL).value();

      replace(url);
    }
  }, [category]);
};
