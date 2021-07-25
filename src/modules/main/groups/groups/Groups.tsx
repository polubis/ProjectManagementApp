import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import { useEdgeDetection, Url, useSafeQueryParams } from 'utils';

import { GetGroupsParams, GroupCategory } from 'shared/models';

import { useRouteValidation } from './useRouteValidation';
import GroupsSearch from './groups-search';
import GroupsGrid from './groups-grid';
import { GroupsProvider, useGroupsProvider } from './providers/groups';

import csx from './Groups.scss';

const DEFAULT_PARAMS: GetGroupsParams & Record<string, string | number> = {
  limit: 25,
  page: 1,
  query: '',
};

const Groups: FC = () => {
  const history = useHistory();

  const queryParams = useSafeQueryParams(DEFAULT_PARAMS);

  const edgesCounter = useEdgeDetection();

  const { getGroups, allLoaded, pendingRequests, error, groups } = useGroupsProvider();

  useEffect(() => {
    getGroups(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (pendingRequests || allLoaded) {
      return;
    }

    const url = Url(location)
      .swap('page', queryParams.page + 1)
      .value();

    history.replace(url);
  }, [edgesCounter]);

  const handleSearchSubmit = useCallback(
    (query: string) => {
      const url = Url(location).delete('page').swap('query', query).value();

      history.replace(url);
    },
    [location]
  );

  const goToGroupDetails = useCallback((groupId: string) => {
    history.push(`/app/groups/${GroupCategory.ALL}/${groupId}`);
  }, []);

  const handleReload = useCallback(() => {
    history.replace(`app/groups/${GroupCategory.ALL}`);
  }, []);

  return (
    <div className={csx.groups}>
      <GroupsSearch onSubmit={handleSearchSubmit} />

      <GroupsGrid
        error={!!error}
        loading={!!pendingRequests}
        spaceholdersCount={4}
        groups={groups}
        onReloadClick={handleReload}
        onGroupClick={goToGroupDetails}
      />
    </div>
  );
};

export default () => {
  useRouteValidation();

  return (
    <GroupsProvider>
      <Groups />
    </GroupsProvider>
  );
};
