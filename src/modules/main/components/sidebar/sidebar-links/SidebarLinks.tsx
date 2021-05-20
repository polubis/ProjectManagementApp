import React from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/Security';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupsIcon from '@material-ui/icons/Group';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { Button } from 'ui';

import { Guard } from 'shared/guards';

import csx from './SidebarLinks.scss';

const SidebarLinks = (): JSX.Element => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className={csx.links}>
      <NavLink
        activeClassName={pathname.includes('dashboard') ? csx.active : ''}
        to={`${path}/dashboard`}
      >
        <Button theme="primaryTransparent">
          <DashboardIcon />
          <span>Dashboard</span>
        </Button>
      </NavLink>

      <NavLink
        activeClassName={pathname.includes('templates') ? csx.active : ''}
        to={`${path}/templates`}
      >
        <Button theme="primaryTransparent">
          <TemplatesIcon />
          <span>Templates</span>
        </Button>
      </NavLink>

      <Guard.Protected>
        <NavLink
          activeClassName={pathname.includes('groups') ? csx.active : ''}
          to={`${path}/groups`}
        >
          <Button theme="primaryTransparent">
            <GroupsIcon />
            <span>Groups</span>
          </Button>
        </NavLink>
      </Guard.Protected>

      <Guard.Admin>
        <NavLink
          activeClassName={pathname.includes('admin') ? csx.active : ''}
          to={`${path}/admin`}
        >
          <Button theme="primaryTransparent">
            <AdminIcon />
            <span>Admin</span>
          </Button>
        </NavLink>
      </Guard.Admin>
    </div>
  );
};

export default SidebarLinks;
