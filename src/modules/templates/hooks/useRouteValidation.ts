import { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { TemplateCategory } from 'core/api';

import { Url } from 'utils';

import { isValidCategory, TemplatesRouteProps } from '..';

export const useRouteValidation = () => {
  const { location, replace } = useHistory();

  const {
    params: { category }
  } = useRouteMatch<TemplatesRouteProps>();

  useEffect(() => {
    if (!isValidCategory(category)) {
      const url = Url(location).replace(category, TemplateCategory.ALL).value();

      replace(url);
    }
  }, [category]);
};
