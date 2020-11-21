import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

import AddTemplateIcon from '@material-ui/icons/Queue';
import CodeIcon from '@material-ui/icons/Code';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { Button } from 'ui';

import { Guard } from 'core/auth';

import UserSection from './user-section';
import BreadCrumbs from './bread-crumbs';

import csx from './Navbar.scss';

const Navbar = () => {
  const location = useLocation();

  const isTemplatesRoute = useMemo(() => location.pathname.includes('templates'), [location]);

  const isAdminTechnologiesRoute = useMemo(
    () => location.pathname.includes('admin/dictionaries/technologies'),
    [location]
  );

  const isAdminPatternsRoute = useMemo(
    () => location.pathname.includes('admin/dictionaries/patterns'),
    [location]
  );

  return (
    <nav className={csx.navbar}>
      <BreadCrumbs pathname={location.pathname} />

      <div className={csx.wrapper}>
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
      </div>
    </nav>
  );
};

export default Navbar;
