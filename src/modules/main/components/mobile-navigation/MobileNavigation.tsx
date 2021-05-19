import React, { FC } from 'react';
import { useRouteMatch, Route } from 'react-router';
import { NavLink } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/SupervisorAccount';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { MobileNavigation as UIMobileNavigation, useMobileNavigationProvider } from 'ui';

import { Guard } from 'shared/guards';
import {
  CreateTemplateMobileButton,
  CreateTechnologyMobileButton,
  CreatePatternMobileButton,
} from 'shared/components';

import csx from './MobileNavigation.scss';

const MobileNavigation: FC = () => {
  const { toggleOpen } = useMobileNavigationProvider();

  const { path } = useRouteMatch();

  return (
    <>
      <NavLink
        activeClassName={csx.active}
        className={csx.link}
        to={`${path}/dashboard`}
        onClick={toggleOpen}
      >
        <DashboardIcon />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        activeClassName={csx.active}
        className={csx.link}
        to={`${path}/templates`}
        onClick={toggleOpen}
      >
        <TemplatesIcon />
        <span>Templates</span>
      </NavLink>

      <Guard.Admin>
        <NavLink
          activeClassName={csx.active}
          className={csx.link}
          to={`${path}/admin`}
          onClick={toggleOpen}
        >
          <AdminIcon />
          <span>Admin</span>
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/dictionaries`}
          onClick={toggleOpen}
        >
          Dictionaries
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/surveys`}
          onClick={toggleOpen}
        >
          Surveys
        </NavLink>

        <NavLink
          activeClassName={csx.active}
          className={`${csx.link} ${csx.subLink}`}
          to={`${path}/admin/users`}
          onClick={toggleOpen}
        >
          Users
        </NavLink>
      </Guard.Admin>

      <footer className={csx.footer}>
        <Guard.Protected>
          {({ user: { connectedWithGithub } }) =>
            connectedWithGithub && (
              <Route
                path={`${path}/templates`}
                render={() => <CreateTemplateMobileButton onClick={toggleOpen} />}
              />
            )
          }
        </Guard.Protected>

        <Guard.Admin>
          <Route
            path={`${path}/admin/dictionaries`}
            render={() => <CreatePatternMobileButton onClick={toggleOpen} />}
          />
          <Route
            path={`${path}/admin/dictionaries`}
            render={() => <CreateTechnologyMobileButton onClick={toggleOpen} />}
          />
        </Guard.Admin>
      </footer>
    </>
  );
};

const ConnectedMobileNavigation: FC = () => (
  <UIMobileNavigation>
    <MobileNavigation />
  </UIMobileNavigation>
);

export default ConnectedMobileNavigation;
