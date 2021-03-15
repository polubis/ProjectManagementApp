import React from 'react';
import { useRouteMatch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/SupervisorAccount';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { MobileNavigation as UIMobileNavigation } from 'ui';

import { Guard } from 'shared/guards';
import {
  CreateTemplateMobileButton,
  CreateTechnologyMobileButton,
  CreatePatternMobileButton,
} from 'shared/components';

import csx from './MobileNavigation.scss';

const MobileNavigation = (): JSX.Element => {
  const { path } = useRouteMatch();

  return (
    <UIMobileNavigation>
      <NavLink activeClassName={csx.active} className={csx.link} to={`${path}/dashboard`}>
        <DashboardIcon />
        <span>Dashboard</span>
      </NavLink>

      <NavLink activeClassName={csx.active} className={csx.link} to={`${path}/templates`}>
        <TemplatesIcon />
        <span>Templates</span>
      </NavLink>

      <Guard.Admin>
        <NavLink activeClassName={csx.active} className={csx.link} to={`${path}/admin`}>
          <AdminIcon />
          <span>Admin</span>
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/dictionaries`}
        >
          Dictionaries
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/surveys`}
        >
          Surveys
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/users`}
        >
          Users
        </NavLink>
      </Guard.Admin>

      <footer className={csx.footer}>
        <Guard.Protected>
          <Route path={`${path}/templates`} component={CreateTemplateMobileButton} />
        </Guard.Protected>

        <Guard.Admin>
          <Route path={`${path}/admin/dictionaries`} component={CreatePatternMobileButton} />
          <Route path={`${path}/admin/dictionaries`} component={CreateTechnologyMobileButton} />
        </Guard.Admin>
      </footer>
    </UIMobileNavigation>
  );
};

export default MobileNavigation;
