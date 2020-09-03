import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';


import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { SidebarLink } from '..';


import csx from './SidebarLinks.scss'

const LINK_HEIGHT = 80;

const MARKER_HEIGHT = 30;

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, exact: true },
  { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
  { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> }
];

const getActiveLinkIdx = (pathname: string, links: SidebarLink[]) => {
  return links.findIndex(({ path, exact }) => {
    if (exact) {
      return path === pathname;
    }

    return pathname.includes(path);
  });
};

export const SidebarLinks = ({basePath,component}) => {

  const { pathname } = useLocation();

  const activeLinkIdx = getActiveLinkIdx(pathname.replace(basePath, ''), sidebarLinks);

    return (
      <div className={csx.links}>
      {sidebarLinks.map(({ path, label, icon, exact }) => (
        <NavLink
          key={label}
          exact={exact}
          activeClassName={csx.active}
          className={csx.link}
          style={{ height: `${LINK_HEIGHT}px` }}
          to={`${basePath}${path}`}
        >
          {component(icon,label)}

        </NavLink>
      ))}
      <span
        className={csx.marker}
        style={{
          height: `${MARKER_HEIGHT}px`,
          top: `${(LINK_HEIGHT - MARKER_HEIGHT) / 2}px`,
          transform: `translateY(${LINK_HEIGHT * activeLinkIdx}px)`,
        }}
      />
    </div>
    )
}
