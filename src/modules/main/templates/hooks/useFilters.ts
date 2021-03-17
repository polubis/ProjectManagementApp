import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';

import { useQueryParams, isJsonString } from 'utils';

import { TemplateCategory } from 'shared/models';

import { LIMIT, FILTERS, isValidCategory, TemplatesRouteProps } from '..';

const parseLimit = (limit: string): string =>
  !limit || Number.isNaN(+limit) || +limit < LIMIT ? FILTERS.limit : limit;

const parsePage = (page: string): string => (!page || Number.isNaN(+page) ? FILTERS.page : page);

const parseCategory = (category: TemplateCategory): TemplateCategory =>
  isValidCategory(category) ? category : FILTERS.category;

const parsePatterns = (value: string): string =>
  !isJsonString(value) || (JSON.parse(value) as string[]).some((id) => Number.isNaN(+id))
    ? FILTERS.patternsIds
    : value;

const parseTechnologies = (value: string): string =>
  !isJsonString(value) || (JSON.parse(value) as string[]).some((id) => Number.isNaN(+id))
    ? FILTERS.technologiesIds
    : value;

export const useFilters = () => {
  const {
    params: { category },
  } = useRouteMatch<TemplatesRouteProps>();

  const queryParams = useQueryParams('limit', 'page', 'query', 'technologiesIds', 'patternsIds');

  const [limit, page, query, technologiesIds, patternsIds] = queryParams;

  return useMemo(
    () => ({
      page: parsePage(page),
      limit: parseLimit(limit),
      category: parseCategory(category),
      technologiesIds: parseTechnologies(technologiesIds),
      patternsIds: parsePatterns(patternsIds),
      query,
    }),
    [category, ...queryParams]
  );
};
