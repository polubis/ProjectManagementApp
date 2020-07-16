import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { pipe } from 'ramda';

import { useQueryParams, isJSONString } from 'utils';

import { TemplatesCategories } from 'core/api';

import { TemplatesSearchFilters, CATEGORIES } from '.';

const PAGE = 1;

const LIMIT = 25;

const FILTERS: TemplatesSearchFilters = {
  page: '' + PAGE,
  limit: '' + LIMIT,
  category: CATEGORIES[0],
  technologiesIds: '[]',
  patternsIds: '[]',
  query: ''
};

const parseLimit = (limit: string) => (filters: TemplatesSearchFilters) =>
  !limit || isNaN(+limit) || +limit < LIMIT ? filters : { ...filters, limit };

const parsePage = (page: string) => (filters: TemplatesSearchFilters): TemplatesSearchFilters =>
  !page || isNaN(+page) ? filters : { ...filters, page };

const parseQuery = (query: string) => (filters: TemplatesSearchFilters) => ({ ...filters, query });

const parseCategory = (category: TemplatesCategories) => (
  filters: TemplatesSearchFilters
): TemplatesSearchFilters => (!CATEGORIES.includes(category) ? filters : { ...filters, category });

const parseDictionary = (key: 'patternsIds' | 'technologiesIds') => (value: string) => (
  filters: TemplatesSearchFilters
) =>
  !isJSONString(value) || (JSON.parse(value) as string[]).some((id) => isNaN(+id))
    ? filters
    : { ...filters, [key]: value };

const parsePatterns = parseDictionary('patternsIds');

const parseTechnologies = parseDictionary('technologiesIds');

export const useTemplatesFilters = () => {
  const {
    params: { category }
  } = useRouteMatch<{ category: TemplatesCategories }>();

  const queryParams = useQueryParams('limit', 'page', 'query', 'technologiesIds', 'patternsIds');

  const [limit, page, query, technologiesIds, patternsIds] = queryParams;

  const filters = useMemo(
    () =>
      pipe(
        parseLimit(limit),
        parsePage(page),
        parseCategory(category),
        parseQuery(query),
        parsePatterns(patternsIds),
        parseTechnologies(technologiesIds)
      )(FILTERS),
    [category, ...queryParams]
  );

  return filters;
};
