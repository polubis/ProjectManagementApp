import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useLoad, useEdgeDetection, Url, useSafeQueryParams } from 'utils';

import { getGroups } from 'shared/services';
import { Group, GetGroupsParams } from 'shared/models';

import { useRouteValidation } from './useRouteValidation';
import GroupsSearch from './groups-search';
import GroupsGrid from './groups-grid';

import csx from './Groups.scss';

const DEFAULT_PARAMS: GetGroupsParams & Record<string, string | number> = {
  limit: 25,
  page: 1,
  query: '',
};

const Groups: FC = () => {
  useRouteValidation();

  const history = useHistory();

  const { limit, page, query } = useSafeQueryParams(DEFAULT_PARAMS);

  const source = useMemo(() => () => getGroups({ query, page, limit }), [limit, page, query]);

  const [allLoaded, setAllLoaded] = useState(false);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [groups, loading, error] = useLoad(source);

  useEffect(() => {
    if (groups) {
      if (groups.length < DEFAULT_PARAMS.limit) {
        setAllLoaded(true);
      }

      setAllGroups((prevAllGroups) => [...prevAllGroups, ...groups]);
    }
  }, [groups]);

  const edgesCounter = useEdgeDetection();

  useEffect(() => {
    if (loading || allLoaded) {
      return;
    }

    const url = Url(location)
      .swap('page', page + 1)
      .value();

    history.replace(url);
  }, [edgesCounter]);

  const handleSearchSubmit = useCallback((query: string) => {
    const url = Url(location).swap('query', query).value();

    setAllLoaded(false);
    history.replace(url);
  }, []);

  return (
    <div className={csx.groups}>
      <GroupsSearch onSubmit={handleSearchSubmit} />

      {/* 
      {!pendingRequests && !users.length && (
        <Disclaimer
          description="Change filters to find users"
          title="No results for current filters"
        />
      )} */}

      {loading ? 'Loader here' : error ? 'error' : <GroupsGrid groups={allGroups} />}
    </div>
  );
};

export default Groups;
