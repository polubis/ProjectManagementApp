import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { AdminRouteProps, Category, isValidCategory } from '..'

import { Url } from 'utils';


export const useRouteValidation = () => {
  const { location, replace } = useHistory();

  const {
    params: { category }
  } = useRouteMatch<AdminRouteProps>();

  useEffect(() => {
    if (!category) {
      const url = Url(location).concat(`/${Category.TECHNOLOGIES}`).value();

      replace(url);
    }

    else if (!isValidCategory(category)) {
      const url = Url(location).replace(category, Category.TECHNOLOGIES).value();

      replace(url);
    }
  }, [category]);
};
