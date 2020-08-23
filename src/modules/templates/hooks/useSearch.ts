import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { debounce, Url, distinctUntilChanged, ScrollObserver } from 'utils';

import { TemplatesPayload } from 'core/api';

import { useTemplatesProvider } from '../TemplatesProvider';

import { TemplatesSearchFilters } from '..';

import { useFilters } from '.';

const parse = (filters: TemplatesSearchFilters) => (): TemplatesPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
  technologiesIds: JSON.parse(filters.technologiesIds),
  patternsIds: JSON.parse(filters.patternsIds)
});

export const useSearch = () => {
  const { replace, location } = useHistory();

  const filters = useFilters();

  const { getTemplates, allLoaded, loading } = useTemplatesProvider();

  const parsedFilters = useMemo(parse(filters), [filters]);

  const decoratedGetTemplates = useMemo(() => debounce(distinctUntilChanged(getTemplates), 200), [
    getTemplates
  ]);

  useEffect(() => {
    let obs: ScrollObserver;

    if (obs) {
      obs.unsubscribe();
    }

    const onEmit = ({ bottom }: ScrollObserver.Position) => {
      const incremenPage = () => {
        const url = Url(location)
          .swap('page', parsedFilters.page + 1)
          .value();

        replace(url);
      };

      if (!loading && !allLoaded && bottom) {
        incremenPage();
      }
    };

    obs = new ScrollObserver(document, onEmit);

    return () => {
      obs.unsubscribe();
    };
  }, [allLoaded, location, loading, parsedFilters]);

  useEffect(() => {
    decoratedGetTemplates(parsedFilters);
  }, [location.key]);
};
