import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';

import { useQueryParams } from 'utils';

import { AccountRole } from 'shared/models';

import { isValidRole } from '../utils';

const [LIMIT, PAGE] = [20, 1];

const parseLimit = (limit: string): string =>
  !limit || Number.isNaN(+limit) || +limit < LIMIT ? '' + LIMIT : limit;

const parsePage = (page: string): string => (!page || Number.isNaN(+page) ? '' + PAGE : page);

const parseRole = (role: AccountRole): AccountRole =>
  isValidRole(role) ? role : AccountRole.Admin;

export const useFilters = () => {
  const {
    params: { role },
  } = useRouteMatch<{ role: AccountRole }>();

  const queryParams = useQueryParams('limit', 'page', 'query');

  const [limit, page, query] = queryParams;

  return useMemo(
    () => ({
      limit: parseLimit(limit),
      page: parsePage(page),
      role: parseRole(role),
      query,
    }),
    [role, ...queryParams]
  );
};
