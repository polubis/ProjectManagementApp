import { useMemo } from 'react';

import { useQueryParams } from 'utils';

const [LIMIT, PAGE] = [20, 1];

const parseLimit = (limit: string): string =>
  !limit || Number.isNaN(+limit) || +limit < LIMIT ? '' + LIMIT : limit;

const parsePage = (page: string): string => (!page || Number.isNaN(+page) ? '' + PAGE : page);

export const useFilters = () => {
  const queryParams = useQueryParams('limit', 'page', 'query');

  const [limit, page, query] = queryParams;

  return useMemo(
    () => ({
      limit: parseLimit(limit),
      page: parsePage(page),
      query,
    }),
    [queryParams]
  );
};
