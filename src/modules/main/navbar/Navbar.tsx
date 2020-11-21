import React, { useMemo } from 'react';
import { useLocation, Route, useRouteMatch } from 'react-router';

import { Guard } from 'core/auth';

import {
  CreateTemplateButton,
  CreatePatternButton,
  CreateTechnologyButton,
} from 'shared/components';

import UserSection from './user-section';
import BreadCrumbs from './bread-crumbs';

import csx from './Navbar.scss';

const Navbar = () => {
  const match = useRouteMatch();

  const location = useLocation();

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
        <Guard.Protected>
          <Route
            path={`${match.path}/templates`}
            render={() => (
              <>
                <CreateTemplateButton />
                <div className={csx.divider} />
              </>
            )}
          />
        </Guard.Protected>

        {isAdminTechnologiesRoute && (
          <>
            <CreateTechnologyButton />
            <div className={csx.divider} />
          </>
        )}

        {isAdminPatternsRoute && (
          <>
            <CreatePatternButton />
            <div className={csx.divider} />
          </>
        )}

        <UserSection />
      </div>
    </nav>
  );
};

export default Navbar;
