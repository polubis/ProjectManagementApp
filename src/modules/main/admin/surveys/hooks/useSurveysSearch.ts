import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Url, ScrollObserver } from 'utils';

import { GetSurveysPayload } from 'shared/models';

import { useFilters } from '.';

import { useSurveysProvider } from '../providers';

type StringifiedGetUsersPayload = Omit<GetSurveysPayload, 'limit' | 'page'> & {
  limit: string;
  page: string;
};

const parse = (filters: StringifiedGetUsersPayload) => (): GetSurveysPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
});

export const useSurveysSearch = (): void => {
  const { replace, location } = useHistory();

  const filters = useFilters();

  const { loadSurveys, allLoaded, pendingRequests } = useSurveysProvider();

  const parsedFilters = useMemo(parse(filters), [filters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    let obs: ScrollObserver;

    const onEmit = ({ bottom }: ScrollObserver.Position) => {
      const incremenPage = () => {
        const url = Url(location)
          .swap('page', parsedFilters.page + 1)
          .value();

        replace(url);
      };

      if (!pendingRequests && !allLoaded && bottom) {
        incremenPage();
      }
    };

    if (!obs) {
      obs = new ScrollObserver(document, onEmit);
    }

    return () => {
      obs.unsubscribe();
    };
  }, [allLoaded, pendingRequests, parsedFilters]);

  useEffect(() => {
    loadSurveys(parsedFilters);
  }, [location.key]);
};
