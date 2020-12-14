import React, { useCallback, useState, useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Tabs, Loader, Disclaimer } from 'ui';

import { Url, useQueryParams, getNumericParam, createQuery } from 'utils';

import { AccountRole, User } from 'shared/models';

import { UserRolesManagement, UsersSearch, UsersTable } from './components';
import { useRouteValidation, useUsersSearch } from './hooks';

import csx from './Users.scss';
import WithUrlFiltersManager from './hooks/WithUrlFiltersManagement';
import { getUsers } from './services';

interface Filters {
  limit: number;
  page: number;
  role: AccountRole;
  query: string;
}

const Users = (props): JSX.Element => {
  const {
    data: users,
    loading,
    filters: { role },
  } = props;

  const history = useHistory();

  const [userToMange, setUserToManage] = useState<User | null>(null);

  const handleRoleChange = useCallback(
    (newRole: AccountRole): void => {
      const url = Url({ ...location, search: '' })
        .replace(role, newRole)
        .value();

      history.push(url);
    },
    [history.location]
  );

  const closeUserManagement = useCallback(() => {
    setUserToManage(null);
  }, []);

  const handleUserManagementSuccess = useCallback(() => {
    closeUserManagement();

    setTimeout(() => {
      handleRoleChange(role);
    }, 100);
  }, [handleRoleChange]);

  return (
    <>
      <Tabs active={role} onClick={handleRoleChange}>
        <>{AccountRole.Admin}</>
        <>{AccountRole.User}</>
      </Tabs>

      <UsersSearch label={role} />

      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <UsersTable users={users} onRolesEditClick={setUserToManage} />
      ) : (
        <Disclaimer
          description="Change filters to find users"
          title="Not results for current filters"
        />
      )}

      {userToMange && (
        <UserRolesManagement
          user={userToMange}
          onClose={closeUserManagement}
          onSuccess={handleUserManagementSuccess}
        />
      )}
    </>
  );
};

const WrappedUsers = WithUrlFiltersManager<User, Filters>({
  method: (filters) => getUsers(createQuery(filters)),
  loadOn: ['limit', 'role', 'query'],
  loadMoreOn: ['page'],
})(Users);

export default () => {
  const history = useHistory();

  const {
    params: { role },
  } = useRouteMatch<{ role: AccountRole }>();

  useRouteValidation(role, history);

  const [limit, page, query] = useQueryParams('limit', 'page', 'query');

  const filters = useMemo((): Filters => {
    const parsedLimit = getNumericParam(limit, 25);
    const parsedPage = getNumericParam(page, 1);

    return { role, limit: parsedLimit, page: parsedPage, query };
  }, [history.location]);

  console.log(filters);

  return <div className={csx.users}>{role && <WrappedUsers filters={filters} />}</div>;
};
