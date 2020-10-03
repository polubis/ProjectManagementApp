import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Url } from 'utils';

import { Category, CATEGORIES } from '..';

const isValidCategory = (category: Category) => CATEGORIES.includes(category);

export const useRouteValidation = (category: Category) => {
  const { location, replace } = useHistory();

  useEffect(() => {
    if (!category) {
      const url = Url(location)
        .concat(`/${Category.PATTERNS}`)
        .value();

      replace(url);
    } else if (!isValidCategory(category)) {
      const url = Url(location)
        .replace(category, Category.PATTERNS)
        .value();

      replace(url);
    }
  }, [category]);
};
