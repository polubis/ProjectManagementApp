import React, { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

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

const LINK_HEIGHT = 80,
  MARKER_HEIGHT = 30,
  LINKS: SidebarLinks.Item[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, exact: true },
    { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
    { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> }
  ];

const getActiveLinkIdx = (basePath: string, pathname: string) => () => {
  const slicedPath = pathname.replace(basePath, '');

  return LINKS.findIndex(({ path, exact }) => {
    if (exact) {
      return path === slicedPath;
    }

    return slicedPath.includes(path);
  });
};

const SidebarLinks = ({ basePath, children }: SidebarLinks.Props) => {
  const { pathname } = useLocation();

  const activeLinkIdx = useMemo(getActiveLinkIdx(basePath, pathname), [pathname]);

  return (
    <div className={csx.links}>
      {LINKS.map(({ path, label, icon, exact }) => (
        <NavLink
          key={label}
          exact={exact}
          activeClassName={csx.active}
          className={csx.link}
          style={{ height: `${LINK_HEIGHT}px` }}
          to={`${basePath}${path}`}
        >
          {children(icon, label)}
        </NavLink>
      ))}
      <span
        className={csx.marker}
        style={{
          height: `${MARKER_HEIGHT}px`,
          top: `${(LINK_HEIGHT - MARKER_HEIGHT) / 2}px`,
          transform: `translateY(${LINK_HEIGHT * activeLinkIdx}px)`
        }}
      />
    </div>
  );
};

export default SidebarLinks;
