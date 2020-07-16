import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { pipe } from 'ramda';

import { useScroll } from 'utils';

import { TemplatesPayload } from 'core/api';

import { useTemplatesProvider } from './TemplatesProvider';

import { useTemplatesFilters, TemplatesSearchFilters } from '.';

const parse = (filters: TemplatesSearchFilters): TemplatesPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
  technologiesIds: JSON.parse(filters.technologiesIds),
  patternsIds: JSON.parse(filters.patternsIds)
});

const swapPage = (page: number) => (search: string) => {
  const newSearch = new URLSearchParams(search);

  newSearch.delete('page');
  newSearch.set('page', '' + page);

  return newSearch.toString();
};

const makeUrl = (pathname: string) => (search: string) => `${pathname}?${search}`;

export const useTemplatesSearch = () => {
  const { replace, location } = useHistory();

  const filters = useTemplatesFilters();

  const bottomExceeded = useScroll(1000);

  const { getTemplates, allLoaded } = useTemplatesProvider();

  const parsedFilters = useMemo(() => parse(filters), [filters]);

  useEffect(() => {
    getTemplates(parsedFilters);
  }, [location.key]);

  useEffect(() => {
    if (bottomExceeded && !allLoaded) {
      replace(pipe(swapPage(parsedFilters.page + 1), makeUrl(location.pathname))(location.search));
    }
  }, [bottomExceeded, allLoaded]);
};
