import { useMemo } from 'react';
import { History } from 'history';

import { TemplateCategory } from 'core/api';

import { useQueryParams, isJSONString } from 'utils';

import { LIMIT, PAGE, TemplatesSearchFilters } from '..';

const getDictionary = (value: string): string =>
  !isJSONString(value) || (JSON.parse(value) as string[]).some((id) => isNaN(+id)) ? '[]' : value;

export const useFilters = (
  { location }: History,
  category: TemplateCategory
): TemplatesSearchFilters => {
  const queryParams = useQueryParams('limit', 'page', 'query', 'technologiesIds', 'patternsIds');

  const [limit, page, query, technologiesIds, patternsIds] = queryParams;

  const filters: TemplatesSearchFilters = useMemo(
    () => ({
      category,
      page: !page || isNaN(+page) ? '' + PAGE : page,
      limit: !limit || isNaN(+limit) || +limit < LIMIT ? '' + LIMIT : limit,
      technologiesIds: getDictionary(technologiesIds),
      patternsIds: getDictionary(patternsIds),
      query
    }),
    [location.key]
  );

  return filters;
};
