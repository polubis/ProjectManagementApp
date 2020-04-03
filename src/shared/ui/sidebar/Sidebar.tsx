import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Work';
import TemplatesIcon from '@material-ui/icons/LibraryBooks';

import { Logo, SidebarProps, SidebarLink } from 'shared/ui';

import csx from './Sidebar.scss';

const LINK_HEIGHT = 80;

const MARKER_HEIGHT = 30;

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', path: '', icon: <DashboardIcon /> },
  { label: 'Templates', path: '/templates', icon: <TemplatesIcon /> },
  { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> }
];

const getActiveLinkIdx = (pathname: string, links: SidebarLink[]) => {
  return links.findIndex(({ path }) => path === pathname);
};

export const Sidebar = ({ basePath }: SidebarProps) => {
  const history = useHistory();

  const activeLinkIdx = getActiveLinkIdx(
    history.location.pathname.replace(basePath, ''),
    sidebarLinks
  );

  return (
    <aside className={csx.sidebar}>
      <div className={csx.sidebarContent}>
        <figure className={csx.logo}>
          <Logo />
        </figure>

        <div className={csx.links}>
          {sidebarLinks.map(({ path, label, icon }) => (
            <NavLink
              exact
              key={label}
              to={`${basePath}${path}`}
              className={csx.link}
              style={{ height: `${LINK_HEIGHT}px` }}
              activeClassName={csx.active}
            >
              <Button>
                {icon}
                <span>{label}</span>
              </Button>
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
      </div>
    </aside>
  );
};
