import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import UserSection from './user-section';

import csx from './Navbar.scss';

const getBreadcrumbs = (pathname: string) => {
  return pathname.split('/');
};

const getLinkPath = (index: number, breadcrumbs: string[], basePath: string) => {
  const path = `${basePath}/${breadcrumbs.slice(0, index + 1).join('/')}`;
  return path;
};

namespace Navbar {
  export interface Props {
    basePath: string;
  }
}

const Navbar = ({ basePath }: Navbar.Props) => {
  const location = useLocation();

  const breadcrumbs = getBreadcrumbs(location.pathname.replace(`${basePath}/`, ''));

  return (
    <nav className={csx.navbar}>
      <div className={csx.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, idx) => (
          <React.Fragment key={idx}>
            <div className={csx.breadcrumb}>
              <Link to={getLinkPath(idx, breadcrumbs, basePath)}>{breadcrumb}</Link>
            </div>
            <div className={csx.divider}>{'>'}</div>
          </React.Fragment>
        ))}
      </div>

      <UserSection />
    </nav>
  );
};

export default Navbar;
