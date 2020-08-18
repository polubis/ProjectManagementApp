import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { debounce, useScroll, Url, distinctUntilChanged } from 'utils';

import { TemplatesPayload, TemplatesSearchFilters } from 'core/api';

import { useTemplatesProvider } from './TemplatesProvider';

import { useTemplatesFilters } from '.';

const parse = (filters: TemplatesSearchFilters): TemplatesPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
  technologiesIds: JSON.parse(filters.technologiesIds),
  patternsIds: JSON.parse(filters.patternsIds)
});

export const useTemplatesSearch = () => {
  const { replace, location } = useHistory();

  const filters = useTemplatesFilters();

  const bottomExceeded = useScroll(1000);

  const { getTemplates, allLoaded } = useTemplatesProvider();

  const parsedFilters = useMemo(() => parse(filters), [filters]);

  const decoratedGetTemplates = useMemo(() => debounce(distinctUntilChanged(getTemplates), 200), [
    getTemplates
  ]);

  useEffect(() => {
    decoratedGetTemplates(parsedFilters);
  }, [location.key]);

  useEffect(() => {
    if (bottomExceeded && !allLoaded) {
      const url = Url(location)
        .swap('page', parsedFilters.page + 1)
        .value();

      replace(url);
    }
  }, [bottomExceeded, allLoaded]);
};
