import React from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/SupervisorAccount';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { Guard } from 'core/auth';

import csx from './SidebarLinks.scss';

namespace SidebarLinks {
  export type RenderLink = (icon: React.ReactNode, label: string) => JSX.Element;

  export interface Props {
    renderLink: RenderLink;
  }
}

const getActiveClassName = (pathname: string, path: string): string => (pathname.includes(path) ? csx.active : '');

const SidebarLinks = ({ renderLink }: SidebarLinks.Props) => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <div className={csx.links}>
      <NavLink
        activeClassName={getActiveClassName(pathname, 'templates')}
        className={csx.link}
        to={`${path}/templates`}
      >
        {renderLink(<TemplatesIcon />, 'Templates')}
      </NavLink>

      <Guard.Admin>
        <NavLink
          activeClassName={getActiveClassName(pathname, 'admin')}
          className={csx.link}
          to={`${path}/admin`}
        >
          {renderLink(<AdminIcon />, 'Admin')}
        </NavLink>
      </Guard.Admin>
    </div>
  );
};

export default SidebarLinks;
