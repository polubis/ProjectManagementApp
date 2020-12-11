import React, { useCallback, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router';

import { Tabs, Loader, Disclaimer } from 'ui';

import { Url } from 'utils';

import { AccountRole, User } from 'shared/models';

import { UserRolesManagement, UsersSearch, UsersTable } from './components';
import { useRouteValidation, useUsersSearch } from './hooks';

import csx from './Users.scss';

const Users = (): JSX.Element => {
  const history = useHistory();
  const {
    params: { role },
  } = useRouteMatch<{ role: AccountRole }>();

  useRouteValidation(role, history);

  const { data: users, pending } = useUsersSearch(role, history);

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

          {pending ? (
            <Loader />
          ) : users.length > 0 ? (
            <UsersTable users={users} onRolesEditClick={setUserToManage} />
          ) : (
            <Disclaimer
              description="Change filters to find users"
              title="Not results for current filters"
            />
          )}
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

export default Users;
