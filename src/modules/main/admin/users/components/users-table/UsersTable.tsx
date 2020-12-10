import React, { useMemo } from 'react';

import { Table } from 'ui';

import { User } from 'shared/models';

import OptionsItem from './options-item';

import csx from './UsersTable.scss';

namespace UsersTable {
  export interface Props {
    users: User[];
    onRolesEditClick(user: User): void;
  }
}

const CONFIG: Table.Config = {
  id: {
    size: {
      min: '200px',
      max: '200px',
    },
  },
  firstName: {
    size: {
      min: '150px',
      max: '150px',
    },
    row: (key, user: User) => (user.firstName ? user.firstName : '-'),
  },
  lastName: {
    size: {
      min: '150px',
      max: '150px',
    },
    row: (key, user: User) => (user.lastName ? user.lastName : '-'),
  },
  username: {
    size: {
      min: '150px',
      max: '150px',
    },
  },
  email: {
    size: {
      min: '300px',
      max: '300px',
    },
  },
  connectedWithGithub: {
    size: {
      min: '180px',
      max: '180px',
    },
    label: 'Github status',
    row: (key, user: User) => (
      <div>
        {user.connectedWithGithub ? (
          <span className={csx.valid}>Connected</span>
        ) : (
          <span className={csx.invalid}>Not connected</span>
        )}
      </div>
    ),
  },
  emailConfirmed: {
    size: {
      min: '180px',
      max: '180px',
    },
    row: (key, user: User) => (
      <div>
        {user.emailConfirmed ? (
          <span className={csx.valid}>Confirmed</span>
        ) : (
          <span className={csx.invalid}>Not confirmed</span>
        )}
      </div>
    ),
    label: 'Email confirmation',
  },
};

const UsersTable = ({ users, onRolesEditClick }: UsersTable.Props): JSX.Element => {
  const config = useMemo(() => {
    return {
      ...CONFIG,
      roles: {
        label: 'Roles',
        row: (key, user: User) => <OptionsItem user={user} onRolesEditClick={onRolesEditClick} />,
        size: {
          min: '120px',
          max: '120px',
        },
      },
    };
  }, [users, onRolesEditClick]);

  return (
    <div className={csx.usersTable}>
      <Table config={config} data={users} />
    </div>
  );
};

export default UsersTable;
