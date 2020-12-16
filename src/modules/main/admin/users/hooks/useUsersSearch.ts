import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';

import { Url, ScrollObserver } from 'utils';

import { useFilters } from '.';

import { useUsersProvider } from '../providers/users';
import { GetUsersPayload } from '../models';

type StringifiedGetUsersPayload = Omit<GetUsersPayload, 'limit' | 'page'> & {
  limit: string;
  page: string;
};

const parse = (filters: StringifiedGetUsersPayload) => (): GetUsersPayload => ({
  ...filters,
  page: +filters.page,
  limit: +filters.limit,
});

export const useUsersSearch = () => {
  const { replace, location } = useHistory();

  const filters = useFilters();

  const { getUsers, allLoaded, pendingRequests } = useUsersProvider();

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
    getUsers(parsedFilters);
  }, [location.key]);
};
