import { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { pipe } from 'ramda';

import { useQueryParams, isJsonString } from 'utils';

import { TemplateCategory } from 'core/api';

import {
  LIMIT,
  FILTERS,
  isValidCategory,
  TemplatesSearchFilters,
  TemplatesRouteProps,
} from '..';

const parseLimit = (limit: string) => (filters: TemplatesSearchFilters) =>
  !limit || isNaN(+limit) || +limit < LIMIT ? filters : { ...filters, limit };

const parsePage = (page: string) => (
  filters: TemplatesSearchFilters
): TemplatesSearchFilters =>
  !page || isNaN(+page) ? filters : { ...filters, page };

const parseQuery = (query: string) => (filters: TemplatesSearchFilters) => ({
  ...filters,
  query,
});

const parseCategory = (category: TemplateCategory) => (
  filters: TemplatesSearchFilters
): TemplatesSearchFilters =>
  isValidCategory(category) ? { ...filters, category } : filters;

const parseDictionary = (key: 'patternsIds' | 'technologiesIds') => (
  value: string
) => (filters: TemplatesSearchFilters) =>
  !isJsonString(value) ||
  (JSON.parse(value) as string[]).some((id) => isNaN(+id))
    ? filters
    : { ...filters, [key]: value };

export const useFilters = () => {
  const {
    params: { category },
  } = useRouteMatch<TemplatesRouteProps>();

  const queryParams = useQueryParams(
    'limit',
    'page',
    'query',
    'technologiesIds',
    'patternsIds'
  );

  const [limit, page, query, technologiesIds, patternsIds] = queryParams;

  return useMemo(
    () =>
      pipe(
        parseLimit(limit),
        parsePage(page),
        parseCategory(category),
        parseQuery(query),
        parseDictionary('patternsIds')(patternsIds),
        parseDictionary('technologiesIds')(technologiesIds)
      )(FILTERS),
    [category, ...queryParams]
  );
};
