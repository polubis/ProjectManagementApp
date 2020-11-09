import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';
import CodeIcon from '@material-ui/icons/Code';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { Button } from 'ui';

import { Guard } from 'core/auth';

import UserSection from './user-section';

import csx from './Navbar.scss';

namespace Navbar {
  export interface Props {
    basePath: string;
  }
}

const getLinkPath = (index: number, breadcrumbs: string[], basePath: string): string =>
  `${basePath}/${breadcrumbs.slice(0, index + 1).join('/')}`;

const Navbar = ({ basePath }: Navbar.Props) => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => location.pathname.replace(`${basePath}/`, '').split('/'), [
    location,
    basePath
  ]);

  const isTemplatesRoute = useMemo(() => location.pathname.includes('templates'), [
    location.pathname
  ]);

  const isAdminTechnologiesRoute = useMemo(
    () => location.pathname.includes('admin/dictionaries/technologies'),
    [location.pathname]
  );

  const isAdminPatternsRoute = useMemo(
    () => location.pathname.includes('admin/dictionaries/patterns'),
    [location.pathname]
  );

  return (
    <nav className={csx.navbar}>
      <div className={csx.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, idx) => (
          <React.Fragment key={idx}>
            <div className={csx.breadcrumb}>
              <Link to={getLinkPath(idx, breadcrumbs, basePath)}>{breadcrumb}</Link>
            </div>
            <div className={csx.breadcrumbDivider}>{'>'}</div>
          </React.Fragment>
        ))}
      </div>

      {isTemplatesRoute && (
        <Guard.Protected>
          <>
            <NavLink replace to="/app/templates/management">
              <Button>
                <AddTemplateIcon />
                CREATE TEMPLATE
              </Button>
            </NavLink>

            <div className={csx.divider} />
          </>
        </Guard.Protected>
      )}

      {isAdminTechnologiesRoute && (
        <>
          <NavLink replace to="/app/admin/dictionaries/technologies/management">
            <Button>
              <CodeIcon />
              ADD TECHNOLOGY
            </Button>
          </NavLink>

          <div className={csx.divider} />
        </>
      )}

      {isAdminPatternsRoute && (
        <>
          <NavLink replace to="/app/admin/dictionaries/patterns/management">
            <Button>
              <PlaylistAddIcon />
              ADD PATTERN
            </Button>
          </NavLink>

          <div className={csx.divider} />
        </>
      )}

      <UserSection />
    </nav>
  );
};

export default Navbar;
