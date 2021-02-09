import React from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/SupervisorAccount';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { OnlyAdmin } from 'shared/guards';

import { Button } from 'ui';

import csx from './SidebarLinks.scss';

const SidebarLinks = (): JSX.Element => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className={csx.links}>
      <NavLink
        activeClassName={pathname.includes('templates') ? csx.active : ''}
        to={`${path}/templates`}
      >
        <Button theme="primaryTransparent">
          <TemplatesIcon />
          <span>Templates</span>
        </Button>
      </NavLink>

      <OnlyAdmin>
        <NavLink
          activeClassName={pathname.includes('admin') ? csx.active : ''}
          to={`${path}/admin`}
        >
          <Button theme="primaryTransparent">
            <AdminIcon />
            <span>Admin</span>
          </Button>
        </NavLink>
      </OnlyAdmin>
    </div>
  );
};

export default SidebarLinks;
