import React, { useCallback, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Tabs, Loader, Disclaimer } from 'ui';

import { Url } from 'utils';

import { AccountRole, User } from 'shared/models';

import { UserRolesManagement, UsersSearch, UsersTable } from './components';
import { useUsersSearch, useRouteValidation } from './hooks';
import UsersProvider, { useUsersProvider } from './providers/users';

import csx from './Users.scss';

const Users = (): JSX.Element => {
  const history = useHistory();
  const {
    params: { role },
  } = useRouteMatch<{ role: AccountRole }>();

  useRouteValidation(role, history);

  const { pendingRequests, users } = useUsersProvider();

  useUsersSearch();

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
    <div className={csx.users}>
      {role && (
        <>
          <Tabs active={role} onClick={handleRoleChange}>
            <>{AccountRole.Admin}</>
            <>{AccountRole.User}</>
          </Tabs>

          <UsersSearch label={role} />

          {!!users.length && <UsersTable users={users} onRolesEditClick={setUserToManage} />}

          {!pendingRequests && !users.length && (
            <Disclaimer
              description="Change filters to find users"
              title="No results for current filters"
            />
          )}

          {!!pendingRequests && <Loader className={csx.loader} />}
        </>
      )}

      {userToMange && (
        <UserRolesManagement
          user={userToMange}
          onClose={closeUserManagement}
          onSuccess={handleUserManagementSuccess}
        />
      )}
    </div>
  );
};

export default (): JSX.Element => (
  <UsersProvider>
    <Users />
  </UsersProvider>
);
