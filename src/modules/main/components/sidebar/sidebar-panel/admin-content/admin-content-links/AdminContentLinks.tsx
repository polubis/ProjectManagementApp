import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'ui';

import csx from './AdminContentLinks.scss';

const AdminContentLinks = (): JSX.Element => {
  return (
    <div className={csx.adminContentLinks}>
      <NavLink activeClassName={csx.active} to="/app/admin/dictionaries">
        <Button theme="primaryTransparent">Dictionaries</Button>
      </NavLink>

      <NavLink activeClassName={csx.active} to="/app/admin/users">
        <Button theme="primaryTransparent">Users</Button>
      </NavLink>
    </div>
  );
};

export default AdminContentLinks;
