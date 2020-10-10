import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import AdminIcon from '@material-ui/icons/SupervisorAccount';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { useAuthProvider } from 'core/auth';

import csx from './SidebarLinks.scss';

namespace SidebarLinks {
  export type Children = (icon: React.ReactNode, label: string) => JSX.Element;

  export interface Item {
    label: string;
    path: string;
    icon: React.ReactNode;
    exact?: boolean;
  }

  export interface Props {
    basePath: string;
    children: Children;
  }
}

const CONFIG: { [key: string]: SidebarLinks.Item } = {
    dashboard: {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
      exact: true
    },
    templates: { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
    projects: { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> },
    admin: { label: 'Admin', path: '/admin', icon: <AdminIcon /> }
  },
  LINK_HEIGHT = 80,
  MARKER_HEIGHT = 30,
  LINKS = Object.values(CONFIG);

const getActiveLinkIdx = (
  basePath: string,
  pathname: string,
  links: SidebarLinks.Item[]
) => (): number => {
  const slicedPath = pathname.replace(basePath, '');

  return links.findIndex(({ path, exact }) => {
    if (exact) {
      return path === slicedPath;
    }

    return slicedPath.includes(path);
  });
};

const getLinksByAuthState = (authorized: boolean, pending: boolean) => (): SidebarLinks.Item[] => {
  if (pending || !authorized) {
    // TODO ADD LATER ROLES CHECK AFTER BE IMPLEMENTATION
    return LINKS.filter(({ label }) => label !== CONFIG.admin.label);
  }

  return LINKS;
};

const SidebarLinks = ({ basePath, children }: SidebarLinks.Props) => {
  const { pathname } = useLocation();
  const { authorized, pending } = useAuthProvider();

  const links = useMemo(getLinksByAuthState(authorized, pending), [authorized, pending]);

  const activeLinkIdx = useMemo(getActiveLinkIdx(basePath, pathname, links), [pathname, links]);

  return (
    <div className={csx.links}>
      {links.map(({ path, label, icon, exact }) => (
        <NavLink
          key={label}
          exact={exact}
          activeClassName={activeLinkIdx > -1 ? csx.active : ''}
          className={csx.link}
          style={{ height: `${LINK_HEIGHT}px` }}
          to={`${basePath}${path}`}
        >
          {children(icon, label)}
        </NavLink>
      ))}

      {activeLinkIdx > -1 && (
        <span
          className={csx.marker}
          style={{
            height: `${MARKER_HEIGHT}px`,
            top: `${(LINK_HEIGHT - MARKER_HEIGHT) / 2}px`,
            transform: `translateY(${LINK_HEIGHT * activeLinkIdx}px)`
          }}
        />
      )}
    </div>
  );
};

export default SidebarLinks;
