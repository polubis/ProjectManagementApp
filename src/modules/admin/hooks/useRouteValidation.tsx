import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { AdminRouteProps } from '../models'
import { Category } from '../models';
import { isValidCategory } from '../utils';

import { Url } from 'utils';


export const useRouteValidation = () => {
  const { location, replace } = useHistory();

  const {
    params: { category }
  } = useRouteMatch<AdminRouteProps>();

  useEffect(() => {
    if (!category) {
      const url = Url(location).concat(`/${Category.PATTERNS}`).value();

      replace(url);
    }

    else if (!isValidCategory(category)) {
      const url = Url(location).replace(category, Category.PATTERNS).value();
      console.log(url)

      replace(url);
    }
  }, [category]);
};
