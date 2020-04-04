import React from 'react';
import { useLocation } from 'react-router';

import csx from './Navbar.scss';

const getBreadcrumbs = (pathname: string) => {
  return pathname.split('/');
};

export interface NavbarProps {
  basePath: string;
}

export const Navbar = ({ basePath }) => {
  const location = useLocation();

  const breadcrumbs = getBreadcrumbs(location.pathname.replace(`${basePath}/`, ''));

  return (
    <nav className={csx.navbar}>
      <div className={csx.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, idx) => (
          <React.Fragment key={idx}>
            <div className={csx.breadcrumb}>{breadcrumb}</div>
            <div className={csx.divider}>></div>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
