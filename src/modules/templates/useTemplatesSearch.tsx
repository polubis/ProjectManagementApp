import { useEffect, useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { useScroll, useQueryParams } from 'utils';

import { useTemplatesProvider } from './TemplatesProvider';

import { CATEGORIES, DEFAULT_LIMIT, DEFAULT_PAGE } from '.';

const isLimitInvalid = (limit: string) => !limit || isNaN(+limit) || +limit < DEFAULT_LIMIT;

const isPageInvalid = (page: string) => !page || isNaN(+page);

const isCategoryInvalid = (category: string) => !CATEGORIES.includes(category);

const isUrlInvalid = (category: string, [limit, page]: string[]) => {
  return isLimitInvalid(limit) || isPageInvalid(page) || isCategoryInvalid(category);
};

const makeFilters = (category: string, queryParams: string[]) => {
  const filters = {
    category: isCategoryInvalid(category) ? CATEGORIES[0] : category,
    limit: isLimitInvalid(queryParams[0]) ? DEFAULT_LIMIT : +queryParams[0],
    page: isPageInvalid(queryParams[1]) ? DEFAULT_PAGE : +queryParams[1],
    query: queryParams[2]
  };

  return {
    ...filters,
    url: `?limit=${filters.limit}&page=${filters.page}&query=${filters.query}`
  };
};

export const useTemplatesSearch = () => {
  const {
    params: { category }
  } = useRouteMatch<{ category: string }>();
  const history = useHistory();
  const queryParams = useQueryParams('limit', 'page', 'query');

  const bottomExceeded = useScroll(1000);

  const { getTemplates } = useTemplatesProvider();

  const filters = useMemo(() => {
    return makeFilters(category, queryParams);
  }, [category, ...queryParams, bottomExceeded]);

  useEffect(() => {
    if (isUrlInvalid(category, queryParams)) {
      history.replace(`/app/templates/${filters.category}${filters.url}`);
    } else {
      getTemplates(filters.url, filters.limit, filters.page);
    }
  }, [category, ...queryParams]);

  useEffect(() => {
    if (bottomExceeded) {
      const getNextPageUrlQuery = () => {
        const reg = new RegExp('page=' + [queryParams[1]]);
        return history.location.search.replace(reg, `page=${+queryParams[1] + 1}`);
      };

      history.replace(`/app/templates/${filters.category}${getNextPageUrlQuery()}`);
    }
  }, [bottomExceeded]);
};
